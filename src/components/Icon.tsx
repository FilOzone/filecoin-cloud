import type { ComponentType, SVGProps } from 'react'

import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react'

export type IconProps = {
  component: PhosphorIcon | ComponentType<SVGProps<SVGSVGElement>>
  color?: `color-${string}` | 'inherit'
  size?: number
  weight?: IconWeight
}

export function Icon({
  component: Component,
  color = 'inherit',
  size = 24,
  weight = 'regular',
}: IconProps) {
  return (
    <span aria-hidden="true" className={color}>
      <Component weight={weight} width={size} height={size} />
    </span>
  )
}
