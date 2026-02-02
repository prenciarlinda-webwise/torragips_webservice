import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Static pages for both locales
  const staticPages = [
    '',
    '/sherbime',
    '/punime-gipsi',
    '/patinim',
    '/lyerje',
    '/galeri',
    '/cmime',
    '/rreth-nesh',
    '/kontakt',
    '/blog',
    '/politika-privatesia',
    '/kushtet-dhe-termat',
  ];

  const staticPagesEn = [
    '',
    '/services',
    '/gypsum-works',
    '/wall-plastering',
    '/painting',
    '/gallery',
    '/pricing',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-conditions',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Albanian pages
  staticPages.forEach((page) => {
    sitemap.push({
      url: `${baseUrl}/sq${page}/`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : page.includes('sherbime') ? 0.9 : 0.8,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${page}/`,
          en: `${baseUrl}/en${staticPagesEn[staticPages.indexOf(page)]}/`,
        },
      },
    });
  });

  // English pages
  staticPagesEn.forEach((page, index) => {
    sitemap.push({
      url: `${baseUrl}/en${page}/`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : page.includes('services') ? 0.9 : 0.8,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${staticPages[index]}/`,
          en: `${baseUrl}/en${page}/`,
        },
      },
    });
  });

  // Blog posts - Albanian
  const sqPosts = getAllPosts('sq');
  sqPosts.forEach((post) => {
    sitemap.push({
      url: `${baseUrl}/sq/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Blog posts - English
  const enPosts = getAllPosts('en');
  enPosts.forEach((post) => {
    sitemap.push({
      url: `${baseUrl}/en/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemap;
}
