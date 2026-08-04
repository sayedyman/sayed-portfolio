"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";

import { IconBrandLinkedin, IconBrandGithub, IconBrandBehance } from '@tabler/icons-react';

export function AboutSection() {
  return (
    <Section id="about" padding="xl" className="bg-secondary/20">
      <Container>
        <Grid>
          {/* Left Column - Portrait */}
          <div className="col-span-4 md:col-span-4 lg:col-span-5 flex flex-col justify-start">
            <motion.div 
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm filter contrast-[1.1] saturate-[0.8] brightness-[0.9] transition-all duration-1000 mb-8 md:mb-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src="/sayed-about.jpg" 
                alt="Sayed Ayman Elghanam" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_20%,transparent_25%,rgba(5,5,5,0.6)_60%,rgba(5,5,5,0.95)_100%)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column - Text */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-6 flex flex-col justify-center">
            <SectionHeader
              title={<>ABOUT <span className="text-white italic font-editorial">ME</span></>}
              subtitle={<span className="text-primary font-medium tracking-wide uppercase text-xs md:text-sm">UI/UX Designer & Design Engineer</span>}
              className="mb-6 md:mb-8"
              titleClassName="uppercase tracking-tighter leading-[0.9] text-5xl lg:text-7xl mb-2 md:mb-3"
              subtitleClassName="mb-0"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6 md:gap-8 text-muted-foreground text-lg"
            >
              <p className="leading-relaxed">
                I design digital products that solve real business problems. By combining strategic UX thinking with polished interface design and technical implementation, I craft scalable systems that balance human needs with business objectives
              </p>

              <div className="pt-4 border-t border-border/40">
                <blockquote className="text-lg md:text-xl font-heading font-medium leading-[1.3] text-foreground">
                  &quot;Great products happen when user needs and business goals move in the same direction&quot;
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-2">
                <CtaButton variant="secondary" href="/about">
                  See My Story
                </CtaButton>
                
                <div className="flex items-center gap-6">
                  {[
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/", Icon: IconBrandLinkedin },
                    { name: "Behance", href: "https://www.behance.net/sayedelghanam1", Icon: IconBrandBehance },
                    { name: "GitHub", href: "https://github.com/sayedyman", Icon: IconBrandGithub }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-muted-foreground hover:text-primary touch-active transition-all duration-300 ease-out hover:-translate-y-0.5"
                    >
                      <social.Icon className="w-5 h-5 stroke-[1.5]" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
