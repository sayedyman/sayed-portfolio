"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5.5 6v12h5.5c2 0 3.5-1 3.5-3.5 0-1.5-1-2.5-2-3v-.5c1-.5 1.5-1.5 1.5-2.5 0-2-1.5-2.5-3-2.5H5.5Z" />
    <path d="M5.5 11.5H11c.8 0 1.5-.5 1.5-1.5s-.7-1.5-1.5-1.5H5.5v3Z" />
    <path d="M5.5 18H11c1 0 2-.5 2-2s-1-2-2-2H5.5v4Z" />
    <path d="M15 9h4" />
    <path d="M15 14c0-2 1.5-3 3-3s3 1 3 3-1.5 3-3 3-3-1-3-3Z" />
    <path d="M15 14h6" />
  </svg>
);

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
                I design digital products that solve real business problems. By combining strategic UX thinking with polished interface design and technical implementation, I craft scalable systems that balance human needs with business objectives.
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
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/", Icon: LinkedinIcon },
                    { name: "Behance", href: "https://www.behance.net/sayedelghanam1", Icon: BehanceIcon },
                    { name: "GitHub", href: "https://github.com/sayedyman", Icon: GithubIcon }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-muted-foreground hover:text-primary touch-active transition-all duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(255,229,0,0.25)]"
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
