import type { Metadata } from "next";
import ImageConverterClient from "./ImageConverterClient";

export const metadata: Metadata = {
  title: "Image Converter – Convert JPG, PNG, WebP Online Free",
  description:
    "Bulk convert images between JPG, PNG, and WebP formats online for free. Fast, secure, and lossless batch image conversion by Convertifyz.",
  keywords: ["image converter", "jpg to png", "png to jpg", "webp converter", "batch image conversion", "convertifyz"],
};

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
