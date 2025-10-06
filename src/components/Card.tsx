import { Icon } from './Icon'
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'

export type CardProps = {
  title: string
  description: string
  link: string
}

export function Card({ title, description, link }: CardProps) {
  return (
    <article
      className="border-brand/50 hover:border-brand/90 relative rounded-2xl border bg-zinc-800/70 p-8 focus-within:bg-zinc-800/90 focus-within:ring-2 focus-within:ring-zinc-50 hover:bg-zinc-800/90"
      aria-label={title + ': ' + description}
    >
      <h3 className="mb-12 text-xl font-medium">{title}</h3>

      <a
        href={link}
        rel="noopener noreferrer"
        className="absolute inset-0 font-medium text-zinc-400 focus:outline-none"
      >
        <span className="absolute bottom-8 left-8 inline-flex items-center gap-2">
          {description}
          <Icon component={CaretRightIcon} color="color-zinc-500" size={20} />
        </span>
      </a>
    </article>
  )
}
