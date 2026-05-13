"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CaseStudyProseProps {
  children: ReactNode;
  className?: string;
  /** Visually quieter — used for Reflection beat */
  quiet?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyProse({
  children,
  className,
  quiet = false,
}: CaseStudyProseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease }}
      className={cn(
        "font-editorial leading-[1.85] max-w-[65ch] prose-p",
        quiet
          ? "text-[1rem] text-[#888888]"
          : "text-[1.125rem] text-[#D4D4D4]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
