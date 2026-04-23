import type { Metadata } from "next";
import RotatePdfClient from "./RotatePdfClient";

export const metadata: Metadata = {
  title: "Rotate PDF – Rotate PDF Pages Online Free",
  description:
    "Rotate PDF pages to portrait or landscape orientation online for free. Easy PDF rotation tool by Convertifyz.",
};

export default function RotatePdfPage() {
  return <RotatePdfClient />;
}
