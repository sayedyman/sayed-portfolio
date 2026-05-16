import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Container } from '@/components/layout/Container'
import { getProject, getAllProjectSlugs, type SanityProjectDetail } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getNarrativeConfig } from '@/lib/sanity/narrativeConfig'

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.seoTitle ?? `${project.title} — Sayed Elghanam`,
    description: project.seoDescription ?? project.summary ?? undefined,
  }
}

// ─── Portable Text component map ──────────────────────────────────────────────
// Cinematic typography system — no generic prose resets.
// All classes are drawn from existing design system tokens in globals.css.

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tighter mt-16 mb-6 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight mt-12 mb-4 text-foreground">
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
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  if (project.status === 'coming-soon') {
    return <ComingSoonPage project={project} />
  }

  const config = getNarrativeConfig(project.narrativeStyle)
  const hasGallery =
    config.galleryEnabled && project.galleryImages && project.galleryImages.length > 0
  const hasCoverImage = !!project.coverImage?.asset

  return (
    <main className="relative min-h-[100svh] bg-background pb-24">

      {/* ─── CINEMATIC HERO ─────────────────────────────────────────────── */}
      <div className="relative w-full pt-32 pb-16 md:pb-24">
        <Container>

          {/* Back nav */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          {/* Meta label */}
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <span className="w-12 h-[1px] bg-primary" />
            {project.projectType ?? project.category ?? 'Case Study'}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-medium uppercase leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            {project.title}
          </h1>

          {/* Summary — max-width driven by narrative config */}
          {project.summary && (
            <p className={`text-xl md:text-2xl text-muted-foreground leading-relaxed mb-16 ${config.proseMaxWidth}`}>
              {project.summary}
            </p>
          )}

          {/* Metadata grid */}
          {(project.role || project.timeline || project.client || project.publishedAt) && (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/30 pt-10">
              {project.role && (
                <div>
                  <dt className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">Role</dt>
                  <dd className="text-sm font-medium text-foreground">{project.role}</dd>
                </div>
              )}
              {project.timeline && (
                <div>
                  <dt className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">Timeline</dt>
                  <dd className="text-sm font-medium text-foreground">{project.timeline}</dd>
                </div>
              )}
              {project.client && (
                <div>
                  <dt className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">Client</dt>
                  <dd className="text-sm font-medium text-foreground">{project.client}</dd>
                </div>
              )}
              {project.publishedAt && (
                <div>
                  <dt className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">Year</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {new Date(project.publishedAt).getFullYear()}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </Container>
      </div>

      {/* ─── COVER IMAGE ────────────────────────────────────────────────── */}
      {hasCoverImage && (
        <div
          className={`relative w-full mb-16 md:mb-24 overflow-hidden ${
            config.imageSize === 'full-bleed'
              ? 'aspect-[16/9]'
              : config.imageSize === 'editorial'
              ? 'aspect-[16/9] max-w-[90vw] mx-auto rounded-sm'
              : 'aspect-[16/9] max-w-5xl mx-auto px-6 rounded-sm'
          }`}
        >
          <Image
            src={urlFor(project.coverImage!).width(1600).height(900).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* ─── BODY CONTENT ───────────────────────────────────────────────── */}
      {project.body && project.body.length > 0 && (
        <Container>
          <div className={`mx-auto ${config.proseMaxWidth}`}>
            <PortableText value={project.body} components={portableTextComponents} />
          </div>
        </Container>
      )}

      {/* ─── GALLERY ────────────────────────────────────────────────────── */}
      {hasGallery && (
        <div className="mt-16 md:mt-24">
          <Container>
            <div className="mb-8">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
                Project Gallery
              </span>
            </div>
          </Container>
          <div className="flex flex-col gap-4 md:gap-8">
            {project.galleryImages!.map((img, i) => {
              if (!img?.asset) return null
              return (
                <div
                  key={i}
                  className={`relative w-full overflow-hidden ${
                    config.imageSize === 'full-bleed'
                      ? 'aspect-[16/9]'
                      : 'aspect-[16/9] max-w-[90vw] mx-auto rounded-sm'
                  }`}
                >
                  <Image
                    src={urlFor(img).width(1600).height(900).url()}
                    alt={img.alt ?? `${project.title} — Gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── BACK LINK ──────────────────────────────────────────────────── */}
      <Container>
        <div className="mt-24 pt-12 border-t border-border/20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <span className="w-8 h-[1px] bg-border group-hover:bg-primary transition-colors duration-300" />
            Back to All Projects
          </Link>
        </div>
      </Container>

    </main>
  )
}

function ComingSoonPage({ project }: { project: SanityProjectDetail }) {
  const hasCoverImage = !!project.coverImage?.asset

  return (
    <main className="relative min-h-[100svh] bg-background pb-24">
      {/* ─── CINEMATIC HERO (Teaser) ─────────────────────────────────────────────── */}
      <div className="relative w-full pt-32 pb-16 md:pb-24">
        <Container>
          {/* Back nav */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          {/* Meta label */}
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <span className="w-12 h-[1px] bg-primary" />
            {project.projectType ?? project.category ?? 'Case Study'}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-medium uppercase leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            {project.title}
          </h1>

          {/* Teaser Copy (if present) */}
          {project.teaserCopy && (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              {project.teaserCopy}
            </p>
          )}
        </Container>
      </div>

      {/* ─── COVER IMAGE (Teaser) ────────────────────────────────────────────────── */}
      {hasCoverImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={urlFor(project.coverImage!).width(1600).height(900).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark gradient veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Badge & Caption inside veil */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground/70 mb-2">
              COMING SOON
            </span>
            {!project.teaserCopy && (
              <span className="text-[9px] tracking-widest text-muted-foreground/40">
                Full case study arriving soon
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─── BACK LINK ──────────────────────────────────────────────────── */}
      <Container>
        <div className="mt-24 pt-12 border-t border-border/20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <span className="w-8 h-[1px] bg-border group-hover:bg-primary transition-colors duration-300" />
            Back to All Projects
          </Link>
        </div>
      </Container>
    </main>
  )
}

