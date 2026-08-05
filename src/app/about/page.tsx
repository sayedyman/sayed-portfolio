"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-background">
      {/* Background Ambient Noise Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-grain opacity-[0.03] mix-blend-overlay" />

      {/* 1. INTRO HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden">
        {/* Soft Ambient Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none blur-3xl opacity-50" />
        
        <Container className="relative z-10 flex-1 flex flex-col justify-center">
          <Grid>
            <motion.div 
              className="col-span-4 md:col-span-8 lg:col-span-12"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                <span className="w-8 h-[1px] bg-primary"></span>
                About Sayed
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-[6vw] leading-[1.05] tracking-tight font-heading font-medium text-foreground max-w-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Blending strategy, <span className="text-muted-foreground italic font-editorial">psychology</span>, and interface design into <span className="text-primary italic font-editorial">thoughtful</span> digital experiences
              </motion.h1>
            </motion.div>
          </Grid>
        </Container>
      </section>

      {/* 2. PERSONAL NARRATIVE & 5. IMAGE SECTION */}
      <section className="relative py-32 overflow-hidden">
        {/* Transition Blurs */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute -left-[20%] top-[20%] w-[50%] aspect-square rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        
        <Container>
          <Grid className="items-center">
            
            {/* Cinematic Portrait */}
            <motion.div 
              className="col-span-4 md:col-span-4 lg:col-span-5 relative aspect-[3/4] rounded-sm overflow-hidden mb-16 lg:mb-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src="/hero-portrait-real.jpg" 
                alt="Sayed Ayman Elghanam - UI/UX Designer Portrait" 
                fill 
                className="object-cover filter contrast-[1.1] saturate-0 brightness-75"
              />
              {/* Fade Blending Edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
              <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay pointer-events-none" />
            </motion.div>

            {/* Narrative */}
            <motion.div 
              className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 flex flex-col gap-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-medium leading-tight text-foreground">
                From human behavior <br/>to digital structure
              </h2>
              
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  Hi, I&apos;m Sayed Ayman Elghanam
                </p>
                <p>
                  I&apos;m a UI/UX Designer and aspiring Design Engineer who enjoys building products that balance user needs with business goals
                </p>
                <p>
                  I started my journey studying Sociology at Damanhour University, where I became fascinated by understanding people, their motivations, and the way they make decisions
                </p>
                <p>
                  That curiosity naturally led me into UX Design, where I realized that every interface is ultimately designed for human behavior
                </p>
                <p>
                  Today I focus on creating digital experiences that balance user needs with business goals while continuously expanding my skills beyond traditional UI/UX
                </p>
              </div>

              {/* 3. CURRENTLY STATEMENT */}
              <div className="mt-8 pt-8 border-t border-border/30">
                <p className="text-foreground/90 font-medium italic font-editorial text-xl">
                  Currently transitioning into Design Engineering, combining design thinking with front-end development to build products that are both beautiful and functional
                </p>
              </div>
            </motion.div>
          </Grid>
        </Container>
      </section>

      {/* 6. MINDSET PRINCIPLES */}
      <section className="relative py-32 bg-secondary/10 border-y border-border/5">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-16">
              <h2 className="text-sm tracking-widest text-muted-foreground uppercase">/ Philosophy</h2>
            </div>
            
            {[
              { title: "Clarity over decoration", desc: "Design should remove friction, not add it. Every visual element must serve a distinct communicative purpose" },
              { title: "Systems over randomness", desc: "Scalable products require foundational logic. I build cohesive design systems that ensure consistency and engineering velocity" },
              { title: "Usability before trends", desc: "Aesthetics attract, but usability retains. I prioritize intuitive navigation and clear hierarchy above fleeting visual trends" }
            ].map((principle, index) => (
              <motion.div 
                key={index}
                className="col-span-4 md:col-span-4 lg:col-span-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-full pr-8">
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* 4. GROWTH & TRANSFORMATION (Milestones) */}
      <section className="relative py-32 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute right-[10%] top-[30%] w-[40%] aspect-square rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-16">
              <h2 className="text-sm tracking-widest text-muted-foreground uppercase">
                / Milestones
              </h2>
            </div>
            
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col gap-24">
              {[
                {
                  year: "2025",
                  title: "Product Design Evolution",
                  context: "Digital Egypt Pioneers Initiative (DEPI)",
                  desc: "When he&apos;s not wireframing or conducting user interviews, you&apos;ll likely find him exploring typographic grids, reading about architectural design, or mentoring junior designers breaking into the field"
                },
                {
                  year: "2024",
                  title: "UX Shift & Interface Specialization",
                  context: "Information Technology Institute (ITI)",
                  desc: "Solidified my approach to user-centered design. Shifted focus from pure interface aesthetics to wireframing, accessibility, and research-backed prototyping"
                },
                {
                  year: "2022",
                  title: "The Human Element",
                  context: "BA in Sociology, Damanhour University",
                  desc: "The root of my UX philosophy. Studying sociology provided the analytical framework I use today to understand user motivations and societal interaction patterns"
                }
              ].map((milestone, index) => (
                <motion.div 
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <div className="text-white/40 font-heading text-4xl md:text-5xl group-hover:text-white transition-colors duration-500 shrink-0">
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-medium text-foreground mb-2">{milestone.title}</h3>
                      <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-4">{milestone.context}</span>
                      <p className="text-muted-foreground/80 leading-relaxed max-w-xl">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Grid>
        </Container>
      </section>

      {/* 7. PREMIUM HIGHLIGHTS */}
      <section className="relative py-24 bg-secondary/5 border-t border-border/5">
        <Container>
          <Grid className="items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
              <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">
                Selected <span className="text-white italic font-editorial">Highlights</span>
              </h2>
            </div>
            
            <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {[
                { title: "Pixel Perfect Competition", highlight: "3rd Place", desc: "Recognized among top participants for designing a high-conversion, structured landing page and product experience" },
                { title: "Zag Eng Team Workshop", highlight: "1st Place", desc: "Awarded top honors for exceptional problem-solving and UI execution during an intensive design workshop" }
              ].map((award, index) => (
                <motion.div 
                  key={index}
                  className="p-8 border border-border/30 bg-background/50 backdrop-blur-sm rounded-sm hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{award.title}</span>
                    <span className="text-primary font-medium">{award.highlight}</span>
                  </div>
                  <p className="text-muted-foreground/90">{award.desc}</p>
                </motion.div>
              ))}
            </div>
          </Grid>
        </Container>
      </section>
    </div>
  );
}
