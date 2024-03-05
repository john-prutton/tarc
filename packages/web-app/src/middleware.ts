import { NextRequest, NextResponse } from "next/server"

import { tryGetAuthedUser } from "./components/auth/actions"

export async function middleware(req: NextRequest) {
  const user = await tryGetAuthedUser()
  if (!user) return NextResponse.redirect(new URL("/", req.url))
}

export const config = {
  matcher: ["/projects/:path*"]
}
