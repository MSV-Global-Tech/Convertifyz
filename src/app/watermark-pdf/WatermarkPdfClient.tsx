"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { Droplets, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WatermarkPdfClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#7c3aed");
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

  const handleWatermark = async () => {
    if (!files[0]) { setError("Please upload a PDF file."); return; }
    if (!text.trim()) { setError("Please enter watermark text."); return; }
    setError(null); setStatus("processing"); setProgress(20);
    try {
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("text", text);
      formData.append("opacity", String(opacity / 100));
      formData.append("fontSize", String(fontSize));
      formData.append("color", color);
      setProgress(50);
      const res = await fetch("/api/watermark-pdf", { method: "POST", body: formData });
      setProgress(85);
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed to add watermark");
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors mb-8 group">
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
                    background: "linear-gradient(135deg, #ffedd5 0%, #fef9c3 100%)",
                    fontSize: 28,
                    boxShadow: "0 4px 20px rgba(251,146,60,0.12)",
                  }}
                >
                  <Droplets className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Watermark PDF</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Protect your PDFs by adding custom text watermarks to every page with full control over appearance.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="text-blue-500 mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800">Secure Processing</p>
                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  Your files are processed on the server and immediately deleted. We never store or share your documents.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label mb-4 text-xs font-bold uppercase tracking-wider text-orange-600">How to Watermark</p>
              <ol className="space-y-4">
                {[
                  "Upload the PDF document you want to protect.",
                  "Enter the watermark text and adjust styling.",
                  "Check the live preview on the right.",
                  "Click \"Add Watermark\" and download your file."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)" }}
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
              <FileUploadZone accept=".pdf,application/pdf" multiple={false} onFiles={handleFiles} label="Drag & drop your PDF here" sublabel="or click to browse" icon={<FileText className="w-10 h-10 text-orange-400 mb-2" />} />

              <div className="mt-6">
                <FileList files={files} onRemove={() => setFiles([])} />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3 text-left">Watermark Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL, DRAFT"
                      className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 text-lg font-medium focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 transition-all placeholder:text-gray-300" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3 text-left flex justify-between">
                        Opacity <span>{opacity}%</span>
                      </label>
                      <input type="range" min={5} max={80} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                        className="w-full accent-orange-500 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3 text-left flex justify-between">
                        Font Size <span>{fontSize}px</span>
                      </label>
                      <input type="range" min={20} max={100} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full accent-orange-500 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3 text-left">Watermark Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-12 rounded-xl border-2 border-gray-100 cursor-pointer overflow-hidden p-0" />
                      <span className="text-lg font-mono font-bold text-gray-500 uppercase">{color}</span>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50/50 rounded-2xl p-8 flex items-center justify-center min-h-[160px] relative overflow-hidden border-2 border-dashed border-gray-100">
                    <p className="text-[10px] text-gray-400 absolute top-3 left-4 font-bold uppercase tracking-widest">Live Preview</p>
                    <span style={{ fontSize: Math.min(fontSize, 48), color, opacity: opacity / 100, transform: "rotate(-30deg)", fontWeight: 700, userSelect: "none", whiteSpace: "nowrap" }}>
                      {text || "WATERMARK"}
                    </span>
                  </div>
                </div>
              )}

              {error && <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium">⚠️ {error}</div>}

              {files.length > 0 && status === "idle" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleWatermark} className="btn-accent flex-1 justify-center py-3 text-base"><Droplets size={18} /> Add Watermark</button>
                  <button onClick={reset} className="btn-outline px-6">Clear</button>
                </div>
              )}

              {status === "processing" && <div className="mt-8"><ProgressBar progress={progress} status="processing" label="Applying watermark…" /></div>}

              {status === "done" && downloadUrl && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <ProgressBar progress={100} status="done" />
                  <div className="flex gap-4">
                    <a href={downloadUrl} download="watermarked.pdf" className="btn-accent flex-1 justify-center py-4 text-base shadow-lg">⬇️ Download PDF</a>
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
