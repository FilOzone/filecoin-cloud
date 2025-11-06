import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { SpinnerIcon } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'

type RefetchWrapperProps = {
  isRefetching: boolean
  children: React.ReactNode
}

export function RefreshOverlay({
  isRefetching,
  children,
}: RefetchWrapperProps) {
  if (!isRefetching) {
    return children
  }

  return (
    <div className="isolate relative">
      {isRefetching && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-center gap-2">
            <p>Refreshing</p>
            <span className="animate-spin">
              <Icon component={SpinnerIcon} size={20} />
            </span>
          </div>
        </div>
      )}

      <div className={clsx(isRefetching && 'opacity-50 pointer-events-none')}>
        {children}
      </div>
    </div>
  )
}
