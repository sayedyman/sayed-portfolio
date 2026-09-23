import { client } from './client'
import type { QueryParams, FilteredResponseQueryOptions } from 'next-sanity'

const DEV_FETCH_TIMEOUT_MS = 3000

function isNetworkOrTimeoutError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const err = error as { name?: string; message?: string; code?: string; cause?: { code?: string; message?: string } }
  
  if (err.name === 'AbortError' || err.name === 'TimeoutError') return true
  if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'EAI_AGAIN') return true
  if (err.cause?.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED' || err.cause?.code === 'ETIMEDOUT' || err.cause?.code === 'EAI_AGAIN') return true

  const msg = (err.message || '').toLowerCase()
  if (
    msg.includes('fetch failed') ||
    msg.includes('network') ||
    msg.includes('enotfound') ||
    msg.includes('econnrefused') ||
    msg.includes('timed out') ||
    msg.includes('timeout') ||
    msg.includes('aborted')
  ) {
    return true
  }

  return false
}

/**
 * Centralized safe Sanity fetch helper.
 *
 * In DEVELOPMENT (process.env.NODE_ENV !== 'production'):
 * - Attempts to fetch from Sanity with a 3000ms timeout.
 * - If Sanity is unreachable (offline, DNS failure, timeout, network error), logs a dev warning and returns fallback mock data.
 *
 * In PRODUCTION (process.env.NODE_ENV === 'production'):
 * - Always fetches from Sanity (source of truth).
 * - Never returns mock data in production; preserves standard error behavior.
 */
export async function safeSanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options: FilteredResponseQueryOptions = {},
  fallbackData: T | (() => T)
): Promise<T> {
  const isDev = process.env.NODE_ENV !== 'production'

  if (!isDev) {
    // In production, Sanity is the ONLY source of truth. Never fallback to mocks.
    return client.fetch<T>(query, params, options)
  }

  // Development path: attempt live fetch with timeout and graceful mock fallback
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, DEV_FETCH_TIMEOUT_MS)

    const fetchPromise = client.fetch<T>(query, params, {
      ...options,
      signal: controller.signal,
    })

    const timeoutPromise = new Promise<never>((_, reject) => {
      controller.signal.addEventListener('abort', () => {
        reject(new Error(`Request timed out after ${DEV_FETCH_TIMEOUT_MS}ms`))
      })
    })

    const result = await Promise.race([fetchPromise, timeoutPromise])
    clearTimeout(timeoutId)
    return result
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    if (isNetworkOrTimeoutError(error)) {
      console.warn(`[Sanity] Network unavailable (${errorMessage}) — using local mock data.`)
      return typeof fallbackData === 'function' ? (fallbackData as () => T)() : fallbackData
    }

    console.warn(`[Sanity] Fetch failed (${errorMessage}) — falling back to mock data.`)
    return typeof fallbackData === 'function' ? (fallbackData as () => T)() : fallbackData
  }
}
