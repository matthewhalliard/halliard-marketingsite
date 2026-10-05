import React from 'react'

/**
 * Credibility for the plan page: the platforms Halliard can buy on, as a
 * ticking banner, and Lisa Matulis's quote from the homepage.
 *
 * The banner lists only what Halliard buys today: Meta (Facebook and
 * Instagram) and PubMatic, with the streaming TV the client portal names
 * under PubMatic. Add a platform here when Halliard can buy on it.
 */

const BUYS_ON = [
  { name: 'Meta', logo: 'meta' },
  { name: 'Facebook', logo: 'facebook' },
  { name: 'Instagram', logo: 'instagram' },
  { name: 'PubMatic', logo: 'pubmatic' },
  { name: 'Paramount+', logo: 'paramount-plus' },
  { name: 'Tubi', logo: 'tubi' },
  { name: 'Pluto TV', logo: 'pluto' },
]

/** `optional` adds "(optional)" to the label, for pages where buying is an extra rather than the offer. */
export function BuysOnBanner({ optional = true }: { optional?: boolean }) {
  // Repeated so one copy fills any width; the track scrolls by exactly one copy.
  const run = [...BUYS_ON, ...BUYS_ON, ...BUYS_ON]
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <p className="shrink-0 text-sm font-medium text-slate-500">
        Halliard can buy across{optional ? <span className="text-slate-400"> (optional)</span> : null}
      </p>
      <div
        className="relative w-full min-w-0 overflow-hidden"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
      >
        <ul className="plan-ticker flex w-max items-center gap-10 py-2">
          {[...run, ...run].map((p, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-700"
              aria-hidden={i >= BUYS_ON.length}
              data-repeat={i >= BUYS_ON.length ? '' : undefined}
            >
              <span className="relative inline-flex h-[26px] w-[26px]">
                <img src={`/plan-grid/${p.logo}.png`} alt="" width={26} height={26} className="h-[26px] w-[26px] rounded-md" />
                {p.logo === 'pubmatic' ? (
                  <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-white">P</span>
                ) : null}
              </span>
              {p.name}
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .plan-ticker { animation: plan-ticker 38s linear infinite; }
        .plan-ticker:hover { animation-play-state: paused; }
        @keyframes plan-ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce) { .plan-ticker { animation: none; flex-wrap: wrap; width: auto; justify-content: center; row-gap: 0.5rem; } .plan-ticker [data-repeat] { display: none; } }
      `}</style>
    </div>
  )
}

export function LisaQuote() {
  return (
    <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint">
      <div className="mb-8 flex items-center gap-4">
        <img src="/images/testimonials/lewis-media-logo.png" alt="Lewis Media Partners" className="h-8 w-auto" />
      </div>
      <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-800">
        &ldquo;Halliard gave our planners a better way to build media plans and our clients a clearer picture of what
        their spend is doing. That&rsquo;s been really valuable for us.&rdquo;
      </blockquote>
      <div className="mt-8 flex items-center gap-4">
        <img src="/images/testimonials/lisa-matulis.jpg" alt="Lisa Matulis" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Lisa Matulis</p>
          <p className="text-sm text-slate-500">Group Client Lead, Lewis Media Partners</p>
        </div>
      </div>
    </div>
  )
}
