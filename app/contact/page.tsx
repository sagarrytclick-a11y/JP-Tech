import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import TechStack from "@/components/site/TechStack";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Book a Discovery Call",
  description:
    "Tell us about your project and book a discovery call with JP Technology in Noida. We build business websites, custom CRMs, educational platforms, and custom web applications.",
  path: "/contact",
  ogTitle: "Contact JP Technology — Book a Discovery Call",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <JsonLd
        id="contact-schema"
        data={[
          webPageSchema({
            name: "Contact JP Technology — Book a Discovery Call",
            description:
              "Share a few details about your project and we will get back within one business day.",
            path: "/contact",
            type: "ContactPage",
            crumbs: [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <TopBar />
      <Navbar />

          <section className="relative mx-auto max-w-[900px] px-5 pb-14 pt-6 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-16 lg:pt-10">
            <span className="section-badge">Contact Us</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-fg">
              Let&apos;s build something{" "}
              <span className="text-accent">great together</span>
            </h1>
            <p className="section-copy mt-5">
              Have a project in mind or just want to explore what&apos;s
              possible? Share a few details and we&apos;ll get back within one
              business day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-fg/65">
              <span>Discovery call</span>
              <span className="h-1 w-1 rounded-full bg-fg/20" />
              <span>Written scope</span>
              <span className="h-1 w-1 rounded-full bg-fg/20" />
              <span>No obligation</span>
            </div>
          </section>
      <main>
        <ContactSection showHeader={false} />
      </main>

      {/* Office location — Google Maps embed */}
      <section
        aria-labelledby="office-map-title"
        className="shell pb-12 pt-2 lg:pb-16"
      >
        <div className="overflow-hidden rounded-[24px] border border-line bg-panel sm:rounded-[28px]">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
            <div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                Our office
              </span>
              <h2
                id="office-map-title"
                className="mt-2 text-[20px] font-semibold tracking-[-0.01em] text-fg sm:text-[22px]"
              >
                Find us in Noida
              </h2>
              <p className="mt-1.5 flex max-w-[560px] items-start gap-2 text-[12.5px] leading-[1.6] text-muted">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {site.address}
              </p>
            </div>

            <a
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-line bg-panel-soft px-4 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent sm:self-auto"
            >
              Get directions
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="relative h-[320px] border-t border-line bg-panel-soft sm:h-[380px] lg:h-[440px]">
            <iframe
              title={`${site.name} office location on Google Maps`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                site.address
              )}&z=15&hl=en&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <TechStack />

      <Footer />
    </div>
  );
}
