import { getAllProjects } from '@/lib/sanity/queries'
import { ProjectsClient } from './ProjectsClient'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Sayed Elghanam',
  description: 'Explore UI/UX design case studies and digital product projects designed by Sayed Elghanam.',
  alternates: { canonical: 'https://sayed-portfolio-seven.vercel.app/projects' },
  openGraph: {
    title: 'Projects & Case Studies | Sayed Elghanam',
    description: 'Explore UI/UX design case studies and digital product projects designed by Sayed Elghanam.',
    url: 'https://sayed-portfolio-seven.vercel.app/projects',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Projects & Case Studies | Sayed Elghanam',
    description: 'Explore UI/UX design case studies and digital product projects designed by Sayed Elghanam.',
    images: ['/og-image.png'],
  }
}

// Re-fetch from Sanity every 60 s — fallback in case the webhook isn’t fired.
export const revalidate = 60


/**
 * Server Component wrapper — fetches all published projects from Sanity
 * and passes them as props to ProjectsClient which owns all client-side
 * filter state, Framer Motion animations, and hover interactions.
 */
export default async function ProjectsPage() {
  const projects = await getAllProjects()
  return <ProjectsClient projects={projects} />
}
