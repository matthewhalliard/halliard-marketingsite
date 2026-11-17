import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

// A real 404 page: its own title and description (instead of the site default),
// kept out of search results, with links to the pages people usually want.
const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/sample', label: 'A sample media plan' },
  { href: '/buying-desk', label: 'The buying desk' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/guide/media-planning-guide', label: 'Media planning guide' },
]

export default function NotFound() {
  return (
    <Layout
      title="Page not found | Halliard"
      description="This page doesn't exist or has moved. Find Halliard's media planning tool, sample plan, buying desk, pricing and media planning guide from here."
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">404</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900">This page doesn&apos;t exist</h1>
        <p className="mt-4 text-lg text-gray-600">It may have moved when the site was rebuilt. These are the pages people usually look for:</p>
        <ul className="mt-8 space-y-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-lg font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
