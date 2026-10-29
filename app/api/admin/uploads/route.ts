import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { isImageKitConfigured, uploadToImageKit } from "@/lib/imagekit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    provider: "imagekit",
    configured: isImageKitConfigured(),
    maxSize: MAX_BYTES,
  });
}

/**
 * Stores blog cover images in ImageKit. The database only keeps the URL.
 */
export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isImageKitConfigured()) {
    return NextResponse.json(
      {
        error:
          "Image uploads are unavailable because ImageKit is not configured. Add IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }

    const extension = EXTENSIONS[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Use a JPG, PNG, WebP, AVIF, or GIF image." },
        { status: 415 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image is too large. Keep it under 5 MB." },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;

    const url = await uploadToImageKit({
      buffer,
      fileName: filename,
      folder: "/blogs",
      mimeType: file.type,
    });

    return NextResponse.json(
      { url, size: buffer.byteLength, provider: "imagekit" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      {
        error:
          "Could not upload the image to ImageKit. Check your storage settings and try again.",
      },
      { status: 500 }
    );
  }
}
