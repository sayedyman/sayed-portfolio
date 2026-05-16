"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  reveal?: boolean;
}

export function Section({ children, className, id, padding = "lg", reveal = true }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const paddingClasses = {
    none: "",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-24 lg:py-32",
    xl: "py-24 md:py-32 lg:py-48",
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(paddingClasses[padding], className)}
      initial={reveal ? { opacity: 0, y: 40 } : false}
      animate={isInView || !reveal ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
