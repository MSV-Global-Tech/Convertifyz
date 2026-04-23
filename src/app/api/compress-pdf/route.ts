import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import util from "util";
import { v4 as uuidv4 } from "uuid";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const quality = formData.get("quality") as "low" | "medium" | "high";

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    
    // Ghostscript is required for real PDF compression
    // For this demonstration/project, we'll try to find Ghostscript or fallback to a basic pdf-lib rebuild
    // which sometimes slightly reduces size by stripping unused objects
    
    try {
      // Create temp files
      const tempId = uuidv4();
      const tempDir = os.tmpdir();
      const inputPath = path.join(tempDir, `input_${tempId}.pdf`);
      const outputPath = path.join(tempDir, `output_${tempId}.pdf`);
      
      fs.writeFileSync(inputPath, Buffer.from(buffer));
      
      let gsQuality = "screen"; // low
      if (quality === "medium") gsQuality = "ebook";
      if (quality === "high") gsQuality = "printer";

      // Attempt to run ghostscript (gs on linux/mac, gswin64c on windows)
      const isWindows = os.platform() === 'win32';
      const gsCmd = isWindows ? 'gswin64c' : 'gs';
      
      try {
        await execPromise(`${gsCmd} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${gsQuality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`);
        
        const compressedBuffer = fs.readFileSync(outputPath);
        
        // Cleanup
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        
        return new NextResponse(compressedBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="compressed.pdf"',
          },
        });
      } catch (gsError) {
        // Fallback if Ghostscript is not installed: Use pdf-lib to just re-save
        // This won't compress images, but might strip some metadata/unused objects
        console.warn("Ghostscript not found, using basic pdf-lib fallback", gsError);
        fs.unlinkSync(inputPath);
        
        const { PDFDocument } = await import("pdf-lib");
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        // Setting useObjectStreams to true can reduce file size in PDF v1.5+
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
        
        return new NextResponse(Buffer.from(pdfBytes), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="compressed_basic.pdf"',
          },
        });
      }
    } catch (fsError) {
      console.error("FS Error:", fsError);
      return NextResponse.json({ error: "File system error during compression" }, { status: 500 });
    }
  } catch (error) {
    console.error("Compress PDF Error:", error);
    return NextResponse.json({ error: "Failed to compress PDF" }, { status: 500 });
  }
}
