import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Generates a Sanity CDN image URL from a Sanity image source.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
