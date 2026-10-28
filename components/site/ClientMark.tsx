"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Client image tile. Renders the supplied logo/photo and gracefully falls back
 * to the client's initials when the file has not been added yet.
 */
export default function ClientMark({
  src,
  name,
  fit = "contain",
  className = "",
}: {
  src?: string;
  name: string;
  fit?: "contain" | "cover";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const words = name.split(/\s+/).filter(Boolean);
  const initials =
    (words.length > 1
      ? words
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
      : (words[0] ?? "JP").slice(0, 2)
    ).toUpperCase() || "JP";

  if (!src || failed) {
    return (
      <span
        className={`flex items-center justify-center rounded-xl border border-white/10 bg-accent/10 text-[12px] font-semibold tracking-wide text-accent ${className}`}
      >
        {initials}
      </span>
    );
  }

  return (
    <span
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] ${className}`}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        fill
        sizes="120px"
        className={fit === "cover" ? "object-cover" : "object-contain p-2"}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
