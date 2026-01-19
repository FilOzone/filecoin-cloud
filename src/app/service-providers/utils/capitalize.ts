export type CapitalizeProps = {
  string: string
}

export function capitalize({ string }: CapitalizeProps) {
  return string[0]?.toUpperCase() + string.slice(1).toLowerCase()
}
