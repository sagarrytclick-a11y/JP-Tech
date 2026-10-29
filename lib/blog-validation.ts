import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(160),
  slug: z.string().trim().max(100).optional().or(z.literal("")),
  excerpt: z.string().trim().max(420).optional().or(z.literal("")),
  content: z.string().trim().max(20000).optional().default(""),
  category: z.string().trim().min(2).max(40).optional().or(z.literal("")),
  author: z.string().trim().max(80).optional().or(z.literal("")),
  authorRole: z.string().trim().max(80).optional().or(z.literal("")),
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  coverTone: z.string().trim().max(20).optional().or(z.literal("")),
  coverImage: z.string().trim().max(600).optional().or(z.literal("")),
  readTime: z.coerce.number().int().min(1).max(60).optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().optional().or(z.literal("")),
});

export type BlogInput = z.infer<typeof blogSchema>;

export function normalizeTags(tags: BlogInput["tags"]) {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function toBlogPayload(input: BlogInput) {
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
    coverImage: input.coverImage || "",
    readTime: input.readTime || 5,
    published: input.published ?? false,
    publishedAt: Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
  };
}
