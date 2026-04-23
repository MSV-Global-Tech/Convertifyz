import type { Metadata } from "next";
import ImageConverterClient from "./ImageConverterClient";

export const metadata: Metadata = {
  title: "Image Converter – JPG PNG WebP Converter Free",
  description:
    "Convert images between JPG, PNG, and WebP formats online for free. Batch image format converter by Convertifyz.",
};

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
