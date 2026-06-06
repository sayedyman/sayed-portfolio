export type SanityTestimonial = {
  _id: string
  _updatedAt?: string
  _createdAt?: string
  displayQuote: string
  fullQuote?: string
  authorName: string
  authorRole?: string
  company?: string
  avatar?: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
  }
  featured?: boolean
  displayOrder?: number
}
