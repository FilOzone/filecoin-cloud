import { Icon } from './Icon'
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'
import { ExternalLink } from './ExternalLink'

export type CardProps = {
  title: string
  description: string
  link?: string
}

export function Card({ title, description, link }: CardProps) {
  return (
    <article
      className={clsx(
        'group border-brand-700/20 rounded-xl border bg-zinc-800/75 p-6 text-left',
        link &&
          'hover:border-brand-700/80 focus-within:brand-outline relative focus-within:bg-zinc-800/95 hover:bg-zinc-800/90',
      )}
      {...(link && {
        'aria-label': `Visit ${description}`,
      })}
    >
      <h3 className={clsx('text-xl font-medium', link ? 'mb-8' : 'mb-4')}>
        {title}
      </h3>

      {link ? (
        <ExternalLink
          href={link}
          className="group-hover:text-brand-500 group-focus-within:text-brand-500 absolute inset-0 font-medium text-zinc-400 focus:outline-none"
        >
          <span className="absolute bottom-6 left-6 inline-flex items-center gap-2">
            {description}
            <Icon component={CaretRightIcon} width={20} />
          </span>
        </ExternalLink>
      ) : (
        <p className="font-medium text-zinc-400">{description}</p>
      )}
    </article>
  )
}
