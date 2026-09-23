import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

interface CustomImageSource {
  localUrl?: string
  asset?: {
    url?: string
    _ref?: string
  }
}

function createLocalImageBuilder(localUrl: string) {
  const handler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(_target: any, prop: string | symbol): any {
      if (prop === 'url' || prop === 'toString') {
        return () => localUrl
      }
      return () => proxy
    },
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proxy: any = new Proxy({ url: () => localUrl }, handler)
  return proxy
}

/**
 * Generates an image URL builder from a Sanity image source or local offline mock source.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource | CustomImageSource | string | null | undefined) {
  if (!source) {
    return createLocalImageBuilder('/og-image.png')
  }

  // Support direct string path
  if (typeof source === 'string' && (source.startsWith('/') || source.startsWith('http'))) {
    return createLocalImageBuilder(source)
  }

  // Support local mock assets
  if (typeof source === 'object' && source !== null) {
    const custom = source as CustomImageSource
    if (custom.localUrl && typeof custom.localUrl === 'string') {
      return createLocalImageBuilder(custom.localUrl)
    }
    if (custom.asset?.url && typeof custom.asset.url === 'string') {
      return createLocalImageBuilder(custom.asset.url)
    }
    if (custom.asset?._ref && custom.asset._ref.startsWith('local-')) {
      return createLocalImageBuilder('/og-image.png')
    }
  }

  try {
    return builder.image(source as SanityImageSource)
  } catch {
    return createLocalImageBuilder('/og-image.png')
  }
}
