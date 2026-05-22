"use client";

import { ReactNode } from "react";
import { CaseStudyProse } from "./CaseStudyProse";

interface CaseStudyReflectionProps {
  children: ReactNode;
}

/**
 * Reflection beat — the closing director's note.
 * Intentionally still (no scroll animation), quieter typography.
 */
export function CaseStudyReflection({ children }: CaseStudyReflectionProps) {
  return (
    <div>
      {/* Eyebrow label */}
      <p className="font-editorial text-[0.7rem] uppercase tracking-[0.22em] text-[#444444] mb-8">
        Reflection
      </p>
      {/* Content rendered as quiet prose — no entrance animation (stillness by design) */}
      <div className="font-editorial text-[1rem] text-[#777777] leading-[1.85] max-w-[65ch] [&>p]:mb-[1.75em] [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
