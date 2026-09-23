import type { SanityImage } from './index'

export type SanityArticle = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  title: string
  slug: { current: string; _type?: string }
  status?: 'draft' | 'published' | 'archived'
  publishedAt?: string
  excerpt?: string
  coverImage?: SanityImage | null
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
