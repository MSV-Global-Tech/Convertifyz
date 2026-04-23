"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const tools = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "Rotate PDF", href: "/rotate-pdf" },
  { label: "Watermark PDF", href: "/watermark-pdf" },
  { label: "Image to PDF", href: "/image-to-pdf" },
  { label: "PDF to Image", href: "/pdf-to-image" },
  { label: "Image Converter", href: "/image-converter" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav
      className="nav-glass sticky top-0 z-50"
      style={{ boxShadow: "0 1px 20px rgba(124,58,237,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={36} />
            <div>
              <span className="font-bold text-[15px] text-gray-900 leading-tight block">
                Convertifyz
              </span>
              <span className="text-[10px] font-semibold text-purple-600 leading-tight block tracking-wide uppercase">
                Tools
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1">
                Tools
                <svg
                  className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-purple-50 py-2 z-50"
                  style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.15)" }}
                >
                  {tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#features"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/#tools" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
              Get Started Free
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-purple-50 py-4 space-y-1">
            <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors" onClick={() => setOpen(false)}>
              Home
            </Link>
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {t.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/#tools" className="btn-primary w-full justify-center text-sm" onClick={() => setOpen(false)}>
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
