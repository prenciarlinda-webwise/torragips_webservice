import { defineRouting } from 'next-intl/routing';

export const locales = ['sq', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'sq',
  localePrefix: 'always',
});

export const pathnames = {
  '/': '/',
  '/sherbime': {
    sq: '/sherbime',
    en: '/services',
  },
  '/punime-gipsi': {
    sq: '/punime-gipsi',
    en: '/gypsum-works',
  },
  '/patinim': {
    sq: '/patinim',
    en: '/wall-plastering',
  },
  '/lyerje': {
    sq: '/lyerje',
    en: '/painting',
  },
  '/galeri': {
    sq: '/galeri',
    en: '/gallery',
  },
  '/cmime': {
    sq: '/cmime',
    en: '/pricing',
  },
  '/rreth-nesh': {
    sq: '/rreth-nesh',
    en: '/about',
  },
  '/kontakt': {
    sq: '/kontakt',
    en: '/contact',
  },
  '/blog': '/blog',
  '/politika-privatesia': {
    sq: '/politika-privatesia',
    en: '/privacy-policy',
  },
  '/kushtet-dhe-termat': {
    sq: '/kushtet-dhe-termat',
    en: '/terms-conditions',
  },
} as const;
