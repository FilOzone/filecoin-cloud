import { PING_FETCH_TIMEOUT } from './constants'

/**
 * Ping a provider's /pdp/ping endpoint to determine reachability.
 * Success is determined purely by HTTP status (2xx), the body is ignored.
 * Safe to call from the browser: Curio serves /pdp/ping over HTTPS with
 * permissive CORS headers.
 */
async function pingProvider(serviceUrl: string): Promise<boolean> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), PING_FETCH_TIMEOUT)

  try {
    const baseUrl = serviceUrl.replace(/\/$/, '')

    const response = await fetch(`${baseUrl}/pdp/ping`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    return response.ok
  } catch {
    clearTimeout(timeoutId)
    return false
  }
}

/**
 * Determine whether a provider is reachable via its /pdp/ping endpoint.
 * @param serviceUrl - Provider service URL
 * @returns true if the node responds with a 2xx status, false otherwise
 */
export async function fetchReachable(serviceUrl?: string): Promise<boolean> {
  if (!serviceUrl) {
    return false
  }

  return pingProvider(serviceUrl)
}
