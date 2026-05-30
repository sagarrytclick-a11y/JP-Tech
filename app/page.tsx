import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import IndustriesServed from "@/components/IndustriesServed";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FounderMessage from "@/components/FounderMessage";
import ClientLogos from "@/components/ClientLogos";
import TeamSection from "@/components/TeamSection";
import Technologies from "@/components/Technologies";
import FAQSection from "@/components/FAQSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <IndustriesServed />
        <Projects />
        <Testimonials />
        <ClientLogos />
        <FounderMessage />
        <Technologies />
        <TeamSection />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
