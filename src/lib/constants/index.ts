export const COMPANY = {
  name: 'Torra Gips',
  phone: '+355 68 858 0058',
  email: 'torragips@gmail.com',
  whatsapp: '+355688580058',
  locations: ['Tiranë', 'Durrës'],
  domain: 'torragips.al',
  founded: 2020,
} as const;

export const SERVICES = {
  gypsum: {
    id: 'gypsum',
    slug: {
      sq: 'punime-gipsi',
      en: 'gypsum-works',
    },
    icon: 'grid',
    priceRange: {
      min: 1500,
      max: 3500,
      currency: 'ALL',
    },
  },
  plastering: {
    id: 'plastering',
    slug: {
      sq: 'patinim',
      en: 'wall-plastering',
    },
    icon: 'layers',
    priceRange: {
      min: 800,
      max: 2000,
      currency: 'ALL',
    },
  },
  painting: {
    id: 'painting',
    slug: {
      sq: 'lyerje',
      en: 'painting',
    },
    icon: 'paintbrush',
    priceRange: {
      min: 500,
      max: 1500,
      currency: 'ALL',
    },
  },
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/torragips/',
  tiktok: 'https://www.tiktok.com/@torragips',
  whatsapp: `https://wa.me/${COMPANY.whatsapp}`,
  google: 'https://maps.app.goo.gl/SwkbFHVFgjxNJZX28',
} as const;

export const SITE_CONFIG = {
  url: `https://${COMPANY.domain}`,
  locales: ['sq', 'en'] as const,
  defaultLocale: 'sq' as const,
} as const;
