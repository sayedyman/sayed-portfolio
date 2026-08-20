"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { CtaButton } from "@/components/ui/CtaButton";

export function NotFoundUI() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 0.2,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="relative min-h-[100dvh] pt-32 pb-24 flex items-center justify-center overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Cinematic Gradient Background */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-foreground/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Primary Accent Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-40" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
            >
              {/* Oversized Cinematic 404 Number */}
              <motion.span
                variants={numberVariants}
                className="select-none font-heading font-extrabold text-[22vw] sm:text-[18vw] md:text-[15rem] lg:text-[19rem] leading-none tracking-tighter text-primary drop-shadow-[0_0_80px_rgba(255,229,0,0.15)] mb-2 md:-mb-10 pointer-events-none block"
              >
                404
              </motion.span>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight uppercase text-foreground mb-4 leading-tight whitespace-normal md:whitespace-nowrap max-w-full"
              >
                OOPS, I THINK WE&apos;RE LOST
              </motion.h1>

              {/* Supporting Message */}
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 whitespace-normal md:whitespace-nowrap"
              >
                Let&apos;s get you back somewhere familiar&hellip;
              </motion.p>

              {/* Back to Home CTA */}
              <motion.div variants={itemVariants}>
                <CtaButton variant="primary" href="/" className="mx-auto">
                  BACK TO HOME
                </CtaButton>
              </motion.div>
            </motion.div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

