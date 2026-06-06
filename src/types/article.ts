export type SanityArticle = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
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
