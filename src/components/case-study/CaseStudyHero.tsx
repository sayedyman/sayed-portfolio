"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  timeline: string;
  client?: string;
  heroImage?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyHero({
  title,
  eyebrow,
  summary,
  role,
  timeline,
  client,
  heroImage,
}: CaseStudyHeroProps) {
  const meta = [role, timeline, client].filter(Boolean).join(" · ");

  return (
    <div>
      {/* Title Card */}
      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20, x: -4 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground font-editorial mb-12"
        >
          {eyebrow}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="font-heading font-medium tracking-tight leading-[1.05] text-white mb-8"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
        >
          {title}
        </motion.h1>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="font-editorial text-[1.125rem] text-[#E0E0E0] max-w-[52ch] mb-10"
        >
          {summary}
        </motion.p>

        {/* Metadata strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          {/* Hairline — animates width */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="h-px bg-[#222222] mb-5 origin-left"
          />
          <p className="font-editorial text-[0.875rem] font-light text-[#666666]">
            {meta}
          </p>
        </motion.div>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          className="mt-20 md:mt-28 w-full overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="relative w-full h-full">
            <Image
              src={heroImage}
              alt={`${title} hero`}
              fill
              priority
              className="object-cover"
              style={{ filter: "brightness(0.85) contrast(1.05)" }}
            />
          </div>
        </motion.div>
      )}

      {/* Placeholder when no image is provided */}
      {!heroImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease }}
          className="mt-20 md:mt-28 w-full bg-[#0a0a0a] overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="w-full h-full flex items-center justify-center border-y border-[#1a1a1a]">
            <span
              className="font-heading text-[#222] uppercase tracking-[0.3em]"
              style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}
            >
              {title}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
