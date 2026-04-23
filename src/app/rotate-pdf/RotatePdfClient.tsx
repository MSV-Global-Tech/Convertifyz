"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { RotateCw, FileText, ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ROTATIONS = [
  { label: "90° Clockwise", value: 90, icon: <ArrowRight className="w-5 h-5 mx-auto" /> },
  { label: "180°", value: 180, icon: <ArrowDown className="w-5 h-5 mx-auto" /> },
  { label: "90° Counter-CW", value: 270, icon: <ArrowLeft className="w-5 h-5 mx-auto" /> },
];

export default function RotatePdfClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [rotation, setRotation] = useState(90);
  const [pageRange, setPageRange] = useState("all");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const pdf = newFiles[0];
    if (pdf?.type !== "application/pdf") { setError("Only PDF files accepted."); return; }
    setError(null);
    setFiles([{ file: pdf, id: uuidv4() }]);
    setStatus("idle"); setDownloadUrl(null);
  }, []);

  const handleRotate = async () => {
    if (!files[0]) { setError("Please upload a PDF file."); return; }
    setError(null); setStatus("processing"); setProgress(20);
    try {
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("rotation", String(rotation));
      formData.append("pageRange", pageRange);
      setProgress(50);
      const res = await fetch("/api/rotate-pdf", { method: "POST", body: formData });
      setProgress(85);
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed to rotate PDF");
      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100); setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    }
  };

  const reset = () => { setFiles([]); setProgress(0); setStatus("idle"); setDownloadUrl(null); setError(null); };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf5ff 0%, #f8faff 60%, #fff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors mb-6 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT COLUMN (Info & Instructions) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center animate-float"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)",
                    fontSize: 24,
                    boxShadow: "0 4px 15px rgba(22,163,74,0.1)",
                  }}
                >
                  <RotateCw className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Rotate PDF</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Fix your document orientation instantly. Rotate all or selected pages to 90°, 180°, or 270° in one click.
              </p>
            </div>

            <div className="flex items-start gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl p-3.5">
              <div className="text-blue-500 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800">Secure & Private</p>
                <p className="text-[11px] text-blue-600 mt-0.5 leading-tight">
                  Files are destroyed immediately after processing. No human ever sees your documents.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label mb-4 text-xs font-bold uppercase tracking-wider text-green-600">Quick Guide</p>
              <ol className="space-y-4">
                {[
                  "Upload the PDF you need to reorient.",
                  "Select the rotation angle (90°, 180°, etc).",
                  "Enter specific pages or leave as \"all\".",
                  "Download your perfectly oriented PDF."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)" }}
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
              <FileUploadZone accept=".pdf,application/pdf" multiple={false} onFiles={handleFiles} label="Drag & drop your PDF here" sublabel="or click to browse" icon={<FileText className="w-10 h-10 text-green-400 mb-2" />} />

              <div className="mt-6">
                <FileList files={files} onRemove={() => setFiles([])} />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3 text-left">Rotation Angle</label>
                    <div className="grid grid-cols-3 gap-3">
                      {ROTATIONS.map((r) => (
                        <button key={r.value} onClick={() => setRotation(r.value)}
                          className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${rotation === r.value ? "border-green-500 bg-green-50 text-green-700 shadow-sm" : "border-gray-100 text-gray-600 hover:border-green-200"}`}>
                          <span className="block mb-1">{r.icon}</span>
                          <span className="text-[11px] sm:text-xs">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 text-left">
                      Pages to Rotate
                      <span className="ml-2 text-[10px] text-gray-400 font-normal uppercase tracking-wide">(all, or e.g. 1-3, 5)</span>
                    </label>
                    <input type="text" value={pageRange} onChange={(e) => setPageRange(e.target.value)}
                      placeholder="all"
                      className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-lg font-medium focus:outline-none focus:border-green-300 focus:ring-4 focus:ring-green-50 transition-all placeholder:text-gray-300" />
                  </div>
                </div>
              )}

              {error && <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium">⚠️ {error}</div>}

              {files.length > 0 && status === "idle" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleRotate} className="btn-primary flex-1 justify-center py-3 text-base" style={{ background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)" }}><RotateCw size={18} /> Rotate PDF</button>
                  <button onClick={reset} className="btn-outline px-6">Clear</button>
                </div>
              )}

              {status === "processing" && <div className="mt-8"><ProgressBar progress={progress} status="processing" label="Rotating pages…" /></div>}

              {status === "done" && downloadUrl && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <ProgressBar progress={100} status="done" />
                  <div className="flex gap-4">
                    <a href={downloadUrl} download="rotated.pdf" className="btn-primary flex-1 justify-center py-4 text-base shadow-lg" style={{ background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)" }}>⬇️ Download</a>
                    <button onClick={reset} className="btn-outline px-6">New File</button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
