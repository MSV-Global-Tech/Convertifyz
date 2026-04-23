"use client";

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  status?: "idle" | "processing" | "done" | "error";
}

export default function ProgressBar({ progress, label, status = "processing" }: ProgressBarProps) {
  const colors = {
    idle: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    processing: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    done: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
    error: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {label || (status === "done" ? "Complete!" : status === "error" ? "Failed" : "Processing…")}
        </span>
        <span
          className="text-sm font-bold"
          style={{
            color:
              status === "done" ? "#16a34a" : status === "error" ? "#dc2626" : "#7c3aed",
          }}
        >
          {progress}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            background: colors[status],
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {status === "done" && (
        <p className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Your file is ready to download
        </p>
      )}
    </div>
  );
}
