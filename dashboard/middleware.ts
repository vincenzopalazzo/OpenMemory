import { NextRequest, NextResponse } from "next/server";

// Basic-auth gate for the whole dashboard. Enabled only when both
// DASHBOARD_AUTH_USER and DASHBOARD_AUTH_PASSWORD are set.
export function middleware(req: NextRequest) {
  const user = process.env.DASHBOARD_AUTH_USER;
  const pass = process.env.DASHBOARD_AUTH_PASSWORD;
  if (!user || !pass) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header) {
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const idx = decoded.indexOf(":");
      if (idx > 0 && decoded.slice(0, idx) === user && decoded.slice(idx + 1) === pass) {
        return NextResponse.next();
      }
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic realm=\"OpenMemory Dashboard\"" },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
