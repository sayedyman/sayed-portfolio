import { groq } from 'next-sanity'
import { client } from './client'

// ─── TYPE DEFINITIONS ────────────────────────────────────────────────────────

export type SanityProject = {
  _id: string
  title: string
  slug: { current: string }
  status?: 'draft' | 'published' | 'archived' | 'coming-soon'
  projectType?: string
  category?: string
  tags?: string[]
  description?: string
  teaserCopy?: string
  coverImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  imageGradient?: string
  align?: 'left' | 'right'
  displayOrder?: number
  publishedAt?: string
  launchDate?: string
  updatedAt?: string
}

export type SanityFeaturedProject = SanityProject & {
  featuredOrder?: number
}

export type SanityProjectDetail = SanityProject & {
  galleryImages?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
  summary?: string
  role?: string
  timeline?: string
  client?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  narrativeStyle?: 'minimal' | 'immersive' | 'visual-heavy' | 'process-heavy' | 'editorial'
  seoTitle?: string
  seoDescription?: string
}

export type SanitySlug = {
  slug: string
}

// ─── GROQ QUERIES ────────────────────────────────────────────────────────────

const allProjectsQuery = groq`
  *[_type == "project" && status in ["published", "coming-soon"]]
  | order(displayOrder asc) {
    _id,
    title,
    slug,
    status,
    projectType,
    category,
    tags,
    description,
    coverImage,
    imageGradient,
    align,
    displayOrder,
    publishedAt,
    updatedAt
  }
`

const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && status in ["published", "coming-soon"]]
  | order(featuredOrder asc) {
    _id,
    title,
    slug,
    status,
    projectType,
    category,
    tags,
    description,
    coverImage,
    imageGradient,
    align,
    featuredOrder
  }
`

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && status in ["published", "coming-soon"]][0] {
    _id,
    title,
    slug,
    status,
    projectType,
    category,
    tags,
    description,
    teaserCopy,
    coverImage,
    galleryImages,
    imageGradient,
    align,
    summary,
    role,
    timeline,
    client,
    body,
    narrativeStyle,
    publishedAt,
    launchDate,
    updatedAt,
    seoTitle,
    seoDescription
  }
`

const allProjectSlugsQuery = groq`
  *[_type == "project" && status in ["published", "coming-soon"]] {
    "slug": slug.current
  }
`

// ─── RAW DEBUG QUERY (no status filter) ──────────────────────────────────────

const allProjectsRawQuery = groq`
  *[_type == "project"]
  | order(displayOrder asc) {
    _id,
    title,
    status,
    featured,
    featuredOrder,
    displayOrder,
    slug
  }
`

// ─── FETCH FUNCTIONS ─────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<SanityProject[]> {
  const result = await client.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { tags: ['project'] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getAllProjects → ${result.length} project(s) (published or coming-soon)`)
  }
  return result
}

export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  const result = await client.fetch<SanityFeaturedProject[]>(featuredProjectsQuery, {}, { next: { tags: ['project'] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getFeaturedProjects → ${result.length} featured project(s)`)
    if (result.length === 0) {
      // Fetch raw to help diagnose why the filtered query returned nothing
      const raw = await client.fetch(allProjectsRawQuery)
      console.log('[Sanity] RAW projects (no filter):', JSON.stringify(raw, null, 2))
    }
  }
  return result
}

export async function getProject(slug: string): Promise<SanityProjectDetail | null> {
  const result = await client.fetch<SanityProjectDetail | null>(projectBySlugQuery, { slug }, { next: { tags: ['project'] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getProject("${slug}") → ${result ? result.title : 'null (not found or not public)'}`)
  }
  return result
}

export async function getAllProjectSlugs(): Promise<SanitySlug[]> {
  return client.fetch(allProjectSlugsQuery, {}, { next: { tags: ['project'] } })
}

/**
 * Raw fetch — returns ALL projects regardless of status.
 * Used by the /api/debug-projects endpoint to diagnose CMS field values.
 * Never called in the production rendering pipeline.
 */
export async function getAllProjectsRaw() {
  return client.fetch(allProjectsRawQuery)
}
