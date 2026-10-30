import {
  Flag,
  Star,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

const mission: { text: string; icon: LucideIcon }[] = [
  { text: "Build scalable, secure, and reliable digital products", icon: TrendingUp },
  { text: "Help businesses grow through technology", icon: Star },
  { text: "Deliver clarity, speed, and long-term value", icon: Zap },
  { text: "Simplify complex problems with smart engineering", icon: Target },
  { text: "Partner with clients as an extension of their team", icon: Flag },
];

const vision: { text: string; icon: LucideIcon }[] = [
  { text: "Become a trusted global tech partner", icon: TrendingUp },
  { text: "Empower businesses with future-ready solutions", icon: Star },
  { text: "Create products that people love to use", icon: Zap },
  { text: "Enable founders to move from idea to impact faster", icon: Target },
  { text: "Set benchmarks for quality, reliability, and execution", icon: Flag },
];

export default function MissionVision() {
  return (
    <section id="mission" className="shell py-10 lg:py-14">
      <div className="rounded-[22px] border border-line bg-[#0f1415] px-5 py-10 sm:px-10 sm:py-12 lg:px-[75px] lg:py-[65px]">
        <div className="text-center">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-heading mt-4 text-balance">
            Mission &amp; <span className="text-accent">Vision</span>
          </h2>
          <p className="section-copy mt-4">
            To help businesses worldwide transform ideas into powerful digital
            products with clarity, speed, and trust.
          </p>
        </div>

        <div className="mt-9 grid gap-8 lg:mt-11 lg:grid-cols-2 lg:gap-[110px]">
          {[mission, vision].map((group, groupIndex) => (
            <ul key={groupIndex} className="space-y-3 sm:space-y-4">
              {group.map(({ text, icon: Icon }) => (
                <li
                  key={text}
                  className="group flex items-start gap-3.5 rounded-xl p-3 -mx-3 transition-all duration-200 hover:bg-white/[0.04] hover:translate-x-1 cursor-default"
                >
                  <Icon
                    className="mt-[3px] h-[18px] w-[18px] shrink-0 text-accent transition-transform duration-200 group-hover:scale-125"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] leading-[1.6] text-white/85 transition-colors duration-200 group-hover:text-white sm:text-[15px] lg:text-[17px]">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
