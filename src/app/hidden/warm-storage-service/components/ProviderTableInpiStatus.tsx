import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'

type ProviderTableInpiStatusProps = {
  published: boolean
}

export function ProviderTableInpiStatus({
  published,
}: ProviderTableInpiStatusProps) {
  const Icon = published ? CheckCircleIcon : XCircleIcon
  const text = published ? 'Yes' : 'No'

  return (
    <div className="flex items-center gap-1.5">
      <Icon
        size={20}
        className={clsx(published ? 'text-brand-600' : 'text-zinc-600')}
      />
      <span>{text}</span>
    </div>
  )
}
