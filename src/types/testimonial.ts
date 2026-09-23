import type { SanityImage } from './index'

export type SanityTestimonial = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  displayQuote: string
  fullQuote?: string
  authorName: string
  authorRole?: string
  company?: string
  avatar?: SanityImage | null
  featured?: boolean
  displayOrder?: number
}
