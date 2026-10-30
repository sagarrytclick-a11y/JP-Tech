import dynamic from "next/dynamic";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Hero from "@/components/site/Hero";
import PartnerSection from "@/components/site/PartnerSection";
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

const TestimonialsSection = dynamic(() =>
  import("@/components/site/TestimonialsSection")
);
const BlogPreview = dynamic(() => import("@/components/site/BlogPreview"));

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />
          <Hero />
        </div>
      </div>

      <main>
        <PartnerSection />
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
