import type { Metadata } from "next";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import AboutHero from "@/components/about/AboutHero";
import StatsSection from "@/components/about/StatsSection";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhyClients from "@/components/about/WhyClients";
import DifferenceSection from "@/components/about/DifferenceSection";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import CallToAction from "@/components/site/CallToAction";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "About JP Technology | Web & IT Agency",
  description:
    "JP Technology is a web and IT agency building business websites, custom CRM dashboards, native apps, SaaS platforms, and AI automation. Meet the team behind the work.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />
          <AboutHero />
        </div>
      </div>

      <main>
        <StatsSection />
        <WhoWeAre />
        <WhyClients />
        <DifferenceSection />
        <MissionVision />
        <TeamSection />
        <CallToAction />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
