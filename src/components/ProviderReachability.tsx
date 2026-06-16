import { clsx } from 'clsx'

import { CellLoadingSpinner } from '@/components/CellLoadingSpinner'

import type { ProviderRuntimeStatus } from '@/schemas/provider-schema'

type ProviderReachabilityProps = {
  status: ProviderRuntimeStatus
  reachable?: boolean
  latencyMs?: number
}

/**
 * Renders the result of a provider's live /pdp/ping probe. While the probe is
 * in flight the cell shows a spinner so the row can render immediately and
 * fill in once the probe resolves (see hooks/use-service-providers).
 */
export function ProviderReachability({
  status,
  reachable,
  latencyMs,
}: ProviderReachabilityProps) {
  if (status === 'pending') {
    return <CellLoadingSpinner label="Checking…" />
  }

  if (!reachable) {
    return (
      <span className="flex items-center gap-2 text-sm text-(--color-text-muted)">
        <Dot className="bg-gray-400" />
        Offline
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2 text-sm">
      <Dot className="bg-green-500" />
      <span>Online</span>
      {typeof latencyMs === 'number' && (
        <span className="text-(--color-text-muted)">{latencyMs} ms</span>
      )}
    </span>
  )
}

function Dot({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={clsx('inline-block size-2 shrink-0 rounded-full', className)}
    />
  )
}
