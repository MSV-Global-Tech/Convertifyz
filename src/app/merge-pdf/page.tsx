import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF – Combine PDFs Online Free",
  description:
    "Merge multiple PDF files into one document online for free. No signup required. Fast and secure PDF merger by Convertifyz.",
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
