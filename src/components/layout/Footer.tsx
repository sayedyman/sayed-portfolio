"use client";

import { usePathname } from "next/navigation";

import { Container } from "./Container";
import { Grid } from "./Grid";
import { CtaButton } from "@/components/ui/CtaButton";
import { Section } from "./Section";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1A2.8 2.8 0 0 1 5.4 4.5h13.2a2.8 2.8 0 0 1 2.9 2.6v9.8a2.8 2.8 0 0 1-2.9 2.6H5.4a2.8 2.8 0 0 1-2.9-2.6z" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const Behance = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5.5 6v12h5.5c2 0 3.5-1 3.5-3.5 0-1.5-1-2.5-2-3v-.5c1-.5 1.5-1.5 1.5-2.5 0-2-1.5-2.5-3-2.5H5.5Z" />
    <path d="M5.5 11.5H11c.8 0 1.5-.5 1.5-1.5s-.7-1.5-1.5-1.5H5.5v3Z" />
    <path d="M5.5 18H11c1 0 2-.5 2-2s-1-2-2-2H5.5v4Z" />
    <path d="M15 9h4" />
    <path d="M15 14c0-2 1.5-3 3-3s3 1 3 3-1.5 3-3 3-3-1-3-3Z" />
    <path d="M15 14h6" />
  </svg>
);

import Image from "next/image";

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
                  Available for freelance opportunities and full-time product design roles at high-growth startups.
                </p>
                <CtaButton variant="primary" size="lg" href="/contact">
                  Start a conversation
                </CtaButton>
              </div>
            </Grid>
          )}
          
          <div className={`flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-0 text-sm text-muted-foreground text-center md:text-left ${!isContactPage ? 'pt-8 border-t border-border/50' : ''}`}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-12 h-8">
                <Image src="/logo-symbol.svg" alt="Sayed Elghanam Logo" fill className="object-contain" />
              </div>
              <p>© {new Date().getFullYear()} Sayed Ayman Elghanam. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/", Icon: LinkedinIcon },
                { name: "Behance", href: "https://www.behance.net/sayedelghanam1", Icon: Behance },
                { name: "GitHub", href: "https://github.com/sayedyman", Icon: GithubIcon },
                { name: "YouTube", href: "https://www.youtube.com/@SayedUi-Ux", Icon: YoutubeIcon }
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
        </Section>
      </Container>
    </footer>
  );
}
