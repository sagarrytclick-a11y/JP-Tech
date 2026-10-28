import { NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(
    { post },
    { headers: { "Cache-Control": "no-store" } }
  );
}
