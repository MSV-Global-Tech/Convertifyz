import type { Metadata } from "next";
import WatermarkPdfClient from "./WatermarkPdfClient";

export const metadata: Metadata = {
  title: "Watermark PDF Online – Add Text to PDFs Free",
  description:
    "Add professional text watermarks to your PDF documents online for free. Protect your files with custom stamps. Secure and fast by Convertifyz.",
  keywords: ["watermark pdf", "add text to pdf", "stamp pdf online", "protect pdf document", "convertifyz"],
};

export default function WatermarkPdfPage() {
  return <WatermarkPdfClient />;
}
