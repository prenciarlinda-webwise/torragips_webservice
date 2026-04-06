import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

// Stable date for pages (updated manually when content changes)
const LAST_UPDATED = '2026-04-06';

interface PageEntry {
  sq: string;
  en: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// All pages grouped by priority tier
const pages: PageEntry[] = [
  // Homepage — highest priority
  { sq: '', en: '', priority: 1.0, changeFrequency: 'weekly' },

  // Main service pages
  { sq: '/punime-gipsi', en: '/gypsum-works', priority: 0.9, changeFrequency: 'weekly' },
  { sq: '/patinim', en: '/wall-plastering', priority: 0.9, changeFrequency: 'weekly' },
  { sq: '/lyerje', en: '/painting', priority: 0.9, changeFrequency: 'weekly' },

  // Location pages
  { sq: '/punime-gipsi-tirane', en: '/gypsum-works-tirana', priority: 0.8, changeFrequency: 'monthly' },
  { sq: '/punime-gipsi-durres', en: '/gypsum-works-durres', priority: 0.8, changeFrequency: 'monthly' },
  { sq: '/patinim-tirane', en: '/wall-plastering-tirana', priority: 0.8, changeFrequency: 'monthly' },
  { sq: '/patinim-durres', en: '/wall-plastering-durres', priority: 0.8, changeFrequency: 'monthly' },
  { sq: '/lyerje-tirane', en: '/painting-tirana', priority: 0.8, changeFrequency: 'monthly' },
  { sq: '/lyerje-durres', en: '/painting-durres', priority: 0.8, changeFrequency: 'monthly' },

  // Support pages
  { sq: '/sherbime', en: '/services', priority: 0.7, changeFrequency: 'monthly' },
  { sq: '/galeri', en: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
  { sq: '/cmime', en: '/pricing', priority: 0.7, changeFrequency: 'monthly' },
  { sq: '/rreth-nesh', en: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { sq: '/kontakt', en: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { sq: '/blog', en: '/blog', priority: 0.6, changeFrequency: 'weekly' },

  // Legal pages
  { sq: '/politika-privatesia', en: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { sq: '/kushtet-dhe-termat', en: '/terms-conditions', priority: 0.3, changeFrequency: 'yearly' },
];

// Blog post hreflang mapping (sq slug -> en slug)
const blogAlternates: Record<string, string> = {
  'si-te-zgjidhni-tavane-gipsi': 'how-to-choose-gypsum-ceiling',
  'perfitimet-patinimit-profesional': 'benefits-professional-plastering',
  'si-te-pergatisni-muret-per-lyerje': 'how-to-prepare-walls-for-painting',
  'llojet-e-tavaneve-gipsi-modern': 'types-of-modern-gypsum-ceilings',
  'udhezues-rinovimi-apartamenti': 'apartment-renovation-guide',
  'zgjedhja-e-ngjyrave-per-shtepine': 'choosing-paint-colors-for-your-home',
  'punime-gipsi-per-sallone': 'gypsum-works-for-living-rooms',
  'punime-gipsi-per-televizor': 'gypsum-tv-wall-designs',
  'punime-gipsi-per-dhoma-gjumi': 'gypsum-works-for-bedrooms',
  'koordinimi-gipsit-me-instalimet-elektrike': 'coordinating-gypsum-with-electrical-installations',
  'ndertesa-te-reja-tirane-trende-arkitekturore': 'new-buildings-tirana-architectural-trends',
  'si-te-planifikoni-buxhetin-rinovim': 'renovation-budget-planning-guide',
  'pse-gipsi-material-kyc-ndertime-moderne': 'why-gypsum-key-material-modern-construction',
  'rinovimi-apartamentit-cfare-duhet-te-dini': 'apartment-renovation-what-to-know',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const entries: MetadataRoute.Sitemap = [];

  // Static pages (both locales with hreflang alternates)
  for (const page of pages) {
    // Albanian version
    entries.push({
      url: `${baseUrl}/sq${page.sq}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${page.sq}/`,
          en: `${baseUrl}/en${page.en}/`,
          'x-default': `${baseUrl}/sq${page.sq}/`,
        },
      },
    });

    // English version
    entries.push({
      url: `${baseUrl}/en${page.en}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${page.sq}/`,
          en: `${baseUrl}/en${page.en}/`,
          'x-default': `${baseUrl}/sq${page.sq}/`,
        },
      },
    });
  }

  // Blog posts
  const enSlugsToSq = Object.fromEntries(
    Object.entries(blogAlternates).map(([sq, en]) => [en, sq])
  );

  for (const post of getAllPosts('sq')) {
    const enSlug = blogAlternates[post.slug];
    entries.push({
      url: `${baseUrl}/sq/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 0.6,
      ...(enSlug && {
        alternates: {
          languages: {
            sq: `${baseUrl}/sq/blog/${post.slug}/`,
            en: `${baseUrl}/en/blog/${enSlug}/`,
            'x-default': `${baseUrl}/sq/blog/${post.slug}/`,
          },
        },
      }),
    });
  }

  for (const post of getAllPosts('en')) {
    const sqSlug = enSlugsToSq[post.slug];
    entries.push({
      url: `${baseUrl}/en/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 0.6,
      ...(sqSlug && {
        alternates: {
          languages: {
            sq: `${baseUrl}/sq/blog/${sqSlug}/`,
            en: `${baseUrl}/en/blog/${post.slug}/`,
            'x-default': `${baseUrl}/sq/blog/${sqSlug}/`,
          },
        },
      }),
    });
  }

  return entries;
}
