import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { remark } from 'remark';
import html from 'remark-html';
import { Breadcrumbs } from '@/components/layout';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema, ArticleSchema } from '@/components/seo';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

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
          <div className="max-w-3xl mx-auto">
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
        </div>
      </section>

      <CTA />
    </>
  );
}
