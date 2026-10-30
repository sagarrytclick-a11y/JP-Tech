const steps = [
  {
    number: "01",
    title: "Discover",
    duration: "Week 1",
    description:
      "A working session with the people who use the product. We map the current flow, the bottlenecks, and the outcome you want.",
    output: "Scope, success metrics, milestone plan",
  },
  {
    number: "02",
    title: "Design",
    duration: "Weeks 1–2",
    description:
      "Wireframes first, then interface design and a clickable prototype. You react to real screens, not a document.",
    output: "Flows, UI kit, clickable prototype",
  },
  {
    number: "03",
    title: "Build",
    duration: "Weekly sprints",
    description:
      "Staging link from sprint one. Weekly demos, a shared board, and decisions documented where everyone can see them.",
    output: "Working builds, demo notes, QA passes",
  },
  {
    number: "04",
    title: "Launch",
    duration: "Launch week",
    description:
      "Performance, security, analytics, and edge cases checked before go-live. Then a clean handover with access and docs.",
    output: "Production deploy, docs, handover",
  },
  {
    number: "05",
    title: "Support",
    duration: "Ongoing",
    description:
      "Monitoring, fixes, and the next round of improvements. Most clients keep us on for the roadmap after launch.",
    output: "Care plan, iteration backlog",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="shell py-8 lg:py-10">
      <div className="text-center">
        <span className="section-badge">How we work</span>
        <h2 className="section-heading mt-5 text-balance">
          A process you can <span className="text-accent">actually see</span>
        </h2>
        <p className="section-copy mt-4">
          No six-week silence, no surprise invoice. You get a visible plan, a
          weekly demo, and a team that answers in the same timezone as your
          problems.
        </p>
      </div>

      <div className="mt-9 grid gap-3 sm:mt-11 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {steps.map((step, index) => (
          <article
            key={step.number}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-[#141414] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:bg-gradient-to-b hover:from-[#241713] hover:via-[#181413] hover:to-[#111111] hover:shadow-[0_22px_48px_-18px_rgba(255,77,31,0.25)]"
          >
            {/* Top ambient hover accent line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="flex items-center justify-between">
              <span className="text-[26px] font-bold leading-none tracking-[-0.04em] text-white/15 transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                {step.number}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/35 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:text-accent-soft">
                {step.duration}
              </span>
            </div>

            <h3 className="mt-5 text-[17px] font-semibold text-white transition-colors duration-300 group-hover:text-accent-soft">
              {step.title}
            </h3>
            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
              {step.description}
            </p>

            <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] leading-snug text-white/35 transition-colors duration-300 group-hover:border-accent/20 group-hover:text-white/55">
              <span className="text-accent/70 group-hover:text-accent font-medium">You get:</span> {step.output}
            </p>

            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-[7px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#141414] transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-[#1a1413] lg:block z-10"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
