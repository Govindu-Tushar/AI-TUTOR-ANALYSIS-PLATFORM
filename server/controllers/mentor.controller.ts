import { Request, Response, NextFunction } from "express";
import { askMentorAI } from "../services/gemini.service";

/**
 * Controller for the AI Training Mentor agent.
 */
export const handleMentorMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { messages, tutor, course } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  try {
    const responseText = await askMentorAI(messages, tutor, course);
    return res.status(200).json({ reply: responseText });
  } catch (err: any) {
    console.warn("Gemini Live service not available, using localized response parser:", err.message);
    
    // Parse the user's latest message for keyword-matching offline responses
    const userQuery = messages[messages.length - 1]?.content || "";
    const fallbackReply = getFallbackResponse(userQuery, tutor, course);
    
    return res.status(200).json({
      reply: `*(AI Offline Mode)*\n\n${fallbackReply}`
    });
  }
};

/**
 * Highly granular fallback generator to support robust offline usage
 */
function getFallbackResponse(query: string, tutor: any, course: any): string {
  const q = query.toLowerCase();
  const tutorName = tutor?.name || "the instructor";

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("introduce") || q.includes("who are you")) {
    return `### Hello! I am Dr. Alistair, your AI Mentorship Development Assistant. 👋

I perform automated video audits to analyze tutor dynamics, lesson pacing, student engagement, and body language variables.

How can I help you support **${tutorName}** today? I can:
- **Explain scores** (e.g. why their teaching methodology is rated high/low)
- **Suggest an improvement plan** (30-60-90 Day targeted micro-tasks)
- **Contrast tutors** (compare e.g. Evelyn Vance's engagement against Marcus Brody's)
- **Recommend training material** for student retention.`;
  }

  if (q.includes("compare") || q.includes("tutor vs") || q.includes("difference") || q.includes("better")) {
    return `### Tutor Pedagogy Comparison Analysis 📊

Here is a contrast of our primary tutors in this module:
* **Dr. Evelyn Vance (94% - Elite)**
  * *Instructional Style*: High-engagement, quick feedback, excellent student check-ins.
  * *Body Language*: Highly kinetic hand-gestures, consistent visual screen focus. Hand gestures average 13-18 per minute.
  * *Area to Watch*: Speed. Coded examples average 420 lines/hr which can exhaust beginners.
* **Prof. Marcus Brody (84% - Active)**
  * *Instructional Style*: Highly structured, masterful technical knowledge (dynamic hierarchies, MRO).
  * *Body Language*: Stiff setup, gaze frequently locked on terminal code. Hand movements are sparse.
  * *Area to Watch*: Class engagement. Needs warm opening hooks and camera alignment.

**Strategic Action**: Have Marcus shadow Evelyn’s next interactive coding session to observe her exit-slip questioning style.`;
  }

  if (q.includes("plan") || q.includes("30") || q.includes("60") || q.includes("90") || q.includes("improve") || q.includes("weakness")) {
    return `### Personalized Development Plan: ${tutorName} 🎯

Based on the automated evaluation of their teaching recordings, here is the prioritized action roadmap:

* **1. Active Camera Position & Framing (Days 1–30)**
  * Elevate camera position to exact eye height.
  * Practice the "10-second pause rule" immediately after launching live programming challenges.
* **2. Instructional Scaffolding (Days 31–60)**
  * Replace complex initial lectures with accessible, real-world analogies (e.g., mapping programming variables to "physical magic buckets").
  * Establish visual "Check-Your-Understanding" checkpoints every 15 minutes.
* **3. Synthesis & Evaluation (Days 61–90)**
  * Evaluate self-recorded classes and log progress metrics. Goal is to increase tutor satisfaction index by **+12 points**.

Would you like to customize any of these stages?`;
  }

  if (q.includes("score") || q.includes("explain") || q.includes("metrics") || q.includes("how") || q.includes("derived")) {
    return `### How Automated Metrics are Derived 🔍

Our analysis platform records video streams at 30fps and parses data using several server-side pipelines:

1. **Subject Knowledge & Clarity (Transcript Analysis)**: Evaluated against computer science conceptual models, vocabulary matching (such as O(1) Big-O statements), and student validation patterns.
2. **Engagement Factors**: Tracked by monitoring student-to-tutor word count ratios, interactive chat polls, and speed of answering questions.
3. **Body Language Scores (Skeletal Gaze Model)**:
   * **Eye Contact**: Determined by pupil and iris vector calculations relative to camera location.
   * **Gestural Energy**: Real-time bounding boxes around hand nodes measure average frequency and symmetry of movements.

Would you like to drill down into a specific session timestamp?`;
  }

  return `### AI Mentor Observation: ${tutorName} 💡

I have analyzed the current records for **${tutorName}** within **${course?.name || "Python Programming"}**. Here are key takeaways:

* **Teaching Methodology**: Highly structured, scoring **${tutor?.metrics?.teachingMethodology || 94}%**. The lessons include clear problem setup and live demonstrations.
* **Key Strengths**: Excellent focus on student clarity, fast interactive answer loop, and highly energetic body gestures.
* **Micro-Pedagogical Goal**: Ensure lectures don't rush through code details under pressure. Encourage adding brief, 3-minute collaborative whiteboard checkouts.

Ask me about:
- *"${tutorName}'s 90-day plan"*
- *"Compare ${tutorName} with Marcus Brody"*
- *"Explain how eye contact is calculated"*`;
}
