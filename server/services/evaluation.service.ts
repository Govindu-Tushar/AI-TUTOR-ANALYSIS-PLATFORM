export interface EvaluationInput {
  name: string;
  size: string;
  duration: string;
  resolution: string;
  tutorName: string;
}

/**
 * Service to analyze teaching videos and produce performance scoring,
 * body language timeline profiles, and tailored coaching tasks.
 */
export async function calculateVideoMetrics(input: EvaluationInput) {
  // Extract and compute mock or calculated parameters based on file traits
  const durationInSeconds = parseDuration(input.duration);
  
  // We compute realistic scores based on tutor name or file name hashes to ensure consistent simulation
  const hash = input.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 78 + (hash % 18); // yields stable scores between 78 and 96
  
  const subjectKnowledge = Math.min(99, Math.max(70, baseScore + (hash % 5)));
  const conceptualClarity = Math.min(99, Math.max(70, baseScore - 2 + (hash % 4)));
  const communicationName = Math.min(99, Math.max(70, baseScore + 1));
  const engagement = Math.min(99, Math.max(70, baseScore - 5 + (hash % 6)));
  const teachingMethodology = Math.min(99, Math.max(70, baseScore - 1));
  const confidence = Math.min(99, Math.max(70, baseScore + 3));
  const mentorship = Math.min(99, Math.max(70, baseScore - 3));
  const feedbackQuality = Math.min(99, Math.max(70, baseScore - 4));

  const averageScore = Math.round(
    (subjectKnowledge +
      conceptualClarity +
      communicationName +
      engagement +
      teachingMethodology +
      confidence +
      mentorship +
      feedbackQuality) /
      8
  );

  const status = averageScore >= 92 ? "Elite" : averageScore >= 82 ? "Active" : "Underperforming";

  // Create a timeline of eye contact and gesture frequency over 10 virtual intervals
  const eyeContactTimeline = Array.from({ length: 10 }, (_, i) => 
    Math.min(100, Math.max(40, Math.round(baseScore + Math.sin(i) * 12)))
  );

  const gestureFrequency = Array.from({ length: 10 }, (_, i) => 
    Math.max(1, Math.round(8 + Math.cos(i) * 6 + (hash % 5)))
  );

  return {
    name: input.tutorName,
    subject: "Active Classroom Performance Evaluation",
    experience: "New Member",
    avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + (hash % 1000000)}?auto=format&fit=crop&q=80&w=200`,
    averageScore,
    status,
    metrics: {
      subjectKnowledge,
      conceptualClarity,
      communicationName,
      engagement,
      teachingMethodology,
      confidence,
      mentorship,
      feedbackQuality
    },
    bodyLanguage: {
      eyeContactScore: Math.round(eyeContactTimeline.reduce((a, b) => a + b, 0) / 10),
      gestureAnalysis: "Highly proactive gesturing pattern. Gesticulation was aligned perfectly with conceptual definitions on the digital whiteboard.",
      postureAnalysis: "Maintained centered position with high framing alignment. Minimal unnecessary leaning or camera-shake triggers.",
      movementQuality: "Steady pacing. Comfortable alignment with workspace elements.",
      facialExpressionScore: Math.round(baseScore - 2),
      facialAnalysis: "Warm smiles detected. Frequently uses affirmative nodding cues during student discussion.",
      confidenceDetection: Math.round(baseScore + 2),
      energyLevel: averageScore > 88 ? "High" : "Moderate",
      eyeContactTimeline,
      gestureFrequency
    },
    transcript: [
      {
        id: `tr-upload-${Date.now()}-1`,
        timestamp: "00:01",
        seconds: 1,
        speaker: `Tutor (${input.tutorName.split(" ")[0]})`,
        text: "Let's kick off this active session. I want us to focus heavily on the practical application of our model architecture. Any initial ideas?",
        sentiment: "Positive",
        tags: ["Ice Breaker", "Lesson Goal Hook"],
        highlightType: "engagement"
      },
      {
        id: `tr-upload-${Date.now()}-2`,
        timestamp: "00:45",
        seconds: 45,
        speaker: "Student (Classroom)",
        text: "Could we utilize a decorator pattern to wrap the event emitters gracefully?",
        sentiment: "Neutral",
        tags: ["Student Question"]
      },
      {
        id: `tr-upload-${Date.now()}-3`,
        timestamp: "01:20",
        seconds: 80,
        speaker: `Tutor (${input.tutorName.split(" ")[0]})`,
        text: "Absolutely gorgeous design choice! The decorator will help isolate standard middleware logs from our core execution loop.",
        sentiment: "Positive",
        tags: ["Concept Explanation", "Positive Reinforcement"],
        highlightType: "clarity"
      }
    ],
    recommendations: {
      strengths: [
        "Exceptional confidence levels under real-time code environments",
        "Prompt positive reinforcement feedback loop for student design questions",
        "Strong facial and eye contact focus matching standard online rubrics"
      ],
      weaknesses: [
        "Tends to execute rapid-fire definitions in the introduction timeline",
        "Could utilize wider whiteboards instead of raw console terminals"
      ],
      trainingRecommendations: [
        "Incorporate short 2-minute checkpoints every quarter-hour",
        "Shadow Evelyn Vance's advanced collaborative classroom laboratories"
      ],
      suggestedCourses: [
        "Advanced Classroom Warmth: Digital Presence and Engagement Factors",
        "Architecting Interactive Sandbox Environments for Software Students"
      ],
      plan30Days: [
        "Integrate 3 active comprehension checkpoints inside presentation blocks.",
        "Add a visual countdown timer to maintain strict lecture module timing splits."
      ],
      plan60Days: [
        "Incorporate exit slip tasks to log student rating index improvements.",
        "Practice lowering speaking rate during mathematical formula derivations."
      ],
      plan90Days: [
        "Exceed an 88% overall engagement score consistently on performance reports."
      ],
      projectedImprovement: 12
    },
    timeline: [
      { time: "00:01", seconds: 1, type: "info", title: "Class Kickoff", description: "Enthusiastic and clear presentation outline mapped out immediately." },
      { time: "01:20", seconds: 80, type: "success", title: "Excellent Feedback Quality", description: "Engaged response validating student suggestion with robust decorator logic." }
    ]
  };
}

function parseDuration(durStr: string): number {
  if (!durStr) return 600; // default 10 mins
  const parts = durStr.toLowerCase().replace("mins", "").replace("min", "").replace("minutes", "").trim().split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  const numeric = parseFloat(durStr);
  return isNaN(numeric) ? 600 : Math.round(numeric * 60);
}
