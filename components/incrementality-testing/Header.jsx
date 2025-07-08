'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '../mmm/Button'
import { Container } from '../mmm/Container'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="/incrementality-testing#problem">Problem</MobileNavLink>
        <MobileNavLink href="/incrementality-testing#solution">Solution</MobileNavLink>
        <MobileNavLink href="/incrementality-testing#features">Features</MobileNavLink>
        <MobileNavLink href="/incrementality-testing#use-cases">Use Cases</MobileNavLink>
        <MobileNavLink href="/incrementality-testing#methodology">Methodology</MobileNavLink>
        <MobileNavLink href="/incrementality-testing#faq">FAQ</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header({ hideLinks = false } = {}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <nav className="relative flex justify-between items-center py-6">
          <div className="flex items-center md:gap-x-12">
            <Link href="/incrementality-testing" aria-label="Home">
              <img 
                src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512" 
                alt="Halliard" 
                className="h-8 w-auto"
              />
            </Link>
            {!hideLinks && (
            <div className="hidden md:flex md:gap-x-6">
              <Link href="/incrementality-testing#problem" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Problem
              </Link>
              <Link href="/incrementality-testing#solution" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Solution
              </Link>
              <Link href="/incrementality-testing#features" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Features
              </Link>
              <Link href="/incrementality-testing#use-cases" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Use Cases
              </Link>
              <Link href="/incrementality-testing#methodology" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Methodology
              </Link>
              <Link href="/incrementality-testing#faq" className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                FAQ
              </Link>
            </div>
            )}
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button href="/schedule-demo" color="blue">
              <span>
                Schedule Demo
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
} 