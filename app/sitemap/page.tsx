import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sitemap",
  description:
    "Every page on the JP Technology website in one place — services, pricing, blog, careers, legal pages, and contact details.",
  path: "/sitemap",
});

type SitemapLink = { label: string; href: string; hint?: string };

const groups: Array<{ title: string; links: SitemapLink[] }> = [
  {
    title: "Main pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blogs" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "CRM & Dashboards", href: "/services/crm-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "SaaS Platforms", href: "/services/saas-development" },
      { label: "Internal Tools", href: "/services/internal-tools" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Explore the homepage",
    links: [
      { label: "Our work", href: "/#work" },
      { label: "Process", href: "/#process" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Resources & legal",
    links: [
      { label: "All articles", href: "/blogs" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <JsonLd
        id="sitemap-schema"
        data={[
          webPageSchema({
            name: "Sitemap — Every page on jptechnologies.co",
            description:
              "A quick directory of every page on the JP Technology website: services, pricing, blog, careers, and legal details.",
            path: "/sitemap",
            crumbs: [
              { name: "Home", path: "/" },
              { name: "Sitemap", path: "/sitemap" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sitemap", path: "/sitemap" },
          ]),
        ]}
      />
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12 lg:pb-20 lg:pt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Sitemap
            </p>
            <h1 className="mt-3 max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
              Every page, in one place.
            </h1>
            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/50 sm:text-[14.5px]">
              A quick directory of everything on this site — from our services and
              pricing to articles, careers, and the legal details.
            </p>
          </section>
        </div>
      </div>

      <main className="shell pb-14 pt-10 sm:pb-20 sm:pt-14">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <section className="card-lift h-full rounded-2xl border border-white/[0.07] bg-[#131313] p-5 sm:p-6">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-[13px] text-white/65 transition-colors hover:bg-white/[0.04] hover:text-white"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 sm:mt-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#131313] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-[14px] font-semibold text-white">
                Can&apos;t find what you need?
              </h2>
              <p className="mt-1 text-[12.5px] text-white/45">
                Tell us what you are looking for and we will point you to the right
                page — or answer directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/75 transition-colors hover:border-accent/40 hover:text-white"
              >
                <Mail size={13} aria-hidden="true" />
                {site.email}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-accent-soft"
              >
                Contact us
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
