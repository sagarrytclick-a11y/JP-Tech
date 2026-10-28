import { NextRequest, NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = Number(searchParams.get("limit") || "12");
  const limit = Math.min(50, Math.max(1, Number.isFinite(limitParam) ? limitParam : 12));

  const { posts, source } = await getPublishedBlogs(limit);

  return NextResponse.json(
    { posts, source },
    { headers: { "Cache-Control": "no-store" } }
  );
}
