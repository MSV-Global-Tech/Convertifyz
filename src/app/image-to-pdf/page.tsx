import type { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF – Convert JPG, PNG, WebP to PDF Free",
  description:
    "Convert your images (JPG, PNG, WebP) into high-quality PDF documents online for free. Batch conversion supported. Fast and secure by Convertifyz.",
  keywords: ["image to pdf", "convert jpg to pdf", "png to pdf", "webp to pdf converter", "convertifyz"],
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
