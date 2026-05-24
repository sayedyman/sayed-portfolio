"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

interface JournalSectionProps {
  articles: any[];
}

export function JournalSection({ articles }: JournalSectionProps) {
  return (
    <Section id="journal" padding="xl" className="bg-background relative border-t border-border/10">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <SectionHeader
              label="/ 05 — Journal"
              title={<>Insights & <br/> <span className="text-primary italic font-editorial">Observations</span></>}
              className="mb-0"
              titleClassName="uppercase tracking-tighter leading-[0.9]"
            />
            <Link href="/articles" passHref>
              <MagneticButton variant="ghost" className="hidden md:flex items-center gap-2 px-6 py-3 border border-border/50 rounded-full text-xs font-semibold uppercase tracking-widest">
                See All Articles <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {articles?.slice(0, 2).map((article, index) => (
              <Link
                key={article.slug?.current}
                href={`/articles/${article.slug?.current}`}
                className={`group block ${index === 1 ? "md:mt-24" : ""}`}
                >
                <div className="relative aspect-[16/9] md:aspect-[4/3] bg-secondary/30 rounded-xl overflow-hidden mb-6">
                  {article.coverImage ? (
                  <Image
                    src={urlFor(article.coverImage).url()}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#050505] flex items-center justify-center border border-border/50 rounded-xl">
                  <span className="text-muted-foreground/20 font-heading text-4xl">
                    Article Cover
                  </span>
                </div>
              )}

              <div className="absolute top-6 left-6 px-3 py-1 bg-background/50 lg:backdrop-blur-md border border-border/30 rounded-full text-[10px] font-medium uppercase tracking-widest z-20">
                  {article.category || "Article"}
              </div>
            </div>

            <div className="flex flex-col gap-3 pr-4">
              <span className="text-[11px] text-muted-foreground font-medium tracking-widest">
                ARTICLE
              </span>

                <h4 className="text-2xl lg:text-3xl font-heading font-medium group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h4>

                <p className="text-muted-foreground/80 line-clamp-2 mt-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
          </Link>
        ))}
          </div>
          <div className="col-span-4 mt-12 md:hidden">
            <Link href="/articles" passHref>
              <MagneticButton variant="ghost" className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-border/50 rounded-full text-[10px] font-semibold uppercase tracking-widest">
                See All Articles <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
