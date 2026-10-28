# AI Tutor IQ — Comprehensive Technical Audit & System Report
**Platform**: AI Tutor IQ — AI-Powered Tutor Performance Analysis and Mentorship Development Platform  
**Audit Date**: October 28, 2026  
**Auditor Role**: Senior Full-Stack Engineer, AI/ML Engineer, Database Architect, and Software Quality Assurance Tester  

---

## 1. Current Architecture

### 1.1 Technology Stack
- **Frontend Core**: React 19 (`19.0.1`), TypeScript (`5.8.2`), Vite (`6.2.3`), Tailwind CSS v4 (`@tailwindcss/vite` `4.1.14`).
- **Icons & Animation**: `lucide-react` (`0.546.0`), `motion` (`12.23.24`).
- **Backend Core**: Express (`4.21.2`), `dotenv` (`17.2.3`), `tsx` (`4.21.0`), `esbuild` (`0.25.0`).
- **ORM & Database**: Prisma ORM (`6.2.1`) configured with PostgreSQL provider (`prisma/schema.prisma`).
- **AI Integrations**: Google Gen AI SDK (`@google/genai` `2.4.0`) interfacing with Gemini models.
- **Server Architecture**: Monolithic unified runtime (`server.ts`) running Express on port 3000, serving Vite in middleware mode during development and static bundle files from `dist/` in production mode.

