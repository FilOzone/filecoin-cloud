import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'

import { Button } from './Button'

type RefreshButtonProps = {
  onClick: () => void
  isRefetching: boolean
}

export function RefreshButton({ onClick, isRefetching }: RefreshButtonProps) {
  return (
    <Button variant="tertiary" onClick={onClick} disabled={isRefetching}>
      <span className="flex gap-2 items-center">
        <span className={clsx(isRefetching && 'animate-spin')}>
          <Icon component={ArrowClockwiseIcon} size={20} />
        </span>
        Refresh
      </span>
    </Button>
  )
}
