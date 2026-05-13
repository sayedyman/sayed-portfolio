import { getAllProjects } from '@/lib/sanity/queries'
import { ProjectsClient } from './ProjectsClient'

/**
 * Server Component wrapper — fetches all published projects from Sanity
 * and passes them as props to ProjectsClient which owns all client-side
 * filter state, Framer Motion animations, and hover interactions.
 */
export default async function ProjectsPage() {
  const projects = await getAllProjects()
  return <ProjectsClient projects={projects} />
}
