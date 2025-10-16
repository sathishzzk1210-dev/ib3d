/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // REMOVE or comment this out
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
