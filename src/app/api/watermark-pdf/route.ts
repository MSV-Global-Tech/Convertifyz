import { NextResponse } from "next/server";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const text = formData.get("text") as string;
    const opacityStr = formData.get("opacity") as string;
    const fontSizeStr = formData.get("fontSize") as string;
    const colorHex = formData.get("color") as string;

    if (!file || !text) {
      return NextResponse.json({ error: "File and text are required" }, { status: 400 });
    }

    const opacity = opacityStr ? parseFloat(opacityStr) : 0.3;
    const fontSize = fontSizeStr ? parseInt(fontSizeStr, 10) : 48;
    
    // Parse hex color
    let r = 0, g = 0, b = 0;
    if (colorHex && colorHex.startsWith("#")) {
      const hex = colorHex.replace("#", "");
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16) / 255;
        g = parseInt(hex.substring(2, 4), 16) / 255;
        b = parseInt(hex.substring(4, 6), 16) / 255;
      }
    }

    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    
    const helveticaFont = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pages = pdf.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();
      const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
      const textHeight = helveticaFont.heightAtSize(fontSize);
      
      // Calculate center
      const x = width / 2 - textWidth / 2;
      const y = height / 2 - textHeight / 2;

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font: helveticaFont,
        color: rgb(r, g, b),
        opacity,
        rotate: degrees(45), // Diagonal watermark
      });
    }

    const pdfBytes = await pdf.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="watermarked.pdf"',
      },
    });
  } catch (error) {
    console.error("Watermark PDF Error:", error);
    return NextResponse.json({ error: "Failed to watermark PDF" }, { status: 500 });
  }
}
