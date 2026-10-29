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

      <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3">
        {models.map((model) => (
          <article
            key={model.name}
            className={`card-lift relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
              model.featured
                ? "border-accent/40 bg-[linear-gradient(165deg,#24120d,#151515_60%)]"
                : "border-line bg-[#141414]"
            }`}
          >
            {model.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                Most flexible
              </span>
            )}

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
              {model.tagline}
            </p>
            <h3 className="mt-2 text-[21px] font-semibold text-white">
              {model.name}
            </h3>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[22px] font-semibold tracking-[-0.02em] text-white">
                {model.price}
              </span>
              <span className="text-[11px] text-white/35">{model.cadence}</span>
            </div>

            <p className="mt-3 text-[12.5px] leading-relaxed text-white/50">
              {model.description}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {model.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[12px] leading-snug text-white/65">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <ContactButton
              className={`mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition-colors ${
                model.featured
                  ? "bg-accent text-white hover:bg-accent-soft"
                  : "border border-white/15 text-white hover:border-accent hover:text-accent"
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
