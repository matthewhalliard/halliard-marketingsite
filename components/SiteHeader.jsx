import Link from 'next/link'
import { Button } from './mmm/Button'
import { Container } from './mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'
const SIGN_IN_URL = 'https://app.halliardmedia.com/sign-in'

const SOLUTIONS_LINKS = [
  { href: '/solutions/independent-agencies', label: 'For Independent Agencies' },
  { href: '/solutions/in-house-marketing', label: 'For In-House Marketing Teams' },
  { href: '/mmm', label: 'Marketing Mix Modeling' },
  { href: '/brand-studies', label: 'Brand Studies' },
]

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-between items-center py-5">
          <div className="flex items-center gap-x-8">
            <Link href="/" aria-label="Home">
              <img
                src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
                alt="Halliard"
                className="h-8 w-auto"
              />
            </Link>
            <Link
              href="/features"
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              Features
            </Link>
            <div className="relative group hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                aria-haspopup="true"
              >
                Solutions
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                <div className="w-64 rounded-lg border border-gray-100 bg-white shadow-lg py-2">
                  {SOLUTIONS_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <a
              href={SIGN_IN_URL}
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              Sign in
            </a>
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
