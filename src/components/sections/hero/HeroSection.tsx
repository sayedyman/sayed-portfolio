"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { CtaButton } from "@/components/ui/CtaButton";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="home"
      ref={heroRef}   
      className="relative min-h-auto lg:min-h-[100dvh] flex flex-col justify-start lg:justify-center pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-28 lg:pb-12 overflow-hidden bg-background"
    >
      <Container className="relative z-10 flex-1 flex flex-col justify-start lg:justify-center">
        <Grid className="h-full items-center relative">
          
          {/* Social Links - Absolute Left */}
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]"
            style={{ opacity }}
          >
            {[
              { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/" },
              { name: "Behance", href: "https://www.behance.net/sayedelghanam1" },
              { name: "GitHub", href: "https://github.com/sayedyman" }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.name} profile`}
                className="opacity-70 hover:opacity-100 hover:text-foreground dark:hover:text-primary transition-all duration-300 ease-out hover:-translate-x-0.5 dark:hover:drop-shadow-[0_0_8px_rgba(255,229,0,0.25)] [writing-mode:vertical-lr] rotate-180"
              >
                {social.name}
              </a>
            ))}
          </motion.div>

          {/* Main Typography Layer */}
          <div className="col-span-4 md:col-span-8 lg:col-span-12 z-20 pointer-events-none mt-6 md:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 flex flex-col gap-3 md:gap-4 pl-1 lg:pl-16"
            >
              <div className="flex items-center gap-4 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <span className="w-8 md:w-12 h-[1px] bg-primary"></span>
                <span>UI/UX Designer & Design Engineer</span>
              </div>
              <div className="text-sm md:text-base text-muted-foreground max-w-[85vw] md:max-w-xl lg:max-w-2xl leading-relaxed font-editorial pl-12 md:pl-16 text-balance">
                UI/UX Designer & Design Engineer | Helping SaaS founders build products that reduce UX friction and drive business growth
              </div>
            </motion.div>
            
            <h1 className="flex flex-col font-heading font-medium uppercase leading-[0.85] tracking-tighter text-[clamp(2.5rem,14vw,12.5vw)] md:text-[13vw] lg:text-[12.5vw] lg:pl-12 overflow-hidden">
              <motion.span 
                className="block mix-blend-difference z-30 relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Sayed
              </motion.span>
              <motion.span 
                className="block text-right lg:text-center text-primary z-30 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Elghanam
              </motion.span>
            </h1>
          </div>

          {/* Portrait Image Layer */}
          <motion.div 
            className="col-span-4 md:col-span-8 lg:col-span-none relative lg:absolute right-0 lg:right-12 top-auto lg:top-[40%] translate-y-0 lg:-translate-y-1/2 w-full max-w-[420px] lg:w-[380px] aspect-square sm:aspect-[4/5] z-10 pointer-events-none mt-12 md:mt-16 lg:mt-0 mx-auto lg:mx-0"
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-sm filter contrast-[1.05] saturate-[1.1] transition-all duration-1000">
              <Image 
                src="/sayed-portrait.jpg" 
                alt="Sayed Ayman Elghanam - UI/UX Designer Portrait" 
                fill 
                sizes="(max-width: 768px) 65vw, (max-width: 1024px) 40vw, 380px"
                className="object-cover object-[center_15%]"
                priority
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay pointer-events-none hidden lg:block" />
              
              {/* Dark Mode Overlay Treatment (Exactly as original) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_20%,transparent_25%,rgba(5,5,5,0.7)_60%,rgba(5,5,5,0.95)_100%)] hidden dark:block pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-background via-background/70 to-transparent hidden dark:block pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-background via-background/50 to-transparent hidden dark:block pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-2/5 bg-gradient-to-r from-background via-background/50 to-transparent hidden dark:block pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-2/5 bg-gradient-to-l from-background via-background/50 to-transparent hidden dark:block pointer-events-none" />

              {/* Light Mode Overlay Treatment (Edge-only fade, clear center) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_30%,transparent_45%,rgba(248,248,246,0.4)_75%,rgba(248,248,246,1)_100%)] dark:hidden pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-background via-background/80 to-transparent dark:hidden pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-background to-transparent dark:hidden pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[10%] bg-gradient-to-r from-background to-transparent dark:hidden pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-[10%] bg-gradient-to-l from-background to-transparent dark:hidden pointer-events-none" />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hidden md:flex col-span-4 md:col-span-8 lg:col-span-12 z-30 mt-8 lg:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 pl-1 lg:pl-16 w-full [&>a]:w-full sm:[&>a]:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <CtaButton variant="primary" href="/contact">
              Let&apos;s Work Together
            </CtaButton>
            <CtaButton variant="secondary" href="/#work">
              View Projects
            </CtaButton>
          </motion.div>

        </Grid>
      </Container>

      {/* Mobile Next Section continuation gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none lg:hidden z-10" />
    </section>
  );
}
