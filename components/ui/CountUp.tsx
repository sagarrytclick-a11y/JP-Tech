"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

export default function CountUp({
  value,
  duration = 1100,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let startedAt: number | null = null;

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }

      const step = (timestamp: number) => {
        if (startedAt === null) startedAt = timestamp;
        const progress = Math.min(1, (timestamp - startedAt) / duration);
        setDisplay(Math.round(value * easeOutCubic(progress)));

        if (progress < 1) {
          frame = window.requestAnimationFrame(step);
        }
      };

      frame = window.requestAnimationFrame(step);
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      !("requestAnimationFrame" in window)
    ) {
      const timer = window.setTimeout(() => setDisplay(value), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
