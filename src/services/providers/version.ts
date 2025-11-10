import { VERSION_FETCH_TIMEOUT, VERSION_PATTERN } from './constants'

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
 * Fetch software version from provider's /version endpoint
 * @param serviceUrl - Provider service URL
 * @returns Version string if available, undefined otherwise
 */
export async function fetchSoftwareVersion(
  serviceUrl?: string,
): Promise<string | undefined> {
  if (!serviceUrl) {
    return undefined
  }

  return fetchVersionDirectly(serviceUrl)
}
