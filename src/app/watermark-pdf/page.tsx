import type { Metadata } from "next";
import WatermarkPdfClient from "./WatermarkPdfClient";

export const metadata: Metadata = {
  title: "Watermark PDF – Add Text Watermark to PDF Free",
  description:
    "Add custom text watermarks to your PDF pages online for free. Protect your documents with Convertifyz.",
};

export default function WatermarkPdfPage() {
  return <WatermarkPdfClient />;
}
