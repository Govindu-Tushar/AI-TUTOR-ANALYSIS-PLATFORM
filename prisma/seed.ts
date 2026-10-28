import { PrismaClient } from "@prisma/client";
import { INITIAL_COURSES } from "../src/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed pipeline...");

  // Clean existing tables in correct cascading order
  await prisma.timelineEvent.deleteMany({});
  await prisma.tutorRecommendations.deleteMany({});
  await prisma.transcriptItem.deleteMany({});
  await prisma.bodyLanguageMetrics.deleteMany({});
  await prisma.teachingMetrics.deleteMany({});
  await prisma.tutor.deleteMany({});
  await prisma.course.deleteMany({});

  console.log("Database cleared successfully.");

  for (const course of INITIAL_COURSES) {
    console.log(`Seeding Course: ${course.name} [ID: ${course.id}]`);
    
    // Create the main course
    await prisma.course.create({
      data: {
        id: course.id,
        name: course.name,
        category: course.category,
        tutorsCount: course.tutorsCount,
        averageScore: course.averageScore,
        totalEvaluated: course.totalEvaluated,
        lastUpdated: course.lastUpdated,
        description: course.description,
      },
    });

    for (const tutor of course.tutors) {
      console.log(`Seeding Tutor: ${tutor.name} [ID: ${tutor.id}] under Course ID: ${course.id}`);

      // Create tutor along with all related sub-tables
      await prisma.tutor.create({
        data: {
          id: tutor.id,
          name: tutor.name,
          subject: tutor.subject,
          experience: tutor.experience,
          avatarUrl: tutor.avatarUrl,
          averageScore: tutor.averageScore,
          status: tutor.status,
          totalEvaluations: tutor.totalEvaluations,
          lastEvaluated: tutor.lastEvaluated,
          courseId: course.id,
          
          metrics: tutor.metrics ? {
            create: {
              subjectKnowledge: tutor.metrics.subjectKnowledge,
              conceptualClarity: tutor.metrics.conceptualClarity,
              communicationName: tutor.metrics.communicationName,
              engagement: tutor.metrics.engagement,
              teachingMethodology: tutor.metrics.teachingMethodology,
              confidence: tutor.metrics.confidence,
              mentorship: tutor.metrics.mentorship,
              feedbackQuality: tutor.metrics.feedbackQuality,
            }
          } : undefined,

          bodyLanguage: tutor.bodyLanguage ? {
            create: {
              eyeContactScore: tutor.bodyLanguage.eyeContactScore,
              gestureAnalysis: tutor.bodyLanguage.gestureAnalysis,
              postureAnalysis: tutor.bodyLanguage.postureAnalysis,
              movementQuality: tutor.bodyLanguage.movementQuality,
              facialExpressionScore: tutor.bodyLanguage.facialExpressionScore,
              facialAnalysis: tutor.bodyLanguage.facialAnalysis,
              confidenceDetection: tutor.bodyLanguage.confidenceDetection,
              energyLevel: tutor.bodyLanguage.energyLevel,
              eyeContactTimeline: tutor.bodyLanguage.eyeContactTimeline,
              gestureFrequency: tutor.bodyLanguage.gestureFrequency,
            }
          } : undefined,

          recommendations: tutor.recommendations ? {
            create: {
              strengths: tutor.recommendations.strengths,
              weaknesses: tutor.recommendations.weaknesses,
              trainingRecommendations: tutor.recommendations.trainingRecommendations,
              suggestedCourses: tutor.recommendations.suggestedCourses,
              plan30Days: tutor.recommendations.plan30Days,
              plan60Days: tutor.recommendations.plan60Days,
              plan90Days: tutor.recommendations.plan90Days,
              projectedImprovement: tutor.recommendations.projectedImprovement,
            }
          } : undefined,

          transcript: tutor.transcript ? {
            createMany: {
              data: tutor.transcript.map(item => ({
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
          } : undefined,

          timeline: tutor.timeline ? {
            createMany: {
              data: tutor.timeline.map(item => ({
                time: item.time,
                seconds: item.seconds,
                type: item.type,
                title: item.title,
                description: item.description
              }))
            }
          } : undefined,
        }
      });
    }
  }

  console.log("🌱 Database seeding completed with 100% relational integrity!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding process halted with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
