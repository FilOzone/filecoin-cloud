import type { NextConfig } from 'next'

const svgrRule = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: [
    '@filecoin-foundation/hooks',
    '@filecoin-foundation/ui',
    '@filecoin-foundation/ui-filecoin',
    '@filecoin-foundation/utils',
  ],
  webpack: (config) => {
    config.module.rules.push(svgrRule)
    return config
  },
}

export default nextConfig
