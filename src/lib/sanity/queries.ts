import { groq } from 'next-sanity'
import { client } from './client'
import { CACHE_TAGS } from './cache-tags'

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
  summary?: string
  coverImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  imageGradient?: string
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
  readingWidth?: 'narrow' | 'standard' | 'wide'
  role?: string
  timeline?: string
  client?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
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
    "projectType": coalesce(projectTypeRef->title, projectType),
    category,
    tags,
    description,
    summary,
    coverImage,
    imageGradient,
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
    "projectType": coalesce(projectTypeRef->title, projectType),
    category,
    tags,
    description,
    summary,
    coverImage,
    imageGradient,
    featuredOrder
  }
`

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && status in ["published", "coming-soon"]][0] {
    _id,
    title,
    slug,
    status,
    "projectType": coalesce(projectTypeRef->title, projectType),
    category,
    tags,
    description,
    teaserCopy,
    coverImage,
    galleryImages,
    imageGradient,
    summary,
    readingWidth,
    role,
    timeline,
    client,
    body,
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
  const result = await client.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getAllProjects → ${result.length} project(s) (published or coming-soon)`)
  }
  return result
}

export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  const result = await client.fetch<SanityFeaturedProject[]>(featuredProjectsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
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
  const result = await client.fetch<SanityProjectDetail | null>(projectBySlugQuery, { slug }, { next: { tags: [CACHE_TAGS.PROJECT] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getProject("${slug}") → ${result ? result.title : 'null (not found or not public)'}`)
  }
  return result
}

export async function getAllProjectSlugs(): Promise<SanitySlug[]> {
  return client.fetch(allProjectSlugsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
}

/**
 * Raw fetch — returns ALL projects regardless of status.
 * Used by the /api/debug-projects endpoint to diagnose CMS field values.
 * Never called in the production rendering pipeline.
 */
export async function getAllProjectsRaw() {
  return client.fetch(allProjectsRawQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } })
}

// ─── ARTICLES TYPE DEFINITIONS ───────────────────────────────────────────────

export type SanityArticle = {
  _id: string
  title: string
  slug: { current: string }
  status?: 'draft' | 'published' | 'archived'
  publishedAt?: string
  excerpt?: string
  coverImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  category?: string
  tags?: string[]
  featured?: boolean
  featuredOrder?: number
  isEssay?: boolean
  readingTime?: number
}

export type SanityArticleDetail = SanityArticle & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  seoTitle?: string
  seoDescription?: string
}

// ─── ARTICLES GROQ QUERIES ───────────────────────────────────────────────────

const allArticlesQuery = groq`
  *[_type == "article" && status == "published"]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const featuredArticlesQuery = groq`
  *[_type == "article" && featured == true && status == "published"]
  | order(featuredOrder asc) {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    body,
    seoTitle,
    seoDescription,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const allArticleSlugsQuery = groq`
  *[_type == "article" && status == "published"] {
    "slug": slug.current
  }
`

// ─── ARTICLES FETCH FUNCTIONS ────────────────────────────────────────────────

export async function getAllArticles(): Promise<SanityArticle[]> {
  return client.fetch(allArticlesQuery, {}, { next: { tags: [CACHE_TAGS.ARTICLE] } })
}

export async function getFeaturedArticles(): Promise<SanityArticle[]> {
  return client.fetch(featuredArticlesQuery, {}, { next: { tags: [CACHE_TAGS.ARTICLE] } })
}

export async function getArticle(slug: string): Promise<SanityArticleDetail | null> {
  return client.fetch(articleBySlugQuery, { slug }, { next: { tags: [CACHE_TAGS.ARTICLE] } })
}

export async function getAllArticleSlugs(): Promise<SanitySlug[]> {
  return client.fetch(allArticleSlugsQuery, {}, { next: { tags: [CACHE_TAGS.ARTICLE] } })
}
