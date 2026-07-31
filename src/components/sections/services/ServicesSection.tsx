"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowRight } from "lucide-react";

const services = [
  { 
    num: "01", 
    title: "UX Audit & Product Review", 
    desc: "Diagnosing friction points and identifying critical usability improvements to elevate the overall product experience and optimize user flows",
    tags: ["Usability Testing", "Heuristic Evaluation", "User Research", "UX Strategy"]
  },
  { 
    num: "02", 
    title: "Landing Page Design", 
    desc: "Structuring premium, conversion-focused narratives driven by strong visual hierarchy and modern, cinematic responsiveness",
    tags: ["Figma", "Responsive Design", "Visual Storytelling", "Conversion UX"]
  },
  { 
    num: "03", 
    title: "Web & Mobile App Design", 
    desc: "Crafting scalable product interfaces that balance clean interaction systems with highly functional, modern responsive UX/UI",
    tags: ["Figma", "Design Systems", "Prototyping", "iOS & Android"]
  },
  { 
    num: "04", 
    title: "Dashboard UI/UX Design", 
    desc: "Architecting clean information hierarchy and usability-focused workflows to make data-heavy interfaces feel structured and effortless",
    tags: ["Data Visualization", "Information Architecture", "SaaS", "Enterprise UX"]
  }
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <Section id="capabilities" padding="xl" className="bg-background relative border-t border-border/10 overflow-hidden">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-10 md:mb-14">
            <SectionHeader
              title="Services"
              subtitle="Strategic Digital Product Design"
              className="mb-4 md:mb-6"
              titleClassName="uppercase tracking-tighter leading-[0.9] !mb-3 md:!mb-4"
            />
          </div>
        </Grid>

        <div className="flex flex-col border-t border-border/20">
          {services.map((service, i) => {
            const isActive = activeService === i;

            return (
              <motion.div
                key={service.num}
                className="border-b border-border/20 overflow-hidden cursor-pointer flex flex-col"
                onMouseEnter={() => setActiveService(i)}
                onClick={() => setActiveService(i)}
                layout
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth easeOut
              >
                {/* Header Area (Always visible) */}
                <motion.div 
                  layout="position"
                  className={`py-6 md:py-8 flex items-center justify-between transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-xl md:text-2xl font-heading text-muted-foreground/50">{service.num}</span>
                    <h3 className="text-2xl md:text-4xl font-heading font-medium transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <motion.div 
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center bg-secondary/50 shrink-0"
                  >
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.div>

                {/* Expanded Content Area */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 pt-2 flex flex-col">
                        
                        {/* Details & CTA */}
                        <div className="w-full lg:w-2/3 flex flex-col">
                          <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-6"
                          >
                            {service.desc}
                          </motion.p>
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="flex flex-wrap gap-2 mb-8"
                          >
                            {service.tags.map((tag) => (
                              <span key={tag} className="px-4 py-1.5 rounded-full border border-border/30 bg-secondary/30 text-sm text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="items-start flex"
                          >
                            <CtaButton variant="secondary" href="/contact">
                              Start Your Project
                            </CtaButton>
                          </motion.div>
                        </div>
                        
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
