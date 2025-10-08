import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'customer-lvz4yc6kzb02xkz5.cloudflarestream.com'
      }
    ]
  }
}

export default nextConfig
