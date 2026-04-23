import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convertifyz – Fast & Secure PDF and Image Tools",
  description:
    "The ultimate free suite for all your file needs. Merge PDF, Split PDF, Compress PDF, and Convert Images online by MSV Global Tech. Fast, secure, 100% free, and no registration required.",
  keywords: [
    "free pdf tools", "online pdf editor", "merge pdf free", "split pdf online", 
    "compress pdf no loss", "image to pdf converter", "pdf to jpg high quality",
    "batch image converter", "secure file tools", "convertifyz", "MSV Global Tech"
  ],
  alternates: {
    canonical: "/",
  },
};

import {
  Link2,
  Scissors,
  Zap,
  RotateCw,
  Droplet,
  FileImage,
  Image as ImageIcon,
  RefreshCcw
} from "lucide-react";

const pdfTools = [
  {
    icon: <Link2 className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
    iconColor: "#7c3aed",
    label: "Merge PDF",
    desc: "Combine multiple PDFs into one seamless document in seconds.",
    href: "/merge-pdf",
    badge: "Popular",
    badgeColor: "badge-purple",
  },
  {
    icon: <Scissors className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #fce7f3 0%, #ffe4e6 100%)",
    iconColor: "#db2777",
    label: "Split PDF",
    desc: "Extract specific pages or split your PDF into multiple files.",
    href: "/split-pdf",
    badge: "Easy",
    badgeColor: "badge-pink",
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
    iconColor: "#2563eb",
    label: "Compress PDF",
    desc: "Reduce PDF file size while maintaining quality for easy sharing.",
    href: "/compress-pdf",
    badge: "Fast",
    badgeColor: "badge-blue",
  },
  {
    icon: <RotateCw className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)",
    iconColor: "#16a34a",
    label: "Rotate PDF",
    desc: "Rotate pages to the correct orientation — one or all at once.",
    href: "/rotate-pdf",
    badge: "Simple",
    badgeColor: "badge-green",
  },
  {
    icon: <Droplet className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #ffedd5 0%, #fef9c3 100%)",
    iconColor: "#ea580c",
    label: "Watermark PDF",
    desc: "Add text or image watermarks to protect your PDF documents.",
    href: "/watermark-pdf",
    badge: "Pro",
    badgeColor: "badge-orange",
  },
];

