import { useEffect, useRef, useState, type CSSProperties } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(q.matches)
    const on = () => setReduced(q.matches)
    q.addEventListener('change', on)
    return () => q.removeEventListener('change', on)
  }, [])
  return reduced
}

export const FADE_MS = 500

/**
 * A looping clock for a step's animation, in ms since the loop began. It runs
 * only while the element is on screen and restarts each time it comes back.
 * With reduced motion it stands still at the end of the loop's build, so the
 * finished scene shows.
 */
export function useTimeline(period: number) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [t, setT] = useState(0)

  useEffect(() => {
    if (reduced) {
      setT(period - FADE_MS - 1)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    let start = 0
    let running = false
    const tick = (now: number) => {
      if (!start) start = now
      setT((now - start) % period)
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !running) {
          running = true
          start = 0
          raf = requestAnimationFrame(tick)
        } else if (!entry?.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [period, reduced])

  // The whole scene fades out at the end of each loop and back in at the start.
  const opacity = t > period - FADE_MS ? Math.max(0, (period - t) / FADE_MS) : Math.min(1, t / 250 + (reduced ? 1 : 0))
  return { ref, t, reduced, opacity }
}

const ease = (x: number) => 1 - Math.pow(1 - x, 3)

/** How far, eased from 0 to 1, a step starting at `start` and lasting `dur` has got by `t`. */
export function prog(t: number, start: number, dur: number) {
  if (t <= start) return 0
  if (t >= start + dur) return 1
  return ease((t - start) / dur)
}

/** Style for an element that appears at `at`: fades and rises into place. */
export function appear(t: number, at: number, dur = 450): CSSProperties {
  const p = prog(t, at, dur)
  return { opacity: p, transform: `translateY(${(1 - p) * 8}px)` }
}
