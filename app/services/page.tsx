import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services — ${site.name}`,
  description: `Web development, social media marketing, SEO, PPC, and web design services by ${site.name}. End-to-end digital solutions that drive measurable growth. Based in ${site.location}.`,
  keywords: [
    "web development services",
    "social media marketing agency",
    "SEO services",
    "PPC advertising",
    "web design company",
    "digital marketing services",
    site.location,
    site.name,
  ],
  openGraph: {
    title: `Digital Services — ${site.name}`,
    description: `From stunning websites to powerful marketing campaigns — end-to-end digital services.`,
    url: `${site.url}/services`,
    siteName: site.name,
    images: [{ url: `${site.url}/logo.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services — ${site.name}`,
    description: `Web development, social media, SEO, PPC, and design services.`,
    images: [`${site.url}/logo.png`],
  },
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
