import {
  Building2,
  HeartHandshake,
  Layers,
  Lightbulb,
  ReceiptText,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

const items: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Product-first mindset",
    copy: "Every decision starts with your users and business model — not a feature checklist.",
    icon: Lightbulb,
  },
  {
    title: "Transparent pricing & clear timelines",
    copy: "Fixed scope, milestone-based pricing, and delivery dates you can plan around.",
    icon: ReceiptText,
  },
  {
    title: "Startup & enterprise experience",
    copy: "From zero-to-one launches to large-scale rollouts across industries.",
    icon: Building2,
  },
  {
    title: "Architecture built to scale",
    copy: "Clean, secure foundations that stay fast as your product and team grow.",
    icon: Layers,
  },
  {
    title: "Founder-led involvement",
    copy: "You work directly with the people accountable for strategy and delivery.",
    icon: UserCheck,
  },
  {
    title: "Long-term partnership",
    copy: "Support, iteration, and care plans that continue well past launch.",
    icon: HeartHandshake,
  },
];

export default function DifferenceSection() {
  return (
    <section id="difference" className="shell overflow-x-clip py-12 lg:py-16">
      <div className="text-center">
        <span className="section-badge">Why JP Technology</span>
        <h2 className="section-heading mx-auto mt-5 max-w-[1100px] text-balance">
          What Makes{" "}
          <span className="text-accent">JP Technology Different</span>
        </h2>
        <p className="section-copy mt-4">
          Strategy, scalability, and execution aligned to your business goals.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
        {items.map(({ title, copy, icon: Icon }, index) => (
          <li key={title}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_24px_55px_-30px_rgba(217,119,6,0.55)] sm:p-6">
              {/* Soft accent glow on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <span
                aria-hidden="true"
                className="absolute right-5 top-5 text-[11px] font-semibold tabular-nums tracking-[0.16em] text-fg/25 transition-colors duration-300 group-hover:text-accent/70"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>

              <h3 className="mt-5 max-w-[240px] text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-fg">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted">
                {copy}
              </p>

              <span
                aria-hidden="true"
                className="mt-5 block h-[2px] w-8 rounded-full bg-accent/40 transition-all duration-300 group-hover:w-14 group-hover:bg-accent"
              />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
