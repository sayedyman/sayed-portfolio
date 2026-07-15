import { groq } from 'next-sanity'
import { client } from '../client'
import { CACHE_TAGS } from '../cache-tags'
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
    coverImage,
    behanceUrl,
    featured,
    comingSoon,
    displayOrder,
    seoTitle,
    seoDescription
  }
`

const allProjectsRawQuery = groq`
  *[_type == "project"]
  | order(displayOrder asc) {
    _id,
    title,
    status,
    featured,
    comingSoon,
    featuredOrder,
    displayOrder,
    slug
  }
`

export async function getAllProjects(): Promise<SanityProject[]> {
  const result = await client.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getAllProjects → ${result.length} project(s)`)
  }
  return result
}

export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  const result = await client.fetch<SanityFeaturedProject[]>(featuredProjectsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getFeaturedProjects → ${result.length} featured project(s)`)
    if (result.length === 0) {
      const raw = await client.fetch(allProjectsRawQuery)
      console.log('[Sanity] RAW projects (no filter):', JSON.stringify(raw, null, 2))
    }
  }
  return result
}
