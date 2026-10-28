import {
  Flag,
  Star,
  Target,
  TrendingUp,
  Zap,
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
      <div className="rounded-[22px] border border-line bg-[#0f1415] px-5 py-10 sm:px-10 sm:py-12 lg:px-[75px] lg:py-[65px]">
        <div className="text-center">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-heading mt-4 text-balance">
            Why Clients Choose <span className="text-accent">JP Technology</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-[110px]">
          <p className="text-[15px] leading-[1.7] text-white/75 sm:text-[17px] lg:text-[18px] lg:leading-[1.65]">
            We are not just developers, we are long-term product partners. As a
            custom mobile app development agency with expertise in web, SaaS, and
            AI solutions, we help businesses build secure and scalable products
            across industries.
          </p>

          <ul className="space-y-4 sm:space-y-5 lg:space-y-6">
            {points.map(({ text, icon: Icon }) => (
              <li key={text} className="flex items-start gap-3.5">
                <Icon
                  className="mt-[3px] h-[18px] w-[18px] shrink-0 text-accent sm:h-5 sm:w-5"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="text-[14px] leading-[1.6] text-white/85 sm:text-[15px] lg:text-[17px]">
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
