import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import os from "os";
import util from "util";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import archiver from "archiver";
import { PassThrough } from "stream";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string || "jpg";
    const dpi = parseInt(formData.get("dpi") as string || "150", 10);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    // For robust PDF to Image conversion, external tools like pdftocairo (Poppler) or Ghostscript are needed.
    // We will attempt to use Ghostscript, as it's common.

    const tempId = uuidv4();
    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `input_${tempId}.pdf`);
    const outputPrefix = path.join(tempDir, `output_${tempId}`);

    fs.writeFileSync(inputPath, Buffer.from(buffer));

    const isWindows = os.platform() === 'win32';
    const gsCmd = isWindows ? 'gswin64c' : 'gs';
    const gsDevice = format === "png" ? "png16m" : "jpeg";

    try {
      // %03d creates files like output_tempId_001.jpg, output_tempId_002.jpg
      const command = `${gsCmd} -dNOPAUSE -dQUIET -dBATCH -sDEVICE=${gsDevice} -r${dpi} -sOutputFile="${outputPrefix}_%03d.${format}" "${inputPath}"`;
      await execPromise(command);

      // Collect generated files
      const generatedFiles = fs.readdirSync(tempDir).filter(f => f.startsWith(`output_${tempId}`) && f.endsWith(`.${format}`));

      if (generatedFiles.length === 0) {
        throw new Error("No images generated");
      }

      // Create a ZIP archive
      const passThrough = new PassThrough();
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.on('error', (err) => { throw err; });
      archive.pipe(passThrough);

      generatedFiles.forEach((f) => {
        const filePath = path.join(tempDir, f);
        // Rename slightly for the user
        const newName = f.replace(`output_${tempId}_`, "page_");
        archive.file(filePath, { name: newName });
      });

      await archive.finalize();

      // Clean up async
      setTimeout(() => {
        try {
          fs.unlinkSync(inputPath);
          generatedFiles.forEach(f => fs.unlinkSync(path.join(tempDir, f)));
        } catch (e) {
          console.error("Cleanup error:", e);
        }
      }, 10000);

      // Convert passThrough stream to buffer for Next.js response
      const chunks: Buffer[] = [];
      for await (const chunk of passThrough) {
        chunks.push(chunk);
      }
      const zipBuffer = Buffer.concat(chunks);

      return new NextResponse(Buffer.from(zipBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="pdf_pages.zip"',
        },
      });

    } catch (gsError) {
      console.error("Ghostscript conversion error:", gsError);
      try { fs.unlinkSync(inputPath); } catch (e) { }
      return NextResponse.json({ error: "Conversion requires Ghostscript installed on the server." }, { status: 501 });
    }

  } catch (error) {
    console.error("PDF to Image Error:", error);
    return NextResponse.json({ error: "Failed to convert PDF to Image" }, { status: 500 });
  }
}
