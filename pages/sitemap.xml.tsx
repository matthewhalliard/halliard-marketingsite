import type { GetServerSideProps } from 'next'
import { sitemapXml } from '../lib/sitemap'

// Serves /sitemap.xml. The list of pages lives in lib/sitemap.ts.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemapXml())
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
