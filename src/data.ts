import { Course, Tutor } from "./types";

export const INITIAL_COURSES: Course[] = [
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
            text: "Brilliant! Spot on, Alex. In a dictionary, keys must be unique and immutable, giving us a very fast lookup time—specifically constant time complexity, or big O of one.",
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
            "Exceptional subject knowledge — top 5% on platform",
            "Highly engaging teaching style with real-world examples",
            "Strong personalized mentorship and student interaction",
            "Clear, structured explanations with logical flow",
            "Effective use of visual aids and board work"
          ],
          weaknesses: [
            "Content pacing too fast in middle sections (min 18–24)",
            "Limited student self-assessment opportunities",
            "Minimal use of digital tools and multimedia"
          ],
          trainingRecommendations: [
            "Add 2–3 comprehension checkpoints per session",
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
            "Review teaching video recordings for pace control—target less than 350 lines coded per hour.",
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

export const SUGGESTIVE_SEARCHES: Record<string, string[]> = {
  "pyt": ["Python Programming", "Advanced Python Algorithms", "Python Data Analytics", "Python for Beginners"],
  "py": ["Python Programming", "Advanced Python Algorithms", "Python Data Analytics", "Python for Beginners"],
  "data": ["Python Data Analytics"],
  "algo": ["Advanced Python Algorithms"],
  "beg": ["Python for Beginners"]
};
