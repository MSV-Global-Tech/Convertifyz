import type { Metadata } from "next";
import PdfToImageClient from "./PdfToImageClient";

export const metadata: Metadata = {
  title: "PDF to Image – Convert PDF to JPG or PNG Free",
  description:
    "Convert PDF pages into high-quality JPG or PNG images online for free. Extract every page as a crisp image instantly. Fast and secure by Convertifyz.",
  keywords: ["pdf to image", "convert pdf to jpg", "pdf to png", "extract images from pdf", "convertifyz"],
  alternates: {
    canonical: "/pdf-to-image",
  },
};

export default function PdfToImagePage() {
  return <PdfToImageClient />;
}
