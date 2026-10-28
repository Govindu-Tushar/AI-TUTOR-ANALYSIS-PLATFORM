import React, { useState, useEffect, useRef } from "react";
import { 
  Tutor, 
  Course, 
  TranscriptItem, 
  TimelineEvent 
} from "../types";
import { 
  Video, 
  Play, 
  Pause, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  ChevronRight, 
  Search, 
  Sparkles,
  Smile,
  Volume2,
  Calendar,
  AlertTriangle,
  FileText
} from "lucide-react";

interface DashboardViewsProps {
  tutor: Tutor;
  course: Course;
  onNavigateToRecommendations?: () => void;
}

export default function DashboardViews({ tutor, course, onNavigateToRecommendations }: DashboardViewsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "body" | "transcript">("overview");
  
  // Interactive Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const totalDurationSec = 100; // Let's say video is 1:40 (100s) for simple mapping
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Transcript research query
  const [transcriptQuery, setTranscriptQuery] = useState("");

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Jump player to exact second on clicking transcript or event
  const handleJumpToTime = (seconds: number) => {
    setCurrentTimeSec(seconds);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Select primary active timeline items based on current player position
  const activeTimelineEvent = tutor.timeline?.find(
    (e) => currentTimeSec >= e.seconds && currentTimeSec < e.seconds + 12
  );

  return (
    <div id="ai-dashboard-root" className="space-y-6 select-none font-sans">
      
      {/* Tab Selector - Technical Minimalist UI */}
      <div id="dashboard-tab-bar" className="flex items-center justify-between p-1.5 bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg">
        <div className="flex flex-wrap gap-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "metrics", label: "Teaching Metrics" },
            { id: "body", label: "Body Language" },
            { id: "transcript", label: "Transcript" }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#FFFFFF] border border-[#E2E4E8] text-[#5E6AD2] shadow-sm font-bold"
                  : "text-[#6B7280] hover:text-[#111827] border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sync telemetry header */}
        <div className="hidden md:flex items-center gap-3 pr-3 text-[10px] font-mono text-[#6B7280] font-semibold">
          <span>Active Session ID: <strong className="text-[#111827]">SES-841A</strong></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] inline-block"></span>
        </div>
      </div>

      {/****************** OVERVIEW TAB ******************/}
      {activeTab === "overview" && (
        <div id="overview-tab-view" className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1 (Left 4 cols): Video Player & Timeline */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Interactive Video Player */}
            <div id="video-workspace-card" className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg overflow-hidden p-4 relative group shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 p-3 flex gap-2 z-10">
                <span className="bg-red-50 border border-red-100 text-red-600 text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  EVAL RECORDING
                </span>
                <span className="bg-[#F7F8F9] border border-[#E2E4E8] text-[#6B7280] text-[9px] font-mono py-0.5 px-2 rounded">
                  1080P
                </span>
              </div>

              {/* Video Monitor Frame */}
              <div className="aspect-video bg-[#F7F8F9] rounded border border-[#E2E4E8] overflow-hidden relative flex items-center justify-center">
                {/* Simulated webcam screen */}
                <div className="absolute inset-0 bg-cover bg-center opacity-70 filter brightness-95 saturate-75" style={{ backgroundImage: `url('${tutor.avatarUrl}')` }} />
                
                {/* Active vector grids line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#5E6AD2]/10 scale-y-50"></div>
                <div className="absolute inset-y-0 left-1/2 w-px bg-[#5E6AD2]/10 scale-x-50"></div>
                
                {/* Animated pupils tracking graphic override when active */}
                {isPlaying && (
                  <div className="absolute top-1/4 left-1/3 w-10 h-10 border border-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[7px] text-emerald-600 font-mono absolute -top-4 font-bold">GAZE_LOCKED</span>
                  </div>
                )}

                {/* Simulated audio waveforms footer */}
                <div className="absolute bottom-3 inset-x-6 h-6 flex items-end justify-center gap-[3px] opacity-80 pointer-events-none">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const activeHeight = isPlaying ? Math.random() * 20 + 4 : 2;
                    return (
                      <div 
                        key={i} 
                        className="w-[3px] bg-[#5E6AD2] rounded-full transition-all duration-300"
                        style={{ height: `${activeHeight}px` }}
                      />
                    );
                  })}
                </div>

                {/* Subtitles sync overlay */}
                {isPlaying && (
                  <div className="absolute bottom-11 inset-x-4 bg-[#FFFFFF]/95 border border-[#E2E4E8] p-2.5 rounded text-center text-[10px] text-[#111827] italic shadow-sm font-sans font-medium">
                    {tutor.transcript?.find((it) => currentTimeSec >= it.seconds && currentTimeSec < it.seconds + 12)?.text || "Classroom lecture under review..."}
                  </div>
                )}

                {/* Big play button overlap if paused */}
                {!isPlaying && (
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-14 h-14 rounded-full bg-[#5E6AD2] text-white flex items-center justify-center shadow-md relative z-10 hover:scale-105 transition"
                  >
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </button>
                )}
              </div>

              {/* Video control deck */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B7280]">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-[#FFFFFF] hover:bg-[#F7F8F9] p-1.5 px-3 rounded-lg border border-[#E2E4E8] transition flex items-center gap-1 text-[10px] font-bold text-[#111827] shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#5E6AD2]" /> : <Play className="w-3.5 h-3.5 text-[#5E6AD2]" />}
                    <span>{isPlaying ? "PAUSE" : "PLAY RUN"}</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>{formatTime(currentTimeSec)}</span>
                    <span className="text-[#E2E4E8]">/</span>
                    <span>{formatTime(totalDurationSec)}</span>
                  </div>
                </div>

                {/* Slider bar */}
                <div className="relative h-1 bg-[#E2E4E8] rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="h-full bg-[#5E6AD2] rounded-full transition-all"
                    style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI Session Highlights Timeline */}
            <div id="ai-recording-timeline" className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-[#6B7280] font-mono tracking-wider">AI Live Timeline Events</h4>
                <span className="text-[10px] bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] font-mono px-2 py-0.5 rounded font-bold">
                  {tutor.timeline?.length || 0} Triggers
                </span>
              </div>

              <div className="space-y-3">
                {tutor.timeline?.map((evt, index) => {
                  const isMatch = Math.abs(currentTimeSec - evt.seconds) < 12;
                  return (
                    <button
                      key={index}
                      onClick={() => handleJumpToTime(evt.seconds)}
                      className={`w-full text-left p-3 rounded border text-xs transition duration-200 flex gap-3 ${
                        isMatch
                          ? "bg-indigo-50/50 border-[#5E6AD2] text-[#111827]"
                          : "bg-[#F7F8F9] border-[#E2E4E8] hover:border-slate-300 text-[#111827]"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded font-mono text-[9px] flex items-center justify-center shrink-0 font-bold ${
                        isMatch ? "bg-[#5E6AD2] text-white" : "bg-[#FFFFFF] border border-[#E2E4E8] text-[#6B7280]"
                      }`}>
                        {evt.time}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className={`font-semibold font-sans ${isMatch ? "text-[#5E6AD2]" : "text-[#111827]"}`}>{evt.title}</p>
                        <p className="text-[10px] text-[#6B7280] leading-snug">{evt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 2 (Center 5 cols): Performance Core Metrics Cards */}
          <div className="xl:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Teaching Core Metrics</h3>
                  <p className="text-[10px] text-[#6B7280] mt-1">SaaS automated micro-pedagogy scores (0-100)</p>
                </div>
                <span className="text-[10px] bg-[#F7F8F9] px-2.5 py-1 rounded border border-[#E2E4E8] text-[#6B7280] font-mono font-semibold">
                  Calibrated Today
                </span>
              </div>

              {/* Grid bento of indicators */}
              {tutor.metrics && (
                <div id="performance-metrics-cards" className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Subject Depth", value: tutor.metrics.subjectKnowledge },
                    { label: "Concept Clarity", value: tutor.metrics.conceptualClarity },
                    { label: "Vocal Delivery", value: tutor.metrics.communicationName },
                    { label: "Engagement", value: tutor.metrics.engagement },
                    { label: "Methodology", value: tutor.metrics.teachingMethodology },
                    { label: "Confidence", value: tutor.metrics.confidence },
                    { label: "Body Gaze", value: tutor.bodyLanguage?.eyeContactScore || 90 },
                    { label: "Mentorship", value: tutor.metrics.mentorship },
                    { label: "Feedback Loop", value: tutor.metrics.feedbackQuality }
                  ].map((met, i) => (
                    <div 
                      key={i} 
                      className="bg-[#F7F8F9] border border-[#E2E4E8] p-3.5 rounded-lg flex flex-col items-center justify-between transition-all duration-200 hover:border-[#5E6AD2]/55 shadow-none"
                    >
                      {/* Circle Gauge SVG */}
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-14 h-14 -rotate-90">
                          <circle cx="28" cy="28" r="24" className="stroke-[#E2E4E8] fill-none" strokeWidth="3" />
                          <circle 
                            cx="28" 
                            cy="28" 
                            r="24" 
                            className="stroke-[#5E6AD2] fill-none transition-all duration-1000" 
                            strokeWidth="3.5" 
                            strokeDasharray={`${24 * 2 * Math.PI}`}
                            strokeDashoffset={`${24 * 2 * Math.PI * (1 - met.value / 100)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute font-mono text-[11px] font-bold text-[#111827]">{met.value}%</span>
                      </div>
                      
                      <span className="text-[10px] text-[#6B7280] font-semibold mt-3 text-center truncate w-full">{met.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Interactive SVG charts below bento */}
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono mb-4">Acoustic & Attention Resonance Profile</h4>
              
              <div className="space-y-4">
                <div className="p-3 bg-[#F7F8F9] rounded-lg border border-[#E2E4E8]">
                  <div className="flex justify-between items-center text-[10px] mb-2 font-mono">
                    <span className="text-[#6B7280]">Retention Resonance Timeline</span>
                    <span className="text-[#5E6AD2] font-bold">{tutor.name} (Indigo) vs Benchmark (Slate)</span>
                  </div>

                  <div className="h-16 relative">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                      {/* Benchmark line */}
                      <path 
                        d="M 0 15 Q 15 10 30 14 T 60 7 T 90 12 L 100 13" 
                        fill="none" 
                        stroke="#94A3B8" 
                        strokeWidth="1.5" 
                        strokeDasharray="2,2"
                      />
                      {/* Active Tutor wave */}
                      <path 
                        d="M 0 14 Q 15 5 30 11 T 60 4 T 90 8 L 100 9" 
                        fill="none" 
                        stroke="#5E6AD2" 
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F7F8F9] rounded-lg border border-[#E2E4E8] text-left">
                    <div className="text-[9px] text-[#6B7280] font-mono uppercase font-bold">Avg Tone Variance</div>
                    <div className="text-sm font-bold text-[#111827] mt-1 font-mono">8.4% Modulation</div>
                    <div className="text-[9px] text-[#6B7280] mt-1">&plusmn;2% standard variance</div>
                  </div>
                  <div className="p-3 bg-[#F7F8F9] rounded-lg border border-[#E2E4E8] text-left">
                    <div className="text-[9px] text-[#6B7280] font-mono uppercase font-bold">Interruption Score</div>
                    <div className="text-sm font-bold text-emerald-600 mt-1 font-mono">1.2x / Min</div>
                    <div className="text-[9px] text-[#6B7280] mt-1 font-sans">Excellent passive listening</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3 (Right 3 cols): Validity Score & Strengths Card */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Validity Gauge Card */}
            <div className="bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg p-6 text-center relative overflow-hidden">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6AD2] font-mono font-bold mb-4">Tutor Validity Index</h4>

              <div className="inline-flex relative items-center justify-center p-3.5 rounded-full bg-[#FFFFFF] border border-[#E2E4E8] mb-3 text-center min-w-[70px] shadow-sm">
                <span className="text-3xl font-display font-extrabold text-[#111827] leading-none font-mono">
                  {tutor.averageScore}%
                </span>
              </div>

              <div className="text-sm font-bold font-display text-[#111827] mt-1">
                {tutor.status === "Elite" ? "⭐⭐⭐⭐ Elite Tutor" : "Approved Tutor"}
              </div>
              <p className="text-[10px] text-[#6B7280] mt-1.5 max-w-xs mx-auto leading-relaxed">This index measures engagement rates, student answer latency matrices, and speech metrics.</p>
            </div>

            {/* Strengths & Weaknesses Panel */}
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono font-bold">Core Strengths</h4>
                <div className="mt-3 space-y-2">
                  {tutor.recommendations?.strengths.map((str, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-[11px] text-[#6B7280]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E4E8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 font-mono font-bold">Room to Improve</h4>
                <div className="mt-3 space-y-2">
                  {tutor.recommendations?.weaknesses.map((wk, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-[11px] text-[#6B7280]">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{wk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Action roadmap CTA pointing to separate Recommendations page */}
            {onNavigateToRecommendations && (
              <button 
                onClick={onNavigateToRecommendations}
                className="w-full bg-[#FFFFFF] hover:bg-slate-50 border border-[#5E6AD2] rounded-lg p-5 text-left transition flex items-center justify-between group cursor-pointer shadow-sm relative overflow-hidden"
              >
                <div className="space-y-1.5 pr-2 text-left">
                  <div className="flex items-center gap-1.5 text-[9px] text-[#5E6AD2] font-bold font-mono tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#5E6AD2]" />
                    <span>AI ACTION ROADMAP</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#111827] leading-snug">90-Day Development Plan & Training Guidelines</h4>
                  <p className="text-[10px] text-[#6B7280] leading-normal font-sans">Constructive micro-pacing metrics, courses references, and guidelines.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#5E6AD2] group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            )}
          </div>
        </div>
      )}

      {/****************** TEACHING METRICS TAB ******************/}
      {activeTab === "metrics" && tutor.metrics && (
        <div id="metrics-tab-view" className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-6 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center pb-1 border-b border-[#E2E4E8]">
            <div>
              <h3 className="text-lg font-bold font-display text-[#111827]">Instructional Delivery Breakdown</h3>
              <p className="text-xs text-[#6B7280] mt-1">Comparative overview vs. institution guidelines</p>
            </div>
            <span className="text-xs bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] font-mono px-3 py-1 rounded font-bold">
              Automated scoring models
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {[
              { label: "Subject Knowledge", score: tutor.metrics.subjectKnowledge, desc: "Accurate coding definitions, complexity insights, and syntactic accuracy indicators." },
              { label: "Conceptual Clarity", score: tutor.metrics.conceptualClarity, desc: "Scaffolding difficult terms into accessible step-by-step programming metaphors." },
              { label: "Communication Dynamics", score: tutor.metrics.communicationName, desc: "Clear projection, optimal cadence, and active listening pause timings." },
              { label: "Student Engagement", score: tutor.metrics.engagement, desc: "Interactive query prompt rate, student response frequency, and visual annotations usage." },
              { label: "Teaching Methodology", score: tutor.metrics.teachingMethodology, desc: "Quality of live code logs, class timing constraints pacing, and feedback loop patterns." },
              { label: "Tutor Confidence", score: tutor.metrics.confidence, desc: "Tone stability, horizontal cam visual alignment, and quick resolution to edge cases." },
              { label: "Mentorship & Guidance", score: tutor.metrics.mentorship, desc: "Tone warmth, encouraging active debugging, and constructive suggestions." },
              { label: "Feedback Loop Quality", score: tutor.metrics.feedbackQuality, desc: "Active validation node counts and exit slip recap checkins." }
            ].map((met, idx) => (
              <div key={idx} className="p-5 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] space-y-4">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-sm font-semibold text-[#111827]">{met.label}</span>
                  <span className="text-sm font-bold text-[#5E6AD2]">{met.score}%</span>
                </div>
                
                {/* Progress bar line */}
                <div className="h-2 bg-[#E2E4E8] rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-[#5E6AD2] rounded-full" 
                    style={{ width: `${met.score}%` }}
                  />
                  {/* Benchmarker tick at 85% */}
                  <div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-purple-600 pointer-events-none opacity-50" title="Institute Target Index" />
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed">{met.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/****************** BODY LANGUAGE TAB ******************/}
      {activeTab === "body" && tutor.bodyLanguage && (
        <div id="body-language-tab-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left panel: scores & analyses */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-5 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Kinesics Analytics</h3>
                <p className="text-[10px] text-[#6B7280] mt-1">Automated skeletal node and pupil gaze analytics</p>
              </div>

              {/* Indicators card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#E2E4E8]/60">
                  <span className="text-[#6B7280] font-medium">Iris Gaze / Eye Contact Index</span>
                  <span className="text-[#111827] font-mono font-bold bg-[#F7F8F9] px-2 py-0.5 rounded border border-[#E2E4E8]">{tutor.bodyLanguage.eyeContactScore}%</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#E2E4E8]/60">
                  <span className="text-[#6B7280] font-medium">Facial Warmth Indicators</span>
                  <span className="text-[#111827] font-mono font-bold bg-[#F7F8F9] px-2 py-0.5 rounded border border-[#E2E4E8]">{tutor.bodyLanguage.facialExpressionScore}%</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#E2E4E8]/60">
                  <span className="text-[#6B7280] font-medium">Confidence Detection Index</span>
                  <span className="text-[#111827] font-mono font-bold bg-[#F7F8F9] px-2 py-0.5 rounded border border-[#E2E4E8]">{tutor.bodyLanguage.confidenceDetection}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B7280] font-medium">Energy Level Scale</span>
                  <span className="text-emerald-700 font-mono font-bold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded uppercase">{tutor.bodyLanguage.energyLevel} Energy</span>
                </div>
              </div>
            </div>

            {/* Analysis details details */}
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-4 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Micro-Posture Observations</h4>
              
              <div className="space-y-3.5 divide-y divide-[#E2E4E8]/60 text-xs text-[#6B7280]">
                <div className="pt-0">
                  <strong className="text-[#111827] block mb-1 font-sans font-semibold">Gesture Analysis:</strong>
                  <span className="leading-relaxed text-[#6B7280]">{tutor.bodyLanguage.gestureAnalysis}</span>
                </div>
                <div className="pt-3">
                  <strong className="text-[#111827] block mb-1 font-sans font-semibold">Posture Analysis:</strong>
                  <span className="leading-relaxed text-[#6B7280]">{tutor.bodyLanguage.postureAnalysis}</span>
                </div>
                <div className="pt-3">
                  <strong className="text-[#111827] block mb-1 font-sans font-semibold">Movement Cohesion:</strong>
                  <span className="leading-relaxed text-[#6B7280]">{tutor.bodyLanguage.movementQuality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: heatmaps and timeline analytics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-6 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Session Gaze Heatmap Matrix</h3>
                <p className="text-[10px] text-[#6B7280] mt-1 font-sans">Pixel matrices scoring consistent center screen focal retention</p>
              </div>

              {/* Gaze map bins */}
              <div className="space-y-4">
                <div className="p-4 bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg">
                  <div className="flex justify-between text-[10px] font-mono text-[#6B7280] mb-3">
                    <span>Gaze Direction Intensity Track (10-minute bins)</span>
                    <span className="font-semibold text-[#5E6AD2]">High Concentration (Emerald) &mdash; Intermittent (Indigo)</span>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {tutor.bodyLanguage.eyeContactTimeline?.map((score, i) => {
                      const colorClass = score >= 92 
                        ? "bg-emerald-600 border-emerald-500 text-white" 
                        : score >= 85 
                          ? "bg-[#5E6AD2] border-indigo-400/50 text-white" 
                          : "bg-[#E2E4E8] border-[#D1D5DB] text-[#6B7280]";
                      return (
                        <div key={i} className="space-y-1">
                          <div className={`h-8 rounded border flex items-center justify-center font-mono text-[9px] font-bold ${colorClass}`}>
                            {score}
                          </div>
                          <div className="text-[9px] text-[#6B7280] font-mono text-center">Bin {i+1}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hand gesture frequency timeline */}
                <div className="p-4 bg-[#F7F8F9] border border-[#E2E4E8] rounded-lg text-left">
                  <div className="text-[10px] font-mono text-[#6B7280] mb-3 uppercase font-bold">Hand Gestures Frequency Distribution</div>
                  <div className="h-16 flex items-end gap-2.5">
                    {tutor.bodyLanguage.gestureFrequency?.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <div 
                          className="w-full bg-[#5E6AD2] rounded-t transition-all"
                          style={{ height: `${val * 3.5}px` }}
                        />
                        <span className="text-[9px] text-[#6B7280] font-mono">{val}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/****************** TRANSCRIPT TAB ******************/}
      {activeTab === "transcript" && (
        <div id="transcript-tab-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left search drawer */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.04)] space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Filter Transcript</h4>
              
              <div className="relative">
                <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-3" />
                <input
                  type="text"
                  value={transcriptQuery}
                  onChange={(e) => setTranscriptQuery(e.target.value)}
                  placeholder="Search keywords (e.g., Python, keys)..."
                  className="w-full bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg pl-9 pr-4 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#5E6AD2]"
                />
              </div>

              {/* Categorization indicators shortcut */}
              <div className="pt-2 space-y-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] font-bold">Highlight Shortcuts</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded cursor-pointer hover:bg-emerald-100 transition font-medium">
                    💡 Clarity Highlights
                  </span>
                  <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-[#5E6AD2] px-2.5 py-1 rounded cursor-pointer hover:bg-indigo-100 transition font-medium">
                    🎓 Mentorship Highlights
                  </span>
                </div>
              </div>
            </div>

            {/* AI observations note regarding script analysis */}
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-5 text-left space-y-2 text-xs shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <h5 className="font-bold text-[#111827] font-sans">Transcript Telemetry Metrics</h5>
              <p className="text-[#6B7280] leading-relaxed">
                Tutor speech density equals **85 words/minute**. Pupil gaze validation spikes coincide with direct Student question moments (marked by blue and orange highlight tags).
              </p>
            </div>
          </div>

          {/* Right script stream list */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 text-left space-y-4 flex-1 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#E2E4E8]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B7280] font-mono font-bold">Annotated Speech Stream</h3>
                <span className="text-[10px] text-[#6B7280] font-sans">Click timestamp to jump in video review</span>
              </div>

              {/* Interactive script list */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                {tutor.transcript && tutor.transcript
                  .filter((item) => item.text.toLowerCase().includes(transcriptQuery.toLowerCase()))
                  .map((item) => {
                    const isMatchedHighlight = Math.abs(currentTimeSec - item.seconds) < 12;
                    return (
                      <div 
                        key={item.id} 
                        className={`p-3.5 rounded-lg border transition duration-200 relative group text-left ${
                          isMatchedHighlight 
                            ? "bg-indigo-50/40 border-[#5E6AD2]" 
                            : "bg-[#F7F8F9] border-[#E2E4E8] hover:border-slate-350"
                        }`}
                      >
                        {/* Highlights tags indicator */}
                        {item.highlightType && (
                          <span className={`text-[8px] absolute top-3.5 right-4 font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold ${
                            item.highlightType === "clarity" 
                              ? "bg-emerald-50 border border-emerald-100 text-emerald-700" 
                              : "bg-indigo-50 border border-indigo-100 text-[#5E6AD2]"
                          }`}>
                            {item.highlightType} Highlight
                          </span>
                        )}

                        <div className="flex gap-4">
                          {/* Timetamp navigation button */}
                          <button
                            onClick={() => handleJumpToTime(item.seconds)}
                            className="bg-[#FFFFFF] hover:bg-[#F7F8F9] text-[#5E6AD2] hover:text-[#5E6AD2]/90 transition font-mono text-[10px] py-1 px-2.5 rounded border border-[#E2E4E8] select-none shrink-0 font-bold shadow-sm"
                          >
                            {item.timestamp}
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#111827]">{item.speaker}</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-semibold ${
                                item.sentiment === "Positive" 
                                  ? "bg-emerald-50 border border-emerald-100 text-emerald-705 text-emerald-700" 
                                  : "bg-[#E2E4E8] text-[#6B7280]"
                              }`}>{item.sentiment}</span>
                            </div>
                            
                            <p className="text-xs text-[#111827] leading-relaxed pt-1">{item.text}</p>
                            
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {item.tags.map((tag, idx) => (
                                <span key={idx} className="text-[9px] bg-[#FFFFFF] border border-[#E2E4E8] text-[#6B7280] px-2 py-0.5 rounded font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
