import { permanentRedirect } from 'next/navigation'

/**
 * Legacy /work/[slug] route — 301 permanent redirect to /projects/[slug]
 *
 * This route is preserved to maintain SEO and existing link integrity.
 * All incoming requests are redirected to the canonical URL.
 */
export default async function LegacyWorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  permanentRedirect(`/projects/${slug}`)
}
