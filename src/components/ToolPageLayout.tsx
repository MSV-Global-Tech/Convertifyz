"use client";

import React from "react";
import Link from "next/link";

interface ToolPageLayoutProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  relatedTools?: { label: string; href: string; icon: string }[];
}

export default function ToolPageLayout({
  icon,
  iconBg,
  title,
  description,
  badge = "Free",
  children,
  relatedTools = [],
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf5ff 0%, #f8faff 60%, #fff 100%)" }}>
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        <div
          className="mx-auto mb-4 flex items-center justify-center animate-float"
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: iconBg,
            fontSize: 28,
            boxShadow: "0 8px 32px rgba(124,58,237,0.18)",
          }}
        >
          {icon}
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="badge badge-purple">{badge}</span>
          <span className="badge badge-green">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure
          </span>
          <span className="badge badge-blue">No Signup</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">{description}</p>
      </div>

      {/* Tool Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="card p-6 sm:p-8">{children}</div>

        {/* Security Note */}
        <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="text-blue-500 mt-0.5 flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800">Your files are safe</p>
            <p className="text-xs text-blue-600 mt-0.5">
              All files are processed securely and automatically deleted after processing. We never store your data.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-10">
            <p className="section-label mb-5">Related Tools</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="tool-card flex items-center gap-3 p-4"
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{t.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
