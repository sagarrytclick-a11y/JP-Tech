import {
  Flag,
  Star,
  Target,
  TrendingUp,
  Zap,
  CheckCircle2,
  Cpu,
  type LucideIcon,
} from "lucide-react";

const points: { text: string; icon: LucideIcon }[] = [
  {
    text: "Real experience building multi-industry solutions",
    icon: TrendingUp,
  },
  { text: "Clear delivery process and accountability", icon: Star },
  { text: "Trusted communication across global time zones", icon: Zap },
  {
    text: "Strong focus on performance, security, and scalability",
    icon: Target,
  },
  {
    text: "Reliable mobile app development services India enterprises and startups can count on",
    icon: Flag,
  },
];

export default function WhyClients() {
  return (
    <section id="why-choose" className="shell py-10 lg:py-14">
      <div className="rounded-[22px] border border-line bg-panel px-5 py-10 sm:px-10 sm:py-12 lg:px-[75px] lg:py-[65px]">
        <div className="text-center">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-heading mt-4 text-balance">
            Why Clients Choose <span className="text-accent">JP Technology</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-[80px] items-center">
          {/* Left Column (Filled with more context, details & mini-cards) */}
          <div className="flex flex-col justify-center space-y-5">
            <p className="text-[15px] leading-[1.7] text-fg/75 sm:text-[17px] lg:text-[18px] lg:leading-[1.65]">
              We are not just developers, we are long-term product partners. As a
              custom mobile app development agency with expertise in web, SaaS, and
              AI solutions, we help businesses build secure and scalable products
              across industries.
            </p>
            <p className="text-[13.5px] leading-[1.6] text-fg/65 sm:text-[14.5px]">
              Every line of code we write is optimized for performance, clean architecture, and seamless user experience—ensuring your product is ready to scale from day one.
            </p>

            {/* Mini Highlight Badges to fill vertical space */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-fg/[0.06] bg-fg/[0.02] p-3.5">
                <Cpu className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-[13px] font-medium text-fg/85">
                  Modern Tech Stack
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-fg/[0.06] bg-fg/[0.02] p-3.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-[13px] font-medium text-fg/85">
                  Direct Engineer Access
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Points List) */}
          <ul className="space-y-3 sm:space-y-4">
            {points.map(({ text, icon: Icon }) => (
              <li
                key={text}
                className="group flex items-start gap-3.5 rounded-xl p-3 -mx-3 transition-all duration-200 hover:bg-fg/[0.04] hover:translate-x-1 cursor-default"
              >
                <Icon
                  className="mt-[3px] h-[18px] w-[18px] shrink-0 text-accent transition-transform duration-200 group-hover:scale-125"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="text-[14px] leading-[1.6] text-fg/85 transition-colors duration-200 group-hover:text-fg sm:text-[15px] lg:text-[17px]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}