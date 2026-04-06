'use client'
import Link from 'next/link'
import { Container } from '../mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

export function Header({ onSignupClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" aria-label="Home">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/trytoday"
              className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              See It In Action
            </Link>
            <a
              href={SIGN_UP_URL}
              onClick={(e) => {
                e.preventDefault()
                if (onSignupClick) onSignupClick(SIGN_UP_URL)
              }}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Start Planning Free
            </a>
          </div>
        </nav>
      </Container>
    </header>
  )
}
