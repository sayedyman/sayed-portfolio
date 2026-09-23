import { groq } from 'next-sanity'
import { CACHE_TAGS } from '../cache-tags'
import { safeSanityFetch } from '../fetch'
import { mockAllProjects, mockFeaturedProjects } from '../mocks'
import type { SanityProject, SanityFeaturedProject } from '@/types'

const allProjectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**"))]
  | order(displayOrder asc) {
    _id,
    title,
    "projectType": coalesce(projectTypeRef->title, projectType),
    tags,
    coverImage,
    behanceUrl,
    featured,
    comingSoon,
    displayOrder,
    seoTitle,
    seoDescription
  }
`

const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && !(_id in path("drafts.**"))]
  | order(displayOrder asc) {
    _id,
    title,
    "projectType": coalesce(projectTypeRef->title, projectType),
    tags,
    homepageCover,
    coverImage,
    behanceUrl,
    featured,
    comingSoon,
    displayOrder,
    seoTitle,
    seoDescription
  }
`

export async function getAllProjects(): Promise<SanityProject[]> {
  const result = await safeSanityFetch<SanityProject[]>(
    allProjectsQuery,
    {},
    { next: { tags: [CACHE_TAGS.PROJECT] } },
    mockAllProjects
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getAllProjects → ${result.length} project(s)`)
  }
  return result
}

export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  const result = await safeSanityFetch<SanityFeaturedProject[]>(
    featuredProjectsQuery,
    {},
    { next: { tags: [CACHE_TAGS.PROJECT] } },
    mockFeaturedProjects
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getFeaturedProjects → ${result.length} featured project(s)`)
  }
  return result
}
