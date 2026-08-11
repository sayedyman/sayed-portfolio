"use client";

import { usePathname } from "next/navigation";

import { Container } from "./Container";
import { Grid } from "./Grid";
import { CtaButton } from "@/components/ui/CtaButton";
import { Section } from "./Section";

import { IconBrandLinkedin, IconBrandYoutube, IconBrandGithub, IconBrandBehance } from '@tabler/icons-react';
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <footer className={`relative bg-background overflow-hidden border-t border-border ${isContactPage ? 'pt-8 md:pt-12' : 'pt-16 md:pt-24'} pb-[calc(env(safe-area-inset-bottom)+3rem)]`}>
      <Container>
        <Section reveal={!isContactPage} padding="none">
          {!isContactPage && (
            <Grid className="mb-24">
              <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center text-center">
                <h2 className="font-heading text-[clamp(2.5rem,12vw,10rem)] leading-[0.9] tracking-tighter mb-8 text-foreground uppercase">
                  Let&apos;s Build<br/>
                  <span className="text-primary italic font-editorial">Together</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12">
                  Available for freelance opportunities and full-time product design roles at high-growth startups
                </p>
                <CtaButton variant="primary" size="lg" href="/contact">
                  Start a conversation
                </CtaButton>
              </div>
            </Grid>
          )}
          
          <div className={`flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-0 text-sm text-muted-foreground text-center md:text-left ${!isContactPage ? 'pt-8 border-t border-border/50' : ''}`}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-12 h-8 flex items-center">
                <Logo className="w-full h-full text-foreground" preserveAspectRatio="xMinYMid meet" />
              </div>
              <p>© {new Date().getFullYear()} Sayed Ayman Elghanam. All rights reserved</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/", Icon: IconBrandLinkedin },
                { name: "Behance", href: "https://www.behance.net/sayedelghanam1", Icon: IconBrandBehance },
                { name: "GitHub", href: "https://github.com/sayedyman", Icon: IconBrandGithub },
                { name: "YouTube", href: "https://www.youtube.com/@SayedUi-Ux", Icon: IconBrandYoutube }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground dark:hover:text-primary touch-active transition-all duration-300 ease-out hover:-translate-y-0.5"
                >
                  <social.Icon className="w-5 h-5 stroke-[1.5]" />
                </a>
              ))}
            </div>
          </div>
        </Section>
      </Container>
    </footer>
  );
}
