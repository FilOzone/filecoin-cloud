import type { ComponentType, SVGProps } from 'react'

import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react'

export type IconProps = {
  component: PhosphorIcon | ComponentType<SVGProps<SVGSVGElement>>
  color?: `text-${string}` | 'inherit'
  width?: number
  height?: number
  weight?: IconWeight
}

export function Icon({
  component: Component,
  color = 'inherit',
  width = 24,
  height,
  weight = 'regular',
}: IconProps) {
  return (
    <span aria-hidden="true" className={color}>
      <Component weight={weight} width={width} height={height} />
    </span>
  )
}
