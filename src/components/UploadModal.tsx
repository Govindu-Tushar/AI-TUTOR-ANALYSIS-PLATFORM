import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  UploadCloud, 
  Video, 
  CheckCircle2, 
  FileCheck, 
  Loader2, 
  FileVideo,
  Play
} from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
  courseName: string;
  onAnalysisComplete: () => void;
}

type Stage = "idle" | "uploaded" | "processing" | "transcribing" | "ai_analysis" | "report_generation" | "complete";

export default function UploadModal({ isOpen, onClose, tutorName, courseName, onAnalysisComplete }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [customVideoDetails, setCustomVideoDetails] = useState<{
    name: string;
    size: string;
    duration: string;
    resolution: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated fallback details
  const videoDetails = {
    name: `Tutor_Eval_${tutorName.replace(/\s+/g, "_")}_${courseName.replace(/\s+/g, "_")}.mp4`,
    size: "185.4 MB",
    duration: "12:45 minutes",
    resolution: "1920x1080 (1080p, 60fps)"
  };

  const activeDetails = customVideoDetails || videoDetails;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFile = (file: File) => {
    const sizeStr = formatBytes(file.size);
    const nameStr = file.name;

    // default fallbacks
    let durationStr = "12:45 mins";
    let resolutionStr = "1920x1080 (1080p)";

    // Try to extract metadata if supported
    const videoUrl = URL.createObjectURL(file);
    const videoEl = document.createElement("video");
    videoEl.preload = "metadata";
    videoEl.src = videoUrl;

    const finalizeFile = (dur = durationStr, res = resolutionStr) => {
      setCustomVideoDetails({
        name: nameStr,
        size: sizeStr,
        duration: dur,
        resolution: res
      });
      startAnalysisPipeline();
      try {
        URL.revokeObjectURL(videoUrl);
      } catch (e) {}
    };

    const safetyTimeout = setTimeout(() => {
      finalizeFile();
    }, 1500);

    videoEl.onloadedmetadata = () => {
      clearTimeout(safetyTimeout);
      const minutes = Math.floor(videoEl.duration / 60);
      const seconds = Math.floor(videoEl.duration % 60);
      const parsedDur = videoEl.duration 
        ? `${minutes}:${seconds.toString().padStart(2, "0")} minutes` 
        : "15:00 minutes";
      const parsedRes = videoEl.videoWidth && videoEl.videoHeight 
        ? `${videoEl.videoWidth}x${videoEl.videoHeight}` 
        : "1920x1080 (1080p)";
      finalizeFile(parsedDur, parsedRes);
    };

    videoEl.onerror = () => {
      clearTimeout(safetyTimeout);
      finalizeFile();
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const startAnalysisPipeline = () => {
    setStage("uploaded");
    setProgress(15);
  };

  // Pipeline transitions sequence emulator
  useEffect(() => {
    if (stage === "idle" || stage === "complete") return;

    let timer: NodeJS.Timeout;
    if (stage === "uploaded") {
      timer = setTimeout(() => {
        setStage("processing");
        setProgress(35);
      }, 1500);
    } else if (stage === "processing") {
      timer = setTimeout(() => {
        setStage("transcribing");
        setProgress(55);
      }, 1800);
    } else if (stage === "transcribing") {
      timer = setTimeout(() => {
        setStage("ai_analysis");
        setProgress(75);
      }, 2000);
    } else if (stage === "ai_analysis") {
      timer = setTimeout(() => {
        setStage("report_generation");
        setProgress(92);
      }, 1800);
    } else if (stage === "report_generation") {
      timer = setTimeout(() => {
        setStage("complete");
        setProgress(100);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [stage]);

  if (!isOpen) return null;

  const renderStageIcon = (currentStage: Stage, targetStage: Stage) => {
    const order: Stage[] = ["idle", "uploaded", "processing", "transcribing", "ai_analysis", "report_generation", "complete"];
    const currentIndex = order.indexOf(currentStage);
    const targetIndex = order.indexOf(targetStage);

    if (currentIndex > targetIndex || currentStage === "complete") {
      return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
    } else if (currentIndex === targetIndex) {
      return <Loader2 className="w-5 h-5 text-[#5E6AD2] animate-spin shrink-0" />;
    } else {
      return <div className="w-5 h-5 rounded-full border border-[#E2E4E8] shrink-0" />;
    }
  };

  return (
    <div id="upload-dialog-overlay" className="fixed inset-0 bg-[#111827]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div 
        id="upload-dialog-container" 
        className="w-full max-w-xl bg-[#FFFFFF] border border-[#E2E4E8] rounded-lg p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.08)] relative overflow-hidden"
      >
        {/* Hidden File Input */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
          id="device-video-file-input"
        />

        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h3 className="text-lg font-bold font-display text-[#111827]">Video Evaluation Upload</h3>
            <p className="text-xs text-[#6B7280] mt-1">Evaluating: <span className="text-[#5E6AD2] font-semibold">{tutorName}</span> &mdash; {courseName}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#111827] bg-[#F7F8F9] hover:bg-[#E2E4E8]/50 p-2 rounded-lg border border-[#E2E4E8] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {stage === "idle" ? (
          <div>
            {/* File drag zone */}
            <div
              id="file-drop-zone"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-300 relative group flex flex-col items-center justify-center ${
                dragActive 
                  ? "border-[#5E6AD2] bg-[#5E6AD2]/5" 
                  : "border-[#E2E4E8] bg-[#F7F8F9]/50 hover:border-[#5E6AD2]/60 hover:bg-[#F7F8F9]"
              }`}
            >
              <div className="w-14 h-14 rounded-lg bg-[#FFFFFF] flex items-center justify-center border border-[#E2E4E8] mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <UploadCloud className="w-7 h-7 text-[#5E6AD2]" />
              </div>
              <h4 className="text-sm font-semibold text-[#111827]">Drag & drop tutor session video here</h4>
              <p className="text-xs text-[#6B7280] mt-1.5 max-w-xs">Supports MP4, MOV, MKV up to 500MB (recommended length: 15-45 minutes)</p>
              
              <div className="mt-6">
                <span className="text-[10px] uppercase font-mono tracking-wider bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/20 px-3 py-1.5 rounded-lg group-hover:bg-[#5E6AD2]/15 transition font-bold">
                  Select Classroom File
                </span>
              </div>
            </div>

            {/* Quick Emulator demo picker */}
            <div 
              onClick={startAnalysisPipeline}
              className="mt-5 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 text-left cursor-pointer hover:bg-indigo-50 transition"
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-[#5E6AD2] shrink-0" />
                <div className="text-left">
                  <h5 className="text-xs font-semibold text-[#5E6AD2]">Instant Demo Evaluation Simulator</h5>
                  <p className="text-[10px] text-[#6B7280] mt-0.5 font-sans leading-relaxed">Click here to immediately simulate a high-resolution classroom lecture stream analysis with pre-recorded telemetry.</p>
                </div>
              </div>
            </div>
          </div>
        ) : stage === "complete" ? (
          <div className="text-center py-6 mt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <FileCheck className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold font-display text-[#111827]">AI Analysis Finished!</h4>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto mt-1 leading-relaxed">
              Classroom parameters, body language arrays, confidence spikes, and recommendations compiled to dashboard.
            </p>

            <div className="my-5 p-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] text-left space-y-1.5 max-w-md mx-auto font-mono">
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>File Encoded:</span>
                <span className="text-[#111827] font-semibold truncate max-w-[200px]">{activeDetails.name}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>Duration Loaded:</span>
                <span className="text-[#111827] font-semibold">{activeDetails.duration}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>Core Rating Computed:</span>
                <span className="text-emerald-700 font-bold">Elite Tutor (91% validity)</span>
              </div>
            </div>

            <button
              onClick={onAnalysisComplete}
              className="w-full bg-[#5E6AD2] hover:bg-[#5E6AD2]/90 text-white font-semibold text-xs py-3 rounded-lg shadow-sm font-display transition duration-200"
            >
              Open AI Analysis Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Visual Stream Loading Card */}
            <div className="p-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8] relative flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <FileVideo className="w-8 h-8 text-[#5E6AD2] shrink-0" />
                <div className="truncate text-left">
                  <p className="text-xs font-semibold text-[#111827] truncate">{activeDetails.name}</p>
                  <p className="text-[10px] text-[#6B7280] mt-1 font-mono">{activeDetails.size} &bull; {activeDetails.resolution}</p>
                </div>
              </div>
              <span className="text-[#5E6AD2] font-mono text-sm leading-none font-bold">{progress}%</span>
            </div>

            {/* Custom Progress bar */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-[#E2E4E8] rounded-full overflow-hidden">
                <div 
                  className="bg-[#5E6AD2] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stage steppers list */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between text-xs p-3 px-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
                <div className="flex items-center gap-3">
                  {renderStageIcon(stage, "uploaded")}
                  <span className={stage === "uploaded" ? "text-[#5E6AD2] font-semibold" : "text-[#6B7280]"}>1. Upload Completed</span>
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono">100% Buffered</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 px-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
                <div className="flex items-center gap-3">
                  {renderStageIcon(stage, "processing")}
                  <span className={stage === "processing" ? "text-[#5E6AD2] font-semibold" : "text-[#6B7280]"}>2. Video Parsing & De-noising</span>
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono">Dual Audio Channels</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 px-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
                <div className="flex items-center gap-3">
                  {renderStageIcon(stage, "transcribing")}
                  <span className={stage === "transcribing" ? "text-[#5E6AD2] font-semibold" : "text-[#6B7280]"}>3. Audio Transcription (Whisper Engine)</span>
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono">Vocabulary Decoupling</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 px-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
                <div className="flex items-center gap-3">
                  {renderStageIcon(stage, "ai_analysis")}
                  <span className={stage === "ai_analysis" ? "text-[#5E6AD2] font-semibold" : "text-[#6B7280]"}>4. AI Facial and Speech Validation</span>
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono">Pupil and Gesture Vectors</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 px-4 rounded-lg bg-[#F7F8F9] border border-[#E2E4E8]">
                <div className="flex items-center gap-3">
                  {renderStageIcon(stage, "report_generation")}
                  <span className={stage === "report_generation" ? "text-[#5E6AD2] font-semibold" : "text-[#6B7280]"}>5. Mentorship Indexing & Plan Formulation</span>
                </div>
                <span className="text-[10px] text-[#6B7280] font-mono">AI Coach Synthesis</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
