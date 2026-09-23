import { groq } from 'next-sanity'
import { CACHE_TAGS } from '../cache-tags'
import { safeSanityFetch } from '../fetch'
import { mockAllCertificates } from '../mocks'
import type { SanityCertificate } from '@/types'

const allCertificatesQuery = groq`
  *[_type == "certificate" && !(_id in path("drafts.**"))]
  | order(coalesce(displayOrder, 9999) asc, _createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    issuer,
    date,
    image,
    certificateUrl,
    description,
    displayOrder
  }
`

export async function getAllCertificates(): Promise<SanityCertificate[]> {
  const result = await safeSanityFetch<SanityCertificate[]>(
    allCertificatesQuery,
    {},
    { next: { tags: [CACHE_TAGS.CERTIFICATE] } },
    mockAllCertificates
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Sanity] getAllCertificates → ${result.length} certificate(s)`)
  }
  return result
}
