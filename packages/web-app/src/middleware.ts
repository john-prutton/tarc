import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { Session } from "@repo/domain/entities"

function checkAuthToken() {
  const sessionId = cookies().get(Session.COOKIE_NAME)?.value
  return !!sessionId
}

export async function middleware(req: NextRequest) {
  const hasAuthToken = checkAuthToken()
  if (!hasAuthToken) return NextResponse.redirect(new URL("/", req.url))
}

export const config = {
  matcher: ["/projects/:path*"]
}
