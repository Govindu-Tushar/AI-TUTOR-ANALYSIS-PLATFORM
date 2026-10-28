import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { getRuntimeCourses } from "../services/courseStore.service";

/**
 * Get all courses with nested tutor metrics, timelines, transcripts, and body language variables.
 */
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        tutors: {
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
        }
      }
    });

    if (!courses || courses.length === 0) {
      // Return runtime dataset if DB contains no records yet
      return res.status(200).json(getRuntimeCourses());
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.warn("Database query failed, falling back to runtime schema data:", error);
    // Secure fallback strategy to keep the app functional in headless/offline previews
    return res.status(200).json(getRuntimeCourses());
  }
};
