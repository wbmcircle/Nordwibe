/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
