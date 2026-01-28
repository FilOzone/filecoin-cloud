'use client'

import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { Button } from '@headlessui/react'
import { CheckSquareIcon, CopyIcon } from '@phosphor-icons/react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { truncatePeerID } from '@/utils/truncate-peer-id'

type CompactPeerIDProps = {
  peerId: string
}

export function CompactPeerID({ peerId }: CompactPeerIDProps) {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <div className="inline-flex items-center gap-1">
      <div
        className="font-mono text-sm truncate whitespace-nowrap"
        title={peerId}
      >
        {truncatePeerID(peerId)}
      </div>

      <Button
        onClick={() => copy(peerId)}
        aria-label={`Copy ${peerId} to clipboard`}
        className="grid place-items-center p-1.5 rounded-md hover:bg-zinc-200 cursor-pointer"
        disabled={isCopied}
      >
        {isCopied ? (
          <span className="text-green-600">
            <Icon component={CheckSquareIcon} size={18} />
          </span>
        ) : (
          <span className="text-zinc-500">
            <Icon component={CopyIcon} size={18} />
          </span>
        )}
      </Button>
    </div>
  )
}
