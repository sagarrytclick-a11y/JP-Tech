import type { ReactNode } from "react";

const slots = [
  { x: 20.8, y: 30 },
  { x: 45.1, y: 30 },
  { x: 69.4, y: 30 },
  { x: 32.9, y: 60.4 },
  { x: 57.2, y: 60.4 },
  { x: 81.2, y: 60.4 },
] as const;

const arrows = [
  { x: 26.85, y: 45.7, direction: "down" },
  { x: 39, y: 43, direction: "up" },
  { x: 51.15, y: 45.7, direction: "down" },
  { x: 63.3, y: 43, direction: "up" },
  { x: 75.3, y: 45.7, direction: "down" },
] as const;

function Diamond({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: "var(--diamond)", height: "var(--diamond)" }}
    >
      <span
        aria-hidden="true"
        className="absolute rotate-45 rounded-[12px] border border-dashed border-white/50"
        style={{
          width: "calc(var(--diamond) * 0.7)",
          height: "calc(var(--diamond) * 0.7)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute rotate-45 rounded-[18px] border border-white/45 bg-[#0d0d0d]"
        style={{
          width: "calc(var(--diamond) * 0.553)",
          height: "calc(var(--diamond) * 0.553)",
        }}
      />
      <span
        className="relative z-10 text-center text-[clamp(14px,1.35vw,26px)] font-normal leading-[1.35] text-white"
        style={{ maxWidth: "calc(var(--diamond) * 0.72)" }}
      >
        {children}
      </span>
    </div>
  );
}

function Arrow({ direction }: { direction: "down" | "up" }) {
  const className =
    "h-[clamp(18px,1.18vw,24px)] w-[clamp(18px,1.18vw,24px)] text-accent";

  if (direction === "up") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 19L19 5" />
        <path d="M9 5h10v10" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5l14 14" />
      <path d="M19 9v10H9" />
    </svg>
  );
}

export default function DiamondLattice({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Desktop: staggered diamond lattice */}
      <div className="relative left-1/2 mt-10 hidden h-[clamp(420px,40vw,760px)] w-screen max-w-[1800px] -translate-x-1/2 [--diamond:clamp(170px,17.4vw,330px)] lg:block">
        {slots.map((slot, index) => (
          <div
            key={slot.x}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <Diamond>{items[index]}</Diamond>
          </div>
        ))}

        {arrows.map((arrow) => (
          <span
            key={arrow.x}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${arrow.x}%`, top: `${arrow.y}%` }}
          >
            <Arrow direction={arrow.direction} />
          </span>
        ))}
      </div>

      {/* Tablet / mobile fallback */}
      <div className="mx-auto mt-6 flex max-w-[880px] flex-col items-center gap-1 [--diamond:190px] sm:mt-10 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-6 sm:[--diamond:225px] lg:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={
              index % 2 === 0
                ? "-translate-x-8 sm:translate-x-0"
                : "translate-x-8 sm:translate-x-0"
            }
          >
            <Diamond>{item}</Diamond>
          </div>
        ))}
      </div>
    </div>
  );
}
