import type { Route } from 'next'
import { redirect } from 'next/navigation'

export type PageSearchParams = Record<string, string | string[] | undefined>

export function redirectWithDefaultChain(
  resolvedSearchParams: PageSearchParams,
  path: string,
) {
  const chainParam = resolvedSearchParams.chain
  const hasChain =
    typeof chainParam === 'string'
      ? chainParam.length > 0
      : Array.isArray(chainParam) &&
        chainParam.some((entry) => entry.length > 0)

  if (hasChain) return

  const nextSearchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (typeof value === 'string') {
      nextSearchParams.set(key, value)
    } else if (Array.isArray(value)) {
      for (const entry of value) {
        nextSearchParams.append(key, entry)
      }
    }
  }

  nextSearchParams.set('chain', '314')
  redirect(`${path}?${nextSearchParams.toString()}` as Route)
}
