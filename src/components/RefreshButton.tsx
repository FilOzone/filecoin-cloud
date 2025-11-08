import { Icon } from '@filecoin-foundation/filecoin-ui/Icon'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from './Button'

type RefreshButtonProps = {
  onClick: () => void
  disabled: boolean
}

export function RefreshButton(props: RefreshButtonProps) {
  return (
    <Button variant="tertiary" {...props}>
      <span className="flex gap-2 items-center">
        <Icon component={ArrowClockwiseIcon} size={20} />
        Refresh
      </span>
    </Button>
  )
}
