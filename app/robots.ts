import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Allow every public page and asset. Only private surfaces (admin, API) are
 * blocked. CSS/JS under /_next/ must stay crawlable for Google to render pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        // AI crawlers are welcome: they send referral traffic and citations.
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
