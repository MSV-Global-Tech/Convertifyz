"use client";

export interface UploadedFile {
  file: File;
  id: string;
  preview?: string; // data URL for images
}

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  const icons: Record<string, string> = {
    pdf: "📄", jpg: "🖼️", jpeg: "🖼️", png: "🖼️",
    webp: "🖼️", gif: "🖼️", bmp: "🖼️",
  };
  return icons[ext || ""] || "📎";
}

export default function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2 animate-fade-in">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {files.length} file{files.length > 1 ? "s" : ""} selected
      </p>
      {files.map((uf, idx) => (
        <div
          key={uf.id}
          className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:border-purple-200 transition-all group"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          {/* Thumbnail / Icon */}
          <div className="file-thumb">
            {uf.preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={uf.preview}
                alt={uf.file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">{getFileIcon(uf.file.name)}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{uf.file.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatBytes(uf.file.size)}</p>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(uf.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
            aria-label={`Remove ${uf.file.name}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
