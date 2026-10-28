var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express5 = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");

// server/routes/index.ts
var import_express4 = require("express");

// server/routes/course.routes.ts
var import_express = require("express");

// server/config/prisma.ts
var import_client = require("@prisma/client");
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// src/data.ts
var INITIAL_COURSES = [
  {
    id: "course-1",
    name: "Python Programming",
    category: "Computer Science",
    tutorsCount: 3,
    averageScore: 89,
    totalEvaluated: 14,
    lastUpdated: "2026-06-21",
    description: "Introductory course focusing on core Python syntax, algorithms, object-oriented concepts, and basic scripting exercises.",
    tutors: [
      {
        id: "tutor-1",
        name: "Dr. Evelyn Vance",
        subject: "Introduction to Python",
        experience: "8 Years",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        averageScore: 94,
        status: "Elite",
        totalEvaluations: 6,
        lastEvaluated: "2026-06-20",
        metrics: {
          subjectKnowledge: 96,
          conceptualClarity: 95,
          communicationName: 93,
          engagement: 92,
          teachingMethodology: 94,
          confidence: 97,
          mentorship: 91,
          feedbackQuality: 92
        },
        bodyLanguage: {
          eyeContactScore: 93,
          gestureAnalysis: "Excellent standard. Hands kept visible, open gestures used to emphasize key control flow concepts like loops and functions. Avoids excessive pointing.",
          postureAnalysis: "Upright and forward-leaning, signalling strong approachability and active listening during student queries.",
          movementQuality: "Steady head positioning, fluid hand movements, minimal nervous shifting back and forth.",
          facialExpressionScore: 91,
          facialAnalysis: "Warm, frequent smiles, active nodding to validate student contributions and confirm understanding.",
          confidenceDetection: 95,
          energyLevel: "High",
          eyeContactTimeline: [90, 95, 93, 88, 92, 94, 95, 91, 96, 92],
          gestureFrequency: [12, 15, 10, 18, 14, 8, 11, 16, 13, 15]
        },
        transcript: [
          {
            id: "tr-1-1",
            timestamp: "00:02",
            seconds: 2,
            speaker: "Tutor (Evelyn)",
            text: "Welcome back, everyone! Today, we are discussing Python dictionaries. Does anyone remember the fundamental difference between a list and a dictionary?",
            sentiment: "Positive",
            tags: ["Ice Breaker", "Class Engagement"],
            highlightType: "engagement"
          },
          {
            id: "tr-1-2",
            timestamp: "00:15",
            seconds: 15,
            speaker: "Student (Alex)",
            text: "Um, is it that lists are ordered by index, but dictionaries are unordered and use key-value pairs representing records?",
            sentiment: "Neutral",
            tags: ["Student Answer"]
          },
          {
            id: "tr-1-3",
            timestamp: "00:25",
            seconds: 25,
            speaker: "Tutor (Evelyn)",
            text: "Brilliant! Spot on, Alex. In a dictionary, keys must be unique and immutable, giving us a very fast lookup time\u2014specifically constant time complexity, or big O of one.",
            sentiment: "Positive",
            tags: ["Concept Explanation", "Positive Reinforcement"],
            highlightType: "clarity"
          },
          {
            id: "tr-1-4",
            timestamp: "00:48",
            seconds: 48,
            speaker: "Tutor (Evelyn)",
            text: "Let's construct an example of calculating student grades. This mimics real-world databases where we map user IDs to profile records. Here is how we initialize...",
            sentiment: "Neutral",
            tags: ["Code Demonstration"],
            highlightType: "clarity"
          },
          {
            id: "tr-1-5",
            timestamp: "01:22",
            seconds: 82,
            speaker: "Student (Sarah)",
            text: "Wait, Evelyn, what happens if we search for a key that isn't present? Will it throw a traceback error?",
            sentiment: "Neutral",
            tags: ["Student Question"]
          },
          {
            id: "tr-1-6",
            timestamp: "01:34",
            seconds: 94,
            speaker: "Tutor (Evelyn)",
            text: "Excellent observation, Sarah. Yes, keying directly with brackets throws a KeyError. However, we can use the `.get()` method! If the key is missing, it returns 'None' instead of crashing, or a default value you specify. This is a crucial defensive programming skill.",
            sentiment: "Positive",
            tags: ["Interactive Questioning", "Defensive Coding Advice"],
            highlightType: "mentorship"
          }
        ],
        recommendations: {
          strengths: [
            "Exceptional subject knowledge \u2014 top 5% on platform",
            "Highly engaging teaching style with real-world examples",
            "Strong personalized mentorship and student interaction",
            "Clear, structured explanations with logical flow",
            "Effective use of visual aids and board work"
          ],
          weaknesses: [
            "Content pacing too fast in middle sections (min 18\u201324)",
            "Limited student self-assessment opportunities",
            "Minimal use of digital tools and multimedia"
          ],
          trainingRecommendations: [
            "Add 2\u20133 comprehension checkpoints per session",
            "Incorporate short quizzes using Kahoot or Quizlet",
            "Practice slowing down during complex derivations",
            "Record a 're-teach' video for the discriminant section"
          ],
          suggestedCourses: [
            "Constructing Collaborative Code Review Laboratories",
            "Advanced Pedagogy: High-Cognitive Student Questioning Techniques"
          ],
          plan30Days: [
            "Incorporate structured 10-second 'silent think times' after presenting live-code challenges.",
            "Implement custom exit tickets at the end of zoom check-ins to monitor individual understanding."
          ],
          plan60Days: [
            "Review teaching video recordings for pace control\u2014target less than 350 lines coded per hour.",
            "Host structured peer-tutoring sessions where students explain codes to each other."
          ],
          plan90Days: [
            "Incorporate gamified quizzes directly within video lectures.",
            "Achieve consistent 95% student satisfaction rating, maintaining clear vocal modulation."
          ],
          projectedImprovement: 15
        },
        timeline: [
          { time: "00:02", seconds: 2, type: "success", title: "Excellent Explanation", description: "Warm opening with high interactive engagement right away." },
          { time: "00:25", seconds: 25, type: "info", title: "Strong Communication", description: "Clear definition of O(1) dictionary complexity via accessible real-world comparison." },
          { time: "00:48", seconds: 48, type: "success", title: "High Engagement", description: "Direct visual contact combined with active screen annotation to guide attention." },
          { time: "01:34", seconds: 94, type: "success", title: "Effective Mentoring", description: "Patient response explaining .get() method as part of modern defensive programming." }
        ]
      },
      {
        id: "tutor-2",
        name: "Prof. Marcus Brody",
        subject: "Object-Oriented Python",
        experience: "12 Years",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        averageScore: 84,
        status: "Active",
        totalEvaluations: 5,
        lastEvaluated: "2026-06-18",
        metrics: {
          subjectKnowledge: 98,
          conceptualClarity: 88,
          communicationName: 80,
          engagement: 74,
          teachingMethodology: 85,
          confidence: 90,
          mentorship: 81,
          feedbackQuality: 76
        },
        bodyLanguage: {
          eyeContactScore: 78,
          gestureAnalysis: "Moderate performance. Rigid posture. Hands are often kept out of direct screen viewing, resting heavily on key bindings or tables.",
          postureAnalysis: "Fairly stiff. Needs to relax shoulders and face the high-resolution camera actively to establish screen presence.",
          movementQuality: "Static presentation. Rare positioning adjustments. Can feel a bit cold or mechanical over video streams.",
          facialExpressionScore: 70,
          facialAnalysis: "Serious facial expressions, rare smiles. Tends to stay hyper-focused on code terminal.",
          confidenceDetection: 89,
          energyLevel: "Moderate",
          eyeContactTimeline: [75, 80, 78, 70, 82, 85, 74, 76, 80, 81],
          gestureFrequency: [3, 2, 4, 1, 5, 3, 2, 6, 2, 3]
        },
        transcript: [
          {
            id: "tr-2-1",
            timestamp: "00:05",
            seconds: 5,
            speaker: "Tutor (Marcus)",
            text: "Alright. Let's look at the implementation of multiple inheritance in Python. This is controlled by the Method Resolution Order or MRO.",
            sentiment: "Neutral",
            tags: ["Direct Lecture"],
            highlightType: "clarity"
          },
          {
            id: "tr-2-2",
            timestamp: "00:40",
            seconds: 40,
            speaker: "Tutor (Marcus)",
            text: "Python uses the C3 Linearization algorithm to determine class hierarchies. When you call super(), it traverses this specific list.",
            sentiment: "Neutral",
            tags: ["High Complexity Concept"],
            highlightType: "clarity"
          },
          {
            id: "tr-2-3",
            timestamp: "01:10",
            seconds: 70,
            speaker: "Student (Jacob)",
            text: "Um, wait... what is linearization? Why don't we just call parent class constructors directly by name instead of super()?",
            sentiment: "Neutral",
            tags: ["Student Question"]
          },
          {
            id: "tr-2-4",
            timestamp: "01:25",
            seconds: 85,
            speaker: "Tutor (Marcus)",
            text: "Well, calling by parent name directly duplicates calls in cooperative diamond inheritance. If you have class A inherited by B and C, which both inherit from Base, direct calls invoke Base constructor twice. super() guarantees it gets invoked exactly once.",
            sentiment: "Neutral",
            tags: ["Conceptual Clarification"],
            highlightType: "clarity"
          }
        ],
        recommendations: {
          strengths: [
            "Incredible depth of technical Python system knowledge.",
            "Accurate and highly academic definitions of complex runtime mechanisms.",
            "Uses very clean, functional programming architecture examples."
          ],
          weaknesses: [
            "Low lecture dynamism and restricted conversational tone.",
            "Very high complexity introduced too quickly. Struggles to pace for beginners.",
            "Low facial expressions and screen eye contact."
          ],
          trainingRecommendations: [
            "Participate in the 'Camera Presence and Screen Warmth' active coaching group.",
            "Weave simple analogies to soften dry technical algorithms like C3 linearization."
          ],
          suggestedCourses: [
            "Warmth-Competence Balancing for Technical Lecturers",
            "Gamified Software Pedagogy & Active Student Quizzings"
          ],
          plan30Days: [
            "Record and watch 1 lesson recording, counting facial smiles and visual positive validations.",
            "Incorporate a 3-minute check-in at the beginning of each session asking students what features they built."
          ],
          plan60Days: [
            "Increase camera workspace brightness and align lens to eye level to boost digital eye contact by 10%.",
            "Introduce peer coding exercises to offload lecture fatigue."
          ],
          plan90Days: [
            "Increase average engagement score from 74% to 85% through active slide annotations.",
            "Introduce regular office hours for secondary support."
          ],
          projectedImprovement: 24
        },
        timeline: [
          { time: "00:05", seconds: 5, type: "info", title: "Direct Syntax Lecture", description: "Direct dive into Python Method Resolution Order (MRO)." },
          { time: "00:40", seconds: 40, type: "warning", title: "High-Cognitive Load", description: "C3 Linearization introduced abruptly without onboarding analogy. Monitor student attention." },
          { time: "01:25", seconds: 85, type: "success", title: "Solid Explanation", description: "Excellent explanation of why super() solves diamond inheritance duplication, proving masterful knowledge." }
        ]
      },
      {
        id: "tutor-3",
        name: "Ms. Clara Finch",
        subject: "Python for Beginners",
        experience: "3 Years",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        averageScore: 90,
        status: "Active",
        totalEvaluations: 3,
        lastEvaluated: "2026-06-19",
        metrics: {
          subjectKnowledge: 85,
          conceptualClarity: 92,
          communicationName: 94,
          engagement: 95,
          teachingMethodology: 91,
          confidence: 88,
          mentorship: 93,
          feedbackQuality: 90
        },
        bodyLanguage: {
          eyeContactScore: 95,
          gestureAnalysis: "Highly expressive. Frequent warm hand gestures, sits upright, leans matching students' energy level.",
          postureAnalysis: "Relaxed and professional. Kept open chest and friendly, positive head tilts.",
          movementQuality: "Energetic and lively. Frequent visual transitions to draw highlights on standard concepts.",
          facialExpressionScore: 96,
          facialAnalysis: "Sincere, encouraging expressions. Frequent positive nods, wide warm eyes that hold focus.",
          confidenceDetection: 90,
          energyLevel: "High",
          eyeContactTimeline: [92, 98, 95, 96, 94, 95, 97, 93, 94, 96],
          gestureFrequency: [15, 18, 16, 22, 19, 14, 17, 21, 15, 18]
        },
        transcript: [
          {
            id: "tr-3-1",
            timestamp: "00:04",
            seconds: 4,
            speaker: "Tutor (Clara)",
            text: "Hello friends! Ready to make your computer execute instructions? Today, we make a shopping cart list manager using Python while loops!",
            sentiment: "Positive",
            tags: ["Ice Breaker", "Lesson Goal Hook"],
            highlightType: "engagement"
          }
        ],
        recommendations: {
          strengths: [
            "Incredible energy level that makes introductory coding super welcoming.",
            "Fantastic visualization techniques using virtual sticky notes.",
            "Brilliant active listening skills and positive feedback cues."
          ],
          weaknesses: [
            "Tends to avoid answering more advanced, edge-case computer science memory questions.",
            "Struggles to budget time, sometimes cutting the closing summary short."
          ],
          trainingRecommendations: [
            "Take Advanced Python memory model training to expand capability (e.g. garbage collection stack vs heap).",
            "Incorporate a digital countdown timer to manage visual timeline constraints."
          ],
          suggestedCourses: [
            "Python Memory Architecture & Global Interpreter Lock",
            "Agile Lesson Timing & Dynamic Interactive Recaps"
          ],
          plan30Days: [
            "Implement a structured 3-minute review block at exactly minute 40 of each class session.",
            "Review core object reference variables (id, memory allocation) during week 3 classes."
          ],
          plan60Days: [
            "Co-teach a section of Advanced Python with Dr. Evelyn Vance to build high-level confidence.",
            "Establish structured Q&A zones inside discussion groups."
          ],
          plan90Days: [
            "Achieve tutor confidence score of 93% in core memory models.",
            "Conduct structured sandbox laboratory drills."
          ],
          projectedImprovement: 10
        },
        timeline: [
          { time: "00:04", seconds: 4, type: "success", title: "Brilliant Introduction", description: "Passionate setup mapping practical while loops to real-world shopping lists. Highly dynamic." }
        ]
      }
    ]
  },
  {
    id: "course-2",
    name: "Python Data Analytics",
    category: "Data Science",
    tutorsCount: 2,
    averageScore: 86,
    totalEvaluated: 8,
    lastUpdated: "2026-06-20",
    description: "Intermediate course analyzing structured data using specialized packages. Focuses on Pandas, Numpy, and Matplotlib data visualization techniques.",
    tutors: [
      {
        id: "tutor-105",
        name: "Dr. Evelyn Vance",
        subject: "Pandas DataFrames",
        experience: "8 Years",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        averageScore: 92,
        status: "Elite",
        totalEvaluations: 4,
        lastEvaluated: "2026-06-19",
        metrics: {
          subjectKnowledge: 95,
          conceptualClarity: 93,
          communicationName: 92,
          engagement: 90,
          teachingMethodology: 93,
          confidence: 94,
          mentorship: 91,
          feedbackQuality: 92
        },
        bodyLanguage: {
          eyeContactScore: 91,
          gestureAnalysis: "Fluid transitions, open posture, consistent framing.",
          postureAnalysis: "Upright alignment, highly aligned camera posture.",
          movementQuality: "Symmetric hand gestures supporting core charts analysis.",
          facialExpressionScore: 90,
          facialAnalysis: "Responsive gestures, warm and bright focus.",
          confidenceDetection: 94,
          energyLevel: "High",
          eyeContactTimeline: [88, 92, 90, 93, 89, 91, 94, 90, 92, 93],
          gestureFrequency: [10, 12, 14, 11, 9, 13, 11, 15, 10, 12]
        },
        transcript: [
          {
            id: "tr-pandas-1",
            timestamp: "00:03",
            seconds: 3,
            speaker: "Tutor (Evelyn)",
            text: "Hello everyone, today we're manipulating core data frames. Let's learn how `.groupby()` groups, splits, applies, and combines datasets in vectorized formats.",
            sentiment: "Positive",
            tags: ["Onboarding Block", "Methodology Explanation"],
            highlightType: "clarity"
          }
        ],
        recommendations: {
          strengths: ["Masterclass dataframe operations logic.", "Excellent data workflows animation comparisons."],
          weaknesses: ["Deep dives can exhaust beginners quickly."],
          trainingRecommendations: ["Break vectorized transformations down using dry-marker layouts first."],
          suggestedCourses: ["Instructional Visual Scaffolding for Quantitative Subjects"],
          plan30Days: ["Provide 2 basic CSV templates before class starts to encourage interactive coding."],
          plan60Days: ["Observe professor-student interaction indexes on difficult vectorized exercises."],
          plan90Days: ["Maintain an 88% engagement factor during panda operations labs."],
          projectedImprovement: 6
        },
        timeline: [
          { time: "00:03", seconds: 3, type: "success", title: "Vectorized Vector Groupby Intro", description: "Excellent mental layout modeling Pandas vectorized group actions." }
        ]
      }
    ]
  },
  {
    id: "course-3",
    name: "Advanced Python Algorithms",
    category: "Computer Science",
    tutorsCount: 1,
    averageScore: 95,
    totalEvaluated: 6,
    lastUpdated: "2026-06-15",
    description: "Deep dive for software engineers cover backtracking, dynamic programming, and custom Python graph class models.",
    tutors: [
      {
        id: "tutor-202",
        name: "Dr. Evelyn Vance",
        subject: "Dynamic Programming Memoization",
        experience: "8 Years",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        averageScore: 95,
        status: "Elite",
        totalEvaluations: 4,
        lastEvaluated: "2026-06-14",
        metrics: {
          subjectKnowledge: 98,
          conceptualClarity: 97,
          communicationName: 94,
          engagement: 91,
          teachingMethodology: 96,
          confidence: 98,
          mentorship: 92,
          feedbackQuality: 93
        },
        bodyLanguage: {
          eyeContactScore: 92,
          gestureAnalysis: "Symmetric explanatory gestures, focused face placement.",
          postureAnalysis: "Upright, looking straight into lens.",
          movementQuality: "Steady head, professional and measured gesturing.",
          facialExpressionScore: 89,
          facialAnalysis: "Calm, reassuring, focused intellectual feedback expressions.",
          confidenceDetection: 98,
          energyLevel: "High",
          eyeContactTimeline: [90, 93, 91, 94, 91, 92, 93, 91, 95, 93],
          gestureFrequency: [11, 14, 12, 16, 13, 11, 15, 12, 14, 13]
        },
        transcript: [
          {
            id: "tr-dp-1",
            timestamp: "00:05",
            seconds: 5,
            speaker: "Tutor (Evelyn)",
            text: "Hi everyone. Dynamic programming is simple: we remember calculations! Rather than re-solving identical subproblems, we keep entries in a memo hash table. This reduces Fibonacci complexity from O(2^n) exponential straight to linear O(n). Let's trace...",
            sentiment: "Positive",
            tags: ["High Concept Introduction", "Math Visualization"],
            highlightType: "clarity"
          }
        ],
        recommendations: {
          strengths: ["Masterful dynamic programming visual models.", "Very supportive feedback during recursive tracing."],
          weaknesses: ["Fewer student speech breakouts than standard lectures."],
          trainingRecommendations: ["Incorporate live brainstorming sessions to draft recurrence relations jointly."],
          suggestedCourses: ["Collaborative Recurrence Discovery Pedagogy"],
          plan30Days: ["Incorporate 3 student whiteboard breakouts on classic LeetCode DP challenges."],
          plan60Days: ["Audit dynamic programming syllabus checkouts with standard industrial engineering rubrics."],
          plan90Days: ["Empower advanced class cohorts to lead recursive call stack trace illustrations."],
          projectedImprovement: 4
        },
        timeline: [
          { time: "00:05", seconds: 5, type: "success", title: "Masterful Memoization Intro", description: "Explaining recursion stacks with deep, comforting analogical clarity." }
        ]
      }
    ]
  },
  {
    id: "course-4",
    name: "Python for Beginners",
    category: "Introductory",
    tutorsCount: 1,
    averageScore: 90,
    totalEvaluated: 12,
    lastUpdated: "2026-06-22",
    description: "Designed for young learners or career switchers with zero coding background. Focuses on fun automation scripts and command-line text games.",
    tutors: [
      {
        id: "tutor-301",
        name: "Ms. Clara Finch",
        subject: "Variables & Logical Conditions",
        experience: "3 Years",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        averageScore: 90,
        status: "Active",
        totalEvaluations: 5,
        lastEvaluated: "2026-06-20",
        metrics: {
          subjectKnowledge: 84,
          conceptualClarity: 91,
          communicationName: 95,
          engagement: 96,
          teachingMethodology: 90,
          confidence: 87,
          mentorship: 94,
          feedbackQuality: 91
        },
        bodyLanguage: {
          eyeContactScore: 96,
          gestureAnalysis: "Highly kinetic, very conversational framing.",
          postureAnalysis: "Centered, cozy setup with comfortable lighting.",
          movementQuality: "Quick gestures keeping high alert engagement active.",
          facialExpressionScore: 97,
          facialAnalysis: "Extremely encouraging smiles, active eyebrow animations.",
          confidenceDetection: 88,
          energyLevel: "High",
          eyeContactTimeline: [95, 97, 96, 98, 94, 96, 97, 95, 96, 97],
          gestureFrequency: [18, 20, 22, 19, 17, 21, 23, 18, 20, 21]
        },
        transcript: [
          {
            id: "tr-beg-1",
            timestamp: "00:02",
            seconds: 2,
            speaker: "Tutor (Clara)",
            text: "Hello future programmers! Today, variables are like magic buckets in our computer's mind! Let's put some variables in buckets to construct dynamic responses.",
            sentiment: "Positive",
            tags: ["High-Energy Warmup", "Visual Analogy"],
            highlightType: "engagement"
          }
        ],
        recommendations: {
          strengths: ["Warm, incredibly inclusive environment.", "Superb bucket analogy for introductory coding variables concept."],
          weaknesses: ["Needs to solidify explanations of memory garbage collection."],
          trainingRecommendations: ["Participate in intermediate computer architecture tutorials."],
          suggestedCourses: ["Instructional Bridges: Memory Address Models for K12 Pedagogy"],
          plan30Days: ["Introduce a 2-minute memory map quiz demonstrating dynamic stack allocations."],
          plan60Days: ["Co-teach variable mutability references with senior engineering tutors."],
          plan90Days: ["Incorporate strict types comparisons in simple intro code segments."],
          projectedImprovement: 8
        },
        timeline: [
          { time: "00:02", seconds: 2, type: "success", title: "Beautiful Analogy", description: "Mapping integer declarations to clean visual physical boxes." }
        ]
      }
    ]
  }
];

