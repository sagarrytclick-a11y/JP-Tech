import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { blogSeedPosts } from "@/lib/blog-seed";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export async function POST() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();

    let imported = 0;
    let skipped = 0;

    for (const post of blogSeedPosts) {
      const exists = await Blog.exists({ slug: post.slug });
      if (exists) {
        skipped += 1;
        continue;
      }

      await Blog.create({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        authorRole: post.authorRole,
        tags: post.tags,
        coverTone: post.coverTone,
        coverImage: post.coverImage || "",
        readTime: post.readTime,
        published: post.published,
        publishedAt: new Date(post.publishedAt),
      });
      imported += 1;
    }

    return NextResponse.json({ imported, skipped });
  } catch (error) {
    console.error("Blog seed error:", error);
    return NextResponse.json(
      {
        error:
          "Could not import starter posts. Add MONGODB_URI to your environment and try again.",
      },
      { status: 503 }
    );
  }
}
