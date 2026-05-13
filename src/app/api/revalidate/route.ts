import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * ISR On-Demand Revalidation Webhook
 *
 * Called by Sanity when content is published, updated, or deleted.
 * Clears the 'project' ISR cache tag so the next visitor sees fresh data.
 *
 * Setup (once, after deploying to Vercel):
 * manage.sanity.io → your project → API → Webhooks → Add Webhook
 * URL: https://your-domain.vercel.app/api/revalidate?secret=YOUR_REVALIDATION_SECRET
 * Trigger on: Create, Update, Delete — filter: _type == "project"
 */
export async function POST(request: NextRequest) {
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
