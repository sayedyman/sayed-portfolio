export * from './project'
export * from './article'
export * from './testimonial'
export * from './certificate'

export type SanitySlug = {
  slug: string
  current?: string
  _type?: string
}

export type SanityImage = {
  _type?: string
  asset: {
    _ref: string
    _type?: string
    url?: string
  }
  alt?: string
  hotspot?: { x: number; y: number }
}
