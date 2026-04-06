import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { remark } from 'remark';
import html from 'remark-html';
import { Breadcrumbs } from '@/components/layout';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema, ArticleSchema } from '@/components/seo';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

// Blog post hreflang mapping (sq slug -> en slug)
const blogSlugMap: Record<string, string> = {
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
const enToSqSlugMap = Object.fromEntries(
  Object.entries(blogSlugMap).map(([sq, en]) => [en, sq])
);

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ['sq', 'en'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}/`,
      languages: {
        ...(locale === 'sq' && blogSlugMap[slug] && {
          sq: `/sq/blog/${slug}/`,
          en: `/en/blog/${blogSlugMap[slug]}/`,
        }),
        ...(locale === 'en' && enToSqSlugMap[slug] && {
          sq: `/sq/blog/${enToSqSlugMap[slug]}/`,
          en: `/en/blog/${slug}/`,
        }),
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      ...(post.image && { images: [{ url: post.image }] }),
    },
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');

  if (!post) {
    notFound();
  }

  // Strip first # heading from content to prevent duplicate H1
  const contentWithoutH1 = post.content.replace(/^#\s+.+\n+/, '');
  const contentHtml = await markdownToHtml(contentWithoutH1);

  const breadcrumbs = [
    { label: tNav('blog'), href: '/blog' },
    { label: post.title },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/blog/` },
          { name: post.title, url: `/${locale}/blog/${slug}/` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        url={`/${locale}/blog/${slug}/`}
        image={post.image}
        datePublished={post.date}
        author={post.author}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-text-light">
              <span>{post.author}</span>
              <span>•</span>
              <span>
                {new Date(post.date).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-5xl mx-auto">
            <div>
              <article
                className="prose prose-lg prose-primary max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Related Service Link */}
              <div className="mt-12 p-6 bg-primary-50 rounded-xl">
                <p className="text-text font-medium">
                  {locale === 'sq'
                    ? 'Keni nevojë për ndihmë profesionale? Shikoni '
                    : 'Need professional help? Check out our '}
                  {post.tags.includes('gypsum') || post.tags.includes('gips') || post.tags.includes('ceiling') || post.tags.includes('tavan') ? (
                    <a href={`/${locale}/${locale === 'sq' ? 'punime-gipsi' : 'gypsum-works'}/`} className="text-primary font-semibold hover:underline">
                      {locale === 'sq' ? 'shërbimet tona të punimeve të gipsit' : 'gypsum works services'}
                    </a>
                  ) : (
                    <a href={`/${locale}/${locale === 'sq' ? 'patinim' : 'wall-plastering'}/`} className="text-primary font-semibold hover:underline">
                      {locale === 'sq' ? 'shërbimet tona të patinimit profesional' : 'professional plastering services'}
                    </a>
                  )}
                  {locale === 'sq' ? ' ose telefononi ' : ' or call us at '}
                  <a href="tel:+355688580058" className="text-primary font-semibold hover:underline">+355 68 858 0058</a>
                  {locale === 'sq' ? ' për konsultë falas.' : ' for a free consultation.'}
                </p>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="font-semibold text-primary mb-4">{t('tags')}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-100 text-text-light text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* WhatsApp Contact Card */}
                <div className="bg-white rounded-xl shadow-soft border p-6">
                  <h3 className="text-lg font-bold text-primary-800 mb-2">
                    {locale === 'sq' ? 'Konsultë Falas' : 'Free Consultation'}
                  </h3>
                  <p className="text-sm text-text-light mb-4">
                    {locale === 'sq'
                      ? 'Na shkruani në WhatsApp për konsultë falas dhe ofertë pa detyrim.'
                      : 'Message us on WhatsApp for a free consultation and no-obligation quote.'}
                  </p>
                  <a
                    href="https://wa.me/355688580058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    {locale === 'sq' ? 'Shkruani në WhatsApp' : 'Message on WhatsApp'}
                  </a>
                  <p className="text-xs text-text-light mt-3 text-center">
                    +355 68 858 0058
                  </p>
                </div>

                {/* Services Section */}
                <div className="bg-white rounded-xl shadow-soft border p-6">
                  <h3 className="text-lg font-bold text-primary-800 mb-4">
                    {locale === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={`/${locale}/${locale === 'sq' ? 'punime-gipsi' : 'gypsum-works'}/`}
                        className="flex items-center text-sm font-medium text-text hover:text-accent transition-colors"
                      >
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {locale === 'sq' ? 'Punime Gipsi' : 'Gypsum Works'}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/${locale === 'sq' ? 'patinim' : 'wall-plastering'}/`}
                        className="flex items-center text-sm font-medium text-text hover:text-accent transition-colors"
                      >
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {locale === 'sq' ? 'Patinim Profesional' : 'Professional Plastering'}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/${locale === 'sq' ? 'lyerje' : 'painting'}/`}
                        className="flex items-center text-sm font-medium text-text hover:text-accent transition-colors"
                      >
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {locale === 'sq' ? 'Lyerje Profesionale' : 'Professional Painting'}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
