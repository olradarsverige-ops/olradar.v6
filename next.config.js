/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  // Removed i18n to avoid export mismatch with /[lang]
  output: 'standalone',
};

module.exports = nextConfig;
