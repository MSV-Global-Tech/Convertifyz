import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF Online – Reduce PDF File Size Free",
  description:
    "Compress and reduce your PDF file size online for free while maintaining perfect quality. Fast, secure, and professional PDF compressor by Convertifyz.",
  keywords: ["compress pdf", "reduce pdf size", "shrink pdf online", "optimize pdf", "convertifyz"],
  alternates: {
    canonical: "/compress-pdf",
  },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
