export default function HeroRings({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 h-[clamp(520px,48vw,950px)] w-[clamp(520px,48vw,950px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.085]" />
      <div className="absolute left-1/2 top-1/2 h-[clamp(720px,65vw,1250px)] w-[clamp(720px,65vw,1250px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
      <div className="absolute left-1/2 top-1/2 h-[clamp(960px,86vw,1650px)] w-[clamp(960px,86vw,1650px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
      <div className="absolute left-1/2 top-1/2 h-[clamp(1200px,107vw,2050px)] w-[clamp(1200px,107vw,2050px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />
    </div>
  );
}
