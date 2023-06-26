import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    const { origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/signIn`, origin);

    return NextResponse.redirect(signInUrl);
  }

  if (req.nextUrl.pathname.startsWith("/admin") && token.isAdmin !== true) {
    const { origin, basePath } = req.nextUrl;
    const homeUrl = new URL(`${basePath}`, origin);

    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};
