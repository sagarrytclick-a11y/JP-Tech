import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

const SAFE_SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (
    !segments?.length ||
    segments.some((segment) => !SAFE_SEGMENT.test(segment) || segment.includes(".."))
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "uploads", ...segments);
  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];

  if (!contentType) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(file.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
