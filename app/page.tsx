import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const Process = dynamic(() => import("@/components/Process"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const IndustriesServed = dynamic(() => import("@/components/IndustriesServed"));
const Projects = dynamic(() => import("@/components/Projects"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FounderMessage = dynamic(() => import("@/components/FounderMessage"));
const ClientLogos = dynamic(() => import("@/components/ClientLogos"));
const Technologies = dynamic(() => import("@/components/Technologies"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const CallToAction = dynamic(() => import("@/components/CallToAction"));
const TextScrollDemo = dynamic(() => import("@/components/TextScrollDemo").then((m) => m.TextScrollDemo));

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: `${site.description} Based in ${site.location}. ${site.stats.teamMembers} team, ${site.stats.happyClients}+ happy clients, ${site.stats.projectsDelivered}+ projects delivered.`,
  openGraph: {
    title: `${site.name} — Web Development & Social Media Marketing`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: `${site.url}/logo.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [`${site.url}/logo.png`],
  },
  alternates: { canonical: site.url },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main>
        <Hero />
        <Stats />
        <TextScrollDemo />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <IndustriesServed />
        <Projects />
        <Testimonials />
        <FounderMessage />
        <ClientLogos />
        <Technologies />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
