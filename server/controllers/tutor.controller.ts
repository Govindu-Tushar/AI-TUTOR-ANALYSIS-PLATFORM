import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { calculateVideoMetrics } from "../services/evaluation.service";
import { findTutorInRuntime, addTutorToRuntimeCourse } from "../services/courseStore.service";

/**
 * Get tutor performance records by detailed ID.
 */
export const getTutorById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const tutor = await prisma.tutor.findUnique({
      where: { id },
      include: {
        metrics: true,
        bodyLanguage: true,
        transcript: {
          orderBy: {
            seconds: "asc"
          }
        },
        recommendations: true,
        timeline: {
          orderBy: {
            seconds: "asc"
          }
        },
      }
    });

    if (!tutor) {
      const runtimeTutor = findTutorInRuntime(id);
      if (runtimeTutor) {
        return res.status(200).json(runtimeTutor);
      }
      return res.status(404).json({ error: "Tutor not found" });
    }

    return res.status(200).json(tutor);
  } catch (error) {
    console.warn("Database tutor fetch failed, falling back to runtime store:", error);
    const runtimeTutor = findTutorInRuntime(id);
    if (runtimeTutor) {
      return res.status(200).json(runtimeTutor);
    }
    return res.status(404).json({ error: "Tutor not found in database or runtime memory" });
  }
};

/**
 * Post evaluation for uploaded video. Saves full AI telemetry profile in Database.
 */
export const createEvaluation = async (req: Request, res: Response, next: NextFunction) => {
  const { name, size, duration, resolution, courseId, tutorName } = req.body;
  try {
    const evaluationData = await calculateVideoMetrics({
      name,
      size,
      duration,
      resolution,
      tutorName: tutorName || "New Instructor"
    });

    const activeCourseId = courseId || "course-1";

    // Build the entity in database
    const newTutor = await prisma.tutor.create({
      data: {
        id: `tutor-${Date.now()}`,
        name: evaluationData.name,
        subject: evaluationData.subject,
        experience: evaluationData.experience,
        avatarUrl: evaluationData.avatarUrl,
        averageScore: evaluationData.averageScore,
        status: evaluationData.status,
        totalEvaluations: 1,
        lastEvaluated: new Date().toISOString().split("T")[0],
        course: {
          connect: { id: activeCourseId }
        },
        metrics: {
          create: evaluationData.metrics
        },
        bodyLanguage: {
          create: evaluationData.bodyLanguage
        },
        recommendations: {
          create: evaluationData.recommendations
        },
        transcript: {
          createMany: {
            data: evaluationData.transcript.map(item => ({
              id: item.id,
              timestamp: item.timestamp,
              seconds: item.seconds,
              speaker: item.speaker,
              text: item.text,
              sentiment: item.sentiment,
              tags: item.tags,
              highlightType: item.highlightType
            }))
          }
        },
        timeline: {
          createMany: {
            data: evaluationData.timeline.map(item => ({
              time: item.time,
              seconds: item.seconds,
              type: item.type,
              title: item.title,
              description: item.description
            }))
          }
        }
      },
      include: {
        metrics: true,
        bodyLanguage: true,
        transcript: true,
        recommendations: true,
        timeline: true,
      }
    });

    // Increment course totalEvaluated
    try {
      await prisma.course.update({
        where: { id: activeCourseId },
        data: {
          totalEvaluated: { increment: 1 },
          tutorsCount: { increment: 1 }
        }
      });
    } catch (e) {
      console.warn("Could not increment course totalEvaluated index:", e);
    }

    return res.status(201).json({
      message: "AI Video Evaluation complete. Performance records updated.",
      tutor: newTutor
    });
  } catch (error) {
    console.warn("Database save failed, returning direct computed simulation:", error);
    // Secure fallback strategy to keep the app highly responsive and functional during offline testing
    const fallbackData = await calculateVideoMetrics({
      name,
      size,
      duration,
      resolution,
      tutorName: tutorName || "New Instructor"
    });
    const savedTutor = addTutorToRuntimeCourse(courseId || "course-1", fallbackData);
    return res.status(200).json({
      message: "AI Video Evaluation complete (Runtime Store)",
      tutor: savedTutor
    });
  }
};
