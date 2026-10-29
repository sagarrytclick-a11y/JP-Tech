import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  HeartHandshake,
  Laptop,
  LineChart,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import CareerForm from "@/components/careers/CareerForm";
import ContactButton from "@/components/contact/ContactButton";
import { careerRoles } from "@/lib/careers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers | Build with JP Technology",
  description:
    "Join JP Technology. Open roles for frontend, backend, full stack, and mobile app developers in Noida. Build real products for real businesses.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Build with JP Technology",
    description:
      "Open roles for frontend, backend, full stack, and mobile app developers in Noida.",
    url: "/careers",
    type: "website",
  },
};

const values = [
  {
    icon: Code2,
    title: "Craft over theatre",
    copy: "We care about the quality of the work, not how impressive the status update sounds.",
  },
  {
    icon: Laptop,
    title: "Own the outcome",
    copy: "Small teams, direct client contact, and the freedom to fix what you notice.",
  },
  {
    icon: LineChart,
    title: "Learn in public",
    copy: "Reviews, demos, and honest feedback. You will not be the only person who knows how something works.",
  },
  {
    icon: HeartHandshake,
    title: "Sustainable pace",
    copy: "Plan properly, ship properly, go home. Crunch is a planning failure, not a badge.",
  },
];

const hiringSteps = [
  {
    title: "Application review",
    copy: "We read every application ourselves, usually within five working days.",
  },
  {
    title: "Intro call",
    copy: "A 25-minute conversation about your work, what you want next, and how we operate.",
  },
  {
    title: "Practical round",
    copy: "A small, paid or time-boxed exercise based on real product work — no whiteboard puzzles.",
  },
  {
    title: "Team conversation",
    copy: "Meet the people you would work with, ask the uncomfortable questions, then decide together.",
  },
];

type PageProps = {
  searchParams: Promise<{ position?: string | string[] }>;
};

export default async function CareersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requested = Array.isArray(params.position)
    ? params.position[0]
    : params.position;
  const defaultPosition = careerRoles.some(
    (role) => role.title === requested
  )
    ? requested!
    : "";

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[1100px] px-5 pb-12 pt-6 text-center sm:px-8 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10">
            <span className="section-badge">Careers</span>
            <h1 className="mt-4 text-balance text-[clamp(32px,4.6vw,60px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
              Build things that{" "}
              <span className="text-accent">actually run</span>
            </h1>
            <p className="section-copy mt-5">
              We are a small product team in Noida building websites, CRMs,
              mobile apps, and internal tools for businesses that need the work
              to hold up after launch.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} aria-hidden="true" />
                Noida / Hybrid
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{careerRoles.length} open roles</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Full-time</span>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#open-roles"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-[13px] font-semibold text-white transition-colors hover:bg-accent-soft sm:h-[50px] sm:w-auto"
              >
                See open roles
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#apply"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-white/12 px-6 text-[13px] font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white sm:h-[50px] sm:w-auto"
              >
                Apply directly
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </div>

      <main>
        <section className="shell py-8 lg:py-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="section-badge">Why here</span>
                <h2 className="section-heading mt-4 text-balance">
                  Small team. <span className="text-accent">Real ownership.</span>
                </h2>
              </div>
              <p className="max-w-[430px] text-[12.5px] leading-relaxed text-white/40">
                You will work on products with real users, not internal demos
                that never ship.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-line bg-[#141414] p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-[13.5px] font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-[1.65] text-white/40">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="open-roles" className="shell py-8 lg:py-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="section-badge">Open roles</span>
                <h2 className="section-heading mt-4 text-balance">
                  Pick your <span className="text-accent">surface</span>
                </h2>
              </div>
              <p className="max-w-[430px] text-[12.5px] leading-relaxed text-white/40">
                All roles are full-time and based in Noida with hybrid working.
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {careerRoles.map((role) => (
                <article
                  key={role.slug}
                  className="flex flex-col rounded-2xl border border-line bg-[#141414] p-5 transition-colors hover:border-white/20 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                        {role.team}
                      </p>
                      <h3 className="mt-1.5 text-[19px] font-semibold tracking-[-0.01em] text-white">
                        {role.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/40">
                      {role.experience}
                    </span>
                  </div>

                  <p className="mt-3 text-[12.5px] leading-[1.7] text-white/45">
                    {role.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 text-[10.5px] text-white/35">
                    <span>{role.type}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{role.location}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{role.salary}</span>
                    <Link
                      href={`/careers?position=${encodeURIComponent(role.title)}#apply`}
                      className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-accent transition-colors hover:text-accent-soft"
                    >
                      Apply
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shell py-8 lg:py-10">
          <div className="mx-auto max-w-[1200px] rounded-2xl border border-line bg-[#101010] p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="section-badge">Hiring process</span>
                <h2 className="section-heading mt-4 text-balance">
                  No mystery <span className="text-accent">rounds</span>
                </h2>
              </div>
              <p className="max-w-[420px] text-[12.5px] leading-relaxed text-white/40">
                Four steps, clear timelines, and a decision either way.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hiringSteps.map((step, index) => (
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

        <section id="apply" className="shell py-8 lg:py-10">
          <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <CareerForm key={defaultPosition} defaultPosition={defaultPosition} />

            <aside className="space-y-4">
              <div className="rounded-2xl border border-line bg-[#141414] p-5">
                <h2 className="text-[15px] font-semibold text-white">
                  What we look for
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "Work you can explain and defend.",
                    "Comfort with ambiguity and real constraints.",
                    "Care for the details users actually feel.",
                    "Direct, respectful communication.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[11.5px] leading-[1.6] text-white/45"
                    >
                      <Sparkles
                        size={11}
                        className="mt-1 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-5">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  <Users size={13} aria-hidden="true" />
                  Questions?
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-white/40">
                  Write to us with the role in the subject line. A real person
                  reads it.
                </p>
                <a
                  href={`mailto:${site.email}?subject=Careers%20at%20JP%20Technology`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-accent transition-colors hover:text-accent-soft"
                >
                  {site.email}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-5">
                <p className="text-[13px] font-semibold text-white">
                  Not seeing your role?
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/45">
                  Send your work anyway. We keep good people in mind for the next
                  opening.
                </p>
                <ContactButton className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg border border-white/15 text-[11.5px] font-semibold text-white/80 transition-colors hover:border-white/30">
                  Talk to us
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
