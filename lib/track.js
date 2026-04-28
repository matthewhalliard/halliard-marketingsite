// Lightweight CTA click tracker.
// Fires Meta Pixel custom events + PostHog capture.
// Safe in SSR — all calls guarded by typeof window.
//
// Usage in a CTA:
//   onClick={() => trackCta('start_free', 'hero')}
//
// Event names:
//   - StartFreeClick      → "Start Planning Free" buttons
//   - SeeInActionClick    → "See It In Action" buttons
//
// All events also include a `location` property for attribution
// (e.g. 'hero', 'navbar', 'mid_cta', 'bottom_cta').

const META_EVENT_NAMES = {
  start_free: 'StartFreeClick',
  see_in_action: 'SeeInActionClick',
}

export function trackCta(kind, location) {
  if (typeof window === 'undefined') return
  const metaEvent = META_EVENT_NAMES[kind]
  const props = { location, kind }

  // Meta Pixel
  try {
    if (metaEvent && typeof window.fbq === 'function') {
      window.fbq('trackCustom', metaEvent, props)
    }
  } catch (_) {}

  // PostHog
  try {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture('cta_click', {
        cta_kind: kind,
        cta_location: location,
        meta_event: metaEvent || null,
      })
    }
  } catch (_) {}
}
