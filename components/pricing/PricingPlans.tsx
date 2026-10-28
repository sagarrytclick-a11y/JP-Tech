import {
  Check,
  Code2,
  LayoutDashboard,
  PanelsTopLeft,
  Rocket,
  Settings2,
  Smartphone,
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
      "High-converting single-page website perfect for campaigns.",
    price: "9,999",
    cta: "Get Started",
    icon: Smartphone,
    features: [
      "Single Page Design",
      "Responsive Layout",
      "Basic SEO",
      "Contact Form",
      "Performance Optimized",
      "7 Days Support",
    ],
    excluded: [
      "Admin Dashboard",
      "Blog & CMS",
      "Dedicated Manager",
      "Ongoing Maintenance",
    ],
  },
  {
    name: "Business Website",
    description:
      "Professional multi-page site (5\u20137 pages) for small businesses.",
    price: "19,999",
    cta: "Get Started",
    icon: PanelsTopLeft,
    popular: true,
    features: [
      "5\u20137 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "Social Media Integration",
      "Google Maps Integration",
    ],
    excluded: [
      "Admin Dashboard",
      "Blog & CMS",
      "Dedicated Manager",
      "Ongoing Maintenance",
    ],
  },
  {
    name: "Premium Business",
    description: "Feature-rich website with advanced capabilities.",
    price: "34,999",
    cta: "Learn More",
    icon: Rocket,
    features: [
      "Everything in Business",
      "Blog & CMS",
      "Advanced SEO",
      "Admin Dashboard",
      "Performance Optimization",
      "Priority Support",
    ],
    excluded: [
      "E-commerce Ready",
      "Custom Integrations",
      "Dedicated Manager",
      "Ongoing Maintenance",
    ],
  },
  {
    name: "Custom MERN Website",
    description: "Full-stack MERN application tailored to your business.",
    price: "59,999",
    cta: "Get Started",
    icon: Code2,
    features: [
      "MERN Stack (MongoDB, Express, React, Node.js)",
      "Custom UI/UX Design",
      "RESTful API Development",
      "Authentication & Authorization",
      "Database Design & Management",
      "Admin Panel",
      "Third-Party Integrations",
      "Dedicated Team",
      "24/7 Support",
      "Ongoing Maintenance",
    ],
  },
  {
    name: "Admin Dashboard",
    description: "Powerful admin panel to manage your business operations.",
    price: "39,999",
    cta: "Get Started",
    icon: LayoutDashboard,
    features: [
      "Custom Dashboard Design",
      "User Management",
      "Data Visualization & Charts",
      "Role-Based Access Control",
      "Export & Reporting",
      "API Integration Ready",
      "Third-Party Integrations",
      "Dedicated Manager",
      "24/7 Support",
      "Ongoing Maintenance",
    ],
  },
  {
    name: "Custom Web Application",
    description:
      "End-to-end custom web application for complex business needs.",
    price: "79,999",
    suffix: "Starting",
    cta: "Get Started",
    icon: Settings2,
    features: [
      "Tailored Architecture",
      "Full-Stack Development",
      "Third-Party Integrations",
      "Advanced Security",
      "Dedicated Team",
      "Priority Support & SLA",
      "Custom Training",
      "Unlimited Revisions",
      "24/7 Support",
      "Ongoing Maintenance",
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

      <p className="mx-auto mt-8 max-w-[720px] text-center text-[12px] leading-relaxed text-white/45 sm:text-[13px]">
        All prices are one-time and exclusive of applicable taxes. Need a
        different scope?{" "}
        <ContactButton className="font-medium text-accent underline-offset-4 hover:underline">
          Talk to us
        </ContactButton>{" "}
        and we will put together a custom quote.
      </p>
    </section>
  );
}
