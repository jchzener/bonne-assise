import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.[^/]+$/;
const SUPPORTED = new Set(['en', 'fr']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) return NextResponse.next();
  const segment = pathname.split('/')[1];
  if (SUPPORTED.has(segment)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
