import { Icon } from './Icon'
import { ExternalLink } from './ExternalLink'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

export type CardProps = {
  text: string
  icon: PhosphorIcon
  link: string
}

export function Card({ text, icon: IconComponent, link }: CardProps) {
  return (
    <article
      className="group/card focus-within:brand-outline relative border-t border-zinc-50/25 from-zinc-400/5 to-zinc-400/0 pt-9 hover:border-zinc-50/80 hover:bg-linear-to-b"
      aria-label={`Visit ${text}`}
    >
      <div className="flex items-center gap-4">
        <div
          className="bg-brand-700 group-hover/card:bg-brand-600 group-focus-within/card:bg-brand-600 rounded-full p-2 text-zinc-50"
          aria-hidden="true"
        >
          <Icon component={IconComponent} width={20} />
        </div>

        <ExternalLink
          href={link}
          className="absolute inset-0 text-zinc-50 focus:outline-none"
        >
          <h3 className="absolute top-10 left-14 font-sans text-lg font-medium">
            {text}
          </h3>
        </ExternalLink>
      </div>
    </article>
  )
}
