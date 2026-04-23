import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF – Reduce PDF File Size Free",
  description:
    "Compress and reduce your PDF file size online for free while maintaining quality. Fast PDF compressor by Convertifyz.",
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
