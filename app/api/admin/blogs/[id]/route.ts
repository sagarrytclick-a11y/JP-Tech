import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { blogSchema, toBlogPayload, type BlogInput } from "@/lib/blog-validation";
import { serializeBlog } from "@/lib/blogs";
import { slugify } from "@/lib/slug";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

function buildPayload(input: BlogInput) {
  return toBlogPayload(input);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const post = await Blog.findById(id).lean();
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ post: serializeBlog(post as Record<string, unknown>) });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json({ error: "Could not load the post." }, { status: 503 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const parsed = blogSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid blog post." },
        { status: 400 }
      );
    }

    await connectDB();

    const update = buildPayload(parsed.data);
    const requestedSlug = slugify(parsed.data.slug || parsed.data.title);
    let slug = requestedSlug;

    if (slug) {
      let attempt = 1;
      while (await Blog.exists({ slug, _id: { $ne: id } })) {
        slug = `${requestedSlug}-${attempt}`;
        attempt += 1;
      }
    }

    const post = await Blog.findByIdAndUpdate(
      id,
      slug ? { ...update, slug } : update,
      { new: true, runValidators: true }
    ).lean();

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json({ post: serializeBlog(post as Record<string, unknown>) });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Could not update the post. Check the database connection." },
      { status: 503 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await connectDB();
    const post = await Blog.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json({ error: "Could not delete the post." }, { status: 503 });
  }
}
