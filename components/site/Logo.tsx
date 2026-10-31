import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="group inline-flex items-center gap-2.5"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
        <Image
          src="/logo.png"
          alt=""
          width={105}
          height={115}
          priority
          className="h-full w-auto object-contain"
        />
      </span>
      {!compact && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-fg sm:text-[20px]">
            {site.name}
          </span>
          <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:block">
            Web &amp; IT Consulting
          </span>
        </span>
      )}
    </Link>
  );
}
