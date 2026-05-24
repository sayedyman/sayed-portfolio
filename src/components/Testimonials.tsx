"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { SanityTestimonial } from "@/lib/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

import { EASING, fadeUp } from "@/lib/design-system/motion";
import { Divider } from "@/components/ui/Divider";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ─── ATTRIBUTION LINE ────────────────────────────────────────────────────────

function Attribution({
  testimonial,
}: {
  testimonial: SanityTestimonial;
}) {
  const hasAvatar = testimonial.avatar?.asset;
  const parts = [testimonial.authorName, testimonial.authorRole, testimonial.company]
    .filter(Boolean);

  return (
    <div className="flex items-center gap-4">
      {hasAvatar && (
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-border/30 shrink-0">
          <Image
            src={urlFor(testimonial.avatar!).width(80).height(80).url()}
            alt={testimonial.authorName}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/90">
          {testimonial.authorName}
        </span>
        {(testimonial.authorRole || testimonial.company) && (
          <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60">
            {[testimonial.authorRole, testimonial.company].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── OPEN QUOTE GLYPH ───────────────────────────────────────────────────────

function QuoteGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      className={`select-none pointer-events-none font-editorial text-primary/[0.07] leading-none block ${className}`}
      aria-hidden="true"
    >
      &ldquo;
    </span>
  );
}

// ─── SINGLE TESTIMONIAL — CENTERED CINEMATIC ─────────────────────────────────

function SingleTestimonial({ testimonial }: { testimonial: SanityTestimonial }) {
  return (
    <Grid>
      <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col items-center text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          className="relative"
        >
          <QuoteGlyph className="text-[120px] md:text-[180px] lg:text-[220px] absolute -top-12 md:-top-16 lg:-top-20 left-1/2 -translate-x-1/2" />
        </motion.div>

        <motion.blockquote
          custom={1}
          variants={fadeUp}
          className="relative z-10 text-2xl md:text-3xl lg:text-[2.5rem] font-editorial italic leading-[1.35] md:leading-[1.3] text-foreground/90 max-w-3xl"
        >
          &ldquo;{testimonial.displayQuote}&rdquo;
        </motion.blockquote>

        <Divider custom={2} className="my-8 md:my-10" />

        <motion.div custom={3} variants={fadeUp}>
          <Attribution testimonial={testimonial} />
        </motion.div>
      </div>
    </Grid>
  );
}

// ─── TWO TESTIMONIALS — BALANCED GRID ────────────────────────────────────────

function DualTestimonials({ testimonials }: { testimonials: SanityTestimonial[] }) {
  return (
    <Grid>
      {testimonials.slice(0, 2).map((testimonial, index) => (
        <motion.div
          key={testimonial._id}
          custom={index}
          variants={fadeUp}
          className={`col-span-4 md:col-span-4 lg:col-span-5 ${index === 0 ? "lg:col-start-2" : "lg:col-start-7 md:mt-16 lg:mt-24"
            }`}
        >
          <div className="relative">
            <QuoteGlyph className="text-[80px] md:text-[100px] -mb-6 md:-mb-8" />

            <blockquote className="text-xl md:text-2xl font-editorial italic leading-[1.35] text-foreground/90 mb-8">
              &ldquo;{testimonial.displayQuote}&rdquo;
            </blockquote>

            <Divider animated={false} className="mb-6" />

            <Attribution testimonial={testimonial} />
          </div>
        </motion.div>
      ))}
    </Grid>
  );
}

// ─── THREE+ TESTIMONIALS — HORIZONTAL RAIL ───────────────────────────────────

function TestimonialRail({ testimonials }: { testimonials: SanityTestimonial[] }) {
  return (
    <div className="relative">
      <div
        className="testimonial-rail flex gap-6 md:gap-8 overflow-x-auto pb-8"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Leading spacer for edge alignment */}
        <div className="shrink-0 w-4 md:w-8 lg:w-12" aria-hidden="true" />

        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial._id}
            custom={index}
            variants={fadeUp}
            className="shrink-0 w-[85vw] md:w-[520px] lg:w-[560px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative h-full flex flex-col justify-between border-l border-border/20 pl-6 md:pl-8 py-2">
              <div>
                <QuoteGlyph className="text-[60px] md:text-[80px] -mb-4 md:-mb-6" />

                <blockquote className="text-lg md:text-xl lg:text-2xl font-editorial italic leading-[1.35] text-foreground/90 mb-8">
                  &ldquo;{testimonial.displayQuote}&rdquo;
                </blockquote>
              </div>

              <div>
                <Divider animated={false} className="mb-6" />
                <Attribution testimonial={testimonial} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Trailing spacer */}
        <div className="shrink-0 w-4 md:w-8 lg:w-12" aria-hidden="true" />
      </div>

      {/* Subtle scroll indicator line */}
      <div className="mx-4 md:mx-8 lg:mx-12 mt-4">
        <div className="h-px bg-border/20 w-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/4 bg-primary/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN TESTIMONIALS SECTION ───────────────────────────────────────────────

interface TestimonialsProps {
  testimonials: SanityTestimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  // Don't render empty section
  if (!testimonials || testimonials.length === 0) return null;

  const isRail = testimonials.length >= 3;

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 lg:py-48 bg-secondary/20 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASING.cinematic }}
    >
      {/* Section Header */}
      <Container>
        <Grid className="mb-16 md:mb-20 lg:mb-24">
          <motion.div
            className="col-span-4 md:col-span-8 lg:col-span-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.1, ease: EASING.cinematic }}
          >
            <SectionHeader
              label="/ 06 — Testimonials"
              title={<>Client{" "}<span className="text-primary italic font-editorial">Voices</span></>}
              className="mb-0"
              animated={false}
            />
          </motion.div>
        </Grid>
      </Container>

      {/* Dynamic Layout */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        viewport={{ once: true }}
      >
        {isRail ? (
          <TestimonialRail testimonials={testimonials} />
        ) : (
          <Container>
            {testimonials.length === 1 ? (
              <SingleTestimonial testimonial={testimonials[0]} />
            ) : (
              <DualTestimonials testimonials={testimonials} />
            )}
          </Container>
        )}
      </motion.div>
    </motion.section>
  );
}
