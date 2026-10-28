import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | JP Technology",
  description:
    "Tell us about your project and book a discovery call with JP Technology. We build business websites, custom CRMs, educational platforms, and custom web applications.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
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

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white sm:w-auto"
              >
                <Phone size={15} className="text-accent" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white sm:w-auto"
              >
                <Mail size={15} className="text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </section>
        </div>
      </div>

      <main>
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
