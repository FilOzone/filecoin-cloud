import { useQuery } from '@tanstack/react-query'

import { fetchAllProviders } from '@/services/fetchProviders'

export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: fetchAllProviders,
    retry: 2,
  })
}
