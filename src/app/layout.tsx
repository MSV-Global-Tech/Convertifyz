import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://convertifyz.msvglobaltech.com"),
  title: {
    default: "Convertifyz – Fast & Secure PDF and Image Tools",
    template: "%s | Convertifyz",
  },
  description:
    "Free online PDF and image conversion tools by Convertifyz. Developed by MSV Global Tech. Merge, split, compress, rotate PDFs and more.",
  keywords: [
    "PDF tools", "merge PDF", "split PDF", "compress PDF", "image to PDF",
    "PDF to image", "JPG to PNG", "WebP converter", "Convertifyz",
    "free PDF tools", "online file converter", "MSV Global Tech"
  ],
  openGraph: {
    title: "Convertifyz – Smart File Tools for Everyone",
    description: "All-in-one free PDF & image tools by MSV Global Tech. Fast, secure and easy to use.",
    siteName: "Convertifyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertifyz – Fast & Secure PDF and Image Tools",
    description: "Free PDF & image tools. Merge, split, compress, convert and more.",
  },
  alternates: {
    canonical: "https://convertifyz.msvglobaltech.com/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  applicationName: "Convertifyz",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Convertifyz",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#7c3aed",
  viewport: "width=device-width, initial-scale=1",
  robots: { index: true, follow: true },
  verification: {
    google: "n36OPTrnqmJFAiP4_eB88bR0rsUPxgmJcyqf6lK5ZJQ",
    other: {
      "msvalidate.01": [""],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Convertifyz",
  "operatingSystem": "All",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online PDF and image conversion tools by Convertifyz. Developed by MSV Global Tech. Merge, split, compress, rotate PDFs and more.",
  "publisher": {
    "@type": "Organization",
    "name": "MSV Global Tech",
    "url": "https://msvglobaltech.com"
  },
  "author": {
    "@type": "Organization",
    "name": "MSV Global Tech",
    "url": "https://msvglobaltech.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1024"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
