import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Albanian-speaking regions default to the SQ site; everyone else gets EN.
// Cloudflare sets the visitor country in the `CF-IPCountry` header.
const SQ_COUNTRIES = new Set(['AL', 'XK', 'MK']); // Albania, Kosovo, North Macedonia

// Retired URLs (no trailing slash) → canonical target. Unprefixed forms are covered too.
const RETIRED: Record<string, string> = Object.fromEntries(
  Object.entries({
    // Gypsum hubs: the homepages own "punime gipsi" / "gypsum works"
    '/sq/punime-gipsi': '/sq/',
    '/en/gypsum-works': '/en/',
    // Plastering and painting city pages: consolidated into the service hubs
    '/sq/patinim-tirane': '/sq/patinim/',
    '/sq/patinim-durres': '/sq/patinim/',
    '/en/wall-plastering-tirana': '/en/wall-plastering/',
    '/en/wall-plastering-durres': '/en/wall-plastering/',
    '/sq/lyerje-tirane': '/sq/lyerje/',
    '/sq/lyerje-durres': '/sq/lyerje/',
    '/en/painting-tirana': '/en/painting/',
    '/en/painting-durres': '/en/painting/',
  }).flatMap(([from, to]) => [
    [from, to],
    [from.replace(/^\/(sq|en)/, ''), to],
  ])
);

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

  // ── Retired pages → their owning page (single 301, mirrored in both locales) ──
  // Runs before the trailing-slash rule. Keep sq/en pairs together for 1:1 hreflang.
  const target = RETIRED[pathname.replace(/\/$/, '')];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
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
