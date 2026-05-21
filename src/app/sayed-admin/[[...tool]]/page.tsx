'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

/**
 * Private admin route — /sayed-admin
 *
 * Renders the full embedded Sanity Studio. Access is gated by Sanity's
 * own authentication — only the Sanity project owner can log in.
 * Public visitors see only the Sanity login screen.
 */
export default function StudioPage() {
  return <NextStudio config={config} />
}
