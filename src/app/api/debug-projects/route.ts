import { getAllProjectsRaw } from '@/lib/sanity/queries'

/**
 * DEV-ONLY Debug endpoint.
 * Returns all raw Sanity project documents (no status filter).
 *
 * Usage: visit http://localhost:3000/api/debug-projects in your browser.
 * This will show you EXACTLY what fields each document has in Sanity,
 * letting you verify status values, featured flags, and slugs.
 *
 * IMPORTANT: This is disabled in production. Never expose raw CMS data publicly.
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Not available in production' }, { status: 403 })
  }

  const projects = await getAllProjectsRaw()

  return Response.json({
    count: projects.length,
    hint: 'For homepage: featured must be true AND status must be exactly "published". For /projects: status must be exactly "published".',
    projects,
  })
}
