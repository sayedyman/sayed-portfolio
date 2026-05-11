"use client";

import { Container } from "./Container";
import { Grid } from "./Grid";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Section } from "./Section";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border pt-24 pb-12 overflow-hidden">
      <Container>
        <Section reveal={true} padding="none">
          <Grid className="mb-24">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center text-center">
              <h2 className="font-heading text-5xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter mb-8 text-foreground uppercase">
                Let's Build<br/>
                <span className="text-primary italic font-editorial">Together</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12">
                Available for freelance opportunities and full-time product design roles at high-growth startups.
              </p>
              <Link href="/contact" passHref>
                <MagneticButton className="px-10 py-5 text-lg flex items-center gap-2">
                  Start a conversation <ArrowUpRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            </div>
          </Grid>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-8">
                <Image src="/logo-symbol.svg" alt="Sayed Elghanam Logo" fill className="object-contain" />
              </div>
              <p>© {new Date().getFullYear()} Sayed Ayman Elghanam. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">Read.cv</a>
            </div>
          </div>
        </Section>
      </Container>
    </footer>
  );
}
