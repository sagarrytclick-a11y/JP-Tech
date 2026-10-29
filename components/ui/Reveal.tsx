"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, useful for staggering items in a group. */
  delay?: number;
  /** How much of the element must be visible before it animates in. */
  threshold?: number;
  as?: "div" | "section" | "span" | "li";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
