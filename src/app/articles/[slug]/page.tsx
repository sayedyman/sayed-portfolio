import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CustomPortableText } from '@/components/portable-text/CustomPortableText'
import { Container } from '@/components/layout/Container'
import { getArticle, getAllArticleSlugs } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { JsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs
    .filter((s) => s && s.slug)
    .map((s) => ({ slug: s.slug }))
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

  const ogImageUrl = article.coverImage?.asset
    ? urlFor(article.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: article.seoTitle ?? `${article.title} | Sayed Elghanam`,
    description: article.seoDescription ?? article.excerpt ?? undefined,
    alternates: {
      canonical: `https://sayed-portfolio-seven.vercel.app/articles/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt ?? undefined,
      url: `https://sayed-portfolio-seven.vercel.app/articles/${slug}`,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt ?? undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    }
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!slug) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Debug] Article rendering failed: Missing slug param.`)
    }
    notFound()
  }

  const article = await getArticle(slug)

  if (!article) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Debug] Article not found for slug "${slug}". Verify it is natively published and not archived.`)
    }
    notFound()
  }
  
  const readingTime = article.readingTime ? Math.max(1, article.readingTime) : 1
  const dateObj = new Date(article.publishedAt || '')
  const formattedDate = isNaN(dateObj.getTime()) 
    ? '' 
    : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj)

  return (
    <div className="relative min-h-[100dvh] bg-background pb-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "image": article.coverImage?.asset ? urlFor(article.coverImage).width(1200).url() : undefined,
          "author": {
            "@type": "Person",
            "name": "Sayed Ayman Elghanam"
          },
          "datePublished": article.publishedAt
        }}
      />
      <Container>
        <div className="pt-32 pb-16 md:pb-24 max-w-3xl mx-auto">
          {/* Back nav */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground touch-active transition-colors duration-300 mb-16 py-2"
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
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-heading font-medium leading-[1.05] tracking-tight mb-8 break-words [overflow-wrap:anywhere]">
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
          <div className="px-4 md:px-0">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <CustomPortableText value={article.body as any} />
          </div>
        )}

        {/* Footer / Tags */}
        {(article.tags && article.tags.length > 0) && (
          <div className="mx-auto max-w-2xl mt-24 pt-12 border-t border-border/20">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-secondary/50 text-muted-foreground rounded-sm break-words [overflow-wrap:anywhere]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
