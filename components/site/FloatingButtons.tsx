"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Get a Call — vertical tab pinned to the left edge. */}
      <ContactButton
        ariaLabel="Get a call"
        className="group fixed left-0 top-1/2 z-[90] flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-r-xl border border-l-0 border-accent/50 bg-gradient-to-b from-accent to-accent-soft py-3 pl-1 pr-1.5 text-accent-ink shadow-[0_18px_40px_-18px_rgba(217,119,6,0.9)] transition-all duration-200 hover:pr-2.5 hover:brightness-105 active:brightness-95 sm:py-3.5 sm:pl-1.5 sm:pr-2"
      >
        <Phone size={13} aria-hidden="true" />
        <span className="rotate-180 text-[10px] font-bold uppercase tracking-[0.16em] [writing-mode:vertical-rl]">
          Get a Call
        </span>
      </ContactButton>

      {/* Scroll to top — bottom left */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 left-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-fg shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-110 hover:border-accent hover:text-accent active:scale-95"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
