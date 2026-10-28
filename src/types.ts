export interface Tutor {
  id: string;
  name: string;
  subject: string;
  experience: string;
  avatarUrl?: string;
  averageScore: number;
  status: "Active" | "Pending Review" | "Underperforming" | "Elite";
  totalEvaluations: number;
  lastEvaluated: string;
  metrics?: TeachingMetrics;
  bodyLanguage?: BodyLanguageMetrics;
  transcript?: TranscriptItem[];
  recommendations?: TutorRecommendations;
  timeline?: TimelineEvent[];
}

export interface Course {
  id: string;
  name: string;
  category: string;
  tutorsCount: number;
  averageScore: number;
  totalEvaluated: number;
  lastUpdated: string;
  description: string;
  tutors: Tutor[];
}

export interface TeachingMetrics {
  subjectKnowledge: number;
  conceptualClarity: number;
  communicationName: number; // For communication general score
  engagement: number;
  teachingMethodology: number;
  confidence: number;
  mentorship: number;
  feedbackQuality: number;
}

export interface BodyLanguageMetrics {
  eyeContactScore: number;
  gestureAnalysis: string; // "Expressive hand movements", etc.
  postureAnalysis: string;
  movementQuality: string;
  facialExpressionScore: number;
  facialAnalysis: string;
  confidenceDetection: number;
  energyLevel: "High" | "Moderate" | "Low";
  eyeContactTimeline: number[]; // heatmaps mockup data
  gestureFrequency: number[];
}

export interface TranscriptItem {
  id: string;
  timestamp: string; // e.g. "00:02"
  seconds: number;   // e.g. 2
  speaker: string;   // e.g. "Tutor" | "Student"
  text: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  tags: string[];    // "Conceptual Clarification", "Student Response", etc.
  highlightType?: "clarity" | "mentorship" | "engagement" | null;
}

export interface TutorRecommendations {
  strengths: string[];
  weaknesses: string[];
  trainingRecommendations: string[];
  suggestedCourses: string[];
  plan30Days: string[];
  plan60Days: string[];
  plan90Days: string[];
  projectedImprovement: number; // Projected score increase (e.g., +12)
}

export interface TimelineEvent {
  time: string; // e.g. "00:02"
  seconds: number;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface EvaluationVideo {
  name: string;
  size: string;
  duration: string;
  resolution: string;
  progress: number;
  stage: "uploaded" | "processing" | "transcribing" | "ai_analysis" | "report_generation" | "complete";
}
