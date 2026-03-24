import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./lib/auth"

const publicPaths = ["/login", "/forgot-password", "/register"]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. ALWAYS allow API routes to pass through the middleware
  // Otherwise, the middleware redirects the API call to the Login HTML page
  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // 2. Allow static public pages
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  const verifiedToken = await verifyAuth(request)

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

