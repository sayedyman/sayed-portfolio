"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CaseStudyPullquoteProps {
  text: string;
  alignment?: "left" | "center";
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyPullquote({
  text,
  alignment = "left",
  className,
}: CaseStudyPullquoteProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1.0, ease }}
      className={cn(
        "font-heading font-medium text-white leading-[1.1] tracking-tight",
        alignment === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
      style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", maxWidth: "22ch" }}
    >
      {text}
    </motion.blockquote>
  );
}
