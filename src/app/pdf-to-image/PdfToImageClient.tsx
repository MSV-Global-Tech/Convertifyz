"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { Image as ImageIcon, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PdfToImageClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [dpi, setDpi] = useState<150 | 300>(150);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrls, setDownloadUrls] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const pdf = newFiles[0];
    if (pdf?.type !== "application/pdf") { setError("Only PDF files accepted."); return; }
    setError(null);
    setFiles([{ file: pdf, id: uuidv4() }]);
    setStatus("idle"); setDownloadUrls([]);
  }, []);

  const handleConvert = async () => {
    if (!files[0]) { setError("Please upload a PDF file."); return; }
    setError(null); setStatus("processing"); setProgress(20);
    try {
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("format", format);
      formData.append("dpi", String(dpi));
      setProgress(50);
      const res = await fetch("/api/pdf-to-image", { method: "POST", body: formData });
      setProgress(85);
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Conversion failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrls([{ name: "pdf_pages.zip", url }]);
      setProgress(100); setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    }
  };

  const reset = () => { setFiles([]); setProgress(0); setStatus("idle"); setDownloadUrls([]); setError(null); };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #f8faff 0%, #f0fdf4 60%, #fff 100%)" }}>
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
                    background: "linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)",
                    fontSize: 28,
                    boxShadow: "0 4px 20px rgba(37,99,235,0.12)",
                  }}
                >
                  <ImageIcon className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">PDF to Image</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Export every page of your PDF as high-quality JPG or PNG images instantly.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="text-blue-500 mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800">Secure & Private</p>
                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  We process your PDF securely and extract pages into images. All files are permanently deleted after processing.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">How It Works</p>
              <ol className="space-y-4">
                {[
                  "Select and upload the PDF file you want to convert.",
                  "Choose your preferred image format (JPG or PNG).",
                  "Select the resolution quality (Standard or High).",
                  "Download a ZIP file containing all extracted pages."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #2563eb 0%, #16a34a 100%)" }}
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
              <FileUploadZone accept=".pdf,application/pdf" multiple={false} onFiles={handleFiles} label="Drag & drop your PDF here" sublabel="or click to browse" icon={<FileText className="w-10 h-10 text-blue-400 mb-2" />} />

              <div className="mt-6">
                <FileList files={files} onRemove={() => setFiles([])} />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-8 animate-fade-in text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider text-[10px]">Format</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["jpg", "png"] as const).map((f) => (
                          <button key={f} onClick={() => setFormat(f)}
                            className={`py-3 px-2 rounded-xl border-2 text-sm font-bold uppercase transition-all ${format === f ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-100 text-gray-400 hover:border-blue-200"}`}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider text-[10px]">Quality</label>
                      <div className="grid grid-cols-2 gap-3">
                        {([150, 300] as const).map((d) => (
                          <button key={d} onClick={() => setDpi(d)}
                            className={`py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center justify-center ${dpi === d ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-100 text-gray-400 hover:border-blue-200"}`}>
                            <span>{d} DPI</span>
                            <span className="text-[9px] font-normal opacity-70">{d === 150 ? "Standard" : "High Res"}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium">⚠️ {error}</div>}

              {files.length > 0 && status === "idle" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleConvert} className="btn-primary flex-1 justify-center py-3 text-base" style={{ background: "linear-gradient(135deg, #2563eb 0%, #16a34a 100%)" }}>
                    <ImageIcon size={18} /> Convert to {format.toUpperCase()}
                  </button>
                  <button onClick={reset} className="btn-outline px-6">Clear</button>
                </div>
              )}

              {status === "processing" && <div className="mt-8"><ProgressBar progress={progress} status="processing" label="Extracting pages…" /></div>}

              {status === "done" && downloadUrls.length > 0 && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <ProgressBar progress={100} status="done" />
                  <div className="space-y-4">
                    {downloadUrls.map((d) => (
                      <a key={d.name} href={d.url} download={d.name} className="btn-primary w-full justify-center py-4 text-base shadow-lg block text-center" style={{ background: "linear-gradient(135deg, #2563eb 0%, #16a34a 100%)" }}>
                        ⬇️ Download {d.name}
                      </a>
                    ))}
                    <button onClick={reset} className="btn-outline w-full justify-center py-3 text-sm">Convert Another PDF</button>
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
