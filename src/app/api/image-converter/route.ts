import { NextResponse } from "next/server";
import sharp from "sharp";
import archiver from "archiver";
import { PassThrough } from "stream";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const format = formData.get("format") as "jpg" | "png" | "webp";
    const quality = parseInt(formData.get("quality") as string || "80", 10);

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Files are required" }, { status: 400 });
    }

    if (files.length === 1) {
      // Single file, return the image directly
      const buffer = Buffer.from(await files[0].arrayBuffer());
      let pipeline = sharp(buffer);
      let mimeType = "";

      if (format === "jpg") {
        pipeline = pipeline.jpeg({ quality });
        mimeType = "image/jpeg";
      } else if (format === "png") {
        pipeline = pipeline.png({ quality }); // png quality in sharp is different, but we map it
        mimeType = "image/png";
      } else if (format === "webp") {
        pipeline = pipeline.webp({ quality });
        mimeType = "image/webp";
      }

      const outputBuffer = await pipeline.toBuffer();
      const originalName = files[0].name.substring(0, files[0].name.lastIndexOf('.'));

      return new NextResponse(Buffer.from(outputBuffer), {
        status: 200,
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `attachment; filename="${originalName}_converted.${format}"`,
        },
      });
    }

    // Multiple files, return a ZIP
    const passThrough = new PassThrough();
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.on('error', (err) => { throw err; });
    archive.pipe(passThrough);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      let pipeline = sharp(buffer);

      if (format === "jpg") pipeline = pipeline.jpeg({ quality });
      else if (format === "png") pipeline = pipeline.png(); 
      else if (format === "webp") pipeline = pipeline.webp({ quality });

      const outputBuffer = await pipeline.toBuffer();
      const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
      
      archive.append(outputBuffer, { name: `${originalName}_converted.${format}` });
    }

    await archive.finalize();

    const chunks: Buffer[] = [];
    for await (const chunk of passThrough) {
      chunks.push(chunk);
    }
    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="converted_images.zip"',
      },
    });

  } catch (error) {
    console.error("Image Converter Error:", error);
    return NextResponse.json({ error: "Failed to convert images" }, { status: 500 });
  }
}
