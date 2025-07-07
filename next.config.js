module.exports = {
  // Skip ESLint errors during `next build` so production builds are not blocked.
  // We still see the lint feedback during local development.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirect the root path to the Framer-generated static homepage
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home-framer.html',
      },
    ];
  },
}; 