import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Layers3,
  MessageSquare,
  Smartphone,
  Workflow,
} from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[236px] w-[124px] overflow-hidden rounded-[24px] border-[5px] border-[#2a2a2a] bg-[#0b0b0b] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#2a2a2a]" />
      <div className="flex h-full flex-col px-2.5 pb-3 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-1.5 w-10 rounded bg-white/25" />
            <div className="mt-1 h-1 w-6 rounded bg-white/10" />
          </div>
          <span className="h-5 w-5 rounded-full bg-accent/20" />
        </div>

        <div className="mt-3 rounded-lg bg-accent p-2">
          <div className="h-1 w-8 rounded bg-white/50" />
          <div className="mt-1.5 text-[10px] font-semibold leading-none text-white">
            ₹1.24L
          </div>
          <div className="mt-1 h-1 w-12 rounded bg-white/40" />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="rounded-md border border-white/[0.07] bg-white/[0.04] p-1.5"
            >
              <div className="h-1 w-6 rounded bg-white/20" />
              <div className="mt-1 h-1.5 w-8 rounded bg-white/30" />
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-1.5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5"
            >
              <span className="h-3 w-3 rounded-full bg-accent/25" />
              <span className="h-1 flex-1 rounded bg-white/15" />
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-around border-t border-white/[0.08] pt-2">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className={`h-1.5 w-3.5 rounded ${item === 0 ? "bg-accent" : "bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SmallPhoneMockup({ rotationClass }: { rotationClass: string }) {
  return (
    <div className={`relative h-[190px] w-[100px] overflow-hidden rounded-[20px] border-[4px] border-[#222222] bg-[#0b0b0b] opacity-65 shadow-2xl transition-all duration-300 hover:opacity-100 ${rotationClass}`}>
      <div className="absolute left-1/2 top-1 h-1 w-7 -translate-x-1/2 rounded-full bg-[#222222]" />
      <div className="flex h-full flex-col px-2 pb-2.5 pt-4">
        <div className="flex items-center justify-between">
          <div className="h-1 w-6 rounded bg-white/20" />
          <span className="h-3.5 w-3.5 rounded-full bg-accent/20" />
        </div>
        <div className="mt-2.5 rounded bg-accent/80 p-1.5">
          <div className="h-1 w-6 rounded bg-white/50" />
          <div className="mt-1 text-[9px] font-bold text-white">₹48K</div>
        </div>
        <div className="mt-2 space-y-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2.5 rounded bg-white/[0.04] p-1">
              <div className="h-0.5 w-full rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function BuildSection() {
  return (
    <section id="work" className="shell py-8 lg:py-10">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="section-badge">Capabilities</span>
          <h2 className="section-heading mt-5 max-w-[760px] text-balance">
            Built for the way your business{" "}
            <span className="text-accent">actually runs</span>
          </h2>
        </div>
        <p className="max-w-[380px] text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
          Product thinking, interface design, and engineering in one team. No
          thrown-over-the-wall handoffs, no half-finished dashboards.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-12">
        {/* 1. CRM & Operations Card with Image */}
        <article className="group relative overflow-hidden rounded-2xl border border-line bg-[#141414] transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-[#1f1714] hover:to-[#111111] hover:shadow-[0_24px_50px_-20px_rgba(255,77,31,0.2)] lg:col-span-7">
          {/* Top ambient hover accent line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="flex flex-wrap items-start justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                <Workflow size={13} aria-hidden="true" />
                CRM &amp; operations
              </span>
              <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-accent-soft sm:text-[22px]">
                One dashboard for the whole team
              </h3>
              <p className="mt-1.5 max-w-[420px] text-[12.5px] leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70 sm:text-[13px]">
                Leads, follow-ups, inventory, and reporting in a single flow
                &mdash; with permissions that match how you actually work.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Role-based access", "Live reports", "WhatsApp alerts"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[10.5px] text-white/50 transition-all duration-200 hover:border-accent/40 hover:bg-accent/15 hover:text-white cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
          
          {/* Replaced mockup with Next.js Image component */}
          <div className="relative mx-4 mb-4 h-[240px] sm:h-[280px] overflow-hidden rounded-xl border border-white/[0.06] sm:mx-5 sm:mb-5">
            <Image
              src="https://i.pinimg.com/1200x/b5/6a/37/b56a373a4b90512329c8a2fae8ada1de.jpg"
              alt="CRM Dashboard preview"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </article>

        {/* 2. Mobile Mockup Card */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-[linear-gradient(155deg,#191919,#0f0f0f)] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-[linear-gradient(155deg,#241611,#121111)] hover:shadow-[0_24px_50px_-20px_rgba(255,77,31,0.22)] sm:p-6 lg:col-span-5">
          {/* Top ambient hover accent line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              <Smartphone size={13} aria-hidden="true" />
              Native &amp; mobile
            </span>
            <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-accent-soft sm:text-[22px]">
              Your product, in their pocket
            </h3>
            <p className="mt-1.5 max-w-[320px] text-[12.5px] leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70 sm:text-[13px]">
              Offline-first flows, push notifications, and field-ready screens
              for customers and teams who are rarely at a desk.
            </p>
          </div>

          {/* Three Phones Aligned Design */}
          <div className="mt-5 flex items-end justify-center gap-2 sm:gap-4 overflow-hidden py-2">
            {/* Left Small Phone */}
            <div className="hidden sm:block -mr-6 translate-y-4 z-0 transition-transform duration-500 group-hover:-translate-y-1">
              <SmallPhoneMockup rotationClass="-rotate-6 origin-bottom-right" />
            </div>

            {/* Main Center Phone */}
            <div className="z-10 transition-transform duration-500 group-hover:-translate-y-2">
              <PhoneMockup />
            </div>

            {/* Right Small Phone */}
            <div className="hidden sm:block -ml-6 translate-y-4 z-0 transition-transform duration-500 group-hover:-translate-y-1">
              <SmallPhoneMockup rotationClass="rotate-6 origin-bottom-left" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <span className="text-[11px] text-white/35">
              iOS &middot; Android &middot; React Native
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/60">
              <CheckCircle2 size={12} className="text-accent" aria-hidden="true" />
              Store-ready
            </span>
          </div>
        </article>

        {/* 3. Websites that sell Card with Image */}
        <article className="group relative overflow-hidden rounded-2xl border border-line bg-[#141414] p-4 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-[#1e1714] hover:to-[#111111] hover:shadow-[0_20px_45px_-18px_rgba(255,77,31,0.2)] sm:p-5 lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,77,31,0.5)]">
              <Building2 size={15} aria-hidden="true" />
            </span>
            <h3 className="text-[15px] font-semibold text-white transition-colors duration-300 group-hover:text-accent-soft">
              Websites that sell
            </h3>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
            Sharp positioning, fast pages, and enquiry flows that actually get
            answered.
          </p>
          
          <div className="relative mt-4 h-[160px] w-full overflow-hidden rounded-xl border border-white/[0.06]">
            <Image
              src="https://i.pinimg.com/1200x/9f/c0/9e/9fc09eb782aec7e65ee4537ab8f7a3f2.jpg"
              alt="Websites that sell preview"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </article>

        {/* 4. Automation that follows up Card */}
        <article className="group relative overflow-hidden rounded-2xl border border-line bg-[#141414] p-4 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-[#1e1714] hover:to-[#111111] hover:shadow-[0_20px_45px_-18px_rgba(255,77,31,0.2)] sm:p-5 lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,77,31,0.5)]">
              <Bot size={15} aria-hidden="true" />
            </span>
            <h3 className="text-[15px] font-semibold text-white transition-colors duration-300 group-hover:text-accent-soft">
              Automation that follows up
            </h3>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
            AI agents qualify leads, draft replies, and nudge your team before
            anything goes cold.
          </p>

          <div className="mt-4 space-y-2">
            {[
              { label: "New enquiry", tone: "bg-white/10 text-white/70" },
              { label: "AI qualifies + scores", tone: "bg-accent/15 text-accent border border-accent/30" },
              { label: "Owner notified on WhatsApp", tone: "bg-white/10 text-white/70" },
            ].map((node, index) => (
              <div key={node.label} className="flex items-center gap-2">
                <span
                  className={`flex-1 rounded-lg px-2.5 py-1.5 text-[10.5px] font-medium transition-all duration-200 hover:scale-[1.02] hover:bg-accent/20 hover:text-white cursor-default ${node.tone}`}
                >
                  {node.label}
                </span>
                {index < 2 && (
                  <ArrowUpRight
                    size={11}
                    className="rotate-45 text-white/20 transition-transform duration-200 group-hover:text-accent/60"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </article>

        {/* 5. Everything connects Card */}
        <article className="group relative overflow-hidden rounded-2xl border border-line bg-[#141414] p-4 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-[#1e1714] hover:to-[#111111] hover:shadow-[0_20px_45px_-18px_rgba(255,77,31,0.2)] sm:p-5 lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,77,31,0.5)]">
              <Layers3 size={15} aria-hidden="true" />
            </span>
            <h3 className="text-[15px] font-semibold text-white transition-colors duration-300 group-hover:text-accent-soft">
              Everything connects
            </h3>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
            Payments, messaging, accounting, and legacy systems wired into the
            same product.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              "Razorpay",
              "Stripe",
              "WhatsApp",
              "Tally",
              "Google",
              "Zoho",
              "Shiprocket",
              "Custom APIs",
            ].map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] text-white/55 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/20 hover:text-white cursor-default"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-[10.5px] text-white/40 transition-colors duration-300 group-hover:border-accent/30 group-hover:text-white/70">
            <MessageSquare size={11} className="text-accent" aria-hidden="true" />
            If it has an API, we can connect it.
          </div>
        </article>
      </div>
    </section>
  );
}