import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/hidden')) {
    const password = request.nextUrl.searchParams.get('password')
    const authCookie = request.cookies.get('hidden_pages_auth')?.value

    if (password === process.env.HIDDEN_PAGES_PASSWORD) {
      const TWENTY_FOUR_HOURS_IN_SECONDS = 60 * 60 * 24
      const response = NextResponse.next()

      response.cookies.set('hidden_pages_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: TWENTY_FOUR_HOURS_IN_SECONDS,
      })

      return response
    }

    if (authCookie !== 'true') {
      return NextResponse.rewrite(new URL('/404', request.url), { status: 404 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/hidden/:path*'],
}
