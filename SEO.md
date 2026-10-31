# SEO setup — jptechnologies.co

Everything search engines and social platforms read is defined in two places:

- `lib/site.ts` — brand, phone, email, address, social profiles, domain.
- `lib/seo.ts` — canonical URLs, JSON-LD builders, shared page metadata helper.

Change the domain in `lib/site.ts` only. Every canonical, sitemap entry, RSS
link, Open Graph URL and schema `@id` derives from it.

## What is implemented

| Area | Where | Notes |
| --- | --- | --- |
| Title template | `app/layout.tsx` | `%s \| JP Technology`, 50–60 char page titles |
| Descriptions | each `page.tsx` | 140–160 char, unique per page |
| Canonical URLs | `lib/seo.ts` → `pageMetadata()` | Absolute, apex host, no trailing slash |
| Open Graph + Twitter | `lib/seo.ts` → `pageMetadata()` | 1200×630 image on every page |
| OG image | `app/opengraph-image.tsx` | Generated at build from brand fonts |
| robots.txt | `app/robots.ts` | Allows all public pages, blocks `/admin` and `/api` |
| sitemap.xml | `app/sitemap.ts` | Static pages + services + every published blog post |
| HTML sitemap | `app/sitemap/page.tsx` | Human-readable page directory |
| RSS feed | `app/feed.xml/route.ts` | Latest 50 posts |
| Web manifest | `app/manifest.ts` | Installable, theme colour, icons |
| Icons | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | 512 / 180 / 256 |
| Host redirects | `next.config.ts` | `www` and legacy `.com` → `https://jptechnologies.co` |
| Streaming metadata | `next.config.ts` | Disabled so tags always land in `<head>` |
| Admin noindex | `app/admin/layout.tsx` | `noindex, nofollow, nocache` |

## Structured data (JSON-LD)

| Schema | Pages |
| --- | --- |
| `Organization`, `WebSite`, `ProfessionalService` | every page (root layout) |
| `WebPage`, `AboutPage`, `ContactPage`, `CollectionPage` | matching page |
| `BreadcrumbList` | every page except home |
| `Service` + `FAQPage` | each `/services/*` page |
| `BlogPosting` | each `/blogs/*` article |
| `FAQPage` | home (matches the visible FAQ section) |
| `ItemList` | `/services` |

All blocks are emitted through `components/seo/JsonLd.tsx`, which escapes `<`
so user-authored blog content cannot break out of the script tag.

## Launch checklist

1. **Point the domain.** Add `jptechnologies.co` and `www.jptechnologies.co` in
   Netlify → Domain management. Keep the apex as primary; the `www` redirect in
   `next.config.ts` then handles the rest.
2. **Verify Google Search Console.**
   - Add the domain property `jptechnologies.co`.
   - Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Netlify env vars to the
     HTML-tag verification code (the tag is already wired in `app/layout.tsx`).
   - Submit `https://jptechnologies.co/sitemap.xml`.
3. **Verify Bing Webmaster Tools.** Set `NEXT_PUBLIC_BING_SITE_VERIFICATION`
   and submit the same sitemap.
4. **Google Business Profile.** Create/claim the Noida listing with the same
   name, address and phone as `lib/site.ts`, then add the profile URL to
   `site.social` and to `sameAs` in `lib/seo.ts`.
5. **LinkedIn.** Make sure the company page URL matches
   `site.social.linkedin`.
6. **Analytics.** Add GA4 or Plausible, then check `robots.txt` still allows it.
7. **Core Web Vitals.** Run PageSpeed Insights on `/`, `/services`, `/pricing`
   after the first deploy. Target LCP < 2.5s, CLS < 0.1, INP < 200ms.
8. **Rich results.** Validate `/`, one `/services/*` page and one `/blogs/*`
   page in the [Rich Results Test](https://search.google.com/test/rich-results).
9. **Reindexing.** In Search Console use URL Inspection → Request indexing for
   the home page and the five service pages.

## Adding content

- **New page:** create `app/<route>/page.tsx`, export metadata via
  `pageMetadata({ title, description, path })`, add the route to
  `staticEntries` in `app/sitemap.ts`, and add a `<JsonLd>` block.
- **New service:** add it to `lib/service-pages.ts`. The sitemap, the services
  page list and the `Service` schema all pick it up automatically.
- **New blog post:** publish it in `/admin`. It appears in the sitemap within
  one hour and in the RSS feed immediately.
- **New image:** give it meaningful `alt` text. Blog covers use the post title
  as alt text.

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
```

`NEXT_PUBLIC_SITE_URL` is optional. When it is empty, the site URL falls back to
Netlify's own `URL` build variable (the `*.netlify.app` domain), and finally to
`https://jptechnologies.co`. That means canonicals stay correct on the Netlify
domain today and switch to the real domain automatically once it is attached —
or immediately if you set `NEXT_PUBLIC_SITE_URL=https://jptechnologies.co`.

The two verification variables are optional; when empty the meta tags are omitted.

## Known follow-ups

- Replace `Abhishek@vidyavriddhi.com` with a domain email
  (`hello@jptechnologies.co`) once the mailbox exists — NAP consistency matters
  for local search.
- Add real social profiles (X, Instagram, GitHub) to `site.social` and to the
  `sameAs` arrays in `lib/seo.ts`.
- Add case studies with `CaseStudy`/`CreativeWork` schema once project pages
  exist; those are the strongest ranking asset for an agency.
