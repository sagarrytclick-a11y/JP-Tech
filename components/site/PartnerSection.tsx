const stats = [
  { value: "60+", label: "Products shipped" },
  { value: "6+", label: "Years building" },
  { value: "15+", label: "Industries served" },
  { value: "98%", label: "Client retention" },
];

export default function PartnerSection() {
  return (
    <section id="trust" className="shell py-8 lg:py-10">
      <div className="overflow-hidden rounded-[24px] border border-line bg-[#101010] sm:rounded-[30px]">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-5 py-6 text-center sm:px-6 ${
                index % 2 === 1 ? "border-l border-white/[0.06]" : ""
              } ${index > 1 ? "border-t border-white/[0.06] sm:border-t-0" : ""} ${
                index > 0 ? "sm:border-l sm:border-white/[0.06]" : ""
              }`}
            >
              <p className="text-[clamp(24px,2.6vw,34px)] font-semibold leading-none tracking-[-0.03em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40 sm:text-[12px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
