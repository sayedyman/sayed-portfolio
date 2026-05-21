"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface CaseStudyGalleryProps {
  images: GalleryImage[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.8, ease }}
    >
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
        style={{
          // Mask fade at both edges
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          scrollbarWidth: "none",
        }}
        onMouseDown={(e) => {
          const el = containerRef.current;
          if (!el) return;
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          const onMove = (ev: MouseEvent) => {
            const x = ev.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
          };
          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden bg-[#0a0a0a]"
            style={{ height: "65vh", width: "auto", aspectRatio: "4/3" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-auto object-cover pointer-events-none"
              draggable={false}
              style={{ filter: "brightness(0.9) contrast(1.02)" }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
