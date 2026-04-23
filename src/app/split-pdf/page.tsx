import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF Online – Extract Pages Free & Fast",
  description:
    "Split a PDF into multiple files or extract specific pages online for free. Fast, secure, and professional PDF splitter by Convertifyz.",
  keywords: ["split pdf", "extract pdf pages", "pdf separator", "cut pdf online", "convertifyz"],
  alternates: {
    canonical: "/split-pdf",
  },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
