import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

type LinkIconProps = {
  icon: PhosphorIcon
  href: string
  label: string
}
export function LinkIcon({ icon: IconComponent, href, label }: LinkIconProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-(--color-paragraph-text)"
    >
      <Icon component={IconComponent} size={20} color="inherit" />
      <span className="font-semibold">{label}</span>
    </a>
  )
}
