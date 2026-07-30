import type { NextConfig } from 'next'

const svgrRule = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

const markdownRule = {
  test: /\.md$/,
  loader: 'frontmatter-markdown-loader',
  options: {
    mode: ['body', 'attributes', 'react-component'],
  },
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  serverExternalPackages: ['twoslash', '@typescript/vfs'],
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      // Page temporarily hidden; route code kept at src/app/service-providers.
      // Remove this entry to restore it.
      {
        source: '/service-providers',
        destination: '/',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push(svgrRule)
    config.module.rules.push(markdownRule)
    return config
  },
}

export default nextConfig
