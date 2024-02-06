import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const token = await getToken({ req: request, secret: secret });
  const isPublicPath = path.startsWith("/auth")
  const isAdminPath = path === '/admin' || path.startsWith("/admin")
  const isProPath = path === '/pro' || path.startsWith("/pro")
  const isApprovalPath = path === '/approval' || path.startsWith("/approval")

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl))
  }

  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl))
  }

  if (isProPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl))
  }

  if (isApprovalPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl))
  }

}

export const config = {
  matcher: [
    '/',
    '/auth',
    '/admin',
    '/admin/:path*',
    '/pro',
    '/pro/:path*',
    '/approval',
    '/approval/:path*',
  ]
}