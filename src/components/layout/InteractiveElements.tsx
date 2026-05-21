"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll").then((mod) => mod.SmoothScroll), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor").then((mod) => mod.CustomCursor), { ssr: false });

export function InteractiveElements() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll />
    </>
  );
}
