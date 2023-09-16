/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAGINATION_SIZE: process.env.PAGINATION_SIZE,
  },
  reactStrictMode: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
  },
};

module.exports = nextConfig;
