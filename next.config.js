module.exports = {
  // Skip ESLint errors during `next build` so production builds are not blocked.
  // We still see the lint feedback during local development.
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
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
    ];
  },
};
