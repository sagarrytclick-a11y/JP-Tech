"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// Quartic ease-out for ultra smooth deceleration
const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

export default function CountUp({
  value,
  start = 0,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(start);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let startedAt: number | null = null;

    const run = () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setDisplay(value);
        setIsFinished(true);
        return;
      }

      const step = (timestamp: number) => {
        if (startedAt === null) startedAt = timestamp;
        const elapsed = timestamp - startedAt;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutQuart(progress);
        const current = start + (value - start) * eased;

        if (decimals > 0) {
          setDisplay(Number(current.toFixed(decimals)));
        } else {
          setDisplay(Math.round(current));
        }

        if (progress < 1) {
          frame = window.requestAnimationFrame(step);
        } else {
          setDisplay(value);
          setIsFinished(true);
        }
      };

      frame = window.requestAnimationFrame(step);
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      !("requestAnimationFrame" in window)
    ) {
      const timer = window.setTimeout(() => {
        setDisplay(value);
        setIsFinished(true);
      }, 50);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value, start, duration, decimals]);

  const formattedValue =
    decimals > 0
      ? display.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : display.toLocaleString("en-IN");

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${isFinished ? "count-up-complete" : ""} ${className}`.trim()}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

