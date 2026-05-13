import { getFeaturedProjects } from '@/lib/sanity/queries'
import HomeClient from './HomeClient'

/**
 * Server Component — fetches featured projects from Sanity
 * and passes them as props to HomeClient ("use client").
 *
 * This is the same Server/Client split pattern used by projects/page.tsx.
 * The Server boundary here ensures FeaturedProjectsGrid (which renders
 * Sanity images) is never treated as a client component.
 */
export default async function Home() {
  const projects = await getFeaturedProjects()
  return <HomeClient projects={projects} />
}
