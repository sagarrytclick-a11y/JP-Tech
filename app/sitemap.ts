import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blogs";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

/**
 * Regenerated hourly so newly published blog posts are picked up without a
 * redeploy. Static pages use a fixed date so `lastmod` stays meaningful.
 */
export const revalidate = 3600;

const CONTENT_UPDATED = new Date("2026-10-31T00:00:00.000Z");

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

const staticEntries: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPublishedBlogs(500);

  const serviceEntries: Entry[] = servicePages.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  const blogEntries: Entry[] = posts.map((post) => ({
    path: `/blogs/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries].map((entry) => ({
    url: new URL(entry.path, site.url).toString(),
    lastModified: entry.lastModified ?? CONTENT_UPDATED,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
