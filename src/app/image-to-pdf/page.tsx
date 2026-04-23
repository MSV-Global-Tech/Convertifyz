import type { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF – Convert JPG PNG WebP to PDF Free",
  description:
    "Convert JPG, PNG, and WebP images to PDF online for free. Batch convert multiple images into one PDF document instantly.",
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
