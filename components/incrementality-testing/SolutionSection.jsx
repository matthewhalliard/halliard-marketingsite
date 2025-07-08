import { Container } from '../mmm/Container'
import Image from 'next/image'

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            True Incrementality Through Geo-Testing
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Scientific experiments that isolate causation from correlation
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl lg:flex lg:items-start lg:gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-8 lg:text-left text-center">
              How Geo-Lift Testing Works
            </h3>
            <div className="space-y-6">
            {['Market Selection','Clean Experiment','Measure Lift','Prove Causation'].map((title, idx) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">{title}</h4>
                  <p className="text-gray-600">
                    {[
                      'Split 210 US DMAs into test & control groups',
                      'Run campaigns only in test markets',
                      'Compare sales between test vs. control',
                      'Isolate true incremental impact',
                    ][idx]}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="flex-1 mt-12 lg:mt-0 flex items-stretch justify-center">
            <Image
              src="/images/mmm/dma-map.png"
              alt="US DMA map"
              width={400}
              height={250}
              className="rounded-lg shadow-md w-full max-w-md h-full object-contain"
            />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-8 text-center">
            Why Geo-Testing Beats Everything Else
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['No Cookies Needed','Works for any channel'],
              ['Real Business Impact','Measures actual sales, not proxies'],
              ['Statistically Valid','Proven experimental methodology'],
              ['Platform Agnostic','Test anything from TikTok to billboards'],
            ].map(([headline, sub], idx) => (
              <div key={idx} className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-slate-900">{headline}</h4>
                  <p className="text-gray-600 text-sm mt-1">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 