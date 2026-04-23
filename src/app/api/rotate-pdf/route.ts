import { NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const rotationStr = formData.get("rotation") as string;
    const pageRange = formData.get("pageRange") as string;

    if (!file || !rotationStr) {
      return NextResponse.json({ error: "File and rotation are required" }, { status: 400 });
    }

    const rotation = parseInt(rotationStr, 10);
    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const totalPages = pdf.getPageCount();

    const pagesToRotate = new Set<number>();
    
    if (pageRange.trim().toLowerCase() === "all" || !pageRange.trim()) {
      for (let i = 0; i < totalPages; i++) {
        pagesToRotate.add(i);
      }
    } else {
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
            for (let i = start; i <= limit; i++) pagesToRotate.add(i - 1);
          }
        } else {
          const page = parseInt(trimmed, 10);
          if (!isNaN(page) && page > 0 && page <= totalPages) {
            pagesToRotate.add(page - 1);
          }
        }
      }
    }

    const pages = pdf.getPages();
    for (let i = 0; i < pages.length; i++) {
      if (pagesToRotate.has(i)) {
        const page = pages[i];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotation) % 360));
      }
    }

    const pdfBytes = await pdf.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="rotated.pdf"',
      },
    });
  } catch (error) {
    console.error("Rotate PDF Error:", error);
    return NextResponse.json({ error: "Failed to rotate PDF" }, { status: 500 });
  }
}
