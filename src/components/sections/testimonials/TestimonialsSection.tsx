"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { SanityTestimonial } from "@/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

// ─── MOTION SETTINGS ────────────────────────────────────────────────────────

const EASING = [0.16, 1, 0.3, 1] as const; // cinematic ease-out

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

// ─── ATTRIBUTION LINE ────────────────────────────────────────────────────────

function Attribution({
  testimonial,
}: {
  testimonial: SanityTestimonial;
}) {
  const hasAvatar = testimonial.avatar?.asset;

  return (
    <div className="flex items-center gap-4 mt-8 md:mt-12 justify-start">
      {hasAvatar && (
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 filter grayscale opacity-90">
          <Image
            src={urlFor(testimonial.avatar!).width(96).height(96).url()}
            alt={testimonial.authorName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 items-start text-left">
        <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-foreground/90 leading-none">
          {testimonial.authorName}
        </span>
        {(testimonial.authorRole || testimonial.company) && (
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground/50 leading-none">
            {[testimonial.authorRole, testimonial.company].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── EDITORIAL GLYPH ────────────────────────────────────────────────────────

function QuoteAccent() {
  return (
    <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-20 h-20 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
  );
}

// ─── CINEMATIC HORIZONTAL TESTIMONIAL ────────────────────────────────────────

function EditorialRailCard({
  testimonial,
}: {
  testimonial: SanityTestimonial;
}) {
  // Unified cinematic sizing system configured to show exactly 1 full card + part of the next
  const widthClass = "w-[85vw] md:w-[75vw] lg:w-[65vw]";
  const typographyClass = "text-[clamp(1.375rem,3vw,2.125rem)] leading-[1.3]";

  return (
    <div className={`shrink-0 ${widthClass} px-4 md:px-6 lg:px-8 h-full`}>
      <div className="relative h-full min-h-[380px] md:min-h-[420px] lg:min-h-[480px] flex flex-col justify-between p-8 md:p-10 lg:p-12 border-l-[3px] border-primary/30 bg-primary/[0.03] rounded-r-2xl shadow-[0_0_80px_-15px_rgba(255,229,0,0.02)] backdrop-blur-sm transition-colors duration-700 hover:bg-primary/[0.05] overflow-hidden">
        <QuoteAccent />
        
        <blockquote
          className={`font-editorial italic text-foreground/95 ${typographyClass} tracking-tight relative z-10 line-clamp-4 md:line-clamp-5`}
        >
          <span className="text-primary/40 font-serif leading-none mr-2 select-none">&quot;</span>
          {testimonial.displayQuote}
          <span className="text-primary/40 font-serif leading-none ml-2 select-none" aria-hidden="true">&quot;</span>
        </blockquote>

        <div className="relative z-10 mt-auto pt-8">
          <Attribution testimonial={testimonial} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN TESTIMONIALS SECTION ───────────────────────────────────────────────

interface TestimonialsProps {
  testimonials: SanityTestimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  if (!testimonials || testimonials.length === 0) return null;

  const isScrolling = testimonials.length > 1;

  // Duplicate the array to create a seamless CSS infinite scrolling loop only if scrolling
  const seamlessRailData = isScrolling ? [...testimonials, ...testimonials] : testimonials;

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="py-32 md:py-48 lg:py-64 bg-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 1.5, ease: EASING }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cinematic-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-cinematic-marquee {
          animation: cinematic-marquee 60s linear infinite;
        }
        .marquee-container:hover .animate-cinematic-marquee {
          animation-play-state: paused !important;
        }
        @media (max-width: 768px) {
          .animate-cinematic-marquee {
            animation-duration: 40s;
          }
        }
      `}} />

      <Container>
        <Grid className="mb-16 md:mb-24">
          <motion.div
            className="col-span-4 md:col-span-8 lg:col-span-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={fadeUpVariant}
          >
            <SectionHeader
              label="/ 06 — TESTIMONIALS"
              title={<>CLIENT <span className="text-primary">VOICES</span></>}
              className="mb-0"
              titleClassName="uppercase tracking-tighter leading-[0.9]"
              animated={false}
            />
          </motion.div>
        </Grid>
      </Container>

      {/* Dynamic Cinematic Layout: Static if 1, Scrolling if > 1 */}
      <div 
        className={isScrolling 
          ? "marquee-container w-full relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4"
          : "w-full relative py-4 flex justify-center px-4 md:px-0"
        }
      >
        <div className={isScrolling ? "flex w-max animate-cinematic-marquee" : "flex w-full justify-center"}>
          {seamlessRailData.map((testimonial, index) => (
            <EditorialRailCard
              key={`${testimonial._id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
