import { CHAIN_PARAM_KEY } from '@filecoin-foundation/ui-filecoin/Network/config'
import { redirect } from 'next/navigation'
import { filecoin } from 'wagmi/chains'

export type PageSearchParams = Record<string, string | string[] | undefined>

export function redirectWithDefaultChain(
  resolvedSearchParams: PageSearchParams,
  path: string,
) {
  const chainParam = resolvedSearchParams[CHAIN_PARAM_KEY]
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

  nextSearchParams.set(CHAIN_PARAM_KEY, String(filecoin.id))
  redirect(`${path}?${nextSearchParams.toString()}`)
}
