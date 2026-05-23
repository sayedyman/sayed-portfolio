"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeaturedProjectsGrid } from "@/components/FeaturedProjectsGrid";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { SanityFeaturedProject } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image"

interface HomeClientProps {
  projects: SanityFeaturedProject[];
  articles: any[];
}

export default function HomeClient({ projects, articles }: HomeClientProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 1024;
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const capabilitiesRef = useRef(null);
  const { scrollYProgress: capabilitiesScroll } = useScroll({
    target: capabilitiesRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(capabilitiesScroll, [0, 1], ["-15%", "15%"]);
  const parallaxYReverse = useTransform(capabilitiesScroll, [0, 1], ["15%", "-15%"]);

  return (
    <>
      {/* HERO SECTION */}
      <section ref={heroRef}   className="relative min-h-auto lg:min-h-[100dvh] flex flex-col justify-start lg:justify-center pt-[calc(max(env(safe-area-inset-top),1.5rem)+3rem)] lg:pt-[calc(max(env(safe-area-inset-top),1.5rem)+6rem)] md:pt-40 pb-20 md:pb-28 lg:pb-12 overflow-hidden bg-background">
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
                  className="opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300 ease-out hover:-translate-x-0.5 hover:drop-shadow-[0_0_8px_rgba(255,229,0,0.25)] [writing-mode:vertical-lr] rotate-180"
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
                  <span>UI/UX Designer</span>
                </div>
                <div className="text-sm md:text-base text-muted-foreground max-w-[85vw] md:max-w-md leading-relaxed font-editorial pl-12 md:pl-16">
                  Designing modern digital experiences that solve real problems.
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
                  alt="Sayed Ayman Elghanam" 
                  fill 
                  sizes="(max-width: 768px) 65vw, (max-width: 1024px) 40vw, 380px"
                  className="object-cover object-[center_15%]"
                  priority
                />
                <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay pointer-events-none hidden lg:block" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_20%,transparent_25%,rgba(5,5,5,0.7)_60%,rgba(5,5,5,0.95)_100%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-2/5 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-2/5 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="hidden md:flex col-span-4 md:col-span-8 lg:col-span-12 z-30 mt-8 lg:mt-24 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 pl-1 lg:pl-16 w-full [&>a]:w-full sm:[&>a]:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/#work" passHref>
                <MagneticButton className="px-8 py-4 text-xs font-semibold tracking-widest uppercase touch-active">
                  View Projects
                </MagneticButton>
              </Link>
              <Link href="/contact" passHref>
                <MagneticButton variant="ghost" className="px-8 py-4 text-xs font-semibold tracking-widest uppercase border border-border/50 touch-active">
                  Let&apos;s Work Together
                </MagneticButton>
              </Link>
            </motion.div>

          </Grid>
        </Container>



        {/* Mobile Next Section continuation gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none lg:hidden z-10" />
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" padding="xl" className="bg-secondary/20">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-3 lg:col-span-4">
              <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-8 md:mb-0">
                / 01 — Philosophy
              </h2>
            </div>
            <div className="col-span-4 md:col-span-5 lg:col-span-8">
              <h3 className="text-3xl md:text-4xl lg:text-6xl font-heading font-medium leading-[1.1] md:leading-tight mb-8 md:mb-12">
                I believe that <span className="text-primary italic font-editorial">form</span> follows <span className="text-primary italic font-editorial">function</span>, but that doesn&apos;t mean it can&apos;t look incredibly good doing it.
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-muted-foreground text-lg">
                <p>With a background in both structural problem solving and visual aesthetics, I bridge the gap between complex business requirements and seamless user experiences.</p>
                <p>I don&apos;t just design screens; I build scalable design systems and craft cinematic experiences that convert users into loyal customers.</p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <Link href="/about" className="inline-flex items-center gap-2 font-medium border-b border-primary/30 hover:border-primary touch-active transition-colors pb-1">
                  More about me <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section id="work" padding="xl">
        <Container size="full" className="px-4 md:px-8 lg:px-12">
          <Grid className="mb-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-end justify-between">
              <div>
                <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">
                  / 02 — Selected Work
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tighter uppercase">
                  Featured <span className="text-primary italic font-editorial">Projects</span>
                </h3>
              </div>
              <Link href="/projects" passHref>
                <MagneticButton variant="ghost" className="hidden md:flex items-center gap-2 px-6 py-3 border border-border rounded-full">
                  All Projects <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </Grid>

          {/* Project Grid - Asymmetrical — pure presentational, no async */}
          <FeaturedProjectsGrid projects={projects} />
        </Container>
      </Section>

      {/* EXPERIENCE & EXPERTISE */}
      <Section id="experience" padding="xl" className="bg-secondary/30">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-4 lg:col-span-5">
              <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">/ 03 — Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-medium leading-tight mb-8">Capabilities & <br/>Experience</h3>
              <p className="text-muted-foreground mb-12 max-w-sm">Combining UX thinking, problem-solving, and modern visual execution to design digital experiences that are intuitive, scalable, and user-focused.</p>
              <div className="flex flex-col gap-4">
                {["UX/UI Design","User Research","Wireframing & Prototyping","Design Systems","User Flows","Usability Testing","Responsive Design","Figma & Framer"].map((skill) => (
                  <div key={skill} className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-lg font-medium">{skill}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  </div>
                ))}
              </div>
              <div className="mt-12 flex items-start">
                <a href="https://drive.google.com/file/d/1TNIBfINEXBhwS9_lPxeRip0PMZ7LPidU/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <MagneticButton variant="ghost" className="px-8 py-4 border border-border/50 text-xs font-semibold tracking-widest uppercase gap-2 group/btn touch-active">
                    View Resume <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </MagneticButton>
                </a>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 mt-16 md:mt-0">
              <div className="flex flex-col gap-12">
                {[
                  { role: "UI/UX Designer", company: "Freelance & Personal Projects", period: "2025 - Present", desc: "Designing user-centered web and mobile experiences with a focus on usability, structure, and modern visual systems. Building complete UX case studies and scalable interfaces for digital products." },
                  { role: "UI/UX Competition Finalist", company: "Pixels Perfect Competition", period: "2025", desc: "Ranked among top participants in a competitive UI/UX challenge focused on landing page and product experience design. Created high-fidelity interfaces and interactive user flows." },
                  { role: "UI/UX Trainee", company: "Digital Egypt Pioneers Initiative (DEPI)", period: "2025 - 2026", desc: "Participating in intensive UX/UI training focused on user research, wireframing, prototyping, usability, and product thinking while developing real-world UX case studies." },
                  { role: "UX/UI Learning Journey", company: "Google UX & Industry Courses", period: "2024 - Present", desc: "Studying UX research, accessibility, interaction design, wireframing, and user-centered methodologies through Google UX certifications and practical product design projects." }
                ].map((job, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -left-6 md:-left-12 top-2 bottom-0 w-px bg-border/50 group-hover:bg-primary/50 transition-colors" />
                    <div className="absolute -left-[27px] md:-left-[51px] top-2 w-3 h-3 rounded-full border-2 border-background bg-border group-hover:bg-primary transition-colors" />
                    <span className="text-primary text-sm font-medium mb-2 block">{job.period}</span>
                    <h4 className="text-2xl font-heading font-medium mb-1">{job.role}</h4>
                    <span className="text-muted-foreground mb-4 block font-medium">{job.company}</span>
                    <p className="text-muted-foreground/80 leading-relaxed">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* DESIGN CAPABILITIES */}
      <Section id="capabilities" padding="xl" className="bg-background relative border-t border-border/10 overflow-hidden">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-24">
              <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">/ 04 — Services</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tighter uppercase leading-[0.9] mb-4 md:mb-6">Services</h3>
              <p className="text-xl md:text-2xl text-muted-foreground font-editorial italic">Strategic Digital Product Design</p>
            </div>
          </Grid>
          <div ref={capabilitiesRef} className="relative mt-12">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent -translate-x-1/2" />
            <Grid className="gap-y-32 gap-x-8">
              {[
                { num: "01", title: "UX Strategy & Research", desc: "Validating decisions through research to align human behavior with real business objectives.", stagger: false, reverseParallax: false },
                { num: "02", title: "Mobile & Web Applications", desc: "Simplifying complex workflows into intuitive, high-performing digital experiences.", stagger: true, reverseParallax: true },
                { num: "03", title: "SaaS Product Design", desc: "Architecting scalable, data-driven systems focused on usability, retention, and long-term product growth.", stagger: false, reverseParallax: false },
                { num: "04", title: "Landing Page Design", desc: "Structuring conversion-focused narratives that communicate value clearly and drive measurable results.", stagger: true, reverseParallax: true }
              ].map((service, i) => (
                <div key={i} className={`col-span-4 md:col-span-6 relative group ${service.stagger ? 'lg:mt-32' : ''}`}>
                  <div className="absolute -top-16 left-0 right-0 h-px bg-gradient-to-r from-border/20 via-border/5 to-transparent" />
                  <motion.div 
                    style={!isMobile ? { y: service.reverseParallax ? parallaxYReverse : parallaxY } : {}}
                    className="absolute -top-8 -left-4 md:-top-20 md:-left-12 text-[80px] md:text-[200px] font-heading font-bold text-muted-foreground/[0.03] md:text-muted-foreground/5 leading-none select-none pointer-events-none transition-colors duration-700 group-hover:text-primary/[0.03] z-0"
                  >
                    {service.num}
                  </motion.div>
                  <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <h4 className="text-2xl md:text-3xl font-heading font-medium mb-6 transition-colors duration-500 group-hover:text-primary">{service.title}</h4>
                    <p className="text-muted-foreground/80 leading-relaxed max-w-md text-lg">{service.desc}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>

      {/* JOURNAL & INSIGHTS */}
      <Section id="journal" padding="xl" className="bg-background relative border-t border-border/10">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">/ 05 — Journal</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tighter uppercase leading-[0.9]">
                  Insights & <br/> <span className="text-primary italic font-editorial">Observations</span>
                </h3>
              </div>
              <Link href="/articles" passHref>
                <MagneticButton variant="ghost" className="hidden md:flex items-center gap-2 px-6 py-3 border border-border/50 rounded-full text-xs font-semibold uppercase tracking-widest">
                  See All Articles <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {articles?.slice(0, 2).map((article, index) => (
                <Link
                  key={article.slug?.current}
                  href={`/articles/${article.slug?.current}`}
                  className={`group block ${index === 1 ? "md:mt-24" : ""}`}
                 >
                  <div className="relative aspect-[16/9] md:aspect-[4/3] bg-secondary/30 rounded-xl overflow-hidden mb-6">
                   {article.coverImage ? (
                    <Image
                     src={urlFor(article.coverImage).url()}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#050505] flex items-center justify-center border border-border/50 rounded-xl">
                   <span className="text-muted-foreground/20 font-heading text-4xl">
                     Article Cover
                   </span>
                 </div>
                )}

                <div className="absolute top-6 left-6 px-3 py-1 bg-background/50 lg:backdrop-blur-md border border-border/30 rounded-full text-[10px] font-medium uppercase tracking-widest z-20">
                    {article.category || "Article"}
                </div>
              </div>

              <div className="flex flex-col gap-3 pr-4">
                <span className="text-[11px] text-muted-foreground font-medium tracking-widest">
                  ARTICLE
                </span>

                 <h4 className="text-2xl lg:text-3xl font-heading font-medium group-hover:text-primary transition-colors leading-tight">
                   {article.title}
                 </h4>

                  <p className="text-muted-foreground/80 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>
               </div>
           </Link>
         ))}
            </div>
            <div className="col-span-4 mt-12 md:hidden">
              <Link href="/articles" passHref>
                <MagneticButton variant="ghost" className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-border/50 rounded-full text-[10px] font-semibold uppercase tracking-widest">
                  See All Articles <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
