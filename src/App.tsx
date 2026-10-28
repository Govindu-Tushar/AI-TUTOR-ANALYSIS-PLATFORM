import { useState, useMemo } from "react";
import { 
  INITIAL_COURSES, 
  SUGGESTIVE_SEARCHES 
} from "./data";
import { Course, Tutor } from "./types";
import Sidebar from "./components/Sidebar";
import UploadModal from "./components/UploadModal";
import FloatingMentor from "./components/FloatingMentor";
import DashboardViews from "./components/DashboardViews";
import { 
  Layers, 
  Users, 
  TrendingUp, 
  Search, 
  Play, 
  Plus, 
  Activity, 
  ChevronRight, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  Database,
  Bookmark,
  CheckCircle2
} from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("courses");
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  
  // Workflow Navigation State
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [activeReportTutor, setActiveReportTutor] = useState<Tutor | null>(null);
  const [activeReportCourse, setActiveReportCourse] = useState<Course | null>(null);
  
  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [tutorForUpload, setTutorForUpload] = useState<Tutor | null>(null);

  // Search & Suggestion Engine
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Safe object selectors
  const activeCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId, courses]);

  const activeTutor = useMemo(() => {
    if (!activeCourse) return null;
    return activeCourse.tutors.find(t => t.id === selectedTutorId) || null;
  }, [selectedTutorId, activeCourse]);

  // Handle Search Predictions Filtering
  const matchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    
    // Check our predefined key maps
    for (const key in SUGGESTIVE_SEARCHES) {
      if (key.includes(query) || query.includes(key)) {
        return SUGGESTIVE_SEARCHES[key];
      }
    }

    // fallback matching standard topics
    return courses
      .map(c => c.name)
      .filter(name => name.toLowerCase().includes(query));
  }, [searchQuery, courses]);

  // General Filtered Courses Cards
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.category.toLowerCase().includes(query)
    );
  }, [searchQuery, courses]);

  const handleOpenUpload = (tutor: Tutor) => {
    setTutorForUpload(tutor);
    setIsUploadOpen(true);
  };

  // On pipeline completion callback:
  const handleAnalysisComplete = () => {
    setIsUploadOpen(false);
    if (tutorForUpload && activeCourse) {
      // Find and select inside report suite
      setActiveReportTutor(tutorForUpload);
      setActiveReportCourse(activeCourse);
      setCurrentTab("reports");
    }
  };

  return (
    <div id="saas-dashboard-wrapper" className="min-h-screen bg-[#FFFFFF] text-[#111827] flex overflow-x-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          // If toggled, clear drilldowns unless visiting reports
          if (tab !== "reports" && tab !== "settings" && tab !== "insights" && tab !== "recommendations") {
            // Keep active course focus
          }
        }}
        selectedCourseId={selectedCourseId}
        selectedTutorId={selectedTutorId}
      />

      {/* Main Viewport panel */}
      <main id="main-scroll-pane" className="flex-1 min-h-screen overflow-y-auto p-6 lg:p-9 relative bg-[#FFFFFF]">
        {/* Glow ambient background graphics removed for B2B Technical Minimalism */}

        {/****************** COURSES TAB & DRILLDOWN ******************/}
        {currentTab === "courses" && (
          <div id="courses-workflow-viewport" className="space-y-6 text-left">
            {!selectedCourseId ? (
              // STEP 1: Courses Primary grid directory
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#111827] tracking-tight">Courses & Tutor Evaluations</h2>
                  <p className="text-xs text-[#6B7280] mt-1.5">Search courses and evaluate tutor teaching performance using AI.</p>
                </div>

                {/* Big Predictive Search bar layout - Raycast/Notion styled */}
                <div id="courses-search-bar" className="relative max-w-xl">
                  <div className="flex gap-2.5 bg-[#F7F8F9] rounded-lg p-2 border border-[#E2E4E8] shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="flex-1 flex items-center pl-2">
                      <Search className="w-4 h-4 text-[#6B7280] mr-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search courses (e.g. type 'Pyt')..."
                        className="w-full bg-transparent text-xs text-[#111827] placeholder-[#6B7280]/50 focus:outline-none"
                      />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }}
                        className="text-[#6B7280] hover:text-[#111827] px-2 py-1 text-[11px] font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Suggestion predictive pop-up override */}
                  {showSuggestions && matchSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg shadow-lg z-20 overflow-hidden font-mono text-[11px]">
                      <div className="p-2 border-b border-[#E2E4E8] text-[#6B7280] text-[10px] uppercase font-bold tracking-wider bg-[#F7F8F9]">Predictive Matches</div>
                      <div className="max-h-48 overflow-y-auto w-full">
                        {matchSuggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(sug);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#F7F8F9] text-[#5E6AD2] hover:text-[#111827] border-b border-[#E2E4E8]/40 last:border-0 font-sans"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Grid Course Cards */}
                <div id="course-cards-directory" className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {filteredCourses.map((c) => (
                    <div 
                      key={c.id}
                      className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 hover:border-[#5E6AD2]/50 transition-all duration-200 relative group text-left flex flex-col justify-between shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-mono tracking-wider bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] px-2.5 py-1 rounded font-bold">
                            {c.category}
                          </span>
                          <span className="text-[10px] text-[#6B7280] font-mono">Last Evaluated: {c.lastUpdated}</span>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold font-display text-[#111827] group-hover:text-[#5E6AD2] transition">
                            {c.name}
                          </h3>
                          <p className="text-xs text-[#6B7280] mt-2 leading-relaxed min-h-[48px]">
                            {c.description}
                          </p>
                        </div>
                      </div>

                      {/* Score metrics footer inside card */}
                      <div className="mt-6 pt-5 border-t border-[#E2E4E8] grid grid-cols-3 gap-2.5 text-center font-mono text-[11px]">
                        <div>
                          <p className="text-[#6B7280] text-[9px] uppercase font-bold">Active Tutors</p>
                          <p className="text-xs font-bold text-[#111827] mt-1">{c.tutorsCount}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] text-[9px] uppercase font-bold">Mean Score</p>
                          <p className="text-xs font-bold text-[#5E6AD2] mt-1">{c.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] text-[9px] uppercase font-bold">Evals Logged</p>
                          <p className="text-xs font-bold text-slate-700 mt-1">{c.totalEvaluated}</p>
                        </div>
                      </div>

                      {/* Primary trigger */}
                      <div className="mt-5">
                        <button
                          onClick={() => {
                            setSelectedCourseId(c.id);
                            setShowSuggestions(false);
                          }}
                          className="w-full bg-[#FFFFFF] border border-[#E2E4E8] hover:bg-[#F7F8F9] text-[#111827] font-semibold text-xs py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 shadow-[0px_2px_4px_rgba(0,0,0,0.03)]"
                        >
                          <span>Analyze Course Tutors</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // STEP 2: Course Dashboard (drilldown into selected course tutors)
              <div className="space-y-6">
                
                {/* Header breadcrumb routing state */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B7280]">
                    <button 
                      onClick={() => {
                        setSelectedCourseId(null);
                        setSelectedTutorId(null);
                      }}
                      className="hover:text-[#111827] font-semibold"
                    >
                      COURSES
                    </button>
                    <ChevronRight className="w-3 h-3 text-[#6B7280]" />
                    <span className="text-[#5E6AD2] font-semibold uppercase">{activeCourse?.name}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseId(null);
                      setSelectedTutorId(null);
                    }}
                    className="p-2 px-4 bg-[#FFFFFF] border border-[#E2E4E8] hover:bg-[#F7F8F9] text-[#111827]/80 hover:text-[#111827] rounded-lg text-[10px] uppercase font-mono transition shadow-sm"
                  >
                    &larr; Back to Listings
                  </button>
                </div>

                {/* Course parameters analytics widget */}
                {activeCourse && (
                  <div className="bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg p-6 text-left relative overflow-hidden shadow-none">
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] bg-[#5E6AD2]/10 py-1 px-2.5 border border-[#5E6AD2]/20 rounded-md text-[#5E6AD2] font-mono tracking-wider font-semibold">
                        {activeCourse.category}
                      </span>
                    </div>

                    <div className="max-w-2xl">
                      <h2 className="text-xl font-bold font-display text-[#111827]">{activeCourse.name} Profile</h2>
                      <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{activeCourse.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#E2E4E8] text-left font-mono text-[11px]">
                      <div>
                        <span className="text-[#6B7280] block">Assigned Instructors</span>
                        <span className="text-xs font-bold text-[#111827] mt-1 block">{activeCourse.tutors.length} Active</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280] block font-semibold">Classrooms Mean Quality</span>
                        <span className="text-xs font-bold text-emerald-600 mt-1 block">{activeCourse.averageScore}% Index</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280] block">Completed AI Audits</span>
                        <span className="text-xs font-bold text-[#5E6AD2] mt-1 block">{activeCourse.totalEvaluated} Reports</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280] block">Syllabus Status</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block">Standard OK</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tutor Card Lists directories */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono">Assigned Instructors & Reviews</h3>
                    <span className="text-[10px] text-[#6B7280] font-mono">2 Actions Available</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {activeCourse?.tutors.map((tutor) => (
                      <div 
                        key={tutor.id}
                        className="bg-[#FFFFFF] hover:bg-[#F7F8F9]/40 border border-[#E2E4E8] rounded-lg p-5 transition duration-200 flex flex-col md:flex-row items-center justify-between gap-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
                      >
                        {/* Tutor meta card */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <img 
                            src={tutor.avatarUrl} 
                            alt={tutor.name} 
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E2E4E8]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-[#111827]">{tutor.name}</h4>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                                tutor.status === "Elite" 
                                  ? "bg-amber-500/10 text-amber-700 border border-amber-500/20" 
                                  : "bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/20"
                              }`}>{tutor.status}</span>
                            </div>
                            <p className="text-[10px] text-[#6B7280] mt-1 font-mono">{tutor.subject} &bull; {tutor.experience} Prof.</p>
                          </div>
                        </div>

                        {/* Mid score telemetry */}
                        <div className="flex gap-8 px-2 font-mono text-[11px] w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-start">
                          <div>
                            <span className="text-[#6B7280] block">Quality Score</span>
                            <span className="text-xs font-bold text-emerald-600 mt-1 block">{tutor.averageScore}%</span>
                          </div>
                          <div>
                            <span className="text-[#6B7280] block">Video Logs</span>
                            <span className="text-xs font-bold text-[#5E6AD2] mt-1 block">{tutor.totalEvaluations} Audits</span>
                          </div>
                          <div>
                            <span className="text-[#6B7280] block">Last Synced</span>
                            <span className="text-xs font-bold text-[#111827] mt-1 block">{tutor.lastEvaluated}</span>
                          </div>
                        </div>

                        {/* Workflow Actions trigger */}
                        <div className="flex gap-2.5 w-full md:w-auto mt-3 md:mt-0">
                          <button
                            onClick={() => handleOpenUpload(tutor)}
                            className="flex-1 md:flex-initial bg-[#5E6AD2] hover:bg-[#5E6AD2]/90 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Upload Video</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveReportTutor(tutor);
                              setActiveReportCourse(activeCourse);
                              setCurrentTab("reports");
                            }}
                            className="flex-1 md:flex-initial bg-[#FFFFFF] hover:bg-[#F7F8F9] text-[#111827] border border-[#E2E4E8] font-semibold text-xs px-4 py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <span>Open Reports</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/****************** ADMIN DASHBOARD TAB ******************/}
        {currentTab === "dashboard" && (
          <div id="admin-analytics-dashboard" className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold font-display text-[#111827] tracking-tight">OS Admin Command Dashboard</h2>
              <p className="text-xs text-[#6B7280] mt-1">Cross-course evaluations, quality trend index, and auditor metrics.</p>
            </div>

            {/* Micro stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-mono font-bold">Mean Tutor Score</span>
                <div className="text-lg font-bold text-emerald-600 font-mono mt-1 flex items-baseline gap-1">
                  <span>89.2%</span>
                  <span className="text-[10px] text-emerald-650 font-normal">&uarr; 1.4% Target</span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-mono font-bold">Total Video Uploads</span>
                <div className="text-lg font-bold text-[#5E6AD2] font-mono mt-1">
                  <span>41</span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-mono font-bold">Active Instructors</span>
                <div className="text-lg font-bold text-indigo-600 font-mono mt-1">
                  <span>9 Tutors</span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-mono font-bold">System Load</span>
                <div className="text-lg font-bold text-[#111827] font-mono mt-1 flex items-baseline gap-2">
                  <span>Live</span>
                  <span className="text-[9px] bg-[#F7F8F9] text-[#111827] border border-[#E2E4E8] font-bold font-mono px-1.5 py-0.5 rounded">Port 3000</span>
                </div>
              </div>
            </div>

            {/* Comparative analysis panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono">Interactive Performance Trend Matrix</h3>
                
                {/* Custom comparative SVG trend line */}
                <div className="h-44 relative bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg p-4">
                  <div className="absolute top-2 right-4 flex items-center gap-4 text-[9px] font-mono text-[#6B7280]">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#5E6AD2] inline-block"></span>CS Department</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-400 inline-block"></span>Mean Target</span>
                  </div>

                  <div className="w-full h-full pt-6">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 25">
                      <polygon points="0,25 20,25 40,25 80,25 100,25" fill="none" />
                      <path d="M 0 20 Q 20 18 40 10 T 80 5 T 100 2" fill="none" stroke="#5E6AD2" strokeWidth="2.5" />
                      <path d="M 0 15 Q 30 14 60 11 T 100 8" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="1,1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono">Quick Actions</h3>
                
                <div className="space-y-2.5">
                  <button 
                    onClick={() => {
                      setSelectedCourseId("course-1");
                      setCurrentTab("courses");
                    }}
                    className="w-full bg-[#FFFFFF] hover:bg-[#F7F8F9] text-[#111827]/90 border border-[#E2E4E8] text-xs py-3 rounded-lg transition flex items-center justify-between px-4 font-semibold shadow-sm"
                  >
                    <span>Inspect Course: Python Programming</span>
                    <ChevronRight className="w-4 h-4 text-[#5E6AD2]" />
                  </button>

                  <button 
                    onClick={() => {
                      // Defaults to Evelyn Vance's report sample
                      setActiveReportTutor(courses[0].tutors[0]);
                      setActiveReportCourse(courses[0]);
                      setCurrentTab("reports");
                    }}
                    className="w-full bg-[#5E6AD2] hover:bg-[#5E6AD2]/95 text-white text-xs py-3 rounded-lg transition flex items-center justify-between px-4 font-semibold shadow-sm"
                  >
                    <span>Open Dr. Evelyn's AI Live Audit</span>
                    <Sparkles className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/****************** REPORTS DRILLDOWN VIEW TAB ******************/}
        {currentTab === "reports" && (
          <div id="evaluation-reports-workflow" className="space-y-6 text-left animate-fade-in">
            {/* If no tutor report actively targeted, fallback load the baseline profile (Dr. Evelyn Vance) */}
            {(() => {
              const targetTutor = activeReportTutor || courses[0].tutors[0];
              const targetCourse = activeReportCourse || courses[0];
              
              return (
                <div className="space-y-6">
                  {/* Small header selector info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-2.5 border-b border-[#E2E4E8]">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#5E6AD2] font-bold">
                        <span>AI REPORT CONSOLE</span>
                        <span>&bull;</span>
                        <span className="uppercase text-[#6B7280]">{targetCourse.name}</span>
                      </div>
                      <h2 className="text-lg font-bold font-display text-[#111827] mt-1.5 flex items-center gap-2">
                        <span>Teacher-Performance Live Audit: {targetTutor.name}</span>
                        <span className="text-xs bg-emerald-550/10 border border-emerald-500/20 text-emerald-700 font-mono px-2.5 py-0.5 rounded font-medium">
                          Completed report
                        </span>
                      </h2>
                    </div>

                    {/* Clear report focus */}
                    <button
                      onClick={() => {
                        setSelectedCourseId(targetCourse.id);
                        setCurrentTab("courses");
                      }}
                      className="self-start md:self-auto text-xs px-3.5 py-1.5 bg-[#FFFFFF] hover:bg-[#F7F8F9] border border-[#E2E4E8] text-[#111827] rounded-lg transition font-semibold shadow-sm"
                    >
                      &larr; Return to Course Dashboard
                    </button>
                  </div>

                  {/* Complete 4-tab core view layout with external Recommendations portal redirection */}
                  <div className="pt-1 select-none">
                    <DashboardViews 
                      tutor={targetTutor} 
                      course={targetCourse} 
                      onNavigateToRecommendations={() => setCurrentTab("recommendations")}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/****************** OTHER SIDEBAR FALLBACK SCRIPTS ******************/}
        {currentTab === "tutors" && (
          <div id="tutors-directory-dashboard" className="space-y-6 text-left animate-fade-in">
            <div>
              <h2 className="text-xl font-bold font-display text-[#111827]">Full Instructors Directory</h2>
              <p className="text-xs text-[#6B7280] mt-1">Direct oversight of all tutors database parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {courses.flatMap(c => c.tutors.map(t => ({ ...t, courseName: c.name, courseObj: c }))).map((prof, idx) => (
                <div key={idx} className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 space-y-4 text-left flex flex-col justify-between shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                  {/* Card head */}
                  <div className="flex gap-3">
                    <img 
                      src={prof.avatarUrl} 
                      alt={prof.name} 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-lg object-cover shrink-0 border border-[#E2E4E8]"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-[#111827]">{prof.name}</h4>
                      <p className="text-[10px] text-[#5E6AD2] font-mono font-semibold">{prof.subject}</p>
                      <p className="text-[9px] text-[#6B7280] font-mono uppercase mt-1">{prof.courseName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-[#E2E4E8] font-mono text-[10px] text-[#6B7280]">
                    <div className="bg-[#F7F8F9] p-2 border border-[#E2E4E8] rounded">
                      <span>Index Score</span>
                      <span className="font-bold text-sm mt-1 block text-emerald-655">{prof.averageScore}%</span>
                    </div>
                    <div className="bg-[#F7F8F9] p-2 border border-[#E2E4E8] rounded">
                      <span>Audits</span>
                      <span className="font-bold text-sm mt-1 block text-[#5E6AD2]">{prof.totalEvaluations}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseId(prof.courseObj.id);
                      setSelectedTutorId(prof.id);
                      setActiveReportTutor(prof);
                      setActiveReportCourse(prof.courseObj);
                      setCurrentTab("reports");
                    }}
                    className="w-full bg-[#FFFFFF] hover:bg-[#F7F8F9] text-[#111827] border border-[#E2E4E8] font-bold text-xs py-2.5 rounded-lg transition shadow-sm"
                  >
                    Open AI Audit Dashboard
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "recommendations" && (
          (() => {
            const targetTutor = activeReportTutor || (courses && courses[0] && courses[0].tutors ? courses[0].tutors[0] : null);
            const targetCourse = activeReportCourse || (courses && courses[0] ? courses[0] : null);
            
            if (!targetTutor || !targetCourse) {
              return (
                <div className="text-center py-12 text-[#6B7280]">
                  No evaluation reports or tutor records are loaded yet. Please complete a tutor upload first.
                </div>
              );
            }

            return (
              <div id="general-recommendations-hub" className="space-y-6 text-left animate-fade-in pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E4E8]">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#111827]">Pedagogical Dev & Action Plans</h2>
                    <p className="text-xs text-[#6B7280] mt-1">Personalized tutor-specific coaching milestones and 90-day integration blueprints.</p>
                  </div>

                  {/* Dropdown selector for active tutor to see other tutor's plans */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="text-xs font-mono text-[#6B7280] font-semibold hidden sm:block">Select Instructor:</span>
                    <select
                      value={targetTutor.id}
                      onChange={(e) => {
                        const allTutors = courses.flatMap(c => c.tutors.map(t => ({ ...t, courseObj: c })));
                        const matched = allTutors.find(t => t.id === e.target.value);
                        if (matched) {
                          setActiveReportTutor(matched);
                          setActiveReportCourse(matched.courseObj);
                        }
                      }}
                      className="bg-[#FFFFFF] border border-[#E2E4E8] text-[#111827] rounded-lg text-xs py-2 px-3 focus:outline-none focus:border-[#5E6AD2] transition font-sans font-semibold cursor-pointer shadow-sm"
                    >
                      {courses.flatMap(c => c.tutors.map(t => ({ id: t.id, name: t.name, subject: t.subject }))).map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tutor Profile Mini Card */}
                <div className="bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-none">
                  <div className="flex items-center gap-4">
                    <img 
                      src={targetTutor.avatarUrl} 
                      alt={targetTutor.name} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-[#E2E4E8] shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                        {targetCourse.name}
                      </span>
                      <h3 className="text-lg font-bold font-display text-[#111827] mt-1.5">{targetTutor.name}</h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">Subject: <span className="text-[#111827] font-medium">{targetTutor.subject}</span> &bull; Current Score: <strong className="text-emerald-600">{targetTutor.averageScore}%</strong></p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveReportTutor(targetTutor);
                      setActiveReportCourse(targetCourse);
                      setCurrentTab("reports");
                    }}
                    className="bg-[#FFFFFF] hover:bg-[#F7F8F9] text-[#111827] border border-[#E2E4E8] text-xs px-4 py-2.5 rounded-lg transition font-semibold flex items-center gap-1.5 self-start md:self-auto shadow-sm"
                  >
                    <span>View Performance Reports & Chat</span>
                    <ChevronRight className="w-4 h-4 text-[#5E6AD2]" />
                  </button>
                </div>

                {/* 90-day action plan section */}
                {targetTutor.recommendations && (
                  <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 space-y-6 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold font-display text-[#111827]">90-Day Structural Pedagogy Roadmap</h3>
                        <p className="text-xs text-[#6B7280] mt-1 font-sans">Structured professional growth milestones configured against video feedback loops</p>
                      </div>
                      <div className="bg-emerald-50/85 border border-emerald-200/50 text-emerald-800 rounded-lg p-4 text-left self-start md:self-auto shadow-none">
                        <div className="text-[9px] font-mono uppercase tracking-wider leading-none text-emerald-800/80 font-bold">Projected Score Index Improvement</div>
                        <div className="text-lg font-bold font-display mt-2 tracking-tight leading-none text-emerald-700 font-mono">+{targetTutor.recommendations.projectedImprovement} points increase</div>
                      </div>
                    </div>

                    <div id="development-milestones" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* 30 Days block */}
                      <div className="p-5 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] relative shadow-none">
                        <div className="absolute top-4 right-4 text-blue-500/10 font-display font-black text-3xl">30</div>
                        <h4 className="text-xs font-bold font-mono uppercase text-blue-600 tracking-wider mb-4">Milestone: Days 1&ndash;30</h4>
                        <div className="space-y-3">
                          {targetTutor.recommendations.plan30Days.map((item, i) => (
                            <div key={i} className="flex gap-2.5 items-start text-xs text-[#6B7280]">
                              <ChevronRight className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 60 Days block */}
                      <div className="p-5 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] relative shadow-none">
                        <div className="absolute top-4 right-4 text-purple-500/10 font-display font-black text-3xl">60</div>
                        <h4 className="text-xs font-bold font-mono uppercase text-purple-600 tracking-wider mb-4">Milestone: Days 31&ndash;60</h4>
                        <div className="space-y-3">
                          {targetTutor.recommendations.plan60Days.map((item, i) => (
                            <div key={i} className="flex gap-2.5 items-start text-xs text-[#6B7280]">
                              <ChevronRight className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 90 Days block */}
                      <div className="p-5 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] relative shadow-none">
                        <div className="absolute top-4 right-4 text-emerald-500/10 font-display font-black text-3xl">90</div>
                        <h4 className="text-xs font-bold font-mono uppercase text-emerald-700 tracking-wider mb-4">Milestone: Days 61&ndash;90</h4>
                        <div className="space-y-3">
                          {targetTutor.recommendations.plan90Days.map((item, i) => (
                            <div key={i} className="flex gap-2.5 items-start text-xs text-[#6B7280]">
                              <ChevronRight className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guidelines and course recommendations */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {targetTutor.recommendations && (
                    <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)] text-left">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#5E6AD2] font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5E6AD2]" />
                        AI Suggested Mentorship training
                      </h4>
                      <div className="space-y-3.5 pt-1.5">
                        {targetTutor.recommendations.trainingRecommendations.map((rec, i) => (
                          <div key={i} className="flex gap-3 items-start text-xs text-[#6B7280] leading-relaxed">
                            <div className="w-5 h-5 rounded bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono text-[10px] border border-[#5E6AD2]/20">
                              {i + 1}
                            </div>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {targetTutor.recommendations && (
                    <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)] text-left">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#5E6AD2] font-mono flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5 text-[#5E6AD2]" />
                        Recommended development courses
                      </h4>
                      <div className="space-y-3 pt-1.5">
                        {targetTutor.recommendations.suggestedCourses.map((crs, i) => (
                          <div key={i} className="flex gap-3 items-center text-xs text-[#111827] bg-[#F7F8F9] p-2.5 rounded-lg border border-[#E2E4E8] shadow-none">
                            <CheckCircle2 className="w-4 h-4 text-[#5E6AD2] shrink-0" />
                            <span className="truncate">{crs}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Global guidelines bottom panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6AD2] font-mono">Platform Micro-Skills Standards</h3>
                    <div className="space-y-3 pt-1 text-xs text-[#6B7280] leading-relaxed">
                      <div className="p-3.5 bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg">
                        <p className="font-bold text-[#111827]">The 10-Second Wait Standard</p>
                        <p className="mt-1 text-[#6B7280]">When asking coding validation questions, tutors must wait exactly 10 seconds before intercepting or prompting. This lets students construct cognitive pipelines.</p>
                      </div>

                      <div className="p-3.5 bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg">
                        <p className="font-bold text-[#111827] font-sans">Horizontal Lens Alignment</p>
                        <p className="mt-1 text-[#6B7280]">Aligning screen coordinates directly horizontal to the physical camera lens boosts pupil tracking indices by an average of **+14%** and improves engagement.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6AD2] font-mono">Recommended Reference Bibliographies</h3>
                    <div className="space-y-2.5 text-xs text-[#6B7280]">
                      {[
                        "Constructing Collaborative Code Review Laboratories (IEEE EdTech)",
                        "Pedagogy Matrix: High-Cognitive STEM Questioning (Pearson Academic)",
                        "Balancing Competence & Conversational Warmth in Digital Classrooms (Stanford Press)"
                      ].map((crs, idx) => (
                        <div key={idx} className="p-3.5 whitespace-normal bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg text-[#6B7280] leading-relaxed font-sans">
                          &bull; {crs}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {currentTab === "insights" && (
          <div id="ai-insights-workspace" className="space-y-6 text-left animate-fade-in">
            <div>
              <h2 className="text-xl font-bold font-display text-[#111827]">Pedagogical AI Insights Engine</h2>
              <p className="text-xs text-[#6B7280] mt-1">General algorithms correlation findings analyzed by server analytical tasks.</p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg space-y-5 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6AD2] font-mono">Found Correlation Observations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#F7F8F9] p-4 border border-[#E2E4E8] rounded-lg text-left space-y-2 shadow-none">
                  <div className="text-[10px] text-[#6B7280] font-mono font-bold">CADENCE & PACING</div>
                  <div className="text-sm font-bold text-[#111827] font-sans">Word Pitch Stability</div>
                  <p className="text-xs text-[#6B7280] leading-snug">Cadence values between **75-90 words/min** exhibit a direct correlation with **+18% performance retention** during recursive tracking topics.</p>
                </div>
                <div className="bg-[#F7F8F9] p-4 border border-[#E2E4E8] rounded-lg text-left space-y-2 shadow-none">
                  <div className="text-[10px] text-[#6B7280] font-mono font-bold">GESTURAL RATIO</div>
                  <div className="text-sm font-bold text-[#111827] font-sans">93% Dynamic Alignment</div>
                  <p className="text-xs text-[#6B7280] leading-snug">Visibly centering hand motions within the bottom 1/3 quadrant camera coordinates reduces zoom lecture cognitive exhaustion.</p>
                </div>
                <div className="bg-[#F7F8F9] p-4 border border-[#E2E4E8] rounded-lg text-left space-y-2 shadow-none">
                  <div className="text-[10px] text-[#6B7280] font-mono font-bold">TRANSCRIPT INTEGRATION</div>
                  <div className="text-sm font-bold text-[#111827] font-sans">Validation Indexes</div>
                  <p className="text-xs text-[#6B7280] leading-snug">Positive reinforcement phrase triggers (e.g., 'Brilliant!', 'Spot on!') boost active user chat responses by 22%.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === "settings" && (
          <div id="settings-dashboard-panel" className="space-y-6 text-left animate-fade-in">
            <div>
              <h2 className="text-xl font-bold font-display text-[#111827]">System Settings Console</h2>
              <p className="text-xs text-[#6B7280] mt-1">Manage standard parameters and credential linkages.</p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg text-left space-y-5 max-w-xl shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <h3 className="text-sm font-bold text-[#111827] border-b border-[#E2E4E8] pb-2 font-display">Analysis Parameters Configurations</h3>
              
              <div className="space-y-4 text-xs text-[#6B7280] font-sans">
                <div className="flex justify-between items-center bg-[#F7F8F9] p-2.5 border border-[#E2E4E8] rounded-lg">
                  <span>API Telemetry Agent header</span>
                  <span className="font-mono text-[#5E6AD2] font-bold">aistudio-build</span>
                </div>
                
                <div className="flex justify-between items-center bg-[#F7F8F9] p-2.5 border border-[#E2E4E8] rounded-lg">
                  <span>Whisper ASR Sample Rate</span>
                  <span className="font-mono text-[#6B7280]">16,000 Hz</span>
                </div>

                <div className="flex justify-between items-center bg-[#F7F8F9] p-2.5 border border-[#E2E4E8] rounded-lg">
                  <span>Skeletal tracking frame limit</span>
                  <span className="font-mono text-[#6B7280]">30 Frames/Second</span>
                </div>

                <div className="flex justify-between items-center bg-[#F7F8F9] p-2.5 border border-[#E2E4E8] rounded-lg">
                  <span>Durable cloud persistence database ID</span>
                  <span className="font-mono text-emerald-600 font-bold flex items-center gap-1.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                    Port 3000 Ingress OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal pipeline portal */}
        {tutorForUpload && activeCourse && (
          <UploadModal 
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            tutorName={tutorForUpload.name}
            courseName={activeCourse.name}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {/* Floating AI Mentor Chat Widget */}
        <FloatingMentor 
          currentTutor={activeReportTutor || (courses && courses[0] && courses[0].tutors ? courses[0].tutors[0] : null)} 
          currentCourse={activeReportCourse || (courses && courses[0] ? courses[0] : null)} 
        />
      </main>
    </div>
  );
}
