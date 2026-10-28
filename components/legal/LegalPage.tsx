import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import { site } from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export default function LegalPage({
  title,
  summary,
  updated,
  sections,
  other,
  children,
}: {
  title: string;
  summary: string;
  updated: string;
  sections: { id: string; title: string }[];
  other: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[900px] px-5 pb-12 pt-6 text-center sm:px-8 sm:pb-14 sm:pt-8 lg:pt-10">
            <span className="section-badge">Legal</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4vw,54px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
              {title}
            </h1>
            <p className="section-copy mx-auto mt-5 max-w-[680px]">{summary}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11.5px] text-white/40">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Last updated: {updated}
              </span>
              <Link
                href={other.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/60 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {other.label}
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <main className="shell py-10 lg:py-14">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[236px_1fr] lg:gap-10">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
              On this page
            </p>
            <nav aria-label="Sections" className="mt-3 space-y-0.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-[12.5px] leading-snug text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-xl border border-line bg-[#141414] p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Mail size={15} aria-hidden="true" />
              </span>
              <p className="mt-3 text-[13px] font-semibold text-white">
                Questions about this page?
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-white/45">
                Write to us and a person on the team will reply — usually within
                one business day.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-accent transition-opacity hover:opacity-80"
              >
                {site.email}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
          </aside>

          <article className="rounded-2xl border border-line bg-[#121212] p-6 sm:p-9">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-5 text-[11.5px] text-white/40">
              <ShieldCheck size={14} className="text-accent" aria-hidden="true" />
              Written in plain language. No legal maze.
            </div>

            <div className="mt-7 space-y-9">{children}</div>

            <div className="mt-10 border-t border-white/[0.06] pt-6 text-[12.5px] leading-relaxed text-white/45">
              <p>
                {site.legalName} &middot;{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-1">
                This page is provided for transparency. It does not replace the
                signed agreement that governs a specific project.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function LegalSectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-white sm:text-[20px]">
        {title}
      </h2>
      <div className="mt-2.5 space-y-3 text-[14px] leading-[1.8] text-white/60 sm:text-[14.5px]">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
          />
          <span className="text-[13.5px] leading-[1.7] text-white/60">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-accent underline-offset-4 transition-opacity hover:underline"
    >
      {children}
    </Link>
  );
}
