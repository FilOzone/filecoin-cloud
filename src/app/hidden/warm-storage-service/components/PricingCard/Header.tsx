import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'
import { clsx } from 'clsx'

export type HeaderProps = {
  name: string
  description: string
  recommended: boolean
}

export function Header({ name, description, recommended }: HeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between items-start gap-5 sm:flex-row sm:items-center">
        <div className={clsx(recommended && 'text-brand-800')}>
          <Heading tag="h3" variant="card-heading">
            {name}
          </Heading>
        </div>
      </div>

      <p className="text-(--color-paragraph-text)">{description}</p>
    </div>
  )
}
