"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import type { SanityArticle } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export function ArticlesClient({ articles }: { articles: SanityArticle[] }) {
  return (
    <main className="min-h-[100dvh] bg-background pt-32 md:pt-48 pb-24 md:pb-48">
      {/* HEADER */}
      <Container className="mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-heading font-medium tracking-tighter leading-[0.9] uppercase mb-6 text-foreground">
            Notes & <br className="hidden md:block"/> Essays
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            Thoughts on design systems, product architecture, and the invisible details that make software feel human.
          </p>
        </motion.div>
      </Container>

      {/* ARTICLES LISTING */}
      <Container>
        <div className="flex flex-col gap-20 md:gap-32">
          {articles.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                No articles published yet.
              </p>
            </div>
          ) : (
            articles.map((article, i) => {
              const slug = article.slug?.current ?? '#'
              const hasImage = !!article.coverImage?.asset
              const readingTime = article.readingTime ? Math.max(1, article.readingTime) : 1
              
              // Formatting date
              const dateObj = new Date(article.publishedAt || '')
              const formattedDate = isNaN(dateObj.getTime()) 
                ? '' 
                : new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(dateObj)

              return (
                <Link key={article._id} href={`/articles/${slug}`} className="group block border-t border-border/20 pt-10 md:pt-16">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Grid className="items-start gap-y-8">
                      
                      {/* Left Meta Column (Desktop) */}
                      <div className="col-span-4 md:col-span-3 lg:col-span-2 md:pt-2">
                        <div className="flex flex-row md:flex-col flex-wrap gap-4 md:gap-3 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                          {formattedDate && <span>{formattedDate}</span>}
                          {article.category && (
                            <span className="text-primary">{article.category}</span>
                          )}
                          <span className="opacity-50">{readingTime} MIN READ</span>
                          {article.isEssay && (
                            <span className="opacity-50 border border-border/50 px-2 py-0.5 rounded-sm inline-flex w-max mt-2">ESSAY</span>
                          )}
                        </div>
                      </div>

                      {/* Right Content Column */}
                      <div className="col-span-4 md:col-span-9 lg:col-span-10">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                          
                          {/* Text Content */}
                          <div className="flex-1 min-w-0 order-2 lg:order-1 max-w-3xl">
                            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-heading font-medium leading-[1.1] mb-6 text-foreground group-hover:text-primary transition-colors duration-500 break-words [overflow-wrap:anywhere]">
                              {article.title}
                            </h2>
                            {article.excerpt && (
                              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                                {article.excerpt}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-foreground/80 group-hover:text-primary transition-colors duration-500">
                              Read Article
                              <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                                <ArrowUpRight className="w-3 h-3" />
                              </div>
                            </div>
                          </div>

                          {/* Optional Image */}
                          {hasImage && (
                            <div className="order-1 lg:order-2 w-full lg:w-[40%] xl:w-[45%] flex-shrink-0">
                              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-sm bg-secondary">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none mix-blend-overlay" />
                                <Image
                                  src={urlFor(article.coverImage!).width(800).height(600).url()}
                                  alt={article.title}
                                  fill
                                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                  sizes="(max-width: 1024px) 100vw, 45vw"
                                />
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                      
                    </Grid>
                  </motion.div>
                </Link>
              )
            })
          )}
        </div>
      </Container>
    </main>
  )
}
