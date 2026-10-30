import { ArrowUpRight, Check } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";

const models = [
  {
    name: "Launch project",
    tagline: "For a defined outcome",
    price: "From \u20b919,999",
    cadence: "fixed scope \u00b7 3\u20138 weeks",
    description:
      "A website, CRM MVP, or app with a clear finish line. Best when the scope is known and you want a predictable number.",
    points: [
      "Written scope + milestone plan",
      "Weekly demo builds",
      "30-day post-launch support",
      "Full code and design handover",
    ],
    featured: false,
  },
  {
    name: "Dedicated squad",
    tagline: "For an ongoing roadmap",
    price: "Custom monthly",
    cadence: "design + engineering \u00b7 monthly",
    description:
      "A product squad that keeps shipping month after month. Best for SaaS products and teams with a growing backlog.",
    points: [
      "Designer, engineers, and a lead",
      "Sprint board you can see",
      "Flexible priorities each month",
      "Pause or scale with notice",
    ],
    featured: true,
  },
  {
    name: "Build & support",
    tagline: "For products already live",
    price: "From \u20b915,000 / mo",
    cadence: "care plan \u00b7 monthly",
    description:
      "Monitoring, fixes, security, and a monthly hours bucket for improvements. Best when you have a product but no in-house dev team.",
    points: [
      "Uptime and error monitoring",
      "Security and dependency updates",
      "Monthly improvement hours",
      "Priority response window",
    ],
    featured: false,
  },
];

export default function EngagementSection() {
  return (
    <section id="engagement" className="shell py-8 lg:py-10">
      <div className="text-center">
        <span className="section-badge">Engagement models</span>
        <h2 className="section-heading mt-5 text-balance">
          Pick the shape that fits{" "}
          <span className="text-accent">your stage</span>
        </h2>
        <p className="section-copy mt-4">
          A first website and a scaling SaaS product need very different
          structures. We quote the model that makes sense, not the one that
          sounds biggest.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-3">
        {models.map((model) => (
          <article
            key={model.name}
            className={`group relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 ${
              model.featured
                ? "border-accent/40 bg-[linear-gradient(165deg,#24120d,#151515_60%)] shadow-[0_10px_30px_-10px_rgba(255,77,31,0.2)] hover:border-accent hover:bg-[linear-gradient(165deg,#341810,#191312_65%)] hover:shadow-[0_28px_60px_-20px_rgba(255,77,31,0.4)]"
                : "border-line bg-[#141414] hover:border-accent/50 hover:bg-gradient-to-b hover:from-[#241713] hover:via-[#171413] hover:to-[#101010] hover:shadow-[0_24px_50px_-20px_rgba(255,77,31,0.22)]"
            }`}
          >
            {/* Top ambient hover accent line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Header section with Badge cleanly integrated */}
            <div className="flex items-start justify-between gap-3 min-h-[28px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors duration-300 group-hover:text-accent">
                {model.tagline}
              </p>
              {model.featured ? (
                <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-md shadow-accent/30">
                  Most flexible
                </span>
              ) : (
                /* Empty placeholder to keep the exact same height across all card headers */
                <span className="invisible shrink-0 px-3 py-1 text-[10px]"></span>
              )}
            </div>

            <h3 className="mt-2 text-[21px] font-semibold text-white transition-colors duration-300 group-hover:text-white">
              {model.name}
            </h3>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[22px] font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-accent-soft">
                {model.price}
              </span>
              <span className="text-[11px] text-white/35">{model.cadence}</span>
            </div>

            <p className="mt-3 text-[12.5px] leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
              {model.description}
            </p>

            <ul className="mt-5 mb-6 flex-1 space-y-2">
              {model.points.map((point) => (
                <li
                  key={point}
                  className="group/point flex items-start gap-2.5 rounded-lg p-1.5 -mx-1.5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-transform duration-200 group-hover/point:scale-110">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[12px] leading-snug text-white/65 transition-colors duration-200 group-hover/point:text-white">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <ContactButton
              className={`mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
                model.featured
                  ? "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-soft hover:shadow-accent/40"
                  : "border border-white/15 text-white hover:border-accent hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {model.featured ? "Talk about a squad" : "Get a quote"}
              <ArrowUpRight size={14} aria-hidden="true" />
            </ContactButton>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-[12px] text-white/35">
        Not sure which one fits?{" "}
        <a
          href="/pricing"
          className="font-medium text-white/60 underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          Compare detailed pricing
        </a>{" "}
        or ask us on a 20-minute call.
      </p>
    </section>
  );
}