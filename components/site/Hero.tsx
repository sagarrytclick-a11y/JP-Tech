import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Globe2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import Reveal from "@/components/ui/Reveal";
import TechStack from "@/components/site/TechStack";

type ProofPerson = { initials: string; tone?: string; image?: string };
const proof: ProofPerson[] = [
  {
    initials: "AR",
    image:
      "https://i.pinimg.com/736x/be/33/d7/be33d74d5d37d4e51bbf611d68c035b1.jpg",
  },
  {
    initials: "PN",
    image:
      "https://i.pinimg.com/736x/89/35/40/893540d004e2993b8dce8fb8e860dd29.jpg",
  },
  {
    initials: "SV",
    image:
      "https://i.pinimg.com/736x/7e/2e/b6/7e2eb69482be222a59778c72109f18ce.jpg",
  },
  {
    initials: "MK",
    image:
      "https://i.pinimg.com/736x/b5/06/8a/b5068a668715262328be193f3e6c7c36.jpg",
  },
];

const webChips = ["Next.js", "Headless CMS", "E-commerce"];

const consultingPoints = [
  "Cloud, DevOps & architecture",
  "Security and code reviews",
  "Monitoring & ongoing support",
];

function BrowserPreview() {
  return (
    <div className="w-full max-w-[330px] shrink-0 rounded-xl border border-line bg-panel-soft/70 p-2.5">
      <div className="overflow-hidden rounded-lg border border-line bg-panel shadow-sm">
        <div className="flex items-center gap-2 border-b border-line px-2.5 py-1.5">
          <div className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f87171]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
          </div>
          <div className="flex h-4 flex-1 items-center gap-1 rounded-sm bg-panel-soft px-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <span className="text-[7px] font-medium text-muted">
              jptechnologies.co
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_82px] gap-2.5 p-2.5">
          <div>
            <span className="block h-1.5 w-10 rounded-full bg-accent" />
            <div className="mt-2.5 h-2 w-full rounded-full bg-fg/15" />
            <div className="mt-1.5 h-2 w-3/4 rounded-full bg-fg/10" />
            <div className="mt-3 flex gap-1.5">
              <span className="h-4 w-12 rounded bg-accent" />
              <span className="h-4 w-10 rounded border border-line bg-panel" />
            </div>
          </div>
          <div className="flex items-end gap-1 rounded-md bg-accent/[0.08] p-1.5 ring-1 ring-inset ring-accent/15">
            {[42, 66, 52, 84, 70].map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={`flex-1 rounded-t-[2px] ${
                  index === 4 ? "bg-accent" : "bg-accent/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line bg-panel-soft/60">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="ml-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
          build.ts
        </span>
      </div>
      <div className="space-y-0.5 p-3 font-mono text-[10.5px] leading-[1.8]">
        <p>
          <span className="text-muted">const</span>{" "}
          <span className="text-fg">product</span> ={" "}
          <span className="text-accent">ship</span>
          <span className="text-fg">(</span>
          <span className="text-fg">scope</span>
          <span className="text-fg">);</span>
        </p>
        <p className="pl-3">
          <span className="text-muted">scale:</span>{" "}
          <span className="text-accent">true</span>
          <span className="text-fg">,</span>
        </p>
        <p className="pl-3">
          <span className="text-muted">handover:</span>{" "}
          <span className="text-emerald-400">&quot;docs&quot;</span>
        </p>
        <p className="text-muted">{"// built for the next 5 years"}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-accent/[0.05] via-transparent to-transparent">
      <div
        className="grid-texture pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,119,6,0.16),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="shell relative pt-8 sm:pt-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: text */}
          <div className="max-w-[640px]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted shadow-[0_1px_2px_rgba(9,13,22,0.05)] sm:text-[10.5px]">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="sm:hidden">Web &middot; Software &middot; IT Consulting</span>
                <span className="hidden sm:inline">
                  Web Development &middot; Custom Software &middot; IT Consulting
                </span>
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-6 text-balance text-[clamp(34px,4.6vw,58px)] font-semibold leading-[1.05] tracking-[-0.04em] text-fg">
                Websites, software &amp; IT systems built to{" "}
                <span className="relative inline-block bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
                  scale with you
                  <svg
                    viewBox="0 0 320 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1.5 left-0 h-[9px] w-full text-accent/60 sm:-bottom-2 sm:h-[11px]"
                  >
                    <path
                      d="M3 8.6C92 3.4 226 3.6 317 7.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 11.4C104 7.2 232 7.6 312 10.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity=".55"
                    />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 text-[14.5px] leading-[1.75] text-muted sm:text-[16px]">
                JP Technology is a senior product studio in Noida. We design and
                engineer high-converting websites, scalable custom software, and
                the IT systems behind them &mdash; with one accountable team from
                strategy to launch.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ContactButton className="btn-primary w-full sm:w-auto">
                  Book a Consultation
                  <ArrowUpRight size={16} aria-hidden="true" />
                </ContactButton>
                <Link href="/services" className="btn-light w-full sm:w-auto">
                  Learn More
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex -space-x-2" aria-hidden="true">
                  {proof.map((person) => (
                    <span
                      key={person.initials}
                      className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-ink text-[10px] font-bold ${
                        person.image ? "bg-panel" : person.tone
                      }`}
                    >
                      {person.image ? (
                        <Image
                          src={person.image}
                          alt={person.initials}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      ) : (
                        person.initials
                      )}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1.5 text-[11.5px] font-bold text-fg">
                      4.9/5
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-muted">
                    From 60+ founders and product teams
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: website preview mockup */}
          <Reveal delay={120} className="relative">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(245,176,20,0.35)]">
                <div className="flex items-center gap-2 border-b border-line bg-panel-soft px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                  </div>
                  <div className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-panel px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[11px] font-medium text-muted">jptechnologies.co</span>
                  </div>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-panel">
                  <Image
                    src="/hero.png"
                    alt="JP Technology website preview"
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-panel px-4 py-3 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Launch time</p>
                <p className="mt-1 text-[15px] font-bold text-fg">3-6 weeks</p>
              </div>
              <div className="absolute -top-4 -right-4 rounded-xl border border-line bg-panel px-4 py-3 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Lighthouse</p>
                <p className="mt-1 text-[15px] font-bold text-accent">98/100</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bento showcase */}
        <div className="mx-auto mt-8 grid max-w-[1180px] gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2" delay={80}>
            <article className="group flex h-full flex-col gap-6 rounded-2xl border border-line bg-panel p-6 shadow-[0_1px_2px_rgba(9,13,22,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_54px_-34px_rgba(9,13,22,0.4)] sm:flex-row sm:items-center sm:gap-6 sm:p-7">
              <div className="max-w-[300px]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                  <Globe2 size={18} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-fg">
                  Websites &amp; web apps
                </h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  High-converting marketing sites, portals and storefronts built
                  on Next.js &mdash; fast, SEO-ready and easy to edit.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {webChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-line bg-panel-soft px-2.5 py-1 text-[10px] font-semibold text-fg/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <BrowserPreview />
            </article>
          </Reveal>

          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2" delay={160}>
            <ContactButton className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-accent p-6 text-left text-accent-ink shadow-[0_24px_60px_-36px_rgba(217,119,6,0.95)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_74px_-34px_rgba(217,119,6,0.98)] sm:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border-[20px] border-white/15"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-white/10 blur-xl"
              />
              <div className="relative flex flex-1 flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-ink/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <Sparkles size={11} aria-hidden="true" />
                  Free 30-min call
                </span>
                <p className="mt-5 text-[23px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[25px]">
                  Have a project in mind? Let&apos;s scope it together.
                </p>
                <p className="mt-3 max-w-[280px] text-[12.5px] font-medium leading-relaxed text-accent-ink/75">
                  Bring your idea, bottleneck or rough brief. You&apos;ll leave
                  with a clear next step.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-accent-ink/15 pt-4 text-[10.5px] font-bold">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={12} aria-hidden="true" />
                    Reply within 24h
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                    No obligation
                  </span>
                </div>

                <figure className="mt-5 rounded-xl bg-accent-ink/[0.07] p-3.5 ring-1 ring-inset ring-accent-ink/10">
                  <blockquote className="text-[11.5px] font-medium leading-relaxed text-accent-ink/85">
                    &ldquo;They rebuilt our CRM in six weeks and the team
                    actually enjoys using it.&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[9.5px] font-bold uppercase tracking-[0.12em] text-accent-ink/60">
                    Priya N. &middot; Ops lead, SaaS
                  </figcaption>
                </figure>
              </div>
              <span className="relative mt-auto pt-6 inline-flex items-center gap-2 text-[13px] font-bold">
                Book a consultation
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </ContactButton>
          </Reveal>

          <Reveal delay={240}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-[0_1px_2px_rgba(9,13,22,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_54px_-34px_rgba(9,13,22,0.4)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                <Code2 size={18} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-fg">
                Custom software
              </h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                CRMs, dashboards, internal tools and SaaS platforms modelled
                around how your team actually works.
              </p>
              <CodePreview />
            </article>
          </Reveal>

          <Reveal delay={320}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-[0_1px_2px_rgba(9,13,22,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_54px_-34px_rgba(9,13,22,0.4)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                <ShieldCheck size={18} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-fg">
                IT consulting
              </h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                Practical guidance on architecture, cloud and reliability, so
                your systems stay fast and secure as you grow.
              </p>
              <ul className="mt-5 space-y-2">
                {consultingPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[11.5px] font-medium text-fg/75"
                  >
                    <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                      <Check size={10} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>

      <div className="mt-8 sm:mt-7">
        <TechStack />
      </div>
    </section>
  );
}
