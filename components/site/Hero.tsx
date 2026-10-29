import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import Reveal from "@/components/ui/Reveal";

function ScribbleUnderline() {
  return (
    <svg
      viewBox="0 0 600 22"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[9px] left-1/2 h-[15px] w-[108%] -translate-x-1/2 text-accent sm:-bottom-[11px] sm:h-[18px]"
    >
      <path
        d="M3 4.2C150 1.6 400 1.2 597 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".35"
      />
      <path
        d="M5 8.6C130 4.8 330 3.4 595 6.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".6"
      />
      <path
        d="M12 13.4C150 9 340 7.4 588 10.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".85"
      />
      <path
        d="M22 18.2C170 14.4 370 12.6 566 15.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

const capabilities = [
  "Business websites",
  "CRM dashboards",
  "Native apps",
  "AI automation",
];

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative mx-auto max-w-[1080px] px-5 pb-14 pt-6 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-10">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-accent/35 hover:text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Web &middot; CRM &middot; Apps &middot; AI
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-balance text-[clamp(31px,4.3vw,60px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
            Websites, CRMs &amp; mobile apps
            <br className="hidden sm:block" /> that{" "}
            <span className="relative inline-block">
              <span className="text-accent">do the heavy lifting</span>
              <ScribbleUnderline />
            </span>
            .
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-[820px] text-[14px] leading-[1.72] text-white/65 sm:mt-8 sm:text-[16px] lg:text-[17px]">
            JP Technology is a full-stack web and IT agency. We design, build,
            and maintain the products your business runs on &mdash; without the
            handoffs, guesswork, or template-first thinking.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <ContactButton className="btn-primary w-full sm:w-auto">
              Start a Project
            </ContactButton>
            <Link
              href="#work"
              className="btn-light inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              Explore Our Work
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-9 sm:gap-2.5">
            {capabilities.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11.5px] font-medium text-white/55 transition-all duration-200 hover:border-accent/35 hover:bg-accent/[0.06] hover:text-white/85 sm:text-[12px]"
              >
                {item}
              </span>
            ))}
            <span className="hidden text-[11.5px] text-white/35 sm:inline">
              &middot; one senior team, end to end
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
