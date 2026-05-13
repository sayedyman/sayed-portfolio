import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getFeaturedProjects, type SanityFeaturedProject } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

/**
 * FeaturedProjects — Async Server Component
 *
 * Fetches featured published projects from Sanity and renders them into the
 * existing asymmetric homepage grid layout (7-col large left + 5-col offset right).
 *
 * This component is intentionally isolated so the parent page.tsx
 * preserves its full "use client" / Framer Motion architecture untouched.
 */
export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  if (!projects || projects.length === 0) {
    return (
      <div className="grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-12 flex items-center justify-center py-24">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            No featured projects yet
          </p>
        </div>
      </div>
    )
  }

  const first = projects[0]
  const second = projects[1]

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12">

      {/* Project 1 — Large Left (7 cols) */}
      {first && <FeaturedProjectCard project={first} colClass="md:col-span-7" aspectClass="aspect-[4/3]" />}

      {/* Project 2 — Smaller Right, offset down (5 cols, mt-32) */}
      {second && <FeaturedProjectCard project={second} colClass="md:col-span-5 md:mt-32" aspectClass="aspect-square" />}

    </div>
  )
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function FeaturedProjectCard({
  project,
  colClass,
  aspectClass,
}: {
  project: SanityFeaturedProject
  colClass: string
  aspectClass: string
}) {
  const slug = project.slug?.current ?? '#'
  const hasImage = !!project.coverImage?.asset

  return (
    <Link href={`/projects/${slug}`} className={`${colClass} group cursor-pointer block`}>
      {/* Image / Gradient */}
      <div className={`relative ${aspectClass} mb-6 overflow-hidden bg-secondary rounded-xl`}>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />

        {hasImage ? (
          <Image
            src={urlFor(project.coverImage!).width(900).height(675).url()}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient ?? 'from-[#111] to-[#050505]'} flex items-center justify-center border border-border/50 rounded-xl`}
          >
            <span className="text-muted-foreground/30 font-heading text-4xl">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-heading font-medium mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <p className="text-muted-foreground">
            {project.category ?? project.projectType ?? ''}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}
