/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    reactStrictMode: false,
    i18n: {
      locales: ["zh"],
      defaultLocale: "zh",
    },
    output: 'standalone',
  }
  
  module.exports = nextConfig