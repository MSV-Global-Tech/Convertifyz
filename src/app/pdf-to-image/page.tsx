import type { Metadata } from "next";
import PdfToImageClient from "./PdfToImageClient";

export const metadata: Metadata = {
  title: "PDF to Image – Convert PDF Pages to JPG PNG Free",
  description:
    "Convert PDF pages to JPG or PNG images online for free. High quality PDF to image conversion by Convertifyz.",
};

export default function PdfToImagePage() {
  return <PdfToImageClient />;
}
