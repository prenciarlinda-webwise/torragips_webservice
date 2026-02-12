import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

// Money pages: homepage + service pages + location pages — crawl daily, highest priority
const moneyPages = [
  '', '/punime-gipsi', '/patinim', '/lyerje',
  '/punime-gipsi-tirane', '/punime-gipsi-durres',
  '/patinim-tirane', '/patinim-durres',
  '/lyerje-tirane', '/lyerje-durres',
];
const moneyPagesEn = [
  '', '/gypsum-works', '/wall-plastering', '/painting',
  '/gypsum-works-tirana', '/gypsum-works-durres',
  '/wall-plastering-tirana', '/wall-plastering-durres',
  '/painting-tirana', '/painting-durres',
];

// Supporting pages — crawl weekly
const supportPages = ['/sherbime', '/galeri', '/cmime', '/rreth-nesh', '/kontakt', '/blog'];
const supportPagesEn = ['/services', '/gallery', '/pricing', '/about', '/contact', '/blog'];

// Low-priority pages — crawl monthly
const legalPages = ['/politika-privatesia', '/kushtet-dhe-termat'];
const legalPagesEn = ['/privacy-policy', '/terms-conditions'];

// Blog post hreflang mapping (sq slug -> en slug)
const blogAlternates: Record<string, string> = {
  'si-te-zgjidhni-tavane-gipsi': 'how-to-choose-gypsum-ceiling',
  'perfitimet-patinimit-profesional': 'benefits-professional-plastering',
};

function getPageConfig(page: string, moneyList: string[]) {
  if (moneyList.includes(page)) {
    return { changeFrequency: 'daily' as const, priority: 1.0 };
  }
  if (page === '/blog') {
    return { changeFrequency: 'weekly' as const, priority: 0.8 };
  }
  if (page.includes('politika') || page.includes('kushtet') || page.includes('privacy') || page.includes('terms')) {
    return { changeFrequency: 'yearly' as const, priority: 0.3 };
  }
  return { changeFrequency: 'weekly' as const, priority: 0.8 };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const allPagesSq = [...moneyPages, ...supportPages, ...legalPages];
  const allPagesEn = [...moneyPagesEn, ...supportPagesEn, ...legalPagesEn];

  const sitemap: MetadataRoute.Sitemap = [];

  // Albanian pages
  allPagesSq.forEach((page, index) => {
    const config = getPageConfig(page, moneyPages);
    sitemap.push({
      url: `${baseUrl}/sq${page}/`,
      lastModified: new Date(),
      changeFrequency: config.changeFrequency,
      priority: config.priority,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${page}/`,
          en: `${baseUrl}/en${allPagesEn[index]}/`,
        },
      },
    });
  });

  // English pages
  allPagesEn.forEach((page, index) => {
    const config = getPageConfig(page, moneyPagesEn);
    sitemap.push({
      url: `${baseUrl}/en${page}/`,
      lastModified: new Date(),
      changeFrequency: config.changeFrequency,
      priority: config.priority,
      alternates: {
        languages: {
          sq: `${baseUrl}/sq${allPagesSq[index]}/`,
          en: `${baseUrl}/en${page}/`,
        },
      },
    });
  });

  // Blog posts - Albanian (with hreflang alternates)
  const sqPosts = getAllPosts('sq');
  sqPosts.forEach((post) => {
    const enSlug = blogAlternates[post.slug];
    sitemap.push({
      url: `${baseUrl}/sq/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      ...(enSlug && {
        alternates: {
          languages: {
            sq: `${baseUrl}/sq/blog/${post.slug}/`,
            en: `${baseUrl}/en/blog/${enSlug}/`,
          },
        },
      }),
    });
  });

  // Blog posts - English (with hreflang alternates)
  const enSlugsToSq = Object.fromEntries(
    Object.entries(blogAlternates).map(([sq, en]) => [en, sq])
  );
  const enPosts = getAllPosts('en');
  enPosts.forEach((post) => {
    const sqSlug = enSlugsToSq[post.slug];
    sitemap.push({
      url: `${baseUrl}/en/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      ...(sqSlug && {
        alternates: {
          languages: {
            sq: `${baseUrl}/sq/blog/${sqSlug}/`,
            en: `${baseUrl}/en/blog/${post.slug}/`,
          },
        },
      }),
    });
  });

  return sitemap;
}
