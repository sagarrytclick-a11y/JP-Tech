import type { Metadata } from "next";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
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
    <div className="min-h-screen overflow-x-hidden bg-ink">
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

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[900px] px-5 pb-14 pt-6 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-16 lg:pt-10">
            <span className="section-badge">Contact Us</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
              Let&apos;s build something{" "}
              <span className="text-accent">great together</span>
            </h1>
            <p className="section-copy mt-5">
              Have a project in mind or just want to explore what&apos;s
              possible? Share a few details and we&apos;ll get back within one
              business day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/40">
              <span>Discovery call</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Written scope</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>No obligation</span>
            </div>
          </section>
        </div>
      </div>

      <main>
        <ContactSection showHeader={false} />
      </main>

      <Footer />
    </div>
  );
}
