import type { IconWeight, Icon as PhosphorIcon } from '@phosphor-icons/react'
import type { ComponentType, SVGProps } from 'react'

export type IconProps = {
  component: PhosphorIcon | ComponentType<SVGProps<SVGSVGElement>>
  color?: `text-${string}` | 'inherit'
  width?: number
  weight?: IconWeight
}

// TODO: Delete this component
export function Icon({
  component: Component,
  color = 'inherit',
  width = 24,
  weight = 'regular',
}: IconProps) {
  return (
    <span aria-hidden="true" className={color}>
      <Component weight={weight} width={width} height="auto" />
    </span>
  )
}
