"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { Link2, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MergePdfClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    if (pdfs.length !== newFiles.length) {
      setError("Only PDF files are accepted.");
    } else {
      setError(null);
    }
    setFiles((prev) => [
      ...prev,
      ...pdfs.map((f) => ({ file: f, id: uuidv4() })),
    ]);
    setStatus("idle");
    setDownloadUrl(null);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }
    setError(null);
    setStatus("processing");
    setProgress(10);

    try {
      const formData = new FormData();
      files.forEach((uf) => formData.append("files", uf.file));

      setProgress(30);
      const res = await fetch("/api/merge-pdf", { method: "POST", body: formData });
      setProgress(80);

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Failed to merge PDFs");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    }
  };

  const reset = () => {
    setFiles([]);
    setProgress(0);
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf5ff 0%, #f8faff 60%, #fff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-600 transition-colors mb-6 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT COLUMN (Info & Instructions) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6 order-2 lg:order-1">
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center animate-float"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
                    fontSize: 24,
                    boxShadow: "0 4px 15px rgba(124,58,237,0.1)",
                  }}
                >
                  <Link2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Merge PDF Files</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Combine multiple PDF documents into a single file instantly. Drag to reorder pages before merging.
              </p>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl p-3.5">
              <div className="text-blue-500 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800">Your files are safe</p>
                <p className="text-[11px] text-blue-600 mt-0.5 leading-tight">
                  All files are processed securely and deleted automatically. We never store your data.
                </p>
              </div>
            </div>

            {/* How it works */}
            <div>
              <p className="section-label mb-4">How to Merge PDFs</p>
              <ol className="space-y-4">
                {[
                  "Upload 2 or more PDF files using the drop zone.",
                  "Review the file order — remove any you don't need.",
                  "Click \"Merge PDFs\" and wait a few seconds.",
                  "Download your combined PDF instantly.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="mt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── RIGHT COLUMN (The Tool itself) ── */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="card p-5 sm:p-8 shadow-lg border border-gray-100">
              <FileUploadZone
                accept=".pdf,application/pdf"
                multiple
                onFiles={handleFiles}
                label="Drag & drop PDF files here"
                sublabel="or click to browse — add 2 or more PDFs"
                icon={<FileText className="w-10 h-10 text-purple-400 mb-2" />}
              />

              <div className="mt-6">
                <FileList files={files} onRemove={removeFile} />
              </div>

              {error && (
                <div className="mt-6 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium">
                  ⚠️ {error}
                </div>
              )}

              {files.length >= 2 && status === "idle" && (
                <div className="mt-6 flex gap-3">
                  <button onClick={handleMerge} className="btn-primary flex-1 justify-center py-3 text-base">
                    <Link2 size={18} /> Merge {files.length} PDFs
                  </button>
                  <button onClick={reset} className="btn-outline px-6">
                    Clear
                  </button>
                </div>
              )}

              {status === "processing" && (
                <div className="mt-8">
                  <ProgressBar progress={progress} status="processing" label="Merging PDFs safely…" />
                </div>
              )}

              {status === "done" && downloadUrl && (
                <div className="mt-8 space-y-5">
                  <ProgressBar progress={100} status="done" />
                  <div className="flex gap-4">
                    <a
                      href={downloadUrl}
                      download="merged.pdf"
                      className="btn-primary flex-1 justify-center py-4 text-lg"
                    >
                      ⬇️ Download Merged PDF
                    </a>
                    <button onClick={reset} className="btn-outline px-6">
                      Merge More
                    </button>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleMerge} className="btn-primary flex-1 justify-center py-4">
                    Retry
                  </button>
                  <button onClick={reset} className="btn-outline px-6">
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
