import { GoogleGenAI } from "@google/genai";

/**
 * Service interfacing with the Google Gen AI SDK to prompt Gemini 3.5 Flash
 * with full teacher-training context, analytics, and metrics.
 */
export async function askMentorAI(messages: any[], tutor: any, course: any): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const tutorName = tutor?.name || "the tutor";
  const tutorSubject = tutor?.subject || "General Education";
  const tutorExperience = tutor?.experience || "N/A";
  const tutorScore = tutor?.averageScore || "N/A";
  const tutorMetrics = tutor?.metrics ? JSON.stringify(tutor?.metrics) : "N/A";
  const tutorBodyLanguage = tutor?.bodyLanguage ? JSON.stringify(tutor?.bodyLanguage) : "N/A";
  const courseName = course?.name || "General Course";
  const courseCategory = course?.category || "Tutor Performance";

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const systemInstruction = `You are Dr. Alistair, an elite AI Teacher Training Mentor, Pedagogical Analyst, and Tutor Performance Coach in our SaaS Platform.
You are coaching administrators, school principals, and tutors on micro-skills: teaching methodologies, question scaffolding, student engagement, vocal modulation, and screen body language analytics.

You are discussing video analysis context for:
- Tutor: ${tutorName} (Subject: ${tutorSubject}, Experience: ${tutorExperience}, Overall Score: ${tutorScore}%)
- Course Module: ${courseName} (Category: ${courseCategory})
- Custom Analytical Metrics (0-100 scale): ${tutorMetrics}
- Body Language Analytics & Eye Contact: ${tutorBodyLanguage}

When answering general educational queries, compare tutors, explain how their metrics are derived (e.g. eye contact from frame-by-frame pupil gazes, gestural energy by hand-tracking skeletal boundaries).
Help coordinate personalized 30-day, 60-day, and 90-day training modules.

Ensure answers are:
1. Highly professional, encouraging, analytical, and structured in Markdown formatting.
2. Direct and actionable, avoiding vague educational fluff. Use bullet points and checklists.
3. Keep response sizes under 150-250 words to maintain high dashboard chat readability.
4. If mentioning any tutor specifically, draw reference to their course topic (e.g., Python lists, dynamic programming recursion, diamond inheritance loops).`;

  // Format messages array to match Google Gen AI format
  const formattedContents = messages.map((m) => {
    const role = m.role === "user" ? "user" : "model";
    return {
      role,
      parts: [{ text: m.content }],
    };
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: formattedContents,
    config: {
      systemInstruction,
    },
  });

  return response.text || "I apologize, but I couldn't generate a recommendation.";
}
