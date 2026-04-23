import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF Online – Combine PDFs Fast & Secure",
  description:
    "Merge multiple PDF files into one document online for free. No signup required. Fast, secure, and professional PDF merger by Convertifyz.",
  keywords: ["merge pdf", "combine pdf online", "free pdf joiner", "merge documents", "convertifyz"],
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