### 1.2 Repository Structure
```
AI Tutor/
├── assets/                  # AI Studio metadata
├── prisma/
│   ├── schema.prisma        # Database schema (PostgreSQL provider, 7 relational models)
│   └── seed.ts              # Database seeding pipeline
├── server/
│   ├── config/
│   │   └── prisma.ts        # Prisma client singleton
│   ├── controllers/
│   │   ├── course.controller.ts   # Course queries with fallback
│   │   ├── mentor.controller.ts   # Dr. Alistair AI coach handler
│   │   └── tutor.controller.ts    # Tutor retrieval and video evaluation logic
│   ├── middlewares/
│   │   └── error.middleware.ts    # Centralized JSON error handler
│   ├── routes/
│   │   ├── course.routes.ts       # /api/courses
│   │   ├── index.ts               # Central route aggregator (/api)
│   │   ├── mentor.routes.ts       # /api/mentor
│   │   └── tutor.routes.ts        # /api/tutors
│   └── services/
│       ├── evaluation.service.ts  # Video metrics and heuristics engine
│       └── gemini.service.ts      # Google Gen AI SDK integration
├── src/
│   ├── components/
│   │   ├── DashboardViews.tsx     # 4-tab audit console (Overview, Metrics, Body, Transcript)
│   │   ├── FloatingMentor.tsx     # Dr. Alistair conversational AI copilot widget
│   │   ├── Sidebar.tsx            # Left navigation sidebar
│   │   └── UploadModal.tsx        # Video drag-and-drop & simulation modal
│   ├── App.tsx                    # Top-level orchestration and dashboard views
│   ├── data.ts                    # Reference baseline courses and suggestive search maps
│   ├── index.css                  # Tailwind CSS v4 & custom typography
│   ├── main.tsx                   # React DOM entry point
│   └── types.ts                   # Domain models and TypeScript contracts
├── ai_tutor_platform.html         # Legacy static prototype archive
├── index.html                     # HTML5 application shell
├── package.json                   # Dependencies and scripts
├── server.ts                      # Unified Express + Vite server entrypoint
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 2. Working Features

| Feature | Component / Endpoint | Verification Method | Status |
| :--- | :--- | :--- | :--- |
| **Course Listing & Directory** | `App.tsx` (`currentTab === 'courses'`) | Tested via Browser & API | **Working** (Renders cards, categories, statistics) |
| **Predictive Search** | `App.tsx` (`SUGGESTIVE_SEARCHES`) | Tested via Browser | **Working** (Fast prefix-based query auto-complete) |
| **Course Drill-down** | `App.tsx` (`selectedCourseId`) | Tested via Browser | **Working** (Renders department profile and assigned instructors) |
| **Teacher Audit Console** | `DashboardViews.tsx` (Overview) | Tested via Browser | **Working** (Renders 9 metric gauges, validity index, strengths/weaknesses) |
| **Instructional Metrics Breakdown** | `DashboardViews.tsx` (Teaching Metrics) | Tested via Browser | **Working** (8 bar metrics with benchmark ticks) |
| **Kinesics & Body Language** | `DashboardViews.tsx` (Body Language) | Tested via Browser | **Working** (Gaze 10-bin heatmap, gesture frequency histogram) |
| **Annotated Transcript Stream** | `DashboardViews.tsx` (Transcript) | Tested via Browser | **Working** (Displays timestamps, speakers, tags; jumps video player) |
| **Pedagogical Action Plans** | `App.tsx` (`currentTab === 'recommendations'`) | Tested via Browser | **Working** (30/60/90-day roadmaps, micro-skills, training targets) |
| **AI Insights Engine** | `App.tsx` (`currentTab === 'insights'`) | Tested via Browser | **Working** (Cadence, gestural ratio, and phrase triggers correlation data) |
| **Interactive Video Simulation** | `DashboardViews.tsx` | Tested via Browser | **Working** (Play/Pause, scrub slider, gaze overlay, subtitle sync) |
| **AI Mentor Offline Generator** | `/api/mentor` + `FloatingMentor.tsx` | Tested via REST API | **Working** (Robust structured response generator for plans/comparisons) |
| **Static Production Build** | `npm run build` | Tested via CLI | **Working** (Zero compilation or TypeScript errors) |

---

## 3. Incomplete & Disconnected Features

1. **Frontend Disconnected from Backend REST API**:
   - In `src/App.tsx`, `courses` is initialized as `useState<Course[]>(INITIAL_COURSES)`. There is **no `useEffect` fetching `/api/courses`**. Any evaluations stored in the database are never loaded by the frontend on mount.
2. **Video Upload Pipeline Bypasses Backend**:
   - `UploadModal.tsx` contains drag-and-drop and video metadata extraction, but **does not make an HTTP request (`fetch('/api/tutors/evaluate')`)**. It only iterates internal `setTimeout` timers.
   - When the pipeline completes, `onAnalysisComplete()` returns `void`, failing to pass any evaluation data back. `App.tsx` then simply selects the existing tutor, meaning no new evaluation or tutor record is ever created.
3. **Inert Transcript Highlight Filters**:
   - In `DashboardViews.tsx` (Transcript tab), the pills for "💡 Clarity Highlights" and "🎓 Mentorship Highlights" are styled `<span className="cursor-pointer">` with no `onClick` handlers or filtering state.
4. **Missing Sidebar Navigation Items**:
   - `App.tsx` has complete views for `recommendations` ("Pedagogical Dev & Action Plans") and `insights` ("Pedagogical AI Insights Engine"). However, `Sidebar.tsx` only lists `dashboard`, `courses`, `tutors`, `reports`, and `settings`. Users cannot navigate to recommendations or insights directly from the sidebar.
5. **Hardcoded Admin Dashboard Counters**:
   - In `App.tsx` (`currentTab === 'dashboard'`), the mean score (89.2%), upload count (41), and active instructors (9) are hardcoded strings rather than computed from the active courses data.

---

## 4. Critical Bugs

1. **Fatal Server Crash in `GET /api/tutors/:id` When DB is Unreachable**:
   - In `server/controllers/tutor.controller.ts`, `getTutorById` calls `prisma.tutor.findUnique`. Unlike `course.controller.ts`, it lacks fallback handling. When `DATABASE_URL` is missing or offline, it triggers `next(error)` which returns a 500 Internal Server Error: `Environment variable not found: DATABASE_URL`.
2. **Invalid Gemini Model Identifier**:
   - In `server/services/gemini.service.ts` line 60, the model is set to `"gemini-3.5-flash"`. In Google Gen AI SDK (`@google/genai`), `"gemini-3.5-flash"` is not a valid model ID (the valid production Flash model is `"gemini-2.5-flash"`). Any live API call with a valid key would throw a 404/400 API error.
3. **Missing `.env` File**:
   - No `.env` file exists in the repository (only `.env.example`). As a result, `process.env.DATABASE_URL` and `process.env.GEMINI_API_KEY` are undefined, causing Prisma initialization warnings on startup.

---

## 5. Database and API Status

### Database Status
- **Engine**: PostgreSQL via Prisma (`prisma/schema.prisma`).
- **Connection Test**: Port 5432 is not active locally (`TcpTestSucceeded: False`).
- **Resilience**:
  - `course.controller.ts` gracefully falls back to `INITIAL_COURSES`.
  - `tutor.controller.ts` (`createEvaluation`) falls back to `calculateVideoMetrics` simulated output.
  - `tutor.controller.ts` (`getTutorById`) crashes with 500 error on database failure.
- **Data Integrity**: Prisma schema defines 7 relational models with cascade deletes: `Course`, `Tutor`, `TeachingMetrics`, `BodyLanguageMetrics`, `TranscriptItem`, `TutorRecommendations`, `TimelineEvent`.

### API Endpoints Status
| Method | Endpoint | Tested Result | Notes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | **200 OK** | Returns courses with all nested relations; falls back to static seed data if DB offline. |
| `GET` | `/api/tutors/:id` | **500 Error** | Fails with Prisma initialization error when DB is offline. Needs fallback handler. |
| `POST` | `/api/tutors/evaluate` | **200/201 OK** | Generates full AI telemetry profile; returns simulation data when DB offline. |
| `POST` | `/api/mentor` | **200 OK** | Returns Dr. Alistair AI coach responses; falls back to offline keyword synthesis if API key is missing. |

---

## 6. AI Integration & Video Processing Status

1. **Google Gen AI SDK**:
   - Integrated using `@google/genai` in `server/services/gemini.service.ts`.
   - Model parameter must be updated from `gemini-3.5-flash` to `gemini-2.5-flash`.
   - Rich pedagogical prompt sets context on pupil gaze, scaffolding, student engagement, and 90-day action plans.
2. **Video & Telemetry Evaluation Engine**:
   - Implemented in `server/services/evaluation.service.ts`.
   - Produces stable deterministic scoring for 8 teaching metrics (Subject Depth, Clarity, Communication, Engagement, Methodology, Confidence, Mentorship, Feedback).
   - Generates kinesics analytics: 10-bin eye contact timeline, gesture frequency distribution, facial expressions, and posture analysis.
   - Generates annotated timestamped transcripts with sentiment and pedagogical highlight tags.
   - Generates 30/60/90-day improvement roadmaps with projected score improvements.

---

## 7. Security & Performance Issues

1. **Information Disclosure in Error Middleware**:
   - In `server/middlewares/error.middleware.ts`, if `process.env.NODE_ENV === "development"`, raw error stacks and Prisma SQL connection strings are returned in JSON responses.
2. **No Rate Limiting**:
   - `/api/mentor` and `/api/tutors/evaluate` endpoints do not have request rate limiting, leaving them susceptible to abuse if exposed.
3. **No Request Validation**:
   - Payloads in `createEvaluation` are destructured without schema validation or length bounds.
4. **Client Secret Handling**:
   - Audit confirmed that no API keys or database credentials are hardcoded in the frontend or public git history. All credentials properly reference server-side environment variables.

---

## 8. Prioritized Implementation Plan

### Phase 1: Core Bug Fixes & API Resilience (Immediate)
- Fix `getTutorById` in `server/controllers/tutor.controller.ts` with safe fallback to mock/cache data so it never crashes with 500.
- Fix model name in `server/services/gemini.service.ts` from `"gemini-3.5-flash"` to `"gemini-2.5-flash"`.
- Create `.env` from `.env.example` with safe defaults so environment variables load cleanly.
- Ensure unified in-memory persistence in development so created evaluations persist during the active server session even when PostgreSQL is disconnected.

### Phase 2: Full-Stack Frontend-Backend Synchronization (High)
- Wire `src/App.tsx` to fetch `/api/courses` on component mount, with graceful fallback to `INITIAL_COURSES`.
- Wire `UploadModal.tsx` to perform a real `POST /api/tutors/evaluate` request with video metadata and receive the evaluated tutor record.
- Update `App.tsx` `handleAnalysisComplete` to incorporate the new tutor into the courses state, select it, and transition directly to its comprehensive audit report.

### Phase 3: Navigation & Interactive UI Polish (High)
- Add "Pedagogical Plans" and "AI Insights" to `Sidebar.tsx` navigation so users can access all platform sections.
- Wire transcript category filters ("Clarity Highlights", "Mentorship Highlights", "All") in `DashboardViews.tsx` so clicking them dynamically filters the transcript entries.
- Make Admin Dashboard statistics (Mean Score, Total Uploads, Active Instructors) dynamic based on active course data.
- Ensure `FloatingMentor` trigger button has explicit accessibility IDs and reliable viewport positioning.

### Phase 4: Validation & Testing (Final)
- Run full typecheck (`npm run lint`).
- Run production build (`npm run build`).
- Execute end-to-end browser testing to verify the upload flow, report viewing, AI Mentor chat, and navigation.
