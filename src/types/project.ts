export type SanityProject = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  title: string
  slug: { current: string }
  status?: 'draft' | 'published' | 'archived' | 'coming-soon'
  comingSoon?: boolean
  projectType?: string
  category?: string
  tags?: string[]
  description?: string
  teaserCopy?: string
  summary?: string
  behanceUrl?: string
  homepageCover?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
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
