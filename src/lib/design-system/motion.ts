import { Variants } from "framer-motion";

// ─── TIMING & EASING ────────────────────────────────────────────────────────

export const DURATIONS = {
  fast: 0.3,
  base: 0.6,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const EASING = {
  standard: [0.16, 1, 0.3, 1], // Smooth, responsive spring-like curve
  cinematic: [0.22, 1, 0.36, 1], // Slower, more dramatic deceleration
  snappy: [0.4, 0, 0.2, 1], // Material design-style emphasis
} as const;

// ─── REUSABLE MOTION VARIANTS ───────────────────────────────────────────────

/**
 * Standard upward fade reveal used for text blocks and items.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      delay: customDelay,
      ease: EASING.cinematic,
    },
  }),
};

/**
 * Simple fade-in without layout shifts.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATIONS.base,
      delay: customDelay,
      ease: EASING.standard,
    },
  }),
};

/**
 * Parent container variant for staggering multiple children elements.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Child item variant to be used inside staggerContainer.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.base,
      ease: EASING.standard,
    },
  },
};

/**
 * Dramatic slow reveal specifically for large display typography or hero images.
 */
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.cinematic,
      delay: customDelay,
      ease: EASING.cinematic,
    },
  }),
};
