import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import TechStack from "@/components/site/TechStack";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export default function LegalPage({
  title,
  summary,
  updated,
  path,
  sections,
  other,
  children,
}: {
  title: string;
  summary: string;
  updated: string;
  path: string;
  sections: { id: string; title: string }[];
  other: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <JsonLd
        id="legal-schema"
        data={[
          webPageSchema({
            name: title,
            description: summary,
            path,
            crumbs: [
              { name: "Home", path: "/" },
              { name: title, path },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
        ]}
      />
      <TopBar />
      <Navbar />

          <section className="relative mx-auto max-w-[900px] px-5 pb-12 pt-6 text-center sm:px-8 sm:pb-14 sm:pt-8 lg:pt-10">
            <span className="section-badge">Legal</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4vw,54px)] font-semibold leading-[1.08] tracking-[-0.025em] text-fg">
              {title}
            </h1>
            <p className="section-copy mx-auto mt-5 max-w-[680px]">{summary}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11.5px] text-fg/65">
              <span className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5">
                Last updated: {updated}
              </span>
              <Link
                href={other.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-fg/60 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {other.label}
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </section>
      <main className="shell py-10 lg:py-14">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[236px_1fr] lg:gap-10">
          <aside className="thin-scrollbar lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg/60">
              On this page
            </p>
            <nav aria-label="Sections" className="mt-3 space-y-0.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-[12.5px] leading-snug text-fg/75 transition-colors hover:bg-fg/[0.04] hover:text-fg"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-xl border border-line bg-panel p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Mail size={15} aria-hidden="true" />
              </span>
              <p className="mt-3 text-[13px] font-semibold text-fg">
                Questions about this page?
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-fg/70">
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

          <article className="rounded-2xl border border-line bg-panel p-6 sm:p-9">
            <div className="flex items-center gap-2 border-b border-fg/[0.06] pb-5 text-[11.5px] text-fg/65">
              <ShieldCheck size={14} className="text-accent" aria-hidden="true" />
              Written in plain language. No legal maze.
            </div>

            <div className="mt-7 space-y-9">{children}</div>

            <div className="mt-10 border-t border-fg/[0.06] pt-6 text-[12.5px] leading-relaxed text-fg/70">
              <p>
                {site.legalName} &middot;{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
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

      <TechStack />

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
      <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-fg sm:text-[20px]">
        {title}
      </h2>
      <div className="mt-2.5 space-y-3 text-[14px] leading-[1.8] text-fg/60 sm:text-[14.5px]">
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
          <span className="text-[13.5px] leading-[1.7] text-fg/60">
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
