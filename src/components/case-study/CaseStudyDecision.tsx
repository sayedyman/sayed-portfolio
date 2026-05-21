"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CaseStudyDecisionProps {
  label: string;
  rationale: string;
  /** index determines image float direction: even = right, odd = left */
  index?: number;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyDecision({
  label,
  rationale,
  index = 0,
  className,
}: CaseStudyDecisionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease }}
      className={cn("group", className)}
    >
      {/* Index numeral */}
      <span className="font-heading text-[0.7rem] tracking-[0.25em] uppercase text-[#444444] mb-3 block">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </span>

      {/* Decision label */}
      <h3
        className="font-editorial font-medium text-white mb-3 transition-colors duration-300 group-hover:text-primary"
        style={{ fontSize: "1.25rem" }}
      >
        {label}
      </h3>

      {/* Hairline */}
      <div className="h-px bg-[#1e1e1e] mb-5" />

      {/* Rationale */}
      <p className="font-editorial text-[1rem] text-[#888888] leading-[1.85] max-w-[60ch]">
        {rationale}
      </p>
    </motion.div>
  );
}

interface CaseStudyDecisionGroupProps {
  children: ReactNode;
  className?: string;
}

import React from "react";

export function CaseStudyDecisionGroup({
  children,
  className,
}: CaseStudyDecisionGroupProps) {
  const items = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ index?: number }>, {
        index: i,
      });
    }
    return child;
  });

  return (
    <div className={cn("flex flex-col gap-14 md:gap-20", className)}>
      {items}
    </div>
  );
}
