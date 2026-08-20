"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { SanityProject } from "@/types";
import { urlFor } from "@/lib/sanity/image";

interface ProjectsClientProps {
  projects: SanityProject[];
}

/**
 * ProjectsClient — Client Component
 *
 * Owns all client-side logic: filter state, Framer Motion animations,
 * hover interactions, and project rendering. Receives Sanity project data
 * as props from the async Server Component wrapper (page.tsx).
 *
 * All Framer Motion animations, Tailwind classes, layout structure,
 * hover interactions, and typography are preserved exactly from the
 * original implementation. Only the data source has changed.
 */
export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Derive filter options from projectType values in the dataset
  const filters = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.projectType).filter(Boolean) as string[])),
  ];

  // Filter projects by projectType — falls back gracefully if projectType is undefined
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.projectType === activeFilter);

  return (
    <div className="relative min-h-[100dvh] pt-32 pb-24 overflow-hidden bg-background">
      <Container className="relative z-10">

        {/* HERO SECTION */}
        <Grid className="mb-12 md:mb-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-12 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <h1 className="text-[clamp(2.5rem,8vw,7.5rem)] font-heading font-medium leading-[0.9] tracking-tighter uppercase mb-8 whitespace-nowrap">
                Selected <span className="text-foreground dark:text-white italic font-editorial">Projects</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                A curated showcase of digital experiences. Focusing on UX thinking, product strategy, and user-centered problem solving
              </p>
            </motion.div>
          </div>
        </Grid>

        {/* VISUAL FILTERING */}
        <Grid className="mb-24">
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6 md:gap-10 border-b border-border/30 pb-4"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-300 relative pb-1 py-2 touch-active ${
                    activeFilter === filter ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute -bottom-[5px] left-0 right-0 h-[1px] bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </div>
        </Grid>

        {/* PROJECTS SHOWCASE */}
        <div className="flex flex-col gap-32 md:gap-48 mb-32 md:mb-48">
          {filteredProjects.length === 0 ? (
            <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-4 text-foreground uppercase">
                More projects are on the way
              </h2>
              <h3 className="text-2xl font-heading font-medium mb-3">More projects are on the way</h3>
              <p className="text-muted-foreground">
                I&apos;m continuously working on new products and case studies
              </p>
            </div>
          ) : (
            filteredProjects.map((project, i) => {
              const hasImage = !!project.coverImage?.asset
              const isComingSoon = !!project.comingSoon

              const CardWrapper = isComingSoon ? 'div' : 'a'
              const wrapperProps = isComingSoon
                ? {
                    className: "block cursor-default",
                    'aria-disabled': true,
                  }
                : {
                    href: project.behanceUrl || '#',
                    target: project.behanceUrl ? "_blank" : undefined,
                    rel: "noopener noreferrer",
                    className: "block",
                  }

              return (
                <CardWrapper key={project._id} {...wrapperProps}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`group ${!isComingSoon && 'cursor-pointer'}`}
                  >
                    <Grid>
                      <div className={`col-span-4 md:col-span-8 lg:col-span-10 ${i % 2 !== 0 ? 'lg:col-start-3' : ''}`}>

                        {/* Cinematic Image / Gradient */}
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm bg-secondary mb-8 md:mb-12">
                          {/* Ambient Hover Overlay */}
                          {!isComingSoon && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex items-center justify-center">
                              {/* CTA Button */}
                              <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 bg-[#FFE500] hover:bg-[#FFE500]/90 text-black px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase">
                                View on Behance <ArrowUpRight className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                          {isComingSoon && (
                            <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center pointer-events-none">
                              <div className="bg-background/60 dark:bg-black/50 backdrop-blur-sm text-foreground/90 dark:text-white/90 border border-border/50 dark:border-white/10 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase">
                                Coming Soon
                              </div>
                            </div>
                          )}

                          <div className="absolute top-4 right-4 z-20 text-[9px] tracking-[0.25em] uppercase font-medium text-foreground/80 dark:text-white/80 border border-border/50 dark:border-white/10 bg-background/60 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
                            {project.projectType ?? (project.tags && project.tags[0]) ?? project.category ?? 'PROJECT'}
                          </div>

                          {hasImage ? (
                            <Image
                              src={urlFor(project.coverImage!).width(1200).height(675).url()}
                              alt={project.title}
                              fill
                              className={`object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isComingSoon 
                                  ? 'blur-[3px] brightness-[0.75] scale-[1.01] group-hover:scale-[1.02]' 
                                  : 'group-hover:blur-[2px] group-hover:scale-[1.01]'
                              }`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 83vw, 1000px"
                            />
                          ) : (
                            /* Base Cinematic Gradient — preserved from original */
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient ?? 'from-[#0F1115] via-[#171A21] to-[#050816]'}`}
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {/* Abstract subtle lighting */}
                              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/5 blur-3xl rounded-full" />
                              <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                              <div className="absolute inset-0 flex items-center justify-center border border-border/20">
                                <span className="text-muted-foreground/20 font-heading text-3xl md:text-5xl uppercase tracking-widest mix-blend-overlay">
                                  {project.title}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 pl-1 md:pl-4">
                          <div className="flex-1 min-w-0 max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-text">
                                {project.category ?? 'CASE STUDY'}
                              </span>
                            </div>

                            <h2 className={`text-[clamp(1.5rem,5vw,3rem)] font-heading font-medium mb-4 md:mb-6 transition-colors duration-500 break-words [overflow-wrap:anywhere] ${isComingSoon ? 'text-muted-foreground' : 'group-hover:text-accent-text'}`}>
                              {project.title}
                            </h2>

                            {project.summary && (
                              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                                {project.summary}
                              </p>
                            )}
                          </div>

                          {!isComingSoon && (
                            <div className="flex-shrink-0 pt-2">
                              <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-foreground/80 group-hover:text-accent-text transition-colors duration-500">
                                View on Behance
                                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent-text group-hover:bg-accent-text/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </Grid>
                  </motion.div>
                </CardWrapper>
              )
            })
          )}
        </div>



      </Container>
    </div>
  );
}
