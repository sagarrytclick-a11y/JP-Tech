import {
  Check,
  LayoutDashboard,
  PanelsTopLeft,
  Rocket,
  Settings2,
  Smartphone,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";

import ContactButton from "@/components/contact/ContactButton";

type Plan = {
  name: string;
  description: string;
  price: string;
  suffix?: string;
  cta: string;
  icon: LucideIcon;
  popular?: boolean;
  features: string[];
  excluded?: string[];
};

const plans: Plan[] = [
  {
    name: "Landing Page",
    description:
      "A focused single page for a launch, campaign, or new offer. Fast, mobile-first, and built to convert.",
    price: "9,999",
    cta: "Start here",
    icon: PanelsTopLeft,
    features: [
      "Single-page design",
      "Copy structure guidance",
      "Responsive build",
      "Contact / enquiry form",
      "Basic on-page SEO",
      "7 days of launch support",
    ],
    excluded: ["CMS or blog", "Custom integrations", "Care plan"],
  },
  {
    name: "Business Website",
    description:
      "A complete 5–7 page website for a service business that needs to look credible and capture enquiries.",
    price: "19,999",
    cta: "Get a quote",
    icon: Rocket,
    popular: true,
    features: [
      "5–7 custom pages",
      "Service & about pages",
      "Enquiry form + email alerts",
      "Google Maps & analytics",
      "On-page SEO setup",
      "30 days of support",
    ],
    excluded: ["Admin dashboard", "Blog & CMS", "Custom integrations"],
  },
  {
    name: "Growth Website",
    description:
      "For businesses that publish regularly and need the site connected to their sales process.",
    price: "34,999",
    cta: "Get a quote",
    icon: TrendingUp,
    features: [
      "10–15 pages + blog",
      "Editable CMS for your team",
      "Advanced SEO & schema",
      "CRM / WhatsApp integration",
      "Speed & accessibility pass",
      "60 days of support",
    ],
    excluded: ["Custom dashboard", "Mobile app", "Care plan"],
  },
  {
    name: "CRM & Dashboard",
    description:
      "A custom pipeline, admin panel, or internal tool that replaces spreadsheets and scattered follow-ups.",
    price: "39,999",
    cta: "Scope my CRM",
    icon: LayoutDashboard,
    suffix: "Starting",
    features: [
      "Custom data model & screens",
      "Leads, deals, tasks, reporting",
      "Role-based access control",
      "Export & activity history",
      "Email / WhatsApp notifications",
      "Admin walkthrough & docs",
    ],
  },
  {
    name: "Mobile App",
    description:
      "iOS and Android app for customers or field teams, built cross-platform unless native is genuinely needed.",
    price: "49,999",
    cta: "Discuss the app",
    icon: Smartphone,
    suffix: "Starting",
    features: [
      "iOS + Android from one codebase",
      "UI design & clickable prototype",
      "API and backend integration",
      "Push notifications",
      "Store submission support",
      "30 days of post-launch fixes",
    ],
  },
  {
    name: "SaaS Platform",
    description:
      "A multi-tenant product with subscriptions, onboarding, and the admin controls a real business needs.",
    price: "79,999",
    cta: "Plan the platform",
    icon: Settings2,
    suffix: "Starting",
    features: [
      "Multi-tenant architecture",
      "Subscriptions & billing hooks",
      "User roles & permissions",
      "Customer + admin portals",
      "Usage reporting",
      "Documented handover",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="shell py-12 lg:py-16">
      <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {plans.map(
          ({
            name,
            description,
            price,
            suffix,
            cta,
            icon: Icon,
            popular,
            features,
            excluded,
          }) => (
            <article
              key={name}
              className={`relative flex flex-col rounded-[18px] border bg-[linear-gradient(165deg,#1b1b1b_0%,#141414_60%,#101010_100%)] p-6 transition-colors duration-200 ${
                popular
                  ? "border-accent/70 shadow-[0_0_60px_-30px_rgba(255,77,31,0.55)]"
                  : "border-white/[0.08] hover:border-white/15"
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-accent/25">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    popular
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/[0.04] text-accent"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h2 className="text-[17px] font-semibold text-white sm:text-[18px]">
                  {name}
                </h2>
              </div>

              <p className="mt-3 min-h-[44px] text-[13px] leading-[1.65] text-white/55 sm:text-[14px]">
                {description}
              </p>

              <p className="mt-5 flex items-end gap-2 border-b border-white/[0.07] pb-5">
                <span className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[34px]">
                  <span className="mr-0.5 align-top text-[18px] font-medium text-white/70">
                    {"\u20b9"}
                  </span>
                  {price}
                </span>
                <span className="pb-0.5 text-[12px] font-medium text-white/45">
                  {suffix ?? "INR"}
                </span>
              </p>

              <ul className="mt-5 space-y-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-white/75"
                  >
                    <Check
                      size={14}
                      strokeWidth={2.6}
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}

                {excluded?.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-white/30"
                  >
                    <X
                      size={14}
                      strokeWidth={2.4}
                      className="mt-0.5 shrink-0 text-white/25"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <ContactButton
                  className={`inline-flex h-11 w-full items-center justify-center rounded-lg text-[13px] font-semibold transition-colors duration-200 ${
                    popular
                      ? "bg-accent text-white hover:bg-accent-soft"
                      : "border border-white/15 bg-white/[0.03] text-white/90 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {cta}
                </ContactButton>
              </div>
            </article>
          )
        )}
      </div>

      <div className="mx-auto mt-6 grid max-w-[1240px] gap-3 rounded-2xl border border-line bg-[#101010] p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {[
          {
            name: "AI automation",
            price: "From \u20b914,999",
            desc: "Lead scoring, reply drafts, document extraction.",
          },
          {
            name: "E-commerce",
            price: "From \u20b924,999",
            desc: "Catalogue, payments, shipping, order operations.",
          },
          {
            name: "Integrations",
            price: "From \u20b99,999",
            desc: "Payments, WhatsApp, ERP, accounting, logistics.",
          },
          {
            name: "Care plan",
            price: "From \u20b98,000 / mo",
            desc: "Monitoring, updates, backups, monthly improvements.",
          },
        ].map((addon) => (
          <div key={addon.name} className="rounded-xl bg-white/[0.02] p-4">
            <p className="text-[13px] font-semibold text-white">{addon.name}</p>
            <p className="mt-1 text-[12px] font-medium text-accent">
              {addon.price}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/45">
              {addon.desc}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-[720px] text-center text-[12px] leading-relaxed text-white/45 sm:text-[13px]">
        Project prices are one-time and exclusive of applicable taxes. Care
        plans are billed monthly. Need a different scope?{" "}
        <ContactButton className="font-medium text-accent underline-offset-4 hover:underline">
          Talk to us
        </ContactButton>{" "}
        and we will put together a custom quote.
      </p>
    </section>
  );
}
