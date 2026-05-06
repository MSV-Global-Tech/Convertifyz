import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  
  // If the request is coming from any .in domain variation
  if (host && (host.includes('msvglobaltech.in'))) {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.hostname = 'convertifyz.msvglobaltech.com';
    url.port = ''; // Ensure no port is included
    
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

// Only run middleware on relevant paths
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
};
