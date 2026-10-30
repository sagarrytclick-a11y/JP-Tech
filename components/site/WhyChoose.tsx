import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import CountUp from "@/components/ui/CountUp";

const highlights = [
  "Senior engineering team with direct communication & zero handoffs",
  "Weekly working demos, staging links, and transparent progress",
  "Production-ready security, RBAC, and performance built-in from day one",
  "Complete IP transfer: repo, designs, infra, and full ownership",
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="shell py-8 lg:py-10">
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

      {/* Main Image + Narrative Hero Section */}
      <div className="group mt-10 grid gap-8 items-center rounded-2xl border border-line bg-[#141414] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 transition-all duration-300 hover:border-accent/35 hover:bg-gradient-to-br hover:from-[#1c1514] hover:to-[#111111] hover:shadow-[0_25px_60px_-20px_rgba(255,77,31,0.16)]">
        {/* Left Side: Large Featured Image with Floating CountUp Metric Badges */}
        <div className="relative h-[320px] sm:h-[390px] lg:h-[440px] w-full lg:col-span-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <Image
            src="https://i.pinimg.com/736x/e6/8c/42/e68c42c5a2de16c8388891247d98e103.jpg"
            alt="JP Technology engineering in action"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Metric 1: 100% IP Ownership */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[270px] rounded-xl border border-white/15 bg-black/75 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-black/90 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <ShieldCheck size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[17px] font-bold leading-none text-white">
                  <CountUp value={100} suffix="%" duration={1600} />
                </p>
                <p className="mt-1 text-[11px] font-medium text-white/60">
                  IP Transfer &amp; Code Ownership
                </p>
              </div>
            </div>
          </div>

          {/* Floating Metric 2: Top Right Speed Badge */}
          <div className="absolute top-4 right-4 rounded-xl border border-white/15 bg-black/75 px-3.5 py-2 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-black/90 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Zap size={13} aria-hidden="true" />
              </span>
              <p className="text-[11.5px] font-medium text-white/90">
                Weekly Live Demos
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative Text & Bullet Highlights */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Built for scalability &amp; clarity
          </span>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl transition-colors duration-300 group-hover:text-white">
            We build modern software products that actually ship and scale.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            We don&apos;t just write code; we partner with your business to streamline
            workflows, eliminate technical debt, and build systems engineered for long-term growth.
          </p>

          {/* Bulleted Points with interactive hover background */}
          <ul className="mt-6 space-y-2">
            {highlights.map((item, idx) => (
              <li
                key={idx}
                className="group/item flex items-start gap-3 rounded-xl p-2.5 -mx-2.5 transition-all duration-200 hover:bg-white/[0.05] hover:translate-x-1 cursor-default"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-accent transition-transform duration-200 group-hover/item:scale-110"
                />
                <span className="text-xs sm:text-sm text-white/80 transition-colors duration-200 group-hover/item:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Call to Action Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ContactButton className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-soft hover:shadow-accent/40 active:scale-95">
              Book a Discovery Call
            </ContactButton>
            <span className="text-xs text-white/40">
              20 min call &bull; No sales pressure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}