import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { blogSeedPosts, type BlogPostView } from "@/lib/blog-seed";

type LeanBlog = Record<string, unknown>;

function toIsoDate(value: unknown): string {
  if (!value) return new Date().toISOString();
  const date = new Date(value as string | number | Date);
  return Number.isNaN(date.getTime())
    ? new Date().toISOString()
    : date.toISOString();
}

export function serializeBlog(doc: LeanBlog): BlogPostView {
  return {
    _id: String(doc._id ?? ""),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    content: String(doc.content ?? ""),
    category: String(doc.category ?? "Insights"),
    author: String(doc.author ?? "JP Technology Team"),
    authorRole: String(doc.authorRole ?? "Product & engineering"),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    coverTone: String(doc.coverTone ?? "orange"),
    readTime: Number(doc.readTime ?? 5),
    published: Boolean(doc.published),
    publishedAt: toIsoDate(doc.publishedAt),
    updatedAt: doc.updatedAt ? toIsoDate(doc.updatedAt) : undefined,
  };
}

export async function getPublishedBlogs(limit = 50): Promise<{
  posts: BlogPostView[];
  source: "database" | "starter";
}> {
  try {
    await connectDB();
    const docs = await Blog.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    if (!docs.length) {
      return { posts: blogSeedPosts.slice(0, limit), source: "starter" };
    }

    return {
      posts: (docs as unknown as LeanBlog[]).map(serializeBlog),
      source: "database",
    };
  } catch {
    return { posts: blogSeedPosts.slice(0, limit), source: "starter" };
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPostView | null> {
  const normalized = slug.trim().toLowerCase();

  try {
    await connectDB();
    const doc = await Blog.findOne({ slug: normalized, published: true }).lean();
    if (doc) return serializeBlog(doc as unknown as LeanBlog);

    const publishedCount = await Blog.countDocuments({ published: true });
    if (publishedCount === 0) {
      return (
        blogSeedPosts.find(
          (post) => post.slug === normalized && post.published
        ) ?? null
      );
    }

    return null;
  } catch {
    return (
      blogSeedPosts.find((post) => post.slug === normalized && post.published) ??
      null
    );
  }
}

export async function getAllBlogsForAdmin() {
  await connectDB();
  const docs = await Blog.find({}).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return (docs as unknown as LeanBlog[]).map(serializeBlog);
}
