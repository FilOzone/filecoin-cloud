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
  COLD_STORAGE_SERVICE: {
    path: '/cold-storage-service',
    label: 'Cold Storage',
  },
  CONTACT: {
    path: '/contact',
    label: 'Talk to our team',
  },
  HOMEPAGE: {
    path: '/',
    label: 'Homepage',
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
  STORE: {
    path: '/store',
    label: 'Store',
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
    label: 'Warm Storage',
  },
} as const satisfies Record<string, PathConfig>
