/**
 * Server errors, sent to PostHog error tracking in the Halliard3 project.
 *
 * Next.js calls `onRequestError` for anything thrown while rendering a page on
 * the server or in an API route (the sample plan, the lead form, the quiz). The
 * browser never sees these, so the landing pages' exception autocapture would
 * miss every one of them.
 *
 * The person and session come from the visitor's Halliard3 PostHog cookie, so
 * a server error lands on the same person, and the same replay, as the click
 * that caused it. No cookie and it is filed anonymously.
 *
 * Reporting never throws: failing to report must not hide the error itself.
 * Production only, so `next dev` stays out of the project's issues.
 */
import type { Instrumentation } from 'next'

import { HALLIARD3_KEY } from './lib/halliard3-posthog'

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  // posthog-node needs the Node.js runtime.
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { PostHog } = await import('posthog-node')
    const posthog = new PostHog(HALLIARD3_KEY, { host: 'https://us.i.posthog.com', flushAt: 1, flushInterval: 0 })
    const browser = posthogCookie(request.headers.cookie, HALLIARD3_KEY)
    await posthog.captureExceptionImmediate(err, browser?.distinctId, {
      $session_id: browser?.sessionId,
      digest: typeof err === 'object' && err !== null && 'digest' in err ? String(err.digest) : undefined,
      path: request.path,
      method: request.method,
      route_path: context.routePath,
      route_type: context.routeType,
      runtime: 'server',
      site: 'marketing',
    })
    await posthog.shutdown()
  } catch {
    // Reporting never fails the request, nor hides the error behind its own.
  }
}

/** The distinct id and session id posthog-js keeps in `ph_<key>_posthog`. */
function posthogCookie(
  header: string | string[] | undefined,
  key: string,
): { distinctId: string | undefined; sessionId: string | undefined } | null {
  const cookies = Array.isArray(header) ? header.join('; ') : (header ?? '')
  const name = `ph_${key}_posthog=`
  const raw = cookies
    .split(/;\s*/)
    .find((cookie) => cookie.startsWith(name))
    ?.slice(name.length)
  if (!raw) return null
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as { distinct_id?: unknown; $sesid?: unknown }
    return {
      distinctId: typeof value.distinct_id === 'string' ? value.distinct_id : undefined,
      sessionId: Array.isArray(value.$sesid) && typeof value.$sesid[1] === 'string' ? value.$sesid[1] : undefined,
    }
  } catch {
    return null
  }
}
