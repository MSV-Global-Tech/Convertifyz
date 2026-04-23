import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const pageRange = formData.get("pageRange") as string;

    if (!file || !pageRange) {
      return NextResponse.json({ error: "File and page range are required" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const totalPages = pdf.getPageCount();

    // Parse page range (e.g. "1-3, 5")
    const pagesToExtract = new Set<number>();
    const parts = pageRange.split(",");
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        
        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start && start <= totalPages) {
          const limit = Math.min(end, totalPages);
          for (let i = start; i <= limit; i++) {
            pagesToExtract.add(i - 1); // 0-indexed
          }
        }
      } else {
        const page = parseInt(trimmed, 10);
        if (!isNaN(page) && page > 0 && page <= totalPages) {
          pagesToExtract.add(page - 1);
        }
      }
    }

    if (pagesToExtract.size === 0) {
      return NextResponse.json({ error: "Invalid page range" }, { status: 400 });
    }

    const newPdf = await PDFDocument.create();
    const pageIndices = Array.from(pagesToExtract).sort((a, b) => a - b);
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="split.pdf"',
      },
    });
  } catch (error) {
    console.error("Split PDF Error:", error);
    return NextResponse.json({ error: "Failed to split PDF" }, { status: 500 });
  }
}
