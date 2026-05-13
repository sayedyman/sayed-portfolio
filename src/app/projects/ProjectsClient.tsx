"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SanityProject } from "@/lib/sanity/queries";
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
    <main className="relative min-h-[100svh] pt-32 pb-24 overflow-hidden bg-background">
      <Container className="relative z-10">

        {/* HERO SECTION */}
        <Grid className="mb-24 md:mb-32">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-12 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-heading font-medium leading-[0.9] tracking-tighter uppercase mb-8">
                Selected <br className="hidden md:block" />
                <span className="text-primary italic font-editorial">Projects</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                A curated showcase of digital experiences. Focusing on UX thinking, product strategy, and user-centered problem solving.
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
                  className={`text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-300 relative pb-1 ${
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
            <div className="flex items-center justify-center py-24">
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                No projects in this category yet
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const slug = project.slug?.current ?? '#'
              const hasImage = !!project.coverImage?.asset

              return (
                <Link key={project._id} href={`/projects/${slug}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer"
                  >
                    <Grid>
                      <div className={`col-span-4 md:col-span-8 lg:col-span-10 ${project.align === 'right' ? 'lg:col-start-3' : ''}`}>

                        {/* Cinematic Image / Gradient */}
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm bg-secondary mb-8 md:mb-12">
                          {/* Ambient Hover Overlay */}
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                          {hasImage ? (
                            <Image
                              src={urlFor(project.coverImage!).width(1200).height(675).url()}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 83vw, 1000px"
                            />
                          ) : (
                            /* Base Cinematic Gradient — preserved from original */
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient ?? 'from-[#111] via-[#161616] to-[#050505]'}`}
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
                          <div className="flex-1 max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary">
                                {project.category ?? project.projectType}
                              </span>
                              {project.tags && project.tags.length > 0 && (
                                <>
                                  <span className="w-4 h-px bg-border/50" />
                                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground flex gap-2">
                                    {project.tags.map((tag, i) => (
                                      <span key={tag}>
                                        {tag}{i < (project.tags?.length ?? 0) - 1 ? " •" : ""}
                                      </span>
                                    ))}
                                  </span>
                                </>
                              )}
                            </div>

                            <h2 className="text-3xl md:text-5xl font-heading font-medium mb-6 group-hover:text-primary transition-colors duration-500">
                              {project.title}
                            </h2>

                            {project.description && (
                              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                                {project.description}
                              </p>
                            )}
                          </div>

                          <div className="flex-shrink-0 pt-2">
                            <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-foreground/80 group-hover:text-primary transition-colors duration-500">
                              View Case Study
                              <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                                <ArrowUpRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Grid>
                  </motion.div>
                </Link>
              )
            })
          )}
        </div>

        {/* FINAL CTA */}
        <Grid className="relative pb-24 border-t border-border/20 pt-24 md:pt-32">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-8 text-foreground uppercase max-w-3xl mx-auto">
                Let&apos;s Build <br className="hidden md:block"/>
                <span className="text-primary italic font-editorial">Something Exceptional</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Ready to transform your vision into a crafted digital reality.
              </p>
              <Link href="/contact" passHref>
                <MagneticButton className="px-8 py-4 text-sm font-semibold tracking-widest uppercase flex items-center gap-2 mx-auto">
                  Start the conversation <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </Grid>

      </Container>
    </main>
  );
}
