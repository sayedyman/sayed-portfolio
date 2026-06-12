"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useServicesParallax } from "./services.motion";

export function ServicesSection() {
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const { parallaxY, parallaxYReverse } = useServicesParallax(capabilitiesRef);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Section id="capabilities" padding="xl" className="bg-background relative border-t border-border/10 overflow-hidden">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-24">
            <SectionHeader
              label="/ 04 — Services"
              title="Services"
              subtitle="Strategic Digital Product Design"
              className="mb-4 md:mb-6"
              titleClassName="uppercase tracking-tighter leading-[0.9]"
            />
          </div>
        </Grid>
        <div ref={capabilitiesRef} className="relative mt-12">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent -translate-x-1/2" />
          <Grid className="gap-y-32 gap-x-8">
            {[
              { num: "01", title: "UX Audit & Product Review", desc: "Diagnosing friction points and identifying critical usability improvements to elevate the overall product experience and optimize user flows.", stagger: false, reverseParallax: false },
              { num: "02", title: "Landing Page Design", desc: "Structuring premium, conversion-focused narratives driven by strong visual hierarchy and modern, cinematic responsiveness.", stagger: true, reverseParallax: true },
              { num: "03", title: "Web & Mobile App Design", desc: "Crafting scalable product interfaces that balance clean interaction systems with highly functional, modern responsive UX/UI.", stagger: false, reverseParallax: false },
              { num: "04", title: "Dashboard UI/UX Design", desc: "Architecting clean information hierarchy and usability-focused workflows to make data-heavy interfaces feel structured and effortless.", stagger: true, reverseParallax: true }
            ].map((service, i) => (
              <div key={i} className={`col-span-4 md:col-span-6 relative group ${service.stagger ? 'lg:mt-32' : ''}`}>
                <div className="absolute -top-16 left-0 right-0 h-px bg-gradient-to-r from-border/20 via-border/5 to-transparent" />
                <motion.div 
                  style={isMounted && !isMobile ? { y: service.reverseParallax ? parallaxYReverse : parallaxY } : {}}
                  className="absolute -top-8 -left-4 md:-top-20 md:-left-12 text-[80px] md:text-[200px] font-heading font-bold text-muted-foreground/[0.03] md:text-muted-foreground/5 leading-none select-none pointer-events-none transition-colors duration-700 group-hover:text-primary/[0.03] z-0"
                >
                  {service.num}
                </motion.div>
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <h4 className="text-2xl md:text-3xl font-heading font-medium mb-6 transition-colors duration-500 group-hover:text-primary">{service.title}</h4>
                  <p className="text-muted-foreground/80 leading-relaxed max-w-md text-lg">{service.desc}</p>
                </div>
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
