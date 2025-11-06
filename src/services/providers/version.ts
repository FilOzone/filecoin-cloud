import {
  PROXY_TIMEOUT_BUFFER,
  VERSION_FETCH_TIMEOUT,
  VERSION_PATTERN,
} from './constants'

/**
 * Determine if a URL uses HTTPS protocol
 */
function isHttpsUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Parse version from response text
 * Handles both JSON and plain text responses
 */
function parseVersionFromResponse(responseText: string): string {
  try {
    const versionData = JSON.parse(responseText)
    return (
      versionData.version ||
      versionData.Version ||
      versionData.v ||
      responseText.trim()
    )
  } catch {
    return responseText.trim()
  }
}

/**
 * Validate version string format
 */
function isValidVersion(version: string): boolean {
  return VERSION_PATTERN.test(version)
}

/**
 * Fetch version directly from HTTPS endpoint
 * Safe to call from browser due to secure protocol
 */
async function fetchVersionDirectly(
  serviceUrl: string,
): Promise<string | undefined> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), VERSION_FETCH_TIMEOUT)

  try {
    const baseUrl = serviceUrl.replace(/\/$/, '')

    const response = await fetch(`${baseUrl}/version`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      mode: 'cors',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return undefined
    }

    const responseText = await response.text()
    const version = parseVersionFromResponse(responseText)

    return isValidVersion(version) ? version : undefined
  } catch {
    clearTimeout(timeoutId)
    return undefined
  }
}

/**
 * Fetch version via API route for HTTP endpoints
 * Bypasses CSP restrictions by proxying through server
 */
async function fetchVersionViaProxy(
  serviceUrl: string,
): Promise<string | undefined> {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    VERSION_FETCH_TIMEOUT + PROXY_TIMEOUT_BUFFER,
  )

  try {
    const encodedUrl = encodeURIComponent(serviceUrl)
    const response = await fetch(`/api/provider-version?url=${encodedUrl}`, {
      method: 'GET',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return undefined
    }

    const data = await response.json()
    return data.version || undefined
  } catch {
    clearTimeout(timeoutId)
    return undefined
  }
}

/**
 * Fetch software version from provider's /version endpoint
 *
 * Strategy:
 * - HTTPS URLs: Fetch directly from browser (secure, no CSP issues)
 * - HTTP URLs: Proxy through API route (avoids CSP mixed-content blocking)
 *
 * @param serviceUrl - Provider service URL
 * @returns Version string if available, undefined otherwise
 */
export async function fetchSoftwareVersion(
  serviceUrl?: string,
): Promise<string | undefined> {
  if (!serviceUrl) {
    return undefined
  }

  // Route based on protocol
  if (isHttpsUrl(serviceUrl)) {
    return fetchVersionDirectly(serviceUrl)
  }

  return fetchVersionViaProxy(serviceUrl)
}
