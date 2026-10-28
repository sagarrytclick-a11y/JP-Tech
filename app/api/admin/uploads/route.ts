import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

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

/**
 * Stores blog cover images on disk and returns a URL served by
 * `/api/uploads/[...path]`. For multi-instance/serverless deployments swap this
 * for object storage (S3/R2/Cloudinary); the DB only stores the returned URL.
 */
export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
    const directory = path.join(process.cwd(), "uploads", "blogs");

    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, filename), buffer);

    return NextResponse.json(
      { url: `/api/uploads/blogs/${filename}`, size: buffer.byteLength },
      { status: 201 }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Could not upload the image. Please try again." },
      { status: 500 }
    );
  }
}
