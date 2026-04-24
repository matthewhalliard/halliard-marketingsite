// Meta Pixel helper — safe client-side wrapper around fbq.
// The base pixel + PageView is installed in pages/_document.tsx.
// Use these helpers to fire additional conversion events.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Subscribe'
  | 'StartTrial'

export function trackPixel(
  event: StandardEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  try {
    if (params) {
      window.fbq('track', event, params)
    } else {
      window.fbq('track', event)
    }
  } catch {
    // never break the page because of a pixel error
  }
}

export function trackCustom(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  try {
    if (params) {
      window.fbq('trackCustom', name, params)
    } else {
      window.fbq('trackCustom', name)
    }
  } catch {
    // swallow
  }
}
