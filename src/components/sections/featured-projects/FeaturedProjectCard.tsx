import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { SanityFeaturedProject } from '@/types'
import { urlFor } from '@/lib/sanity/image'

export function FeaturedProjectCard({
  project,
  colClass,
  aspectClass,
}: {
  project: SanityFeaturedProject
  colClass: string
  aspectClass: string
}) {
  const hasImage = !!project.coverImage?.asset

  return (
    <a href={project.behanceUrl || '#'} target={project.behanceUrl ? "_blank" : undefined} rel="noopener noreferrer" className={`${colClass} group cursor-pointer block touch-active`}>
      <div className={`relative ${aspectClass} mb-6 overflow-hidden bg-secondary rounded-xl`}>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 bg-[#FFE500] hover:bg-[#FFE500]/90 text-black px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase">
            View on Behance <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="absolute top-4 right-4 z-20 text-[9px] tracking-[0.25em] uppercase font-medium text-white/80 border border-white/10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
          {project.projectType ?? (project.tags && project.tags[0]) ?? project.category ?? 'PROJECT'}
        </div>

        {hasImage ? (
          <Image
            src={urlFor(project.coverImage!).width(900).height(675).url()}
            alt={project.title}
            fill
            className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:blur-[2px] group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient ?? 'from-[#0F1115] via-[#171A21] to-[#050816]'} flex items-center justify-center border border-border/50 rounded-xl`}>
            <span className="text-muted-foreground/30 font-heading text-4xl">{project.title}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="min-w-0 pr-4">
          <h4 className="text-2xl font-heading font-medium mb-2 transition-colors break-words [overflow-wrap:anywhere] group-hover:text-primary">{project.title}</h4>
          <p className="text-muted-foreground">{project.category ?? 'CASE STUDY'}</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </a>
  )
}
