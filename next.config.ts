import type { NextConfig } from 'next'

const svgrRule = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  webpack: (config) => {
    config.module.rules.push(svgrRule)
    return config
  },
}

export default nextConfig
