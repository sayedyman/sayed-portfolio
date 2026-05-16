import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { SanityFeaturedProject } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

/**
 * FeaturedProjectsGrid — Pure presentational Server Component.
 * No async, no data fetching. Receives projects as props from the
 * Server Component page.tsx and renders the asymmetric homepage grid.
 */
export function FeaturedProjectsGrid({ projects }: { projects: SanityFeaturedProject[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-12 flex items-center justify-center py-24">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">No featured projects yet</p>
        </div>
      </div>
    )
  }

  const first = projects[0]
  const second = projects[1]

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
      {first && <ProjectCard project={first} colClass="md:col-span-7" aspectClass="aspect-[4/3]" />}
      {second && <ProjectCard project={second} colClass="md:col-span-5 md:mt-32" aspectClass="aspect-square" />}
    </div>
  )
}

function ProjectCard({
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
      <div className={`relative ${aspectClass} mb-6 overflow-hidden bg-secondary rounded-xl`}>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
        
        {project.status === 'coming-soon' && (
          <div className="absolute inset-0 bg-background/20 z-10 pointer-events-none" />
        )}

        {project.status === 'coming-soon' && (
          <div className="absolute top-4 right-4 z-20 text-[9px] tracking-[0.25em] uppercase font-medium text-muted-foreground/60 border border-white/10 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-none pointer-events-none">
            COMING SOON
          </div>
        )}

        {hasImage ? (
          <Image
            src={urlFor(project.coverImage!).width(900).height(675).url()}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              project.status === 'coming-soon'
                ? 'saturate-[0.85] brightness-[0.97] group-hover:scale-[1.015]'
                : 'group-hover:scale-[1.03]'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient ?? 'from-[#111] to-[#050505]'} flex items-center justify-center border border-border/50 rounded-xl`}>
            <span className="text-muted-foreground/30 font-heading text-4xl">{project.title}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`text-2xl font-heading font-medium mb-2 transition-colors ${
            project.status === 'coming-soon' ? 'group-hover:text-foreground/70' : 'group-hover:text-primary'
          }`}>{project.title}</h4>
          <p className="text-muted-foreground">{project.category ?? project.projectType ?? ''}</p>
        </div>
        <div className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors ${
          project.status === 'coming-soon'
            ? 'group-hover:bg-muted/30 group-hover:border-border/60'
            : 'group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary'
        }`}>
          <ArrowUpRight className={`w-5 h-5 ${project.status === 'coming-soon' ? 'text-muted-foreground/50' : ''}`} />
        </div>
      </div>
    </Link>
  )
}
