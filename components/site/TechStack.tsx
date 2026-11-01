import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Subtle, reusable technologies strip. Rendered on the hero and on every
 * marketing page so the stack reads as a consistent trust signal.
 *
 * Logos run as a seamless marquee (same animation as DualMarqueeSlider)
 * with rounded image tiles and no section background.
 */
export default function TechStack({
  className = "",
  label = "Specialised in",
}: {
  className?: string;
  label?: string;
}) {
  // Repeat the list so the -50% marquee translation loops seamlessly.
  const loop = [
    ...site.techStack,
    ...site.techStack,
    ...site.techStack,
    ...site.techStack,
    ...site.techStack,
    ...site.techStack,
  ];

  return (
    <section
      aria-label="Technologies we specialise in"
      className={`relative overflow-hidden ${className}`}
    >
      <div className="shell flex flex-col items-center gap-3 py-4 sm:flex-row sm:gap-7 sm:py-5">
        <p className="flex shrink-0 items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {label}
        </p>

        <div className="relative w-full min-w-0 overflow-hidden">
          {/* Edge fade masks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent"
          />

          <ul className="animate-marquee-left items-center gap-3 py-1 sm:gap-4">
            {loop.map((tech, index) => (
              <li key={`${tech.name}-${index}`} className="shrink-0">
                <div className="group relative h-11 w-20 overflow-hidden rounded-lg ring-1 ring-line/70 transition-all duration-300 hover:ring-accent/60 sm:h-12 sm:w-24">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    sizes="96px"
                    draggable={false}
                    className="select-none object-cover opacity-80 grayscale-[35%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
