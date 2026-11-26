import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { PageHeader } from '@/components/layout';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';
import { getAllPosts } from '@/lib/blog';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'sq'
      ? 'Blog - Punime Gipsi, Patinim & Lyerje Këshilla - Torra Gips'
      : 'Blog - Gypsum Works, Plastering & Painting Tips - Torra Gips',
    description: locale === 'sq'
      ? 'Këshilla dhe udhëzues profesionale për punime gipsi, patinim murash dhe lyerje. Mësoni më shumë nga ekspertët e Torra Gips.'
      : 'Professional tips and guides for gypsum works, wall plastering and painting. Learn more from Torra Gips experts.',
    alternates: {
      canonical: `/${locale}/blog/`,
      languages: {
        sq: '/sq/blog/',
        en: '/en/blog/',
        'x-default': '/en/blog/',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');

  const posts = getAllPosts(locale);

  const breadcrumbs = [{ label: tNav('blog') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/blog/` },
        ]}
      />

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs} />

      {/* Blog Posts */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 border-t border-ink-900 pt-10 md:grid-cols-2 md:pt-14 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex flex-col ${index === 0 ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-12' : ''}`}
                >
                  {post.image && (
                    <div className={`frame ${index === 0 ? 'aspect-[3/4] lg:col-span-4' : 'aspect-[3/4]'}`}>
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes={index === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'}
                      />
                    </div>
                  )}
                  <div className={index === 0 ? 'mt-6 lg:col-span-5 lg:mt-0' : 'mt-6 flex flex-1 flex-col'}>
                    <p className="text-sm font-semibold text-tint">
                      <span>{post.category}</span>
                    </p>
                    <h2 className={`mt-3 font-semibold text-ink-900 transition-colors group-hover:text-tint ${index === 0 ? 'text-3xl md:text-4xl' : 'line-clamp-3 text-xl md:text-[1.375rem]'}`}>
                      {post.title}
                    </h2>
                    <p className={`copy mt-3 ${index === 0 ? '' : 'mb-6 line-clamp-3'}`}>
                      {post.excerpt}
                    </p>
                    <div className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4 ${index === 0 ? 'mt-7' : 'mt-auto'}`}>
                    <span className="text-sm text-ink-500">
                        {new Date(post.date).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                    </span>
                    <span className="link-rule">
                      {t('readMore')} →
                    </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-t border-ink-900 py-12">
              <p className="lead">
                {locale === 'sq' ? 'Nuk ka postime aktualisht.' : 'No posts available yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
