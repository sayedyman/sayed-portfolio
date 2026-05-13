import { groq } from 'next-sanity'
import { client } from './client'

// ─── TYPE DEFINITIONS ────────────────────────────────────────────────────────

export type SanityProject = {
  _id: string
  title: string
  slug: { current: string }
  projectType?: string
  category?: string
  tags?: string[]
  description?: string
  coverImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  imageGradient?: string
  align?: 'left' | 'right'
  displayOrder?: number
  publishedAt?: string
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
  *[_type == "project" && status == "published"]
  | order(displayOrder asc) {
    _id,
    title,
    slug,
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
  *[_type == "project" && featured == true && status == "published"]
  | order(featuredOrder asc) {
    _id,
    title,
    slug,
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
  *[_type == "project" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    projectType,
    category,
    tags,
    description,
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
    updatedAt,
    seoTitle,
    seoDescription
  }
`

const allProjectSlugsQuery = groq`
  *[_type == "project" && status == "published"] {
    "slug": slug.current
  }
`

// ─── FETCH FUNCTIONS ─────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<SanityProject[]> {
  return client.fetch(allProjectsQuery, {}, { next: { tags: ['project'] } })
}

export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  return client.fetch(featuredProjectsQuery, {}, { next: { tags: ['project'] } })
}

export async function getProject(slug: string): Promise<SanityProjectDetail | null> {
  return client.fetch(projectBySlugQuery, { slug }, { next: { tags: ['project'] } })
}

export async function getAllProjectSlugs(): Promise<SanitySlug[]> {
  return client.fetch(allProjectSlugsQuery, {}, { next: { tags: ['project'] } })
}
