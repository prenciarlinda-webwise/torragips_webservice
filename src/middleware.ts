import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Albanian-speaking regions default to the SQ site; everyone else gets EN.
// Cloudflare sets the visitor country in the `CF-IPCountry` header.
const SQ_COUNTRIES = new Set(['AL', 'XK', 'MK']); // Albania, Kosovo, North Macedonia

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Dashboard: server-side auth gate ──
  // The real data lock is the API's token check; this stops the admin UI from
  // rendering to anyone without a session and keeps the pages out of search.
  // `tg_auth` is a non-secret presence marker set on login (see lib/api.ts).
  if (pathname.startsWith('/dashboard')) {
    const isLogin = pathname.startsWith('/dashboard/login');
    const isAuthed = Boolean(request.cookies.get('tg_auth')?.value);

    if (!isLogin && !isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard/login/';
      return NextResponse.redirect(url);
    }
    if (isLogin && isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Root: send the bare domain to the right language homepage ──
  // Priority: a saved language choice (NEXT_LOCALE cookie) > visitor country > primary market.
  // Temporary (307) on purpose — the target varies by visitor, so it must never be
  // cached as a permanent redirect.
  if (pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const country = (request.headers.get('cf-ipcountry') || '').toUpperCase();

    let locale: string;
    if (cookieLocale === 'sq' || cookieLocale === 'en') {
      locale = cookieLocale;
    } else if (SQ_COUNTRIES.has(country)) {
      locale = 'sq';
    } else if (country && country !== 'XX' && country !== 'T1') {
      locale = 'en'; // a known foreign country (UK, US, Italy, …)
    } else {
      locale = routing.defaultLocale; // no/unknown geo → primary market (sq)
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/`;
    return NextResponse.redirect(url, 307);
  }

  // ── Public site: enforce trailing slash with 301 (skip files and API routes) ──
  if (
    !pathname.endsWith('/') &&
    !pathname.includes('.') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/_vercel')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(sq|en)/:path*', '/dashboard/:path*', '/((?!api|_next|_vercel|dashboard|.*\\..*).*)'],
};
