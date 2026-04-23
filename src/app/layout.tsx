import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://convertifyz.msvglobaltech.in"),
  title: {
    default: "Convertifyz – All-in-One PDF & Image Tools",
    template: "%s | Convertifyz",
  },
  description:
    "Free online PDF and image conversion tools by Convertifyz. Merge, split, compress, rotate PDFs. Convert images to PDF, JPG to PNG, WebP conversions and more.",
  keywords: [
    "PDF tools", "merge PDF", "split PDF", "compress PDF", "image to PDF",
    "PDF to image", "JPG to PNG", "WebP converter", "Convertifyz",
    "free PDF tools", "online file converter"
  ],
  openGraph: {
    title: "Convertifyz – Smart File Tools for Everyone",
    description: "All-in-one free PDF & image tools. Fast, secure and easy to use.",
    siteName: "Convertifyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertifyz",
    description: "Free PDF & image tools. Merge, split, compress, convert and more.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
