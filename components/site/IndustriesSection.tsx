import {
  Building2,
  Car,
  Factory,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react";

const industries: {
  name: string;
  slug: string;
  use: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Automotive",
    slug: "automotive",
    use: "Dealer portals, warranty, claims, field teams",
    icon: Car,
  },
  {
    name: "Edtech",
    slug: "edtech",
    use: "Admissions, learning, student services",
    icon: GraduationCap,
  },
  {
    name: "SaaS",
    slug: "saas",
    use: "Multi-tenant products, billing, onboarding",
    icon: Building2,
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    use: "Appointments, records, care coordination",
    icon: HeartPulse,
  },
  {
    name: "Fintech",
    slug: "fintech",
    use: "Onboarding, dashboards, compliance flows",
    icon: Landmark,
  },
  {
    name: "Real estate",
    slug: "real-estate",
    use: "Listings, enquiries, agent operations",
    icon: Home,
  },
  {
    name: "E-commerce",
    slug: "ecommerce",
    use: "Storefronts, catalogues, order operations",
    icon: ShoppingBag,
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    use: "Inventory, dealer ops, production tracking",
    icon: Factory,
  },
  {
    name: "Logistics",
    slug: "logistics",
    use: "Dispatch, tracking, partner portals",
    icon: Truck,
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="shell py-5 lg:py-7">
      <div className="rounded-[24px] border border-line bg-gradient-to-br from-panel-soft to-accent/[0.06] p-5 sm:rounded-[30px] sm:p-8 lg:p-10">
        <div className="text-center">
          <span className="section-badge">Industries</span>
          <h2 className="section-heading mt-5 mx-auto max-w-[640px] text-balance">
            Built across industries,{" "}
            <span className="text-accent">not just demos</span>
          </h2>
          <p className="mt-4 mx-auto max-w-[640px] text-[13px] leading-relaxed text-fg/75 sm:text-[14px]">
            The domain changes the details: compliance, permissions, offline
            use, approval chains. We spend the first week learning yours.
          </p>
        </div>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ name, slug, use, icon: Icon }) => (
            <div
              key={name}
              id={`industries-${slug}`}
              className="group flex scroll-mt-28 items-start gap-3.5 rounded-xl border border-fg/[0.06] bg-fg/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-gradient-to-r hover:from-fg/[0.08] hover:via-accent/[0.06] hover:to-fg/[0.03] hover:shadow-[0_12px_28px_-12px_rgba(217,119,6,0.25)] cursor-default"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fg/[0.05] text-fg/75 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-fg group-hover:shadow-[0_0_15px_rgba(217,119,6,0.45)]">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-fg/85 transition-colors duration-200 group-hover:text-fg">
                  {name}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-fg/65 transition-colors duration-200 group-hover:text-fg/65">
                  {use}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
