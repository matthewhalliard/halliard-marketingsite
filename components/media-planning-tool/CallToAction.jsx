import { Container } from '../mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

export function CallToAction({ onSignupClick }) {
  return (
    <section id="cta" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600/80" />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(211,228,255,0.08) 0%, transparent 60%)',
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.1]">
            Your clients are spending millions on media.{' '}
            <span className="text-white/70">Help them see what it&rsquo;s doing.</span>
          </h2>
          <div className="mt-10">
            <a
              href={SIGN_UP_URL}
              onClick={(e) => {
                e.preventDefault()
                if (onSignupClick) onSignupClick(SIGN_UP_URL)
              }}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Start Planning Free
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
