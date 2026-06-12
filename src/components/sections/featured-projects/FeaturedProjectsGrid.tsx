import type { SanityFeaturedProject } from '@/types'
import { FeaturedProjectCard } from './FeaturedProjectCard'

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
      {first && <FeaturedProjectCard project={first} colClass="md:col-span-7" aspectClass="aspect-[4/3]" />}
      {second && <FeaturedProjectCard project={second} colClass="md:col-span-5 md:mt-32" aspectClass="aspect-square" />}
    </div>
  )
}


