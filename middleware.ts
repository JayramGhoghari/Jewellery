import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Protect ALL /Admin routes - STRICT check for exact match and sub-routes
  // This MUST catch /Admin exactly and /Admin/anything
  const isAdminRoute = pathname === '/Admin' || pathname.startsWith('/Admin/');
  
  if (isAdminRoute) {
    // Detect if this Admin request is coming back from a successful login flow
    // We mark that flow with a query param: /Admin?fromLogin=1
    const cameFromLogin = searchParams.get('fromLogin') === '1';

    // Check for admin authentication cookie - this is the ONLY source of truth
    const adminAuthCookie = request.cookies.get('adminAuthenticated');
    
    // STRICT check: cookie must exist AND have value exactly 'true'
    const isAuthenticated = adminAuthCookie !== undefined && adminAuthCookie !== null && adminAuthCookie.value === 'true';
    
    // We want this behavior:
    // - Any time user types /Admin or clicks Admin (goes to /Admin without marker),
    //   force them through the login page.
    // - After successful login, we send them back to /Admin?fromLogin=1.
    //   That combination (cookie + fromLogin=1) is allowed through.
    if (!isAuthenticated || !cameFromLogin) {
      // Build the post-login target: /Admin?fromLogin=1
      const adminTarget = new URL('/Admin', request.url);
      adminTarget.searchParams.set('fromLogin', '1');

      // Redirect to login and tell it where to send the user after login
      const loginUrl = new URL('/login', request.url);
      // redirect param should be *path + query*, e.g. "/Admin?fromLogin=1"
      loginUrl.searchParams.set('redirect', `${adminTarget.pathname}${adminTarget.search}`);

      return NextResponse.redirect(loginUrl);
    }
    
    // Authenticated - allow access
    return NextResponse.next();
  }

  // Not an admin route - allow access
  return NextResponse.next();
}

// Configure which routes should be protected
// Match /Admin exactly and all /Admin/* routes
export const config = {
  matcher: [
    '/Admin',
    '/Admin/:path*',
  ],
};
