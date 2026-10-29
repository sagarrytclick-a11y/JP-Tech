import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { blogSchema, toBlogPayload } from "@/lib/blog-validation";
import { getAllBlogsForAdmin, getBlogsForAdmin, serializeBlog } from "@/lib/blogs";
import { slugify } from "@/lib/slug";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");

    if (!limitParam) {
      const posts = await getAllBlogsForAdmin();
      return NextResponse.json({ posts });
    }

    const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10);
    const requestedLimit = Number.parseInt(limitParam, 10);
    const requestedStatus = searchParams.get("status") || "all";
    const status =
      requestedStatus === "published" || requestedStatus === "draft"
        ? requestedStatus
        : "all";

    const data = await getBlogsForAdmin({
      page: Number.isFinite(requestedPage) ? requestedPage : 1,
      limit: Number.isFinite(requestedLimit) ? requestedLimit : 10,
      status,
      query: (searchParams.get("q") || "").trim(),
    });

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Blog list error:", error);
    return NextResponse.json(
      {
        error:
          "Blog storage is unavailable. Add MONGODB_URI to your environment and try again.",
      },
      { status: 503 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const parsed = blogSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid blog post." },
        { status: 400 }
      );
    }

    await connectDB();

    const base = slugify(parsed.data.slug || parsed.data.title) || `post-${Date.now()}`;
    let slug = base;
    let attempt = 1;
    while (await Blog.exists({ slug })) {
      slug = `${base}-${attempt}`;
      attempt += 1;
    }

    const post = await Blog.create({ ...toBlogPayload(parsed.data), slug });

    return NextResponse.json(
      { post: serializeBlog(post.toObject() as Record<string, unknown>) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json(
      { error: "Could not save the post. Check the database connection." },
      { status: 503 }
    );
  }
}
