"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { Zap, FileText, Battery, Gauge, Sparkles, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompressPdfClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const pdf = newFiles[0];
    if (pdf?.type !== "application/pdf") { setError("Only PDF files accepted."); return; }
    setError(null);
    setFiles([{ file: pdf, id: uuidv4() }]);
    setStatus("idle");
    setDownloadUrl(null);
    setStats(null);
  }, []);

  const handleCompress = async () => {
    if (!files[0]) { setError("Please upload a PDF file."); return; }
    setError(null);
    setStatus("processing");
    setProgress(15);

    try {
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("quality", quality);
      setProgress(40);
      const res = await fetch("/api/compress-pdf", { method: "POST", body: formData });
      setProgress(80);
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed to compress PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStats({ original: files[0].file.size, compressed: blob.size });
      setProgress(100);
      setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    }
  };

  const formatBytes = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  const reset = () => { setFiles([]); setProgress(0); setStatus("idle"); setDownloadUrl(null); setStats(null); setError(null); };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf5ff 0%, #f8faff 60%, #fff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT COLUMN (Info & Instructions) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex-shrink-0 flex items-center justify-center animate-float"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
                    fontSize: 28,
                    boxShadow: "0 4px 20px rgba(37,99,235,0.12)",
                  }}
                >
                  <Zap className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Compress PDF</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Reduce your PDF file size while maintaining the best possible quality for email and web sharing.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="text-blue-500 mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800">Private & Secure</p>
                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  Your files are processed securely and deleted automatically. Your data never leaves our server context.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label mb-4 text-xs font-bold uppercase tracking-wider text-purple-600">How to Compress</p>
              <ol className="space-y-4">
                {[
                  "Upload the PDF you want to compress.",
                  "Choose your desired compression level.",
                  "Click \"Compress PDF\" and wait a moment.",
                  "Download your optimized PDF file."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
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
              <FileUploadZone accept=".pdf,application/pdf" multiple={false} onFiles={handleFiles} label="Drag & drop PDF to compress" sublabel="or click to browse" icon={<FileText className="w-10 h-10 text-blue-400 mb-2" />} />

              <div className="mt-6">
                <FileList files={files} onRemove={() => setFiles([])} />
              </div>

              {files.length > 0 && (
                <div className="mt-8 animate-fade-in">
                  <label className="block text-sm font-bold text-gray-800 mb-3 text-left">Compression Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["low", "medium", "high"] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all capitalize ${quality === q ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm" : "border-gray-100 text-gray-600 hover:border-purple-200"}`}
                      >
                        <span className="block mb-1 text-base">
                          {q === "low" ? <Battery className="w-5 h-5 mx-auto" /> : q === "medium" ? <Gauge className="w-5 h-5 mx-auto" /> : <Sparkles className="w-5 h-5 mx-auto" />}
                        </span>
                        <span className="block text-[10px] font-normal text-gray-400">
                          {q === "low" ? "Smaller size" : q === "medium" ? "Balanced" : "Best quality"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium"><AlertTriangle className="inline w-4 h-4 mr-2" /> {error}</div>}

              {files.length > 0 && status === "idle" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleCompress} className="btn-primary flex-1 justify-center py-3 text-base" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}><Zap size={18} /> Compress PDF</button>
                  <button onClick={reset} className="btn-outline px-6">Clear</button>
                </div>
              )}

              {status === "processing" && <div className="mt-8"><ProgressBar progress={progress} status="processing" label="Compressing PDF…" /></div>}

              {status === "done" && downloadUrl && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <ProgressBar progress={100} status="done" />
                  {stats && (
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "Original", val: formatBytes(stats.original), color: "text-gray-700" },
                        { label: "Savings", val: `${Math.max(0, Math.round((1 - stats.compressed / stats.original) * 100))}%`, color: "text-green-600" },
                        { label: "Compressed", val: formatBytes(stats.compressed), color: "text-purple-600" },
                      ].map((s) => (
                        <div key={s.label} className="bg-gray-50/80 rounded-xl p-3 border border-white">
                          <p className={`text-sm sm:text-base font-bold ${s.color}`}>{s.val}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    <a href={downloadUrl} download="compressed.pdf" className="btn-primary flex-1 justify-center py-4 text-base" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}>⬇️ Download</a>
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
