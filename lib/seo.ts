import { site } from "@/lib/site";
import type { Metadata } from "next";
import type { BlogPostView } from "@/lib/blog-seed";

/**
 * Single source of truth for everything search engines read.
 * Keep the domain in `lib/site.ts` — every URL below is derived from it.
 */

export const SITE_URL = site.url;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/icon.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

export const siteDescription =
  "JP Technology is a web and IT agency in Noida, India building business websites, custom CRM dashboards, mobile apps, SaaS platforms, and AI automation for growing companies.";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function ogImage(alt: string) {
  return [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    },
  ];
}

/**
 * Builds a complete metadata object for a page so titles, canonicals, Open
 * Graph and Twitter cards never drift apart. `title` is rendered through the
 * root template (`%s | JP Technology`), `ogTitle` is used verbatim.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const fullTitle = ogTitle ?? `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      images: ogImage(fullTitle),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage(fullTitle),
    },
  };
}

export type Crumb = { name: string; path: string };

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress:
    "S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4",
  addressLocality: "Noida",
  addressRegion: "Uttar Pradesh",
  postalCode: "201301",
  addressCountry: "IN",
} as const;

const areaServed = [
  { "@type": "Country", name: "India" },
  { "@type": "Place", name: "Worldwide" },
] as const;

const knowsAbout = [
  "Web development",
  "Custom CRM development",
  "Dashboard development",
  "Mobile app development",
  "SaaS product development",
  "Internal tools development",
  "E-commerce development",
  "AI automation",
  "Educational platform development",
] as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: ["JP Technologies", "JPTech"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 512,
      height: 512,
      caption: site.name,
    },
    image: DEFAULT_OG_IMAGE,
    description: siteDescription,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    address: postalAddress,
    areaServed,
    knowsAbout,
    sameAs: [site.social.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneHref,
        email: site.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: siteDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: site.name,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    logo: LOGO_URL,
    description: siteDescription,
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5355,
      longitude: 77.391,
    },
    areaServed,
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs: [site.social.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: [
        "Web Development",
        "CRM & Dashboard Development",
        "Mobile App Development",
        "SaaS Platform Development",
        "Internal Tools Development",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/** Organization + website + local business in one @graph payload. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), localBusinessSchema()],
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(crumbs[crumbs.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
  crumbs,
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";
  crumbs?: Crumb[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: DEFAULT_OG_IMAGE,
    ...(crumbs?.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  features = [],
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  features?: { title: string; copy: string }[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: serviceType ?? name,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    provider: { "@id": ORGANIZATION_ID },
    areaServed,
    audience: { "@type": "BusinessAudience", name: "Growing businesses" },
    ...(features.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} deliverables`,
            itemListElement: features.map((feature) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: feature.title,
                description: feature.copy,
              },
            })),
          },
        }
      : {}),
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function itemListSchema({
  name,
  items,
}: {
  name: string;
  items: { name: string; path: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function articleSchema(post: BlogPostView) {
  const url = absoluteUrl(`/blogs/${post.slug}`);
  const image = post.coverImage
    ? /^https?:\/\//i.test(post.coverImage)
      ? post.coverImage
      : absoluteUrl(post.coverImage)
    : DEFAULT_OG_IMAGE;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en-IN",
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: `PT${Math.max(1, post.readTime)}M`,
    image: { "@type": "ImageObject", url: image, caption: post.title },
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: { "@id": ORGANIZATION_ID },
    },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
