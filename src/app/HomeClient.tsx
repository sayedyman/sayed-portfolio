"use client";

import dynamic from "next/dynamic";
import type { SanityFeaturedProject, SanityTestimonial, SanityArticle } from "@/types";

import { HeroSection } from "@/sections/hero";
import { WhoIWorkWithSection } from "@/sections/who-i-work-with";
import { FeaturedProjectsSection } from "@/sections/featured-projects";
import { ServicesSection } from "@/sections/services";
import { AboutSection } from "@/sections/about";
import { ExpertiseSection } from "@/sections/expertise";
import { JournalSection } from "@/sections/journal";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

const TestimonialsSection = dynamic(() => import("@/sections/testimonials").then(m => m.TestimonialsSection), { ssr: true });

interface HomeClientProps {
  projects: SanityFeaturedProject[];
  articles: SanityArticle[];
  testimonials: SanityTestimonial[];
}

export default function HomeClient({ projects, articles, testimonials }: HomeClientProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    const timer = setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        if (lenis) {
          lenis.scrollTo(hash, { offset: -80, duration: 1.2 });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [lenis]);
  return (
    <>
      {/* Navbar clearance spacer — scales with viewport height */}
      <div className="h-[clamp(1rem,3vh,2.5rem)]" aria-hidden="true" />
      <HeroSection />
      <WhoIWorkWithSection />
      <FeaturedProjectsSection projects={projects} />
      <ServicesSection />
      <AboutSection />
      <ExpertiseSection />
      <JournalSection articles={articles} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
