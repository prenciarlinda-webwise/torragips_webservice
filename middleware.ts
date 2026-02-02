import createMiddleware from 'next-intl/middleware';
import { routing } from './src/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(sq|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
