import { clsx } from 'clsx'

export type PhaseProps = {
  date: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
  isLast?: boolean
}

export function Phase({
  date,
  title,
  description,
  status,
  isLast,
}: PhaseProps) {
  return (
    <div className="flex gap-6 sm:block">
      <div className="flex flex-col sm:flex-row items-center">
        {/* Circle */}
        <div
          className={clsx(
            'size-7 shrink-0 rounded-full border-2',
            status === 'upcoming' ? 'border-zinc-400' : 'border-brand-600',
          )}
          aria-hidden="true"
        />

        {/* Line */}
        <div
          className={clsx(
            'w-0.5 sm:h-0.5 flex-1',
            status === 'completed' ? 'bg-brand-600' : 'bg-zinc-400',
            status === 'upcoming' &&
              isLast &&
              'bg-linear-to-b sm:bg-linear-to-r from-zinc-400 from-30% to-zinc-50',
          )}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="mb-8 sm:mt-6 space-y-2 sm:mr-15 max-w-60">
        <time className="text-zinc-600 text-sm inline-block" dateTime={date}>
          {date}
        </time>
        <h3 className="text-xl font-medium text-zinc-950">{title}</h3>
        <p className="text-zinc-600 text-base">{description}</p>
      </div>
    </div>
  )
}
