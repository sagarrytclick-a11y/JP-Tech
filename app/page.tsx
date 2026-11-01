import dynamic from "next/dynamic";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import PartnerSection from "@/components/site/PartnerSection";
import ClienteleSection from "@/components/site/ClienteleSection";
import SolutionsSection from "@/components/site/SolutionsSection";
import BuildSection from "@/components/site/BuildSection";
import ProcessSection from "@/components/site/ProcessSection";
import DualMarqueeSlider from "@/components/site/DualMarqueeSlider";
import WhyChoose from "@/components/site/WhyChoose";
import EngagementSection from "@/components/site/EngagementSection";
import IndustriesSection from "@/components/site/IndustriesSection";
import FaqSection from "@/components/site/FaqSection";
import CallToAction from "@/components/site/CallToAction";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, siteDescription, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const TestimonialsSection = dynamic(() =>
  import("@/components/site/TestimonialsSection")
);
const BlogPreview = dynamic(() => import("@/components/site/BlogPreview"));

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <JsonLd
        id="home-schema"
        data={[
          webPageSchema({
            name: `${site.name} — ${site.tagline}`,
            description: siteDescription,
            path: "/",
          }),
          faqSchema(site.faqs),
        ]}
      />
      <TopBar />
      <Navbar />

      <main>
        <Hero />
        <PartnerSection />
        <ClienteleSection />
        <SolutionsSection />
        <BuildSection />
        <ProcessSection />
        <DualMarqueeSlider />
        <WhyChoose />
        <EngagementSection />
        <IndustriesSection />
        <TestimonialsSection />
        <BlogPreview />
        <FaqSection />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
