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

const industries: { name: string; use: string; icon: LucideIcon }[] = [
  {
    name: "Automotive",
    use: "Dealer portals, warranty, claims, field teams",
    icon: Car,
  },
  {
    name: "Edtech",
    use: "Admissions, learning, student services",
    icon: GraduationCap,
  },
  {
    name: "SaaS",
    use: "Multi-tenant products, billing, onboarding",
    icon: Building2,
  },
  {
    name: "Healthcare",
    use: "Appointments, records, care coordination",
    icon: HeartPulse,
  },
  {
    name: "Fintech",
    use: "Onboarding, dashboards, compliance flows",
    icon: Landmark,
  },
  {
    name: "Real estate",
    use: "Listings, enquiries, agent operations",
    icon: Home,
  },
  {
    name: "E-commerce",
    use: "Storefronts, catalogues, order operations",
    icon: ShoppingBag,
  },
  {
    name: "Manufacturing",
    use: "Inventory, dealer ops, production tracking",
    icon: Factory,
  },
  {
    name: "Logistics",
    use: "Dispatch, tracking, partner portals",
    icon: Truck,
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="shell py-8 lg:py-10">
      <div className="rounded-[24px] border border-line bg-[#101010] p-5 sm:rounded-[30px] sm:p-8 lg:p-10">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <span className="section-badge">Industries</span>
            <h2 className="section-heading mt-5 max-w-[640px] text-balance">
              Built across industries,{" "}
              <span className="text-accent">not just demos</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
            The domain changes the details: compliance, permissions, offline
            use, approval chains. We spend the first week learning yours.
          </p>
        </div>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ name, use, icon: Icon }) => (
            <div
              key={name}
              className="group flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-gradient-to-r hover:from-white/[0.08] hover:via-accent/[0.06] hover:to-white/[0.03] hover:shadow-[0_12px_28px_-12px_rgba(255,77,31,0.25)] cursor-default"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-white/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,77,31,0.45)]">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-white">
                  {name}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-white/40 transition-colors duration-200 group-hover:text-white/65">
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
