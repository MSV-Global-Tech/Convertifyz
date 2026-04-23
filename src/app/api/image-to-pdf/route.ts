import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const pageSize = formData.get("pageSize") as string || "A4";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Files are required" }, { status: 400 });
    }

    const pdf = await PDFDocument.create();

    // A4 default sizes in points (72 points per inch)
    const a4Width = 595.28;
    const a4Height = 841.89;
    const letterWidth = 612;
    const letterHeight = 792;

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      
      // We might need to process the image first if it's not a JPG/PNG that pdf-lib natively supports
      // WebP, for example, needs to be converted. We'll use sharp to standardize everything to JPEG
      const imageBuffer = await sharp(Buffer.from(buffer))
        .jpeg({ quality: 90 })
        .toBuffer();

      const image = await pdf.embedJpg(imageBuffer);
      const imgDims = image.scale(1);

      let page;
      if (pageSize === "fit") {
        page = pdf.addPage([imgDims.width, imgDims.height]);
        page.drawImage(image, { x: 0, y: 0, width: imgDims.width, height: imgDims.height });
      } else {
        const pWidth = pageSize === "Letter" ? letterWidth : a4Width;
        const pHeight = pageSize === "Letter" ? letterHeight : a4Height;
        page = pdf.addPage([pWidth, pHeight]);
        
        // Scale image to fit within page bounds, maintaining aspect ratio
        const scale = Math.min(pWidth / imgDims.width, pHeight / imgDims.height);
        // Leave a small margin
        const drawScale = scale * 0.9;
        
        const drawWidth = imgDims.width * drawScale;
        const drawHeight = imgDims.height * drawScale;
        
        const x = (pWidth - drawWidth) / 2;
        const y = (pHeight - drawHeight) / 2;
        
        page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
      }
    }

    const pdfBytes = await pdf.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="images_to_pdf.pdf"',
      },
    });
  } catch (error) {
    console.error("Image to PDF Error:", error);
    return NextResponse.json({ error: "Failed to convert images to PDF" }, { status: 500 });
  }
}
