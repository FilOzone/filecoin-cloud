export type FilterHeadingProps = {
  children: string
}

export function FilterHeading({ children }: FilterHeadingProps) {
  return <h3 className="text-sm font-medium text-zinc-600 pb-3">{children}</h3>
}
