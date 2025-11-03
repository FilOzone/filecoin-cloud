import { Icon, type IconProps } from '@filecoin-foundation/ui-filecoin/Icon'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

type IconLinkProps = {
  icon: IconProps['component']
  href: string
  label: string
}
export function IconLink({ icon: IconComponent, href, label }: IconLinkProps) {
  return (
    <ExternalTextLink href={href} className="inline-flex gap-2 items-center">
      <Icon component={IconComponent} size={20} color="inherit" />
      <span className="font-semibold">{label}</span>
    </ExternalTextLink>
  )
}
