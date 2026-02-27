/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Turbopack (default in Next.js 16) already emits imported assets as
  // `/_next/static/media/[hash][ext]`, so no custom webpack config is needed.
  turbopack: {},
};

export default nextConfig
