"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }} />
  );
}
