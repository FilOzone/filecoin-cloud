import { Badge, type BadgeProps } from '@filecoin-foundation/ui-filecoin/Badge'
import { CTALink } from '@filecoin-foundation/ui-filecoin/CTALink'
import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr'

type ShowcaseLink = {
  href: string
  label: string
}

export type ShowcaseCardData = {
  title: string
  description: string
  badge: {
    text: string
    variant: BadgeProps['variant']
  }
  primary?: ShowcaseLink
  source?: ShowcaseLink
}

export function ShowcaseCard({
  title,
  description,
  badge,
  primary,
  source,
}: ShowcaseCardData) {
  return (
    <li className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-(--color-border-base) bg-(--color-card-background) p-8 transition duration-200 ease-out hover:-translate-y-1 hover:border-brand-600 hover:bg-(--color-card-background-hover) hover:shadow-lg hover:shadow-zinc-950/5 focus-within:brand-outline">
      <div className="mb-6 flex">
        <Badge variant={badge.variant} textTransform="none">
          {badge.text}
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        <span className="group-focus-within:text-(--color-card-heading-hover) group-hover:text-(--color-card-heading-hover)">
          <Heading tag="h3" variant="card-heading">
            {title}
          </Heading>
        </span>
        <p className="text-(--color-paragraph-text)">{description}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
        {primary && <CTALink href={primary.href}>{primary.label}</CTALink>}
        {source && (
          <CTALink href={source.href} icon={GithubLogoIcon}>
            {source.label}
          </CTALink>
        )}
      </div>
    </li>
  )
}
