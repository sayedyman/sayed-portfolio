import type { NextRequest } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { CACHE_TAGS } from '@/lib/sanity/cache-tags'
import crypto from 'crypto'

/**
 * Timing-safe secret comparison
 */
function isValidSecret(secret: string | null) {
  if (!secret || !process.env.REVALIDATION_SECRET) return false
  try {
    const provided = Buffer.from(secret)
    const expected = Buffer.from(process.env.REVALIDATION_SECRET)
    if (provided.length !== expected.length) return false
    return crypto.timingSafeEqual(provided, expected)
  } catch (e) {
    return false
  }
}

/**
 * ISR On-Demand Revalidation Webhook (Production)
 *
 * Called by Sanity when content is published, updated, or deleted.
 * Clears specific ISR cache tags and paths so the next visitor sees fresh data.
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const secret = request.nextUrl.searchParams.get('secret')

  if (!isValidSecret(secret)) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const type = body?._type
    const slug = body?.slug?.current

    if (type === 'project' || type === 'projectType') {
      revalidateTag(CACHE_TAGS.PROJECT, 'max')
      revalidatePath('/')
      revalidatePath('/projects')
      if (slug) revalidatePath(`/projects/${slug}`)
      
      console.log(`[Webhook] Revalidating project: ${slug || type}`)
    } else if (type === 'article') {
      revalidateTag(CACHE_TAGS.ARTICLE, 'max')
      revalidatePath('/') // Homepage might feature articles in the future
      revalidatePath('/articles')
      if (slug) revalidatePath(`/articles/${slug}`)
      
      console.log(`[Webhook] Revalidating article: ${slug || type}`)
    } else {
      console.log(`[Webhook] Unrecognized type: ${type}`)
      return Response.json({ message: 'Unrecognized type' }, { status: 400 })
    }

    const duration = Date.now() - startTime
    console.log(`[Webhook] Completed in ${duration}ms`)

    return Response.json({
      revalidated: true,
      tag: type === 'article' ? CACHE_TAGS.ARTICLE : CACHE_TAGS.PROJECT,
      now: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[Webhook] Payload parsing error:', err.message)
    return Response.json({ message: 'Malformed payload' }, { status: 400 })
  }
}

/**
 * GET — allows manual revalidation from a browser for local testing.
 * Hit /api/revalidate?secret=<REVALIDATION_SECRET> to purge the cache.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!isValidSecret(secret)) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag(CACHE_TAGS.PROJECT, 'max')
  revalidateTag(CACHE_TAGS.ARTICLE, 'max')

  return Response.json({
    revalidated: true,
    tag: 'all',
    now: new Date().toISOString(),
  })
}
