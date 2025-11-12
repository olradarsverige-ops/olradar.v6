/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  i18n: {
    locales: ["sv", "en"],
    defaultLocale: "sv",
  },
};

module.exports = nextConfig;
