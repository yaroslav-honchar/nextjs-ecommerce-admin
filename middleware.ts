import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/api/:path*"])

export default clerkMiddleware((auth, request) => {
  const res = NextResponse.next()

  res.headers.append("Access-Control-Allow-Credentials", "true")
  res.headers.append("Access-Control-Allow-Origin", "*")
  res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT")
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )

  if (!isPublicRoute(request)) {
    auth().protect()
  }

  return res
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/api/:path*",
    // "/(api)(.*)",
  ],
}
