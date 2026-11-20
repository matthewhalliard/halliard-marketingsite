module.exports = {
  // Skip ESLint errors during `next build` so production builds are not blocked.
  // We still see the lint feedback during local development.
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // The home became the brand page in November 2026. Meta's planning ad
      // (campaign image-test-1, "B3-30-days-spreadsheet") still links to `/`,
      // so its clicks go on to the planning page they were promised, with
      // their tags. Add any other planning campaign that links to `/` here.
      {
        source: '/',
        has: [{ type: 'query', key: 'utm_campaign', value: 'image-test-1' }],
        destination: '/planning',
        permanent: false,
      },
      // Canonicalize legacy /legal/* paths to current routes.
      // LinkedIn Lead Gen forms and older link cards historically pointed at
      // /legal/privacy and /legal/terms. Keep them working with permanent redirects.
      { source: '/legal/privacy', destination: '/privacy', permanent: true },
      { source: '/legal/terms', destination: '/terms', permanent: true },
      { source: '/legal', destination: '/privacy', permanent: true },
      // The guide's earlier address. Other sites and Google still link to it.
      { source: '/guide/media-planning', destination: '/guide/media-planning-guide', permanent: true },
      // Mediatool renamed itself Camphouse in 2025; people still search the old name.
      { source: '/compare/mediatool', destination: '/compare/camphouse', permanent: true },
      { source: '/compare/mediatools', destination: '/compare/camphouse', permanent: true },
      { source: '/compare/nielsen', destination: '/compare/nielsen-media-impact', permanent: true },
      // Pages from the site halliardmedia.com served before November 2026. Search
      // engines and old links still send people to them, so each goes to its
      // closest current page instead of a 404 (paths and visit counts from
      // PostHog, last 12 months).
      { source: '/ooh', destination: '/planning', permanent: true },
      { source: '/agentic', destination: '/buying-desk', permanent: true },
      { source: '/features', destination: '/how-it-works', permanent: true },
      { source: '/how-halliard-works', destination: '/how-it-works', permanent: true },
      { source: '/solutions/in-house-marketing', destination: '/solutions/in-house', permanent: true },
      { source: '/schedule-demo', destination: '/demo', permanent: true },
      { source: '/contact', destination: '/demo', permanent: true },
      { source: '/principles', destination: '/manifesto/the-independents-agent', permanent: true },
      { source: '/mmm-quiz', destination: '/mmm', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/imprint', destination: '/privacy', permanent: true },
      { source: '/templates', destination: '/media-planning-templates', permanent: true },
      { source: '/template/:slug*', destination: '/media-planning-templates', permanent: true },
      { source: '/guide', destination: '/guide/media-planning-guide', permanent: true },
      { source: '/plans/:slug*', destination: '/sample', permanent: true },
      { source: '/plans', destination: '/sample', permanent: true },
      { source: '/action-plan', destination: '/plan', permanent: true },
      { source: '/media-planning-tool', destination: '/planning', permanent: true },
      { source: '/try', destination: '/trytoday', permanent: true },
      { source: '/buy', destination: '/buying-desk', permanent: true },
      { source: '/app/:path*', destination: '/plan', permanent: true },
      { source: '/app', destination: '/plan', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/team', destination: '/', permanent: true },
      { source: '/careers', destination: '/', permanent: true },
      { source: '/press', destination: '/', permanent: true },
      { source: '/thankyou', destination: '/', permanent: true },
    ];
  },
};
