"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  return (
    <Section id="about" padding="xl" className="bg-secondary/20">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-8 md:mb-0">
              / 01 — Philosophy
            </h2>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-8">
            <SectionHeader
              title={<>I believe that <span className="text-primary italic font-editorial">form</span> follows <span className="text-primary italic font-editorial">function</span>, but that doesn&apos;t mean it can&apos;t look incredibly good doing it.</>}
              className="mb-8 md:mb-12"
              titleClassName="text-3xl md:text-4xl lg:text-6xl font-heading font-medium leading-[1.1] md:leading-tight mb-0"
            />
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
  );
}
