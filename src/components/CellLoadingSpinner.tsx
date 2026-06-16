import { CircleNotchIcon } from '@phosphor-icons/react'

type CellLoadingSpinnerProps = {
  label?: string
}

/**
 * Inline spinner for table cells whose value is still being probed, so a row
 * can render immediately and fill the value in once it resolves.
 */
export function CellLoadingSpinner({
  label = 'Loading…',
}: CellLoadingSpinnerProps) {
  return (
    <span className="flex items-center gap-2 text-sm text-(--color-text-muted)">
      <CircleNotchIcon size={16} className="animate-spin" aria-hidden />
      {label}
    </span>
  )
}
