import { NavigationMenuLink as SharedNavigationMenuLink } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMenuLink'
import type { LocalNavigationMenuLinkProps } from '@filecoin-foundation/ui-filecoin/Navigation/types'

import { BASE_DOMAIN } from '@/constants/site-metadata'

const variants = {
  internal: 'inline-block max-w-56 p-4 focus:brand-outline rounded-xl',
}

export function NavigationMenuLink(
  props: LocalNavigationMenuLinkProps<typeof variants>,
) {
  return (
    <SharedNavigationMenuLink
      baseDomain={BASE_DOMAIN}
      variants={{ options: variants, selected: props.variant }}
      {...props}
    />
  )
}
