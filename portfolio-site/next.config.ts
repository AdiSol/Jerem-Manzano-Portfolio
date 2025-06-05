/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['img.youtube.com'],
  },
};

module.exports = nextConfig;