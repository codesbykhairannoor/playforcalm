/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Matikan Eslint Check
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Matikan TypeScript Check (INI KUNCINYA)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;