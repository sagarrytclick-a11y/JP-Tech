import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { blogSchema, normalizeTags, type BlogInput } from "@/lib/blog-validation";
import { getAllBlogsForAdmin, serializeBlog } from "@/lib/blogs";
import { slugify } from "@/lib/slug";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

function buildPayload(input: BlogInput) {
  const parsedDate = input.publishedAt ? new Date(input.publishedAt) : new Date();

  return {
    title: input.title,
    excerpt: input.excerpt || "",
    content: input.content,
    category: input.category || "Insights",
    author: input.author || "JP Technology Team",
    authorRole: input.authorRole || "Product & engineering",
    tags: normalizeTags(input.tags),
    coverTone: input.coverTone || "orange",
    readTime: input.readTime || 5,
    published: input.published ?? false,
    publishedAt: Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
  };
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await getAllBlogsForAdmin();
    return NextResponse.json({ posts });
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

    const post = await Blog.create({ ...buildPayload(parsed.data), slug });

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
