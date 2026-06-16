import { PING_FETCH_TIMEOUT } from './constants'

/**
 * Result of a /pdp/ping probe.
 * `latencyMs` is the round-trip time in milliseconds, present only when the
 * node responded (regardless of status code).
 */
export type PingResult = {
  reachable: boolean
  latencyMs?: number
}

/**
 * Ping a provider's /pdp/ping endpoint to determine reachability and latency.
 * Reachability is determined purely by HTTP status (2xx), the body is ignored.
 * Safe to call from the browser: Curio serves /pdp/ping over HTTPS with
 * permissive CORS headers.
 */
async function pingProvider(serviceUrl: string): Promise<PingResult> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), PING_FETCH_TIMEOUT)

  const start = performance.now()

  try {
    const baseUrl = serviceUrl.replace(/\/$/, '')

    const response = await fetch(`${baseUrl}/pdp/ping`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const latencyMs = Math.round(performance.now() - start)

    return { reachable: response.ok, latencyMs }
  } catch {
    clearTimeout(timeoutId)
    return { reachable: false }
  }
}

/**
 * Probe a provider's /pdp/ping endpoint.
 * @param serviceUrl - Provider service URL
 * @returns Reachability (2xx status) and round-trip latency when reachable
 */
export async function fetchPingResult(
  serviceUrl?: string,
): Promise<PingResult> {
  if (!serviceUrl) {
    return { reachable: false }
  }

  return pingProvider(serviceUrl)
}
