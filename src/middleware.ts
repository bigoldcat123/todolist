export  { auth as middleware } from "@/auth"

// import { auth } from "@/auth"
// import { NextApiRequest, NextApiResponse } from "next"
// import { NextRequest, NextResponse } from "next/server"

// export function middleware(res:NextApiRequest,req:NextApiResponse) {
//    return auth(res,req)
// }
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }