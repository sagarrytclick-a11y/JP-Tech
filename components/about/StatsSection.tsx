import {
  Factory,
  Globe,
  Package,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

const stats: {
  value: string;
  lines: [string, string];
  icon: LucideIcon;
}[] = [
  { value: "20+", lines: ["Products", "Delivered"], icon: Package },
  { value: "3+", lines: ["Years of", "Experience"], icon: Users },
  { value: "15+", lines: ["Industries", "Served"], icon: Factory },
  { value: "", lines: ["Global", "Delivery"], icon: Globe },
  { value: "98%", lines: ["Retention", "Rate"], icon: Star },
];

export default function StatsSection() {
  return (
    <section className="shell py-8 lg:py-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {stats.map(({ value, lines, icon: Icon }) => (
          <div
            key={lines.join(" ")}
            className="flex min-h-[92px] items-center justify-center gap-3 rounded-[14px] border border-white/[0.06] bg-[#1c2223] px-4 py-4 sm:gap-4 lg:px-5"
          >
            <Icon
              className="h-6 w-6 shrink-0 text-accent"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div className="text-left text-white">
              <p className="text-[17px] font-medium leading-[1.25] sm:text-[18px]">
                {value && (
                  <span className="mr-1.5 text-[19px] font-semibold sm:text-[21px]">
                    {value}
                  </span>
                )}
                {lines[0]}
              </p>
              <p className="text-[16px] leading-[1.35] sm:text-[17px]">
                {lines[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
