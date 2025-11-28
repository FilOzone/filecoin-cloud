'use client'

import { CopySimple, Check } from '@phosphor-icons/react/dist/ssr'
import { useMemo } from 'react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { truncatePeerID } from '@/utils/truncate-peer-id'

type CompactPeerIDProps = {
  peerId?: string | null
  className?: string
}

export function CompactPeerID({ peerId, className }: CompactPeerIDProps) {
  const { copy, isCopied } = useCopyToClipboard()

  const truncated = useMemo(() => truncatePeerID(peerId ?? ''), [peerId])

  if (!peerId) {
    return <span className={className ?? 'text-sm'}>-</span>
  }

  return (
    <div className={(className ?? 'inline-flex items-center min-w-0') + ' group relative'}>
      <span
        tabIndex={0}
        className="font-mono text-sm truncate block max-w-[220px] whitespace-nowrap overflow-hidden"
      >
        {truncated}
      </span>

      <div
        className="absolute -top-8 z-50 hidden group-hover:block group-focus-within:block pointer-events-none"
        style={{ left: '50%', transform: 'translateX(-80%)' }}
      >
        <div className="max-w-[200px] bg-slate-900 text-white text-xs rounded py-1 px-2 whitespace-normal break-words pointer-events-auto">
          {peerId}
        </div>
      </div>

      <button
        type="button"
        onClick={() => copy(peerId)}
        aria-label="Copy peer id"
        className="ml-2 inline-flex items-center p-1 rounded hover:bg-slate-100 flex-shrink-0"
      >
        {isCopied ? <Check size={16} /> : <CopySimple size={16} />}
      </button>
    </div>
  )
}
