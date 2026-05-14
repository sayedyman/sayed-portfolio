import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * ISR On-Demand Revalidation Webhook
 *
 * Called by Sanity when content is published, updated, or deleted.
 * Clears the 'project' ISR cache tag so the next visitor sees fresh data.
 *
 * Setup in Sanity:
 * manage.sanity.io → your project → API → Webhooks → Add Webhook
 * URL: https://your-domain.vercel.app/api/revalidate?secret=<REVALIDATION_SECRET>
 * HTTP method: POST
 * Trigger on: Create, Update, Delete
 * Filter: _type == "project"
 *
 * To test locally:
 * GET /api/revalidate?secret=portfolio-revalidation-2024-sb63ac2i
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // revalidateTag accepts exactly ONE string — the tag name.
  revalidateTag('project', 'max')

  return Response.json({
    revalidated: true,
    tag: 'project',
    now: new Date().toISOString(),
  })
}

/**
 * GET — allows manual revalidation from a browser for local testing.
 * Hit /api/revalidate?secret=<REVALIDATION_SECRET> to purge the cache.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('project', 'max')

  return Response.json({
    revalidated: true,
    tag: 'project',
    now: new Date().toISOString(),
  })
}
