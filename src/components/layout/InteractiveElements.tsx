"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll").then((mod) => mod.SmoothScroll), { ssr: false });

export function InteractiveElements() {
  return (
    <>
      <SmoothScroll />
    </>
  );
}
