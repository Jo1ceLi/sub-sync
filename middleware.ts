import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //case logged in and token in url
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.href);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  // client token
  response.headers.set("Access-Control-Allow-Origin", "*");
  const url = request.nextUrl;
  const ctokenInSearchParam = url.searchParams.get("ctoken");
  if (ctokenInSearchParam) {
    url.searchParams.delete("ctoken");
    const response = NextResponse.redirect(url);
    response.cookies.set("ctoken", ctokenInSearchParam);
    return response;
  }
  // user token
  const utokenInSearchParam = url.searchParams.get("utoken");
  if (utokenInSearchParam) {
    url.searchParams.delete("utoken");
    const response = NextResponse.redirect(url);
    response.cookies.set("utoken", utokenInSearchParam);
    return response;
  }

  // case token not in url, nor in cookie
  const utokenInCookie = request.cookies.get("utoken");
  const ctokenInCookie = request.cookies.get("ctoken");
  const urlStartWithMerchant = request.nextUrl.pathname.startsWith("/merchant");
  const urlStartWithClient = request.nextUrl.pathname.startsWith("/client");
  if (!utokenInCookie && urlStartWithMerchant === true) {
    console.log("notoken back to home");
    return NextResponse.redirect(new URL("/merchant/login", request.url));
  } else if (!ctokenInCookie && urlStartWithClient) {
    console.log("client notoken back to login ");
    const href = request.nextUrl.href;
    console.log(request.nextUrl);
    // console.log("path=", p);
    return NextResponse.redirect(
      new URL(`/client/login?redirect_url=${href}`, request.url)
    );
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
    "/((?!api|_next/static|_next/image|favicon.ico|client/login$|merchant/login$).*)",
  ],
};
