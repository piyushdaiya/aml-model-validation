import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./lib/auth"

// Add paths that don't require authentication
const publicPaths = ["/login", "/forgot-password"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

