"use client";

import type { ReactNode } from "react";
import { useContact } from "@/components/contact/ContactProvider";

export default function ContactButton({
  children,
  className = "",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const { openContact } = useContact();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        onClick?.();
        openContact();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
