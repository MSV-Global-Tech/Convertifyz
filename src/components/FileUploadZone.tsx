"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  sublabel?: string;
  maxSizeMB?: number;
  icon?: React.ReactNode;
}

export default function FileUploadZone({
  accept,
  multiple = false,
  onFiles,
  label = "Drag & drop your files here",
  sublabel = "or click to browse",
  maxSizeMB = 50,
  icon = <Upload className="w-10 h-10 text-purple-500" />,
}: FileUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (files: File[]) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    const oversized = files.filter((f) => f.size > maxBytes);
    if (oversized.length > 0) {
      setError(`File(s) too large. Max size: ${maxSizeMB}MB`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    if (validate(arr)) onFiles(arr);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <div
        className={`drop-zone ${dragging ? "drag-over" : ""}`}
        style={{ padding: "48px 24px", textAlign: "center" }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        aria-label="File upload area"
      >
        <input
          key={accept}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Animated Icon */}
        <div
          className="animate-float mx-auto mb-5 flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
          }}
        >
          {icon}
        </div>

        <p className="text-lg font-semibold text-gray-800 mb-1">{label}</p>
        <p className="text-sm text-gray-500 mb-4">{sublabel}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {accept.split(",").map((ext) => (
            <span key={ext} className="badge badge-purple">
              {ext.trim().toUpperCase()}
            </span>
          ))}
          <span className="badge badge-blue">Max {maxSizeMB}MB</span>
        </div>

        <div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white pointer-events-none"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Choose Files
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
