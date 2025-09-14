import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Define paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/meal-plans',
  '/profile'
];

// Define paths that should redirect to dashboard if already logged in
const authPaths = [
  '/login'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Check if user is authenticated
  const isAuthenticated = token ? verifyToken(token) !== null : false;

  // Handle protected routes
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  if (isProtectedPath && !isAuthenticated) {
    // Redirect to login if accessing protected route without authentication
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth routes (login, register, etc.)
  const isAuthPath = authPaths.some(path => 
    pathname.startsWith(path)
  );

  if (isAuthPath && isAuthenticated) {
    // Redirect to dashboard if already logged in and trying to access auth pages
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Handle root path
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths this middleware runs on
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
