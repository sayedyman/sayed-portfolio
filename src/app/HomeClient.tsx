"use client";

import dynamic from "next/dynamic";
import type { SanityFeaturedProject, SanityTestimonial, SanityArticle } from "@/types";

import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { FeaturedProjectsSection } from "@/sections/featured-projects";
import { ExpertiseSection } from "@/sections/expertise";
import { ServicesSection } from "@/sections/services";
import { JournalSection } from "@/sections/journal";

const TestimonialsSection = dynamic(() => import("@/sections/testimonials").then(m => m.TestimonialsSection), { ssr: true });

interface HomeClientProps {
  projects: SanityFeaturedProject[];
  articles: SanityArticle[];
  testimonials: SanityTestimonial[];
}

export default function HomeClient({ projects, articles, testimonials }: HomeClientProps) {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection projects={projects} />
      <ExpertiseSection />
      <ServicesSection />
      <JournalSection articles={articles} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
