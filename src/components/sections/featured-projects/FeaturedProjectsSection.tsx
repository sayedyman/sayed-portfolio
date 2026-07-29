"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaButton } from "@/components/ui/CtaButton";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import type { SanityFeaturedProject } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: SanityFeaturedProject[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <Section id="work" padding="xl">
      <Container size="full" className="px-4 md:px-8 lg:px-12">
        <Grid className="mb-12 md:mb-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-0">
            <SectionHeader
              title={<>Featured <span className="text-primary italic font-editorial">Projects</span></>}
              className="mb-0"
              titleClassName="lg:text-7xl uppercase tracking-tighter mb-0"
            />
            <div className="flex">
              <CtaButton variant="secondary" href="/projects">
                All Projects
              </CtaButton>
            </div>
          </div>
        </Grid>

        {/* Project Grid - Asymmetrical — pure presentational, no async */}
        <FeaturedProjectsGrid projects={projects} />
      </Container>
    </Section>
  );
}
