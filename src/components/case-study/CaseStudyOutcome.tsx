"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudyOutcomeProps {
  metrics: Metric[];
  /** Qualitative statement for non-metric projects */
  statement?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Extracts leading numeric portion from a value string like "40%" or "2x" */
function parseNumeric(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

function CountUp({
  target,
  suffix,
  decimals,
}: {
  target: number;
  suffix: string;
  decimals: number;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function CaseStudyOutcome({ metrics = [], statement }: CaseStudyOutcomeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (statement && metrics.length === 0) {
    // Qualitative fallback — same visual weight as numerals but text-based
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease }}
        className="py-8"
      >
        <p
          className="font-heading font-medium text-primary leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", maxWidth: "20ch" }}
        >
          {statement}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease }}
      className="flex flex-wrap gap-16 md:gap-24"
    >
      {metrics.slice(0, 3).map((metric, i) => {
        const { num, suffix } = parseNumeric(metric.value);
        const decimals = metric.value.includes(".") ? 1 : 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
          >
            <div
              className="font-heading font-semibold text-primary leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              <CountUp target={num} suffix={suffix} decimals={decimals} />
            </div>
            <p className="font-editorial text-[0.875rem] text-[#666666] mt-3 max-w-[20ch]">
              {metric.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
