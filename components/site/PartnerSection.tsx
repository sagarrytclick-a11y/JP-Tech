import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 60, suffix: "+", label: "Products shipped", hint: "Web, SaaS & Apps" },
  { value: 6, suffix: "+", label: "Years building", hint: "Production systems" },
  { value: 15, suffix: "+", label: "Industries served", hint: "Global clients" },
  { value: 98, suffix: "%", label: "Client retention", hint: "Long-term partners" },
];

export default function PartnerSection() {
  return (
    <section id="trust" className="shell py-8 lg:py-10">
      <div className="overflow-hidden rounded-[24px] border border-line bg-[#0e0e0e] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)] sm:rounded-[30px]">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden px-5 py-7 text-center transition-all duration-300 hover:bg-gradient-to-b hover:from-white/[0.08] hover:via-accent/[0.05] hover:to-transparent cursor-default sm:px-6 sm:py-8 ${
                index % 2 === 1 ? "border-l border-white/[0.06]" : ""
              } ${index > 1 ? "border-t border-white/[0.06] sm:border-t-0" : ""} ${
                index > 0 ? "sm:border-l sm:border-white/[0.06]" : ""
              }`}
            >
              {/* Top ambient hover accent line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <p className="text-[clamp(26px,2.8vw,38px)] font-bold leading-none tracking-[-0.03em] text-white transition-all duration-300 group-hover:scale-105 group-hover:text-accent-soft">
                <CountUp value={stat.value} suffix={stat.suffix} duration={1500} />
              </p>

              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 group-hover:text-white sm:text-[12px]">
                {stat.label}
              </p>

              <p className="mt-1 text-[11px] text-white/30 transition-colors duration-300 group-hover:text-white/60">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

