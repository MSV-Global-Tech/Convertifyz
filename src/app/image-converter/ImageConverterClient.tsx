"use client";

import { useState, useCallback, useEffect } from "react";
import FileUploadZone from "@/components/FileUploadZone";
import FileList, { UploadedFile } from "@/components/FileList";
import ProgressBar from "@/components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { RefreshCcw, FileImage, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImageConverterClient() {
  // Ensure the page starts from the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [format, setFormat] = useState<"jpg" | "png" | "webp">("webp");
  const [quality, setQuality] = useState(80);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const images = newFiles.filter((f) => f.type.startsWith("image/"));
    if (images.length !== newFiles.length) setError("Only image files are accepted.");
    else setError(null);

    const toAdd: UploadedFile[] = images.map((f) => {
      const id = uuidv4();
      const preview = URL.createObjectURL(f);
      return { file: f, id, preview };
    });
    setFiles((prev) => [...prev, ...toAdd]);
    setStatus("idle"); setDownloadUrl(null);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) { setError("Please add at least one image."); return; }
    setError(null); setStatus("processing"); setProgress(15);
    try {
      const formData = new FormData();
      files.forEach((uf) => formData.append("files", uf.file));
      formData.append("format", format);
      formData.append("quality", String(quality));
      setProgress(40);
      const res = await fetch("/api/image-converter", { method: "POST", body: formData });
      setProgress(85);
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Conversion failed");
      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100); setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    }
  };

  const reset = () => {
    files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
    setFiles([]); setProgress(0); setStatus("idle"); setDownloadUrl(null); setError(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fafaff 0%, #fef8faff 60%, #fff 100%)" }}>
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
                    background: "linear-gradient(135deg, #ffedd5 0%, #fce7f3 100%)",
                    fontSize: 28,
                    boxShadow: "0 4px 20px rgba(234,88,12,0.12)",
                  }}
                >
                  <RefreshCcw className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">Image Converter</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-purple py-0.5 px-2 text-[10px]">Free</span>
                    <span className="badge badge-green py-0.5 px-2 text-[10px]">Secure</span>
                    <span className="badge badge-blue py-0.5 px-2 text-[10px]">No Signup</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-0">
                Batch convert images between JPG, PNG, and WebP formats. Optimize quality for web usage in seconds.
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
                  Your images are processed securely and deleted automatically. We value your privacy and data security.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label mb-4 text-xs font-bold uppercase tracking-wider text-orange-600">Quick Steps</p>
              <ol className="space-y-4">
                {[
                  "Upload images (JPG, PNG, WebP).",
                  "Choose the output format you need.",
                  "Adjust quality settings for optimization.",
                  "Click \"Convert\" and download your files."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #ea580c 0%, #db2777 100%)" }}
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
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                multiple onFiles={handleFiles}
                label="Drag & drop images to convert"
                sublabel="Convert any image to JPG, PNG, or WebP"
                icon={<FileImage className="w-10 h-10 text-orange-400 mb-2" />}
              />

              <div className="mt-6">
                <FileList files={files} onRemove={removeFile} />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-6 animate-fade-in text-left">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider text-[10px]">Output Format</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["jpg", "png", "webp"] as const).map((f) => (
                        <button key={f} onClick={() => setFormat(f)}
                          className={`py-3 px-2 rounded-xl border-2 text-sm font-bold uppercase transition-all ${format === f ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm" : "border-gray-100 text-gray-400 hover:border-orange-200"}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  {(format === "jpg" || format === "webp") && (
                    <div className="bg-gray-50/50 rounded-2xl p-6 border-2 border-dashed border-gray-100">
                      <label className="block text-sm font-bold text-gray-800 mb-3 flex justify-between uppercase tracking-wider text-[10px]">
                        Quality Optimization <span>{quality}%</span>
                      </label>
                      <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full accent-orange-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                      <p className="mt-3 text-[10px] text-gray-400 leading-relaxed">
                        Lower quality results in smaller file sizes. 80% is usually the "sweet spot" for web usage.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-4 font-medium font-medium">⚠️ {error}</div>}

              {files.length > 0 && status === "idle" && (
                <div className="mt-8 flex gap-4">
                  <button onClick={handleConvert} className="btn-primary flex-1 justify-center py-3 text-base" style={{ background: "linear-gradient(135deg, #ea580c 0%, #db2777 100%)" }}>
                    <RefreshCcw size={18} /> Convert to {format.toUpperCase()}
                  </button>
                  <button onClick={reset} className="btn-outline px-6">Clear All</button>
                </div>
              )}

              {status === "processing" && <div className="mt-8"><ProgressBar progress={progress} status="processing" label={`Converting to ${format.toUpperCase()}…`} /></div>}

              {status === "done" && downloadUrl && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <ProgressBar progress={100} status="done" />
                  <div className="flex gap-4">
                    <a href={downloadUrl} download={files.length === 1 ? `converted.${format}` : `converted_images.zip`} className="btn-primary flex-1 justify-center py-4 text-base shadow-lg" style={{ background: "linear-gradient(135deg, #ea580c 0%, #db2777 100%)" }}>
                      ⬇️ Download {files.length === 1 ? "Image" : "ZIP File"}
                    </a>
                    <button onClick={reset} className="btn-outline px-6">New Files</button>
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
