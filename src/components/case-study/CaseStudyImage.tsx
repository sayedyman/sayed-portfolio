"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type ImageLayout = "cinema" | "breathe" | "ambient";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  layout?: ImageLayout;
  caption?: string;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Full-bleed 100vw cinema frame */
function CinemaImage({
  src,
  alt,
  caption,
}: Pick<CaseStudyImageProps, "src" | "alt" | "caption">) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Very subtle scale on hero-like images — max 2% change
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.02]);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5% 0px" });

  return (
    <div ref={containerRef} className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2">
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: 1.1, ease }}
        className="w-full overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <motion.div ref={ref} className="relative w-full h-full" style={{ scale }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.85) contrast(1.05)" }}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <p className="mt-4 font-editorial text-[0.75rem] text-[#555555] text-center px-4">
          {caption}
        </p>
      )}
    </div>
  );
}

/** 75–80% width, left-anchored breathe frame */
function BreatheImage({
  src,
  alt,
  caption,
}: Pick<CaseStudyImageProps, "src" | "alt" | "caption">) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden w-[90%] md:w-[80%] max-w-[900px] aspect-[4/3] md:aspect-[16/9]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-[filter] duration-500 hover:brightness-[1.06]"
          style={{ filter: "brightness(0.85) contrast(1.05)" }}
        />
      </motion.div>
      {caption && (
        <p className="mt-4 font-editorial text-[0.75rem] text-[#555555]">
          {caption}
        </p>
      )}
    </div>
  );
}

/** Heavily blurred ambient backdrop — atmosphere only */
function AmbientImage({
  src,
  alt,
}: Pick<CaseStudyImageProps, "src" | "alt">) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ filter: "blur(60px)", opacity: 0.14 }}
      />
    </div>
  );
}

export function CaseStudyImage({
  src,
  alt,
  layout = "breathe",
  caption,
  className,
}: CaseStudyImageProps) {
  return (
    <div className={cn(className)}>
      {layout === "cinema" && (
        <CinemaImage src={src} alt={alt} caption={caption} />
      )}
      {layout === "breathe" && (
        <BreatheImage src={src} alt={alt} caption={caption} />
      )}
      {layout === "ambient" && (
        <AmbientImage src={src} alt={alt} />
      )}
    </div>
  );
}
