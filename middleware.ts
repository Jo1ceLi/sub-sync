import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //case logged in and token in url

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");

  const url = request.nextUrl;
  const token = url.searchParams.get("token");
  if (token) {
    url.searchParams.delete("token");
    const response = NextResponse.redirect(url);
    response.cookies.set("token", token);
    return response;
  }
  // case token not in url, nor in cookie
  const tokenInCookie = request.cookies.get("token");
  const urlStartWithMerchant = request.nextUrl.pathname.startsWith("/merchant");
  if (!tokenInCookie && urlStartWithMerchant === true) {
    console.log("notoken back to home");
    return NextResponse.redirect(new URL("/merchant/login", request.url));
  }
  // case token in cookie
  console.log("yes, token in the cookie ");
  return response;
}

// // exclude the home page
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - home (exact match for "home")
     */
    "/((?!api|_next/static|_next/image|favicon.ico|merchant/login$).*)",
  ],
};
