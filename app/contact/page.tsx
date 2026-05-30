import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact Us — ${site.name}`,
  description: `Get in touch with ${site.name} for web development, social media marketing, SEO, and digital design services. ${site.phone} | ${site.email}. Based in ${site.location}.`,
  keywords: [
    "contact digital agency",
    "web development inquiry",
    "social media marketing contact",
    "get a website quote",
    site.phone,
    site.email,
    site.location,
    site.name,
  ],
  openGraph: {
    title: `Contact ${site.name}`,
    description: `Reach out to ${site.name} — we'd love to hear about your project.`,
    url: `${site.url}/contact`,
    siteName: site.name,
    images: [{ url: `${site.url}/logo.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us — ${site.name}`,
    description: `Get in touch with India's trusted digital agency.`,
    images: [`${site.url}/logo.png`],
  },
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