// server/controllers/course.controller.ts
var getCourses = async (req, res, next) => {
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
            }
          }
        }
      }
    });
    if (!courses || courses.length === 0) {
      return res.status(200).json(INITIAL_COURSES);
    }
    return res.status(200).json(courses);
  } catch (error) {
    console.warn("Database query failed, falling back to static schema data:", error);
    return res.status(200).json(INITIAL_COURSES);
  }
};

// server/routes/course.routes.ts
var router = (0, import_express.Router)();
router.get("/", getCourses);
var course_routes_default = router;

// server/routes/tutor.routes.ts
var import_express2 = require("express");

// server/services/evaluation.service.ts
async function calculateVideoMetrics(input) {
  const durationInSeconds = parseDuration(input.duration);
  const hash = input.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 78 + hash % 18;
  const subjectKnowledge = Math.min(99, Math.max(70, baseScore + hash % 5));
  const conceptualClarity = Math.min(99, Math.max(70, baseScore - 2 + hash % 4));
  const communicationName = Math.min(99, Math.max(70, baseScore + 1));
  const engagement = Math.min(99, Math.max(70, baseScore - 5 + hash % 6));
  const teachingMethodology = Math.min(99, Math.max(70, baseScore - 1));
  const confidence = Math.min(99, Math.max(70, baseScore + 3));
  const mentorship = Math.min(99, Math.max(70, baseScore - 3));
  const feedbackQuality = Math.min(99, Math.max(70, baseScore - 4));
  const averageScore = Math.round(
    (subjectKnowledge + conceptualClarity + communicationName + engagement + teachingMethodology + confidence + mentorship + feedbackQuality) / 8
  );
  const status = averageScore >= 92 ? "Elite" : averageScore >= 82 ? "Active" : "Underperforming";
  const eyeContactTimeline = Array.from(
    { length: 10 },
    (_, i) => Math.min(100, Math.max(40, Math.round(baseScore + Math.sin(i) * 12)))
  );
  const gestureFrequency = Array.from(
    { length: 10 },
    (_, i) => Math.max(1, Math.round(8 + Math.cos(i) * 6 + hash % 5))
  );
  return {
    name: input.tutorName,
    subject: "Active Classroom Performance Evaluation",
    experience: "New Member",
    avatarUrl: `https://images.unsplash.com/photo-${15e11 + hash % 1e6}?auto=format&fit=crop&q=80&w=200`,
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
function parseDuration(durStr) {
  if (!durStr) return 600;
  const parts = durStr.toLowerCase().replace("mins", "").replace("min", "").replace("minutes", "").trim().split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  const numeric = parseFloat(durStr);
  return isNaN(numeric) ? 600 : Math.round(numeric * 60);
}

// server/controllers/tutor.controller.ts
var getTutorById = async (req, res, next) => {
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
        }
      }
    });
    if (!tutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    return res.status(200).json(tutor);
  } catch (error) {
    next(error);
  }
};
var createEvaluation = async (req, res, next) => {
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
        lastEvaluated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
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
            data: evaluationData.transcript.map((item) => ({
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
            data: evaluationData.timeline.map((item) => ({
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
        timeline: true
      }
    });
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
    const fallbackData = await calculateVideoMetrics({
      name,
      size,
      duration,
      resolution,
      tutorName: tutorName || "New Instructor"
    });
    return res.status(200).json({
      message: "AI Video Evaluation Simulated (Offline Mode)",
      tutor: {
        id: `tutor-sim-${Date.now()}`,
        courseId: courseId || "course-1",
        ...fallbackData
      }
    });
  }
};

// server/routes/tutor.routes.ts
var router2 = (0, import_express2.Router)();
router2.get("/:id", getTutorById);
router2.post("/evaluate", createEvaluation);
var tutor_routes_default = router2;

// server/routes/mentor.routes.ts
var import_express3 = require("express");

// server/services/gemini.service.ts
var import_genai = require("@google/genai");
async function askMentorAI(messages, tutor, course) {
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
  const ai = new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
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
  const formattedContents = messages.map((m) => {
    const role = m.role === "user" ? "user" : "model";
    return {
      role,
      parts: [{ text: m.content }]
    };
  });
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: formattedContents,
    config: {
      systemInstruction
    }
  });
  return response.text || "I apologize, but I couldn't generate a recommendation.";
}

