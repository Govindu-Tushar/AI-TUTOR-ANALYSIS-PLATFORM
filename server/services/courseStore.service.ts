import { INITIAL_COURSES } from "../../src/data";
import { Course, Tutor } from "../../src/types";

// Deep clone INITIAL_COURSES into an in-memory mutable store
let runtimeCourses: Course[] = JSON.parse(JSON.stringify(INITIAL_COURSES));

export function getRuntimeCourses(): Course[] {
  return runtimeCourses;
}

export function findTutorInRuntime(tutorId: string): Tutor | null {
  for (const course of runtimeCourses) {
    const tutor = course.tutors.find((t) => t.id === tutorId);
    if (tutor) return tutor;
  }
  return null;
}

export function addTutorToRuntimeCourse(courseId: string, tutorData: any): Tutor {
  let targetCourse = runtimeCourses.find((c) => c.id === courseId);
  if (!targetCourse) {
    targetCourse = runtimeCourses[0];
  }

  const existingIndex = targetCourse.tutors.findIndex((t) => t.id === tutorData.id);
  
  if (existingIndex >= 0) {
    // Update existing tutor evaluation
    targetCourse.tutors[existingIndex] = {
      ...targetCourse.tutors[existingIndex],
      ...tutorData,
      totalEvaluations: (targetCourse.tutors[existingIndex].totalEvaluations || 0) + 1,
      lastEvaluated: new Date().toISOString().split("T")[0],
    };
    targetCourse.totalEvaluated += 1;
    // Recompute course mean score
    const totalScore = targetCourse.tutors.reduce((sum, t) => sum + t.averageScore, 0);
    targetCourse.averageScore = Math.round(totalScore / targetCourse.tutors.length);
    return targetCourse.tutors[existingIndex];
  }

  // Create new tutor entry
  const newTutor: Tutor = {
    id: tutorData.id || `tutor-${Date.now()}`,
    name: tutorData.name,
    subject: tutorData.subject || "Pedagogical Delivery",
    experience: tutorData.experience || "1 Year",
    avatarUrl: tutorData.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    averageScore: tutorData.averageScore,
    status: tutorData.status || (tutorData.averageScore >= 92 ? "Elite" : "Active"),
    totalEvaluations: 1,
    lastEvaluated: new Date().toISOString().split("T")[0],
    metrics: tutorData.metrics,
    bodyLanguage: tutorData.bodyLanguage,
    transcript: tutorData.transcript,
    recommendations: tutorData.recommendations,
    timeline: tutorData.timeline,
  };

  targetCourse.tutors.push(newTutor);
  targetCourse.tutorsCount = targetCourse.tutors.length;
  targetCourse.totalEvaluated += 1;

  // Recompute course mean score
  const totalScore = targetCourse.tutors.reduce((sum, t) => sum + t.averageScore, 0);
  targetCourse.averageScore = Math.round(totalScore / targetCourse.tutors.length);

  return newTutor;
}
