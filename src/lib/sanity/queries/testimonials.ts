import { groq } from 'next-sanity'
import { client } from '../client'
import { CACHE_TAGS } from '../cache-tags'
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
  const result = await client.fetch<SanityTestimonial[]>(featuredTestimonialsQuery, {}, { next: { tags: [CACHE_TAGS.TESTIMONIAL] } })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getFeaturedTestimonials → ${result.length} featured testimonial(s)`)
  }
  return result
}
