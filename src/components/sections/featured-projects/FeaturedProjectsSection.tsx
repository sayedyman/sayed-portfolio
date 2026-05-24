"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeaturedProjectsGrid } from "@/components/FeaturedProjectsGrid";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SanityFeaturedProject } from "@/lib/sanity/queries";

interface FeaturedProjectsSectionProps {
  projects: SanityFeaturedProject[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <Section id="work" padding="xl">
      <Container size="full" className="px-4 md:px-8 lg:px-12">
        <Grid className="mb-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-end justify-between">
            <SectionHeader
              label="/ 02 — Selected Work"
              title={<>Featured <span className="text-primary italic font-editorial">Projects</span></>}
              className="mb-0"
              titleClassName="lg:text-7xl uppercase tracking-tighter"
            />
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
  );
}
