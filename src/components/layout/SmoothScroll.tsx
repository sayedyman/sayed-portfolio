"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return (
    <ReactLenis root options={{ 
      lerp: 0.15, 
      duration: 0.8, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1
    }} />
  );
}

