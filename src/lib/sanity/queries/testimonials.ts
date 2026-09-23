import { groq } from 'next-sanity'
import { CACHE_TAGS } from '../cache-tags'
import { safeSanityFetch } from '../fetch'
import { mockFeaturedTestimonials } from '../mocks'
import type { SanityTestimonial } from '@/types'

const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true]
  | order(displayOrder asc) {
    _id,
    displayQuote,
    fullQuote,
    authorName,
    authorRole,
    company,
    avatar,
    featured,
    displayOrder
  }
`

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  const result = await safeSanityFetch<SanityTestimonial[]>(
    featuredTestimonialsQuery,
    {},
    { next: { tags: [CACHE_TAGS.TESTIMONIAL] } },
    mockFeaturedTestimonials
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getFeaturedTestimonials → ${result.length} featured testimonial(s)`)
  }
  return result
}
