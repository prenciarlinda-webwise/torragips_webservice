import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { remark } from 'remark';
import html from 'remark-html';
import { Breadcrumbs } from '@/components/layout';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/components/seo';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { COMPANY } from '@/lib/constants';

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
  'si-te-zgjidhni-kontraktorin-e-duhur': 'how-to-choose-the-right-contractor',
  'fazat-e-ndertimit-te-brendshem-gips-patinim-lyerje': 'interior-construction-phases-gypsum-plastering-painting',
  'ngjyra-fasade-shtepie': 'exterior-facade-paint-colors',
  'ngjyra-dhe-psikologjia-per-dhoma': 'color-psychology-for-every-room',
  'knauf-apo-rigips-krahasim': 'knauf-vs-rigips-comparison',
  'dulux-jotun-caparol-krahasim-bojrash': 'dulux-vs-jotun-vs-caparol-paint-comparison',
  'trendet-e-dizajnit-te-brendshem-2026': 'interior-design-trends-2026',
  'stili-minimalist-apo-klasik-per-shtepine': 'minimalist-vs-classic-style-for-your-home',
  'sa-zgjat-rinovimi-i-nje-apartamenti': 'how-long-does-apartment-renovation-take',
  'rinovim-apo-ndertim-i-ri-cila-eshte-zgjidhja-e-duhur': 'renovate-or-build-new-which-is-right-for-you',
  'riparim-plasaritjesh-mure-tavane': 'wall-and-ceiling-crack-repair-guide',
  'lyerje-komerciale-cfare-duhet-te-dini': 'commercial-painting-what-to-know',
  'lyerje-fasadash-udhezues': 'facade-painting-guide',
  'punime-gipsi-komerciale-per-biznese': 'commercial-gypsum-works-for-businesses',
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
    title: `${post.title} - ${COMPANY.name}`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}/`,
      languages: {
        ...(locale === 'sq' && blogSlugMap[slug] && {
          sq: `/sq/blog/${slug}/`,
          en: `/en/blog/${blogSlugMap[slug]}/`,
          'x-default': `/en/blog/${blogSlugMap[slug]}/`,
        }),
        ...(locale === 'en' && enToSqSlugMap[slug] && {
          sq: `/sq/blog/${enToSqSlugMap[slug]}/`,
          en: `/en/blog/${slug}/`,
          'x-default': `/en/blog/${slug}/`,
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
      {post.faq && post.faq.length > 0 && <FAQSchema items={post.faq} />}

      <section className="pt-[4.5rem]">
        <div className="container-custom pb-14 pt-10 md:pb-20 md:pt-14">
          <Breadcrumbs items={breadcrumbs} className="mb-8 text-ink-800 md:mb-12" />
          <div className="mb-5">
            <span className="text-sm font-semibold text-tint">
              {post.category}
            </span>
          </div>
          <h1 className="h2 max-w-4xl !text-[clamp(2rem,4.4vw,3.75rem)]">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 text-sm text-ink-500">
            <span>{post.author}</span>
            <span className="text-ink-300">•</span>
            <span>
              {new Date(post.date).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-ink-900 pt-10 md:pt-14 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <article
                className="prose prose-lg max-w-3xl prose-headings:font-semibold prose-img:w-full"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Related Service Link */}
              <div className="mt-12 max-w-3xl border-l-2 border-tint pl-6">
                <p className="text-lg font-medium leading-relaxed text-ink-900">
                  {locale === 'sq'
                    ? 'Keni nevojë për ndihmë profesionale? Shikoni '
                    : 'Need professional help? Check out our '}
                  {post.tags.includes('gypsum') || post.tags.includes('gips') || post.tags.includes('ceiling') || post.tags.includes('tavan') ? (
                    <a href={`/${locale}/`} className="link font-semibold">
                      {locale === 'sq' ? 'shërbimet tona të punimeve të gipsit' : 'gypsum works services'}
                    </a>
                  ) : (
                    <a href={`/${locale}/${locale === 'sq' ? 'patinim' : 'wall-plastering'}/`} className="link font-semibold">
                      {locale === 'sq' ? 'shërbimet tona të patinimit profesional' : 'professional plastering services'}
                    </a>
                  )}
                  {locale === 'sq' ? ' ose telefononi ' : ' or call us at '}
                  <a href="tel:+355688580058" className="link font-semibold">+355 68 858 0058</a>
                  {locale === 'sq' ? ' për konsultë falas.' : ' for a free consultation.'}
                </p>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 max-w-3xl border-t border-line pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('tags')}:</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-ink-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28">
                {/* WhatsApp Contact Card */}
                <div className="border-t border-ink-900 pb-10 pt-6">
                  <h3 className="mb-2 text-xl font-semibold text-ink-900">
                    {locale === 'sq' ? 'Konsultë Falas' : 'Free Consultation'}
                  </h3>
                  <p className="mb-5 text-[0.9375rem] leading-relaxed text-ink-600">
                    {locale === 'sq'
                      ? 'Na shkruani në WhatsApp për konsultë falas dhe ofertë pa detyrim.'
                      : 'Message us on WhatsApp for a free consultation and no-obligation quote.'}
                  </p>
                  <a
                    href="https://wa.me/355688580058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink w-full"
                  >
                    {locale === 'sq' ? 'Shkruani në WhatsApp' : 'Message on WhatsApp'}
                  </a>
                  <p className="mt-3 text-sm text-ink-500">
                    +355 68 858 0058
                  </p>
                </div>

                {/* Services Section */}
                <div className="border-t border-ink-900 pt-6">
                  <h3 className="mb-2 text-xl font-semibold text-ink-900">
                    {locale === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
                  </h3>
                  <ul>
                    <li className="border-b border-line">
                      <a
                        href={`/${locale}/`}
                        className="block py-3 text-[0.9375rem] font-medium text-ink-800 transition-colors hover:text-tint"
                      >
                        {locale === 'sq' ? 'Punime Gipsi' : 'Gypsum Works'}
                      </a>
                    </li>
                    <li className="border-b border-line">
                      <a
                        href={`/${locale}/${locale === 'sq' ? 'patinim' : 'wall-plastering'}/`}
                        className="block py-3 text-[0.9375rem] font-medium text-ink-800 transition-colors hover:text-tint"
                      >
                        {locale === 'sq' ? 'Patinim Profesional' : 'Professional Plastering'}
                      </a>
                    </li>
                    <li className="border-b border-line">
                      <a
                        href={`/${locale}/${locale === 'sq' ? 'lyerje' : 'painting'}/`}
                        className="block py-3 text-[0.9375rem] font-medium text-ink-800 transition-colors hover:text-tint"
                      >
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

      {/* FAQ (rendered when the post defines faq in frontmatter) */}
      {post.faq && post.faq.length > 0 && (
        <section className="section-padding bg-plaster-100">
          <div className="container-custom">
            <div className="section-head">
            <div className="lg:col-span-4">
            <h2 className="h2">
              {locale === 'sq' ? 'Pyetje të Shpeshta' : 'Frequently Asked Questions'}
            </h2>
            </div>
            <div className="lg:col-span-8">
              {post.faq.map((item, i) => (
                <details key={i} className="group border-t border-line py-6 first:border-t-0 first:pt-0">
                  <summary className="h3 cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                    {item.question}
                  </summary>
                  <p className="copy mt-3 max-w-3xl">{item.answer}</p>
                </details>
              ))}
            </div>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
