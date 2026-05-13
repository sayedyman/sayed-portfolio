"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type SilentType = "space" | "line" | "quote";

interface CaseStudySilentProps {
  type?: SilentType;
  /** For type="line": the atmospheric sentence */
  text?: string;
  /** For type="quote": the pullquote text */
  quote?: string;
  className?: string;
}

/**
 * Silent section — atmospheric breathing beat.
 * No animation by design (stillness is intentional).
 */
export function CaseStudySilent({
  type = "space",
  text,
  quote,
  className,
}: CaseStudySilentProps) {
  return (
    <div className={cn(className)}>
      {type === "space" && (
        // Pure whitespace — handled by section padding, this is a visual hint
        <div className="h-12 md:h-20" aria-hidden="true" />
      )}

      {type === "line" && text && (
        <p className="font-editorial font-light italic text-[0.9rem] text-[#555555] text-left">
          {text}
        </p>
      )}

      {type === "quote" && quote && (
        <p
          className="font-heading font-medium text-white leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", maxWidth: "24ch" }}
        >
          {quote}
        </p>
      )}
    </div>
  );
}

/** Micro-text transition — filmic atmospheric bridge */
interface MicroTextProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyMicroText({ children, className }: MicroTextProps) {
  return (
    <p
      className={cn(
        "font-editorial font-light italic text-[0.9rem] text-[#555555] mt-2",
        className
      )}
    >
      {children}
    </p>
  );
}
