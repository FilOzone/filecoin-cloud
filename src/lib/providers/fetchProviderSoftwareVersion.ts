type FetchProviderSoftwareVersionParams = {
  serviceUrl: string
}

// Step 6: Fetch software version from provider's service URL
export async function fetchProviderSoftwareVersion({
  serviceUrl,
}: FetchProviderSoftwareVersionParams) {
  if (!serviceUrl) {
    return 'unknown'
  }

  try {
    const baseUrl = serviceUrl.replace(/\/$/, '')

    // Set 5 second timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    console.log(`Fetching version from ${baseUrl}/version`)

    const response = await fetch(`${baseUrl}/version`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      mode: 'cors',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const responseText = await response.text()

      try {
        const versionData = JSON.parse(responseText)
        const version =
          versionData.version ||
          versionData.Version ||
          versionData.v ||
          responseText.trim()

        // Validate format: X.Y.Z+network+git_hash_timestamp
        const versionPattern =
          /^\d+\.\d+\.\d+\+\w+\+git_[a-f0-9]+_\d{4}-\d{2}-\d{2}T[\d:+-]+$/

        if (versionPattern.test(version)) {
          console.log(`Version: ${version}`)
          return version
        }
      } catch {
        // Not valid JSON or doesn't match pattern
      }
    }
  } catch (error) {
    // Timeout, CORS, or network error - expected for some providers
    console.log(`⚠️ Could not fetch version: ${error}`)
  }

  return 'unknown'
}
