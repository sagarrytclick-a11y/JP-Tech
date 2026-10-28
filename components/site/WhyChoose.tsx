import Image from "next/image";
import {
  BadgeCheck,
  CalendarCheck2,
  Code2,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";

const highlights = [
  "Senior engineering team with direct communication & zero handoffs",
  "Weekly working demos, staging links, and transparent progress",
  "Production-ready security, RBAC, and performance built-in from day one",
  "Complete IP transfer: repo, designs, infra, and full ownership",
];



export default function WhyChoose() {
  return (
    <section id="why-choose" className="shell py-12 lg:py-16">
      {/* Section Heading */}
      <div className="text-center">
        <span className="section-badge">Why JP Technology</span>
        <h2 className="section-heading mt-5 text-balance">
          The difference is in <span className="text-accent">how we work</span>
        </h2>
        <p className="section-copy mt-4 max-w-2xl mx-auto">
          Most agencies can build a screen. Fewer can ask the right questions,
          keep you informed, and leave you with a product your team can actually
          operate.
        </p>
      </div>

      {/* Main Image + Narrative Hero Section (Matching Image Design) */}
      <div className="mt-10 grid gap-8 items-center rounded-2xl border border-line bg-[#141414] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Side: Large Featured Image */}
        <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] w-full lg:col-span-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <Image
            src="https://i.pinimg.com/736x/e6/8c/42/e68c42c5a2de16c8388891247d98e103.jpg" // Visual asset Image path
            alt="Pinterest Image"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to blend seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Right Side: Narrative Text & Bullet Highlights */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Built for scalability & clarity
          </span>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            We build modern software products that actually ship and scale.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            We don't just write code; we partner with your business to streamline
            workflows, eliminate technical debt, and build systems engineered for long-term growth.
          </p>

          {/* Bulleted Points */}
          <ul className="mt-6 space-y-3">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-xs sm:text-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>

          {/* Call to Action Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ContactButton className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent/90">
              Book a Discovery Call
            </ContactButton>
            <span className="text-xs text-white/40">
              20 min call • No sales pressure
            </span>
          </div>
        </div>
      </div>

     
    </section>
  );
}