export type CountBadgeProps = {
  count: number
}

export function CountBadge({ count }: CountBadgeProps) {
  return (
    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm rounded-full bg-brand-700 text-brand-50 min-w-5 h-5 grid place-content-center">
      {count}
    </span>
  )
}
