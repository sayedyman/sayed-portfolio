"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

export function ExpertiseSection() {
  return (
    <Section id="experience" padding="xl" className="bg-secondary/30">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <SectionHeader
              label="/ 03 — Expertise"
              title={<>Capabilities & <br/>Experience</>}
              className="mb-8"
            />
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
  );
}
