"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/design-system/motion";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "subtle" | "ghost";
  animated?: boolean;
  custom?: number;
}

export function Divider({ 
  className, 
  orientation = "horizontal", 
  variant = "solid",
  animated = true,
  custom
}: DividerProps) {
  
  const baseClasses = orientation === "horizontal" ? "w-12 h-px" : "w-px h-12";
  
  const variantClasses = {
    solid: "bg-primary/30",
    subtle: "bg-border/50",
    ghost: "bg-gradient-to-r from-border/50 via-border/10 to-transparent",
  };

  if (!animated) {
    return <div className={cn(baseClasses, variantClasses[variant], className)} />;
  }

  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      className={cn(baseClasses, variantClasses[variant], className)}
    />
  );
}
