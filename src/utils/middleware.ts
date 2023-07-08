// middleware not function. So putting it in utils for the moment

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth"
    }
  },
)


export const config = { 
  matcher: [
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
  ]
};
