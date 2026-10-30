import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 60, suffix: "+", label: "Products Shipped", desc: "Across web & mobile" },
  { value: 6, suffix: "+", label: "Years Building", desc: "Enterprise experience" },
  { value: 15, suffix: "+", label: "Industries Served", desc: "Diverse domains" },
  { value: 98, suffix: "%", label: "Client Retention", desc: "Repeat partnerships" },
];

export default function StatsSection() {
  return (
    <section className="shell py-8 lg:py-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:gap-4">
        {stats.map(({ value, suffix, label, desc }) => (
          <div
            key={label}
            className="group relative flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#121212] px-4 py-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-gradient-to-b hover:from-white/[0.08] hover:via-accent/[0.05] hover:to-[#121212] hover:shadow-[0_16px_36px_-16px_rgba(255,77,31,0.25)] cursor-default sm:px-5 sm:py-8"
          >
            {/* Top ambient hover accent line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <p className="text-[28px] font-bold tracking-tight text-white transition-all duration-300 group-hover:scale-105 group-hover:text-accent-soft sm:text-[34px]">
              <CountUp value={value} suffix={suffix} duration={1500} />
            </p>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover:text-white sm:text-[13px]">
              {label}
            </p>
            <p className="text-[11px] text-white/30 transition-colors duration-300 group-hover:text-white/60">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

