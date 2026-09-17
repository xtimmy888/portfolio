"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatCounterProps = {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  valueClassName?: string;
};

/**
 * Counts up to a numeric value when scrolled into view. If `value` isn't a
 * number (e.g. "Daily", "1UBQ"), it's shown verbatim.
 */
export function StatCounter({
  value,
  label,
  prefix,
  suffix,
  className,
  valueClassName,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  const numeric = Number(value);
  const isNumber = value.trim() !== "" && !Number.isNaN(numeric);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;

  const [display, setDisplay] = useState(
    isNumber && !reduceMotion ? (0).toFixed(decimals) : value,
  );

  useEffect(() => {
    if (!isNumber || reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((numeric * eased).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(numeric.toFixed(decimals));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumber, numeric, reduceMotion, value, decimals]);

  return (
    <div ref={ref} className={className}>
      <div
        className={cn(
          "font-mono text-3xl font-bold tracking-tight sm:text-4xl",
          valueClassName,
        )}
      >
        <span className="text-gradient">
          {prefix}
          {display}
          {suffix}
        </span>
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
