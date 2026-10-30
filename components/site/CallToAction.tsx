"use client";

import ContactButton from "@/components/contact/ContactButton";
import Reveal from "@/components/ui/Reveal";

function DoodleArrow() {
  return (
    <svg
      viewBox="0 0 160 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[36px] w-[100px] text-accent sm:h-[46px] sm:w-[130px] animate-doodle-arrow"
      aria-hidden="true"
    >
      {/* Hand-drawn arching curve */}
      <path
        d="M6 34C34 16 82 12 128 24"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M8 36C36 18 80 14 126 26"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Hand-drawn arrow head with doodle texture */}
      <path
        d="M106 14C114 19 126 24 130 28C124 37 120 46 118 56"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M108 16C114 20 124 25 128 29C122 36 118 44 116 52"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}

export default function CallToAction() {
  return (
    <section id="cta" className="shell py-10 lg:py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,#1f130e_0%,#141111_50%,#0c0c0c_100%)] px-6 py-9 shadow-[0_24px_70px_-25px_rgba(255,77,31,0.25)] transition-all duration-300 hover:border-accent/40 sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* Subtle decorative background ambient glow & floating bubbles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/[0.04] blur-2xl" />
            <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute left-1/3 top-6 h-3 w-3 rounded-full bg-accent/30 animate-ping" />
            <div className="absolute left-1/2 bottom-8 h-4 w-4 rounded-full bg-accent-soft/20 animate-pulse" />
          </div>

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* Left Content */}
            <div className="max-w-[760px]">
              <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[13.5px]">
                Bubbles in mind?
              </span>

              <h2 className="mt-2.5 text-[clamp(24px,3.2vw,44px)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
                Want to know how you can grow your business, speak to our expert
                strategists now.
              </h2>
            </div>

            {/* Right Action: Doodle Arrow + Button */}
            <div className="flex w-full flex-col items-center sm:w-auto sm:items-end">
              {/* Curved doodle arrow pointing toward button */}
              <div className="self-center pr-3 sm:self-end sm:pr-8">
                <DoodleArrow />
              </div>

              {/* Action Button matching theme */}
              <ContactButton className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(255,77,31,0.85)] transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_18px_40px_-14px_rgba(255,77,31,0.95)] hover:-translate-y-0.5 active:scale-95 sm:w-auto sm:px-10 sm:py-4 sm:text-[16px]">
                Let&apos;s Talk
              </ContactButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