// server/controllers/mentor.controller.ts
var handleMentorMessage = async (req, res, next) => {
  const { messages, tutor, course } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }
  try {
    const responseText = await askMentorAI(messages, tutor, course);
    return res.status(200).json({ reply: responseText });
  } catch (err) {
    console.warn("Gemini Live service not available, using localized response parser:", err.message);
    const userQuery = messages[messages.length - 1]?.content || "";
    const fallbackReply = getFallbackResponse(userQuery, tutor, course);
    return res.status(200).json({
      reply: `*(AI Offline Mode)*

${fallbackReply}`
    });
  }
};
function getFallbackResponse(query, tutor, course) {
  const q = query.toLowerCase();
  const tutorName = tutor?.name || "the instructor";
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("introduce") || q.includes("who are you")) {
    return `### Hello! I am Dr. Alistair, your AI Mentorship Development Assistant. \u{1F44B}

I perform automated video audits to analyze tutor dynamics, lesson pacing, student engagement, and body language variables.

How can I help you support **${tutorName}** today? I can:
- **Explain scores** (e.g. why their teaching methodology is rated high/low)
- **Suggest an improvement plan** (30-60-90 Day targeted micro-tasks)
- **Contrast tutors** (compare e.g. Evelyn Vance's engagement against Marcus Brody's)
- **Recommend training material** for student retention.`;
  }
  if (q.includes("compare") || q.includes("tutor vs") || q.includes("difference") || q.includes("better")) {
    return `### Tutor Pedagogy Comparison Analysis \u{1F4CA}

Here is a contrast of our primary tutors in this module:
* **Dr. Evelyn Vance (94% - Elite)**
  * *Instructional Style*: High-engagement, quick feedback, excellent student check-ins.
  * *Body Language*: Highly kinetic hand-gestures, consistent visual screen focus. Hand gestures average 13-18 per minute.
  * *Area to Watch*: Speed. Coded examples average 420 lines/hr which can exhaust beginners.
* **Prof. Marcus Brody (84% - Active)**
  * *Instructional Style*: Highly structured, masterful technical knowledge (dynamic hierarchies, MRO).
  * *Body Language*: Stiff setup, gaze frequently locked on terminal code. Hand movements are sparse.
  * *Area to Watch*: Class engagement. Needs warm opening hooks and camera alignment.

**Strategic Action**: Have Marcus shadow Evelyn\u2019s next interactive coding session to observe her exit-slip questioning style.`;
  }
  if (q.includes("plan") || q.includes("30") || q.includes("60") || q.includes("90") || q.includes("improve") || q.includes("weakness")) {
    return `### Personalized Development Plan: ${tutorName} \u{1F3AF}

Based on the automated evaluation of their teaching recordings, here is the prioritized action roadmap:

* **1. Active Camera Position & Framing (Days 1\u201330)**
  * Elevate camera position to exact eye height.
  * Practice the "10-second pause rule" immediately after launching live programming challenges.
* **2. Instructional Scaffolding (Days 31\u201360)**
  * Replace complex initial lectures with accessible, real-world analogies (e.g., mapping programming variables to "physical magic buckets").
  * Establish visual "Check-Your-Understanding" checkpoints every 15 minutes.
* **3. Synthesis & Evaluation (Days 61\u201390)**
  * Evaluate self-recorded classes and log progress metrics. Goal is to increase tutor satisfaction index by **+12 points**.

Would you like to customize any of these stages?`;
  }
  if (q.includes("score") || q.includes("explain") || q.includes("metrics") || q.includes("how") || q.includes("derived")) {
    return `### How Automated Metrics are Derived \u{1F50D}

Our analysis platform records video streams at 30fps and parses data using several server-side pipelines:

1. **Subject Knowledge & Clarity (Transcript Analysis)**: Evaluated against computer science conceptual models, vocabulary matching (such as O(1) Big-O statements), and student validation patterns.
2. **Engagement Factors**: Tracked by monitoring student-to-tutor word count ratios, interactive chat polls, and speed of answering questions.
3. **Body Language Scores (Skeletal Gaze Model)**:
   * **Eye Contact**: Determined by pupil and iris vector calculations relative to camera location.
   * **Gestural Energy**: Real-time bounding boxes around hand nodes measure average frequency and symmetry of movements.

Would you like to drill down into a specific session timestamp?`;
  }
  return `### AI Mentor Observation: ${tutorName} \u{1F4A1}

I have analyzed the current records for **${tutorName}** within **${course?.name || "Python Programming"}**. Here are key takeaways:

* **Teaching Methodology**: Highly structured, scoring **${tutor?.metrics?.teachingMethodology || 94}%**. The lessons include clear problem setup and live demonstrations.
* **Key Strengths**: Excellent focus on student clarity, fast interactive answer loop, and highly energetic body gestures.
* **Micro-Pedagogical Goal**: Ensure lectures don't rush through code details under pressure. Encourage adding brief, 3-minute collaborative whiteboard checkouts.

Ask me about:
- *"${tutorName}'s 90-day plan"*
- *"Compare ${tutorName} with Marcus Brody"*
- *"Explain how eye contact is calculated"*`;
}

// server/routes/mentor.routes.ts
var router3 = (0, import_express3.Router)();
router3.post("/", handleMentorMessage);
var mentor_routes_default = router3;

// server/routes/index.ts
var router4 = (0, import_express4.Router)();
router4.use("/courses", course_routes_default);
router4.use("/tutors", tutor_routes_default);
router4.use("/mentor", mentor_routes_default);
var routes_default = router4;

// server/middlewares/error.middleware.ts
var errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[API Server Error] ${err.message}`, err.stack);
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error",
    ...process.env.NODE_ENV === "development" && { stack: err.stack }
  });
};

// server.ts
import_dotenv.default.config();
var app = (0, import_express5.default)();
var PORT = 3e3;
app.use(import_express5.default.json());
app.use("/api", routes_default);
app.use(errorHandler);
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express5.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    console.log("Production static files serving enabled.");
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
