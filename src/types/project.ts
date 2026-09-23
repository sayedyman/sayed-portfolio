import type { SanityImage } from './index'

export type SanityProject = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  title: string
  slug: { current: string; _type?: string }
  status?: 'draft' | 'published' | 'archived' | 'coming-soon'
  comingSoon?: boolean | null
  projectType?: string
  category?: string
  tags?: string[]
  description?: string
  teaserCopy?: string
  summary?: string
  behanceUrl?: string
  homepageCover?: SanityImage | null
  coverImage?: SanityImage | null
  featured?: boolean
  imageGradient?: string
  displayOrder?: number
  publishedAt?: string
  launchDate?: string
  updatedAt?: string
  seoTitle?: string
  seoDescription?: string
}

export type SanityFeaturedProject = SanityProject & {
  featuredOrder?: number
}
