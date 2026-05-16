import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Container } from '@/components/layout/Container'
import { getArticle, getAllArticleSlugs } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.seoTitle ?? `${article.title} — Sayed Elghanam`,
    description: article.seoDescription ?? article.excerpt ?? undefined,
  }
}

// ─── Portable Text component map ──────────────────────────────────────────────

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-heading font-medium tracking-tighter mt-10 md:mt-16 mb-4 md:mb-6 text-foreground leading-[1.1]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[clamp(1.5rem,3vw,1.875rem)] font-heading font-medium tracking-tight mt-8 md:mt-12 mb-3 md:mb-4 text-foreground leading-[1.2]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 my-10 text-xl italic font-editorial text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground/80">{children}</em>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-12">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-secondary">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground/60 tracking-wide text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const readingTime = article.readingTime ? Math.max(1, article.readingTime) : 1
  const dateObj = new Date(article.publishedAt || '')
  const formattedDate = isNaN(dateObj.getTime()) 
    ? '' 
    : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj)

  return (
    <main className="relative min-h-[100dvh] bg-background pb-32">
      <Container>
        <div className="pt-32 pb-16 md:pb-24 max-w-3xl mx-auto">
          {/* Back nav */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
            {article.category && (
              <>
                <span className="text-primary">{article.category}</span>
                <span className="w-1 h-1 bg-border/50 rounded-full" />
              </>
            )}
            {formattedDate && (
              <>
                <span>{formattedDate}</span>
                <span className="w-1 h-1 bg-border/50 rounded-full" />
              </>
            )}
            <span>{readingTime} MIN READ</span>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-heading font-medium leading-[1.05] tracking-tight mb-8">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Optional Cover Image */}
        {article.coverImage?.asset && (
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] max-w-[100vw] md:max-w-5xl mx-auto mb-16 md:mb-24 overflow-hidden rounded-none md:rounded-sm bg-secondary">
            <Image
              src={urlFor(article.coverImage).width(1600).height(900).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Body Content */}
        {article.body && article.body.length > 0 && (
          <div className="mx-auto max-w-2xl">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        )}

        {/* Footer / Tags */}
        {(article.tags && article.tags.length > 0) && (
          <div className="mx-auto max-w-2xl mt-24 pt-12 border-t border-border/20">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-secondary/50 text-muted-foreground rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}
