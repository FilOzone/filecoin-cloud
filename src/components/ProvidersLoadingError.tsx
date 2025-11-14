import { ErrorStateCard } from '@filecoin-foundation/ui-filecoin/ErrorStateCard'

import { Button } from './Button'

export type ErrorStateProps = {
  message: string
  retry: () => void
}

export function ProvidersLoadingError({ message, retry }: ErrorStateProps) {
  return (
    <ErrorStateCard
      title="Error loading providers"
      titleTag="h3"
      description={message}
    >
      <div className="flex gap-4">
        <Button variant="primary" onClick={retry}>
          Retry
        </Button>
        <Button variant="ghost" href="#">
          Check network status
        </Button>
      </div>
    </ErrorStateCard>
  )
}
