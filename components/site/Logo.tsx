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
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9">
        <Image
          src="/logo.png"
          alt=""
          width={105}
          height={115}
          priority
          className="h-full w-auto object-contain drop-shadow-[0_4px_10px_rgba(255,77,31,0.28)]"
        />
      </span>
      {!compact && (
        <span className="text-[19px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          {site.name}
        </span>
      )}
    </Link>
  );
}