const convertTools = [
  {
    icon: <FileImage className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
    label: "Image to PDF",
    desc: "Convert JPG, PNG, WebP images to a professional PDF.",
    href: "/image-to-pdf",
    badge: "Batch",
    badgeColor: "badge-pink",
  },
  {
    icon: <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)",
    label: "PDF to Image",
    desc: "Export every PDF page as high-quality JPG or PNG images.",
    href: "/pdf-to-image",
    badge: "HQ",
    badgeColor: "badge-blue",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 sm:w-7 sm:h-7" />,
    iconBg: "linear-gradient(135deg, #ffedd5 0%, #fce7f3 100%)",
    label: "Image Converter",
    desc: "Convert JPG↔PNG↔WebP in bulk — fast and losslessly.",
    href: "/image-converter",
    badge: "Multi-Format",
    badgeColor: "badge-orange",
  },
];
const stats = [
  { value: "10M+", label: "Files Processed" },
  { value: "100%", label: "Free to Use" },
  { value: "0", label: "Files Stored" },
  { value: "256-bit", label: "SSL Encryption" },
];

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Process files in seconds using optimized server-side engines.",
  },
  {
    icon: "🔒",
    title: "Fully Secure",
    desc: "Files are auto-deleted after processing. Zero data retention.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    desc: "Fully responsive — use on desktop, tablet, or mobile.",
  },
  {
    icon: "🆓",
    title: "Always Free",
    desc: "No hidden fees, no subscription. All tools free forever.",
  },
  {
    icon: "🎯",
    title: "No Signup Needed",
    desc: "Just drag, drop, and download. No account required.",
  },
  {
    icon: "🚀",
    title: "Batch Processing",
    desc: "Handle multiple files simultaneously to save time.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 overflow-hidden">
        {/* Background blobs */}
        <div
          className="hero-blob"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, #7c3aed, #2563eb)",
            top: -150,
            right: -150,
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, #f97316, #ec4899)",
            bottom: -80,
            left: -80,
            opacity: 0.1,
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-4 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse inline-block" />
            Smart File Tools for Everyone
          </div>

          <h1
            className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3 animate-fade-in-up stagger-1"
            style={{ letterSpacing: "-0.02em" }}
          >
            All-in-One{" "}
            <span className="gradient-text">PDF & Image</span>
            <br />
            Tools Platform
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-6 animate-fade-in-up stagger-2">
            Fast, secure, and completely free tools by{" "}
            <span className="font-semibold text-purple-600">Convertifyz</span>. Merge, split,
            compress PDFs and convert images — no signup, no limits.
          </p>

          <div className="flex flex-row gap-2 sm:gap-4 justify-center animate-fade-in-up stagger-3">
            <Link href="/#tools" className="btn-primary text-[11px] sm:text-base px-3 py-2.5 sm:px-8 sm:py-3 whitespace-nowrap">
              🚀 Start for Free
            </Link>
            <Link href="/#tools" className="btn-outline text-[11px] sm:text-base px-3 py-2.5 sm:px-8 sm:py-3 whitespace-nowrap">
              Explore All Tools
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8 animate-fade-in-up stagger-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl sm:text-2xl font-extrabold gradient-text">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PDF Tools Grid ── */}
      <section id="tools" className="py-20 px-4 sm:px-12 lg:px-16 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-2">PDF Tools</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Everything You Need for PDFs
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Professional-grade PDF tools, free for everyone. No watermarks, no limits.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            {pdfTools.map((tool, i) => (
              <Link
                href={tool.href}
                key={tool.href}
                className="tool-card p-4 sm:p-8 flex flex-col gap-3 sm:gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="icon-container-sm sm:icon-container"
                    style={{ background: tool.iconBg }}
                  >
                    <span className="text-xl sm:text-2xl">{tool.icon}</span>
                  </div>
                  <span className={`badge ${tool.badgeColor} text-[9px] sm:text-[11px] px-2 py-0.5 sm:px-3 sm:py-1`}>{tool.badge}</span>
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5">{tool.label}</h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 leading-tight sm:leading-relaxed line-clamp-2">{tool.desc}</p>
                </div>
                <div className="mt-auto flex items-center text-purple-600 font-semibold text-[10px] sm:text-sm group-hover:gap-2 gap-1 transition-all">
                  Use Tool
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conversion Tools ── */}
      <section className="py-16 px-4 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Conversion Tools</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Convert Any File <span className="gradient-text-accent">Instantly</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Batch convert images and PDFs in multiple formats with one click.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            {convertTools.map((tool, i) => (
              <Link
                href={tool.href}
                key={tool.href}
                className="tool-card p-4 sm:p-8 flex flex-col gap-3 sm:gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
              >
                <div className="flex items-start justify-between">
                  <div className="icon-container-sm sm:icon-container" style={{ background: tool.iconBg }}>
                    <span className="text-xl sm:text-2xl">{tool.icon}</span>
                  </div>
                  <span className={`badge ${tool.badgeColor} text-[9px] sm:text-[11px] px-2 py-0.5 sm:px-3 sm:py-1`}>{tool.badge}</span>
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5">{tool.label}</h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 leading-tight sm:leading-relaxed line-clamp-2">{tool.desc}</p>
                </div>
                <div className="mt-auto flex items-center text-orange-500 font-semibold text-[10px] sm:text-sm gap-1">
                  Use Tool
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4 sm:px-12 lg:px-16 bg-gradient-to-b from-purple-50/40 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Built for Speed & Security
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We take privacy seriously. Your files never leave your control.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="card p-4 sm:p-8 animate-fade-in-up hover-scale flex flex-col items-center text-center group"
              >
                <div
                  className="icon-container mb-4"
                  style={{ background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)" }}
                >
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-[11px] sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO FAQ / Info Section ── */}
      <section className="py-20 px-4 sm:px-12 lg:px-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Professional File Tools for Every Workflow
          </h2>
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is Convertifyz really free?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Yes, Convertifyz is 100% free to use. Our goal is to provide high-quality PDF and image processing tools without the need for expensive subscriptions or software downloads. You can merge, split, and convert files as much as you need without paying a single cent.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">How secure are my documents?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Security is our top priority. All file processing is handled on high-performance, secure servers. Unlike other online tools, we never store your data. Files are automatically and permanently deleted the moment your download is complete.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-6 sm:p-8 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ultimate PDF Utility Suite</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Managing PDF documents shouldn&apos;t be a hassle. Whether you need to <strong>merge multiple reports</strong> into one file, <strong>split a large document</strong> into individual pages, or <strong>compress a PDF</strong> to meet email size limits, Convertifyz has you covered. Our platform also includes tools to rotate orientations and add protective watermarks to your professional files.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fastest Image Converter Online</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Need to convert images in bulk? Our <strong>Image Converter</strong> supports high-speed batch processing between JPG, PNG, and WebP formats. You can also export PDF pages as high-resolution images or create a single PDF document from a collection of photos instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-10 text-center text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
              boxShadow: "0 20px 50px rgba(124,58,237,0.2)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-16" />
            <div className="absolute w-40 h-40 rounded-full bg-white/5 -bottom-10 -left-10" />

            <div className="relative z-10">
              <p className="text-purple-200 font-semibold text-sm uppercase tracking-widest mb-3">
                Start Today — It&apos;s Free
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                Ready to Transform
                <br />
                Your Files?
              </h2>
              <p className="text-purple-100 mb-6 text-sm max-w-md mx-auto">
                Join thousands of users who trust Convertifyz for their daily file processing needs.
              </p>
              <Link
                href="/#tools"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-all hover:shadow-xl hover:scale-105"
              >
                🚀 Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
