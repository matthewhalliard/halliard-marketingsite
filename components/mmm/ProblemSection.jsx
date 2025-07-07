import { Container } from './Container'

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-label="The measurement challenge"
      className="pt-10 pb-7 sm:pt-16 sm:pb-10 lg:pb-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            The Measurement Challenge Everyone Faces
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* For Brands */}
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-tint/60">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">For Brands:</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Fragmented data across 20+ platforms</p>
                  <p className="text-sm text-slate-600 mt-1">Each reporting different "truth" about performance</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Platform metrics inflated by 50-300%</p>
                  <p className="text-sm text-slate-600 mt-1">Self-attribution makes every channel look like a winner</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">8-week wait for MMM updates</p>
                  <p className="text-sm text-slate-600 mt-1">By the time you get insights, the market has changed</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Can't measure unmeasured channels</p>
                  <p className="text-sm text-slate-600 mt-1">Podcasts, influencers, CTV become budget black holes</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Agencies */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">For Agencies:</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Clients question every recommendation</p>
                  <p className="text-sm text-slate-600 mt-1">"Prove this channel works" becomes impossible to answer</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Hours lost building custom reports</p>
                  <p className="text-sm text-slate-600 mt-1">Manual spreadsheet work instead of strategic thinking</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Pressure to prove ROI or lose accounts</p>
                  <p className="text-sm text-slate-600 mt-1">Without proper measurement, value becomes invisible</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Data science expertise out of reach</p>
                  <p className="text-sm text-slate-600 mt-1">MMM and testing reserved for the biggest shops</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            💡 There's a better way. See how Halliard solves these challenges in 3 simple steps...
          </p>
        </div>
      </Container>
    </section>
  )
} 