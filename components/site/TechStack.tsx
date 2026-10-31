import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { site } from "@/lib/site";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
};

/**
 * Subtle, reusable technologies strip. Rendered on the hero and on every
 * marketing page so the stack reads as a consistent trust signal.
 */
export default function TechStack({
  className = "",
  label = "Specialised in",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <section
      aria-label="Technologies we specialise in"
      className={`border-y border-line bg-panel/60 ${className}`}
    >
      <div className="shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row sm:gap-6">
        <p className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {label}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
          {site.techStack.map((tech) => {
            const Icon = icons[tech.name];
            return (
              <li key={tech.name} className="group flex items-center gap-2">
                {Icon ? (
                  <Icon
                    size={18}
                    className="text-fg/70 transition-colors duration-200 group-hover:text-accent"
                  />
                ) : null}
                <span className="text-[12px] font-medium text-muted transition-colors group-hover:text-fg">
                  {tech.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
