"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

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
