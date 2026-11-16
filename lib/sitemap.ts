// The pages search engines should index, by the address each one names as
// canonical. Add a page here when it ships.
//
// Left out on purpose: /plan and the pages under it (copies kept for ads, whose
// canonical is the unprefixed address), and /demo, /trytoday and /admin, which
// ask not to be indexed.
export const SITE_URL = 'https://www.halliardmedia.com'

export const SITEMAP_PATHS = [
  '/',
  '/how-it-works',
  '/sample',
  '/pricing',
  '/buying-desk',
  '/buying-desk/how-it-works',
  '/compare/bionic',
  '/compare/camphouse',
  '/compare/nielsen-media-impact',
  '/mmm',
  '/brand-studies',
  '/incrementality-testing',
  '/guide/media-planning-guide',
  '/media-planning-templates',
  '/manifesto/the-independents-agent',
  '/privacy',
  '/terms',
]

export function sitemapXml(): string {
  const urls = SITEMAP_PATHS.map(
    (path) => `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc></url>`,
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
