import { Icon, type IconProps } from '@filecoin-foundation/ui-filecoin/Icon'
import { isExternalLink } from '@filecoin-foundation/utils/linkUtils'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'

import { BaseLink } from '@/components/BaseLink'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

type IconLinkProps = {
  icon: IconProps['component']
  href: string
  label: string
}

export function IconLink({ icon: IconComponent, href, label }: IconLinkProps) {
  const isExternal = isExternalLink(href, BASE_DOMAIN)

  return (
    <BaseLink
      href={href}
      className="inline-flex gap-2 items-center text-zinc-400 w-fit text-pretty focus:brand-outline"
    >
      <Icon component={IconComponent} size={20} color="inherit" />
      <span className="text-zinc-600 font-semibold">{label}</span>

      {isExternal && (
        <span className="ml-1 inline-flex self-center">
          <Icon component={ArrowUpRightIcon} size={16} color="inherit" />
        </span>
      )}
    </BaseLink>
  )
}
