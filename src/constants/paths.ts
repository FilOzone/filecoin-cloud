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
  TERMS_OF_USE: {
    path: '/terms-of-use',
    label: 'Terms of Use',
  },
  WARM_STORAGE_SERVICE: {
    path: '/warm-storage-service',
    label: 'Store',
  },
} as const satisfies Record<string, PathConfig>
