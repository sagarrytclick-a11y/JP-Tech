import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us — ${site.name}`,
  description: `Learn about ${site.name}, our team of ${site.stats.teamMembers} experts, our journey since ${site.stats.foundedYear}, and our mission to help businesses grow online. ${site.location} based digital agency.`,
  openGraph: {
    title: `About ${site.name} — ${site.stats.teamMembers} Expert Digital Agency`,
    description: `${site.stats.projectsDelivered}+ projects delivered. ${site.stats.happyClients}+ happy clients. Founded by ${site.founder}.`,
    url: `${site.url}/about`,
    siteName: site.name,
    images: [{ url: `${site.url}/logo.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${site.name}`,
    description: `Digital agency with ${site.stats.teamMembers} experts serving ${site.stats.happyClients}+ clients.`,
    images: [`${site.url}/logo.png`],
  },
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
