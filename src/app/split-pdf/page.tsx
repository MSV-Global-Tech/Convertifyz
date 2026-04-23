import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF – Extract Pages Online Free",
  description:
    "Split a PDF into multiple files or extract specific pages online for free. Fast, secure PDF splitter by Convertifyz.",
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
