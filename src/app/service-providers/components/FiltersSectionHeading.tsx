export type FiltersSectionHeadingProps = {
  children: string
}

export function FiltersSectionHeading({
  children,
}: FiltersSectionHeadingProps) {
  return <h3 className="text-sm font-medium text-zinc-600 pb-4">{children}</h3>
}
