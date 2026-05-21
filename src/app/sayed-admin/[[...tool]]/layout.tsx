/**
 * Studio layout — Server Component.
 * Exports metadata and viewport from next-sanity/studio here
 * because they are Server-only exports and cannot live in the
 * 'use client' page.tsx.
 */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
