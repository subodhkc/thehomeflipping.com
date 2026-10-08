import { NextRequest } from 'next/server'

// In-memory sliding-window rate limiter.
// Note: on serverless (Vercel) this applies per warm function instance, so it
// is not a globally consistent limit — but it still absorbs bursts and repeated
// hits against the same instance. For a hard global limit, add Upstash Redis.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 60 minutes
const RATE_LIMIT_MAX = 1
const submissions = new Map<string, number[]>()

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

// Vercel sets x-vercel-ip-country on every request at the edge. When the
// header is absent (local dev, non-Vercel preview) we allow the request.
export function getClientCountry(request: NextRequest): string | null {
  return request.headers.get('x-vercel-ip-country')
}

export function isAllowedCountry(request: NextRequest): boolean {
  const country = getClientCountry(request)
  if (country === null) return true
  return country === 'US'
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissions.get(ip) ?? []).filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS)

  if (timestamps.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  submissions.set(ip, timestamps)

  // Occasional cleanup so the map doesn't grow unbounded on long-lived instances
  if (submissions.size > 5000) {
    submissions.forEach((ts, key) => {
      const live = ts.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS)
      if (live.length === 0) submissions.delete(key)
      else submissions.set(key, live)
    })
  }

  return false
}

// A human cannot meaningfully complete the form in under ~2 seconds.
// Submissions older than 24h are treated as replayed/forged timestamps.
export const MIN_FILL_TIME_MS = 2000
export const MAX_FILL_TIME_MS = 24 * 60 * 60 * 1000

export function isSuspiciousTiming(formStartedAt: unknown): boolean {
  const startedAt = typeof formStartedAt === 'number' ? formStartedAt : Number(formStartedAt)
  if (!Number.isFinite(startedAt)) return true
  const elapsed = Date.now() - startedAt
  return elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FILL_TIME_MS
}

export function countUrls(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
