'use client'
import Link from 'next/link'
import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Halliard
          </Link>

          {/* Primary CTA */}
          <Button href="/schedule-demo" color="blue">
            Schedule Demo
          </Button>
        </nav>
      </Container>
    </header>
  )
} 