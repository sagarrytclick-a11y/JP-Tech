import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Pricing — ${site.name}`,
  description: `Transparent pricing for web development starting at ₹5,999 and social media marketing at ₹1,999/month by ${site.name}. No hidden fees, no surprises.`,
  keywords: [
    "website development cost",
    "social media marketing price",
    "digital marketing agency pricing",
    "affordable web development",
    "SEO services cost",
    site.location,
    site.name,
  ],
  openGraph: {
    title: `Affordable Pricing — ${site.name}`,
    description: `Website packages from ₹5,999. Social media from ₹1,999/month. Transparent pricing, no hidden fees.`,
    url: `${site.url}/pricing`,
    siteName: site.name,
    images: [{ url: `${site.url}/logo.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing — ${site.name}`,
    description: `Affordable digital services pricing. Websites from ₹5,999.`,
    images: [`${site.url}/logo.png`],
  },
  alternates: { canonical: `${site.url}/pricing` },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
