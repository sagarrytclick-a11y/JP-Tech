import type { Metadata } from "next";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import PricingPlans from "@/components/pricing/PricingPlans";
import CallToAction from "@/components/site/CallToAction";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Websites, CRM & App Development",
  description:
    "Transparent starting prices for business websites, custom CRM dashboards, mobile apps, and SaaS platforms, plus AI automation, e-commerce, and care plans.",
  path: "/pricing",
  ogTitle: "Pricing — Websites, CRM & App Development | JP Technology",
});

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <JsonLd
        id="pricing-schema"
        data={[
          webPageSchema({
            name: "Pricing — Websites, CRM & App Development",
            description:
              "Transparent starting prices for websites, custom CRMs, mobile apps, and SaaS platforms.",
            path: "/pricing",
            crumbs: [
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[900px] px-5 pb-14 pt-6 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-16 lg:pt-10">
            <span className="section-badge">Pricing</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
              Simple, transparent <span className="text-accent">pricing</span>
            </h1>
            <p className="section-copy mt-5">
              One-time project pricing for websites, CRMs, dashboards, and
              custom platforms. No hidden charges, no surprises.
            </p>
          </section>
        </div>
      </div>

      <main>
        <PricingPlans />
        <CallToAction />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
