export type SanityProject = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  title: string
  slug: { current: string }
  status?: 'draft' | 'published' | 'archived' | 'coming-soon'
  projectType?: string
  category?: string
  tags?: string[]
  description?: string
  teaserCopy?: string
  summary?: string
  behanceUrl?: string
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
