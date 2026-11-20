import Link from 'next/link'
import { Container } from './mmm/Container'

// Every section of the site, so a visitor who lands on any page (most land on
// one from an ad or a search) can reach the rest, and terms and privacy are
// one click from every landing page.
const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'For brands',
    links: [
      { href: '/', label: 'We run your ads' },
      { href: '/audit', label: 'Free Google Ads audit' },
      { href: '/compare/mai', label: 'Halliard vs MAI' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Planning tool',
    links: [
      { href: '/agencies', label: 'For agencies' },
      { href: '/planning', label: 'Overview' },
      { href: '/how-it-works', label: 'How it works' },
      { href: '/sample', label: 'Sample plan' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Buying desk',
    links: [
      { href: '/buying-desk', label: 'Overview' },
      { href: '/buying-desk/how-it-works', label: 'How it works' },
      { href: '/pricing#buying-fee', label: 'Pricing' },
    ],
  },
  {
    title: 'Measurement',
    links: [
      { href: '/mmm', label: 'Marketing mix modeling' },
      { href: '/brand-studies', label: 'Brand studies' },
      { href: '/incrementality-testing', label: 'Incrementality testing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/guide/media-planning-guide', label: 'Media planning guide' },
      { href: '/media-planning-templates', label: 'Media plan templates' },
      { href: '/manifesto/the-independents-agent', label: 'Manifesto' },
      { href: '/compare/bionic', label: 'Halliard vs Bionic' },
      { href: '/compare/camphouse', label: 'Halliard vs Camphouse' },
      { href: '/compare/nielsen-media-impact', label: 'Nielsen Media Impact alternative' },
    ],
  },
  {
    title: 'Halliard',
    links: [
      { href: '/solutions/independent-agencies', label: 'For agencies' },
      { href: '/solutions/in-house', label: 'For in-house teams' },
      { href: '/demo', label: 'Book a demo' },
      { href: 'https://client.halliardmedia.com/sign-in', label: 'Sign in' },
      { href: '/docs/chatgpt-claude', label: 'ChatGPT and Claude' },
      { href: '/support', label: 'Support' },
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <Container className="py-12">
        <nav aria-label="Site" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {COLUMNS.map(col => (
            <div key={col.title}>
              <p className="text-sm font-medium text-slate-900">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map(l => (
                  <li key={l.href + l.label}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} className="text-sm text-slate-600 hover:text-slate-900">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="text-sm text-slate-600 hover:text-slate-900">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-sm text-slate-500">© {new Date().getFullYear()} Halliard LLC. All rights reserved.</p>
      </Container>
    </footer>
  )
}
