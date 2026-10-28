import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="group inline-flex items-center gap-2.5"
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-accent text-[13px] font-bold tracking-[-0.04em] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9 sm:text-[14px]">
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_55%)]" />
        <span className="relative">JP</span>
      </span>
      {!compact && (
        <span className="text-[19px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          <span className="text-accent">JP</span> Technology
        </span>
      )}
    </Link>
  );
}
