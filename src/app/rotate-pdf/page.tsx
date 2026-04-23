import type { Metadata } from "next";
import RotatePdfClient from "./RotatePdfClient";

export const metadata: Metadata = {
  title: "Rotate PDF Online – Fix PDF Orientation Free",
  description:
    "Rotate PDF pages to the correct orientation online for free. Permanently fix upside-down or sideways PDFs. Fast and secure by Convertifyz.",
  keywords: ["rotate pdf", "reorient pdf", "flip pdf online", "fix pdf orientation", "convertifyz"],
  alternates: {
    canonical: "/rotate-pdf",
  },
};

export default function RotatePdfPage() {
  return <RotatePdfClient />;
}
