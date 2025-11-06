import { type NextRequest, NextResponse } from 'next/server'

import {
  VERSION_FETCH_TIMEOUT,
  VERSION_PATTERN,
} from '@/services/providers/constants'

/**
 * API Route Handler to fetch provider version from HTTP endpoints
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const serviceUrl = searchParams.get('url')

  // Validate service URL parameter
  if (!serviceUrl) {
    return NextResponse.json(
      { error: 'Missing required parameter: url' },
      { status: 400 },
    )
  }

  // Validate URL format
  let parsedUrl: URL
  try {
    parsedUrl = new URL(serviceUrl)
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
  }

  // Only allow HTTP protocol (HTTPS should be called directly from client)
  if (parsedUrl.protocol !== 'http:') {
    return NextResponse.json(
      { error: 'Only HTTP URLs are allowed. Use direct fetch for HTTPS.' },
      { status: 400 },
    )
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      VERSION_FETCH_TIMEOUT,
    )

    const baseUrl = serviceUrl.replace(/\/$/, '')
    const response = await fetch(`${baseUrl}/version`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'FilOzone-Provider-Fetcher/1.0',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Provider returned status: ${response.status}` },
        { status: response.status },
      )
    }

    const responseText = await response.text()
    let version: string

    // Try to parse as JSON first
    try {
      const versionData = JSON.parse(responseText)
      version =
        versionData.version ||
        versionData.Version ||
        versionData.v ||
        responseText.trim()
    } catch {
      // Fallback to plain text
      version = responseText.trim()
    }

    // Validate version format
    if (!VERSION_PATTERN.test(version)) {
      return NextResponse.json(
        { error: 'Invalid version format', version },
        { status: 422 },
      )
    }

    return NextResponse.json({ version }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timeout' }, { status: 408 })
      }

      return NextResponse.json(
        { error: 'Failed to fetch version', message: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 },
    )
  }
}
