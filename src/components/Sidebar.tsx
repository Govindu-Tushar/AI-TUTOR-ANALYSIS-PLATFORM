import { 
  Tv, 
  Users, 
  Layers, 
  FileText, 
  Lightbulb, 
  Cpu, 
  Settings, 
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedCourseId?: string | null;
  selectedTutorId?: string | null;
}

export default function Sidebar({ currentTab, onTabChange, selectedCourseId, selectedTutorId }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Admin Dashboard", icon: Tv },
    { id: "courses", label: "Courses", icon: Layers, badge: "Primary" },
    { id: "tutors", label: "Tutors", icon: Users },
    { id: "recommendations", label: "Pedagogical Plans", icon: Lightbulb },
    { id: "insights", label: "AI Insights", icon: Cpu },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside id="sidebar-container" className="w-60 min-h-screen bg-[#F7F8F9] border-r border-[#E2E4E8] flex flex-col justify-between shrink-0 sticky top-0 z-10 font-sans text-[#111827]">
      <div className="p-5">
        {/* Logo / Header Branding - B2B Minimalist */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-7 bg-[#5E6AD2] rounded-md flex items-center justify-center shadow-sm">
            <span className="font-bold text-white text-[11px] tracking-wide">AI</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-[#111827]">
              EduMentor Pro
            </h1>
            <p className="text-[9px] text-[#6B7280] font-mono tracking-wider uppercase font-semibold">TUTOR EVAL OS</p>
          </div>
        </div>

        {/* Navigation Section Label */}
        <div className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] font-bold mb-3.5 ml-1">
          Core Platform
        </div>

        {/* Navigation Elements */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#5E6AD2]/10 text-[#5E6AD2]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#E2E4E8]/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#5E6AD2]" : "text-[#6B7280]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[9px] px-2 py-0.5 rounded font-mono bg-[#5E6AD2]/10 text-[#5E6AD2] font-semibold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Current Drill-down indicators */}
        {selectedCourseId && (
          <div className="mt-6 pt-5 border-t border-[#E2E4E8] space-y-3">
            <div className="text-[10px] font-mono tracking-wider uppercase text-[#6B7280] font-bold">Active Drill-Down</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 text-xs text-[#111827] bg-[#FFFFFF] p-2 rounded-lg border border-[#E2E4E8]">
                <Layers className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0" />
                <span className="truncate font-medium">Course Loaded</span>
              </div>
              {selectedTutorId && (
                <div className="flex items-center gap-2.5 text-xs text-[#111827] bg-[#FFFFFF] p-2 rounded-lg border border-[#E2E4E8]">
                  <Award className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0" />
                  <span className="truncate font-medium">Tutor Selected</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Details - Architectural Honesty */}
      <div className="p-5 border-t border-[#E2E4E8] space-y-3.5 bg-[#FFFFFF]">
        {/* Storage utilization block */}
        <div className="p-3.5 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
          <div className="text-[10px] text-[#6B7280] mb-1.5 font-semibold">Storage Used</div>
          <div className="w-full h-1.5 bg-[#E2E4E8] rounded-full overflow-hidden">
            <div className="w-[72%] h-full bg-[#5E6AD2] rounded-full"></div>
          </div>
        </div>

        <div className="bg-[#F7F8F9] p-3 rounded-lg border border-[#E2E4E8] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#6B7280]">AI Core Engine</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              Live API
            </span>
          </div>
          <div className="text-[10px] text-[#6B7280] flex items-center justify-between">
            <span className="text-[#6B7280]/80">Model Scope:</span>
            <span className="text-[#111827] font-mono text-[9px] bg-[#FFFFFF] border border-[#E2E4E8] px-1 py-0.5 rounded">gemini-2.5-flash</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

