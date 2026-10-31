import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ContactRound,
  Globe,
  Layers,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import ContactButton from "@/components/contact/ContactButton";
import { servicePages } from "@/lib/service-pages";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, pageMetadata, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Websites, CRM, Apps & SaaS",
  description:
    "Explore JP Technology's services: business websites, custom CRM and dashboards, mobile apps, SaaS platforms, and internal tools built for growing businesses.",
  path: "/services",
  ogTitle: "Services — Websites, CRM, Apps & SaaS | JP Technology",
});

const icons: Record<string, LucideIcon> = {
  "web-development": Globe,
  "crm-development": ContactRound,
  "mobile-apps": Smartphone,
  "saas-development": Layers,
  "internal-tools": Workflow,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <JsonLd
        id="services-schema"
        data={[
          webPageSchema({
            name: "Services — Websites, CRM, Apps & SaaS",
            description:
              "Business websites, custom CRM and dashboards, mobile apps, SaaS platforms, and internal tools built by JP Technology.",
            path: "/services",
            type: "CollectionPage",
            crumbs: [
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          itemListSchema({
            name: "JP Technology services",
            items: servicePages.map((service) => ({
              name: service.eyebrow,
              path: `/services/${service.slug}`,
              description: service.summary,
            })),
          }),
        ]}
      />
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[1000px] px-5 pb-12 pt-6 text-center sm:px-8 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10">
            <span className="section-badge">Services</span>
            <h1 className="mt-4 text-balance text-[clamp(32px,4.5vw,58px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
              The systems behind a{" "}
              <span className="text-accent">business that runs</span>
            </h1>
            <p className="section-copy mt-5">
              Customer-facing websites, internal tools, and the products in
              between. Pick the piece you need first — we will help you sequence
              the rest.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ContactButton className="btn-primary w-full sm:w-auto">
                Talk to a senior builder
                <ArrowRight size={15} aria-hidden="true" />
              </ContactButton>
              <Link
                href="/pricing"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-white/12 px-6 text-[13px] font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white sm:h-[50px] sm:w-auto"
              >
                See pricing
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <main>
        <section className="shell py-8 lg:py-10">
          <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => {
              const Icon = icons[service.slug] ?? Layers;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-[#141414] p-5 transition-colors hover:border-accent/40 sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-[18px] font-semibold tracking-[-0.01em] text-white">
                    {service.eyebrow}
                  </h2>
                  <p className="mt-2 flex-1 text-[12.5px] leading-[1.7] text-white/45">
                    {service.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-accent">
                    Explore service
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}

            <div className="flex flex-col justify-between rounded-2xl border border-accent/20 bg-accent/[0.06] p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Not listed?
                </p>
                <h2 className="mt-3 text-[18px] font-semibold text-white">
                  Marketplaces, AI workflows, or a hybrid build
                </h2>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-white/45">
                  If it runs on the web, connects to your data, or needs a
                  mobile surface, we can scope it.
                </p>
              </div>
              <ContactButton className="mt-5 inline-flex h-9 w-full items-center justify-center rounded-lg bg-accent text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-soft">
                Describe your project
              </ContactButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
