import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import ContactButton from "@/components/contact/ContactButton";
import { site } from "@/lib/site";
import type { ServicePageData } from "@/lib/service-pages";

export default function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[1200px] px-5 pb-12 pt-6 sm:px-8 sm:pb-14 sm:pt-8 lg:px-10 lg:pb-16 lg:pt-10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[11px] text-white/35"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>
              <span>/</span>
              <span className="text-white/60">{data.eyebrow}</span>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
              <div>
                <span className="section-badge">{data.eyebrow}</span>
                <h1 className="mt-4 max-w-[760px] text-balance text-[clamp(32px,4.5vw,58px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
                  {data.title}{" "}
                  <span className="text-accent">{data.highlight}</span>
                </h1>
                <p className="mt-5 max-w-[680px] text-[14px] leading-[1.75] text-white/60 sm:text-[16px]">
                  {data.summary}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ContactButton className="btn-primary w-full sm:w-auto">
                    Discuss your project
                    <ArrowRight size={15} aria-hidden="true" />
                  </ContactButton>
                  <Link
                    href="/#work"
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg border border-white/12 px-6 text-[13px] font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white sm:h-[50px]"
                  >
                    See selected work
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  <Sparkles size={13} aria-hidden="true" />
                  At a glance
                </div>
                <div className="mt-4 divide-y divide-white/[0.07]">
                  {data.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="text-[20px] font-semibold tracking-[-0.02em] text-white">
                        {stat.value}
                      </span>
                      <span className="max-w-[190px] text-right text-[11px] leading-snug text-white/40">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[11.5px] text-white/45 transition-colors hover:text-white"
                >
                  <MessageSquare size={13} aria-hidden="true" />
                  {site.email}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <main>
        <section className="shell py-8 lg:py-10">
          <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-line bg-[#141414] p-6 sm:p-7">
              <span className="section-badge">Overview</span>
              <h2 className="mt-4 text-balance text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[28px]">
                What this actually looks like
              </h2>
              <p className="mt-4 text-[13.5px] leading-[1.75] text-white/55">
                {data.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {data.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10.5px] text-white/45"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/80">
                  Signs you need it
                </p>
                <ul className="mt-3 space-y-2.5">
                  {data.symptoms.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[12px] leading-[1.6] text-white/50">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/80">
                  What you get
                </p>
                <ul className="mt-3 space-y-2.5">
                  {data.outcomes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[12px] leading-[1.6] text-white/50">
                      <Check
                        size={12}
                        className="mt-0.5 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="shell py-8 lg:py-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="section-badge">Scope</span>
                <h2 className="section-heading mt-4 text-balance">
                  What we <span className="text-accent">build</span>
                </h2>
              </div>
              <p className="max-w-[460px] text-[12.5px] leading-relaxed text-white/40">
                Every project is scoped to your actual workflow. These are the
                common pieces — not a fixed package.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="card-lift rounded-2xl border border-line bg-[#141414] p-5 hover:border-accent/25"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-[10px] font-semibold tabular-nums text-accent ring-1 ring-inset ring-accent/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.65] text-white/45">
                    {feature.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shell py-8 lg:py-10">
          <div className="mx-auto max-w-[1200px] rounded-2xl border border-line bg-[#101010] p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="section-badge">Process</span>
                <h2 className="section-heading mt-4 text-balance">
                  How the work <span className="text-accent">moves</span>
                </h2>
              </div>
              <p className="max-w-[420px] text-[12.5px] leading-relaxed text-white/40">
                Short feedback loops, visible decisions, and a working build
                before the deadline conversation.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <span className="text-[10px] font-semibold tabular-nums text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-[13px] font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-[1.6] text-white/40">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell py-8 lg:py-10">
          <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <span className="section-badge">FAQ</span>
              <h2 className="section-heading mt-4 text-balance">
                Questions worth <span className="text-accent">asking</span>
              </h2>
              <div className="mt-5 divide-y divide-white/[0.07] rounded-2xl border border-line bg-[#141414] px-5">
                {data.faqs.map((faq) => (
                  <details key={faq.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13px] font-medium text-white/80 [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <ChevronDown
                        size={15}
                        className="mt-0.5 shrink-0 text-white/30 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-2.5 max-w-[720px] text-[12.5px] leading-[1.7] text-white/45">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  Related
                </p>
                <div className="mt-3 space-y-2">
                  {data.related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-accent/35"
                    >
                      <span className="flex items-center justify-between gap-2 text-[12.5px] font-semibold text-white/80 group-hover:text-white">
                        {item.label}
                        <ArrowUpRight
                          size={13}
                          className="text-white/30 transition-colors group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-white/35">
                        {item.copy}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-5">
                <p className="text-[13px] font-semibold text-white">
                  Not sure where this fits?
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/45">
                  Send a short brief. We will tell you what to build first, and
                  what can wait.
                </p>
                <ContactButton className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-accent text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-soft">
                  Start a conversation
                </ContactButton>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
