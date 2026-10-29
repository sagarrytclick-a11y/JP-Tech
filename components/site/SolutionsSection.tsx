import {
  ArrowRight,
  ArrowUpRight,
  ContactRound,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import ContactButton from "@/components/contact/ContactButton";

type Service = {
  title: string;
  description: string;
  fit: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Business Websites",
    description:
      "Fast, SEO-ready websites that make your business look credible and turn visitors into enquiries — not just another brochure online.",
    fit: "Brands, clinics, manufacturers & local businesses",
    icon: Globe,
  },
  {
    title: "CRM & Dashboards",
    description:
      "Custom pipelines, lead routing, reporting, and internal dashboards that replace spreadsheets and give your team one source of truth.",
    fit: "Sales, operations & service teams",
    icon: ContactRound,
  },
  {
    title: "Educational Platforms",
    description:
      "Admissions, learning, fee collection, and student portals for schools, colleges, and edtech products — built to handle real academic workloads.",
    fit: "Schools, colleges & edtech brands",
    icon: GraduationCap,
  },
  {
    title: "Native & Mobile Apps",
    description:
      "iOS, Android, and cross-platform apps with offline support, notifications, and clean UX for customers or field teams on the move.",
    fit: "Consumer products & on-ground teams",
    icon: Smartphone,
  },
  {
    title: "SaaS Platforms",
    description:
      "Multi-tenant products with subscriptions, role-based access, onboarding, and admin controls — architected to grow without a rewrite.",
    fit: "Product founders & B2B startups",
    icon: Layers,
  },
  {
    title: "AI Agents & Automation",
    description:
      "AI-assisted support, lead follow-up, document processing, and internal workflows that remove repetitive work from your team's day.",
    fit: "Teams buried in manual, repeatable tasks",
    icon: Sparkles,
  },
];

export default function SolutionsSection() {
  return (
    <section id="services" className="shell py-8 lg:py-10">
      <div className="text-center">
        <span className="section-badge">Services</span>
        <h2 className="section-heading mt-5 text-balance">
          One team. <span className="text-accent">Six ways to grow.</span>
        </h2>
        <p className="section-copy mt-4">
          From the website customers see to the systems your team runs on — we
          build the pieces, connect them, and keep improving them after launch.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1240px] gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-7">
        {services.map(({ title, description, fit, icon: Icon }) => (
          <article key={title} className="group relative">
            <div className="absolute left-1/2 top-0 z-20 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center rounded-[16px] border border-white/20 bg-[#0e0e0e] shadow-[0_12px_32px_rgba(0,0,0,0.6)] sm:h-[72px] sm:w-[72px]">
              <Icon
                size={25}
                strokeWidth={1.6}
                className="-rotate-45 text-white"
                aria-hidden="true"
              />
            </div>

            <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-white/[0.07] bg-[linear-gradient(160deg,#1e1e1e_0%,#171717_55%,#111111_100%)] px-6 pb-7 pt-14 text-center shadow-[0_24px_60px_-42px_rgba(0,0,0,0.95)] card-lift hover:border-accent/25">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-24 w-40 opacity-[0.09]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #ffffff 0 1px, transparent 1px 7px)",
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                }}
              />

              <h3 className="relative text-[19px] font-semibold tracking-[-0.01em] text-white sm:text-[21px]">
                {title}
              </h3>

              <div
                className="relative mx-auto mt-4 flex items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="h-[3px] w-7 rounded-full bg-accent" />
                <span className="h-[3px] w-4 rounded-full bg-accent" />
              </div>

              <p className="relative mx-auto mt-4 max-w-[340px] flex-1 text-[13px] leading-[1.7] text-white/55 sm:text-[14px]">
                {description}
              </p>

              <p className="relative mx-auto mt-5 max-w-[320px] text-[11.5px] leading-snug text-white/35">
                <span className="font-semibold text-white/55">Best for:</span>{" "}
                {fit}
              </p>

              <ContactButton className="relative mx-auto mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#262626] px-5 text-[13px] font-medium text-white/90 transition-colors duration-200 hover:bg-[#303030] hover:text-white">
                Discuss for Projects
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ContactButton>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-[1240px] flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-[#141414] px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
          <span className="font-semibold text-white">
            Have something different in mind?
          </span>{" "}
          Internal tools, marketplaces, API platforms — if it runs on the web, we
          can scope it.
        </p>
        <ContactButton className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:border-accent hover:text-accent">
          Scope a custom build
          <ArrowUpRight size={15} aria-hidden="true" />
        </ContactButton>
      </div>
    </section>
  );
}
