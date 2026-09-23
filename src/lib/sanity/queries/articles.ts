import { groq } from 'next-sanity'
import { CACHE_TAGS } from '../cache-tags'
import { safeSanityFetch } from '../fetch'
import {
  mockAllArticles,
  mockFeaturedArticles,
  mockArticleDetails,
  mockArticleSlugs,
} from '../mocks'
import type { SanityArticle, SanityArticleDetail, SanitySlug } from '@/types'

const allArticlesQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const featuredArticlesQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && defined(slug.current) && featured == true]
  | order(featuredOrder asc) {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const articleBySlugQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    publishedAt,
    excerpt,
    coverImage,
    category,
    tags,
    featured,
    featuredOrder,
    isEssay,
    body,
    seoTitle,
    seoDescription,
    "readingTime": round(length(pt::text(body)) / 5 / 200 )
  }
`

const allArticleSlugsQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && defined(slug.current)] {
    "slug": slug.current
  }
`

export async function getAllArticles(): Promise<SanityArticle[]> {
  return safeSanityFetch<SanityArticle[]>(
    allArticlesQuery,
    {},
    { next: { tags: [CACHE_TAGS.ARTICLE] } },
    mockAllArticles
  )
}

export async function getFeaturedArticles(): Promise<SanityArticle[]> {
  return safeSanityFetch<SanityArticle[]>(
    featuredArticlesQuery,
    {},
    { next: { tags: [CACHE_TAGS.ARTICLE] } },
    mockFeaturedArticles
  )
}

export async function getArticle(slug: string): Promise<SanityArticleDetail | null> {
  return safeSanityFetch<SanityArticleDetail | null>(
    articleBySlugQuery,
    { slug },
    { next: { tags: [CACHE_TAGS.ARTICLE] } },
    () => mockArticleDetails.find((a) => a.slug?.current === slug) ?? null
  )
}

export async function getAllArticleSlugs(): Promise<SanitySlug[]> {
  return safeSanityFetch<SanitySlug[]>(
    allArticleSlugsQuery,
    {},
    { next: { tags: [CACHE_TAGS.ARTICLE] } },
    mockArticleSlugs
  )
}
