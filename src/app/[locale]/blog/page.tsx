import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Breadcrumbs } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';
import { getAllPosts } from '@/lib/blog';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('subtitle'),
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

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-text-light">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} hover>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-text-light mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">
                        {new Date(post.date).toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-accent font-semibold hover:underline"
                      >
                        {t('readMore')} →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-light text-lg">
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
