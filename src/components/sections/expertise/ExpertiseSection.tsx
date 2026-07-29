"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaButton } from "@/components/ui/CtaButton";
import { siteConfig } from "@/config/site";

export function ExpertiseSection() {
  return (
    <Section id="experience" padding="xl" className="bg-secondary/30">
      <Container>
        <Grid className="mb-10 md:mb-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col">
            <SectionHeader
              title={<>Capabilities & <span className="text-white italic font-editorial">Experience</span></>}
              className="mb-4"
              titleClassName="leading-tight"
            />
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Combining UX thinking, problem-solving, and modern visual execution to design digital experiences that are intuitive, scalable, and user-focused.
            </p>
          </div>
        </Grid>

        <Grid>
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <div className="flex flex-col gap-4">
              {["UX/UI Design","User Research","Wireframing & Prototyping","Design Systems","User Flows","Usability Testing","Responsive Design","Figma & Framer"].map((skill) => (
                <div key={skill} className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="text-lg font-medium">{skill}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-start">
              <CtaButton 
                variant="secondary" 
                href={siteConfig.resumeUrl}
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Resume
              </CtaButton>
            </div>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 mt-16 md:mt-0">
            <div className="flex flex-col gap-12">
              {[
                { role: "UI/UX Trainee", company: "Digital Egypt Pioneers Initiative (DEPI)", period: "2026 — Present", desc: "Participating in intensive UX/UI training focused on user research, wireframing, prototyping, usability, and product thinking while developing real-world UX case studies." },
                { role: "Freelance UI/UX Designer", company: "Freelance & Personal Projects", period: "2025", desc: "Designing user-centered web and mobile experiences with a focus on usability, structure, and modern visual systems. Building complete UX case studies and scalable interfaces for digital products." },
                { role: "UI/UX Competition Finalist", company: "Pixels Perfect Competition", period: "2025", desc: "Ranked among top participants in a competitive UI/UX challenge focused on landing page and product experience design. Created high-fidelity interfaces and interactive user flows." },
                { role: "UX/UI Education & Certifications", company: "Google UX & Industry Courses", period: "2024", desc: "Studying UX research, accessibility, interaction design, wireframing, and user-centered methodologies through Google UX certifications and practical product design projects." }
              ].map((job, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -left-6 md:-left-12 top-2 bottom-0 w-px bg-border/50 group-hover:bg-primary/50 transition-colors" />
                  <div className="absolute -left-[27px] md:-left-[51px] top-2 w-3 h-3 rounded-full border-2 border-background bg-border group-hover:bg-primary transition-colors" />
                  <span className="text-white text-sm font-medium mb-2 block">
                    {job.period.includes("Present") ? (
                      <>
                        {job.period.replace(" — Present", "")} <span className="text-muted-foreground">—</span> <span className="text-primary">Present</span>
                      </>
                    ) : (
                      job.period
                    )}
                  </span>
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