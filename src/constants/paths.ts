export type NextRoute = __next_route_internal_types__.StaticRoutes

type PathConfig = {
  path: NextRoute
  label: string
}

export const PATHS = {
  AGENTS: {
    path: '/agents',
    label: 'Agents',
  },
  CONTACT: {
    path: '/contact',
    label: 'Talk to our team',
  },
  HOMEPAGE: {
    path: '/',
    label: 'Homepage',
  },
  IPFS_TO_FILECOIN: {
    path: '/ipfs2filecoin',
    label: 'IPFS to Filecoin',
  },
  PRIVACY_POLICY: {
    path: '/privacy-policy',
    label: 'Privacy Policy',
  },
  SERVICE_PROVIDERS: {
    path: '/service-providers',
    label: 'Service Providers',
  },
  SHOWCASE: {
    path: '/showcase',
    label: 'Showcase',
  },
  SUPPORT: {
    path: '/support',
    label: 'Support',
  },
  TERMS_OF_USE: {
    path: '/terms-of-use',
    label: 'Terms of Use',
  },
  WARM_STORAGE_SERVICE: {
    path: '/warm-storage-service',
    label: 'Store',
  },
} as const satisfies Record<string, PathConfig>
