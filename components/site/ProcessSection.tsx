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
            className="card-lift group relative flex flex-col rounded-2xl border border-line bg-[#141414] p-5 hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-white/15 transition-colors group-hover:text-accent/40">
                {step.number}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/35">
                {step.duration}
              </span>
            </div>

            <h3 className="mt-5 text-[17px] font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/50">
              {step.description}
            </p>

            <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] leading-snug text-white/35">
              <span className="text-accent/70">You get:</span> {step.output}
            </p>

            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-[7px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#141414] lg:block"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
