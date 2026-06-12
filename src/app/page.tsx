import { getFeaturedProjects, getAllArticles, getFeaturedTestimonials } from "@/lib/sanity/queries"
import HomeClient from './HomeClient'

// Re-fetch from Sanity every 60 s — fallback in case the webhook isn’t fired.
// On-demand revalidation via /api/revalidate will override this instantly.
export const revalidate = 60

/**
 * Server Component — fetches featured projects, articles, and testimonials
 * from Sanity and passes them as props to HomeClient ("use client").
 *
 * This is the same Server/Client split pattern used by projects/page.tsx.
 * The Server boundary here ensures FeaturedProjectsGrid (which renders
 * Sanity images) is never treated as a client component.
 */
export default async function Home() {
  const projects = await getFeaturedProjects()
  const articles = await getAllArticles()
  const testimonials = await getFeaturedTestimonials()
    return <HomeClient projects={projects} articles={articles} testimonials={testimonials} />

}
