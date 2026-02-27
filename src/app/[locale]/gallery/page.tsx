import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { GalleryGrid } from '@/components/features';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Project Gallery Gypsum Works & Painting - +355 68 858 0058 - Torra Gips',
    description: 'View our completed gypsum works, plastering and painting projects in Tirana and Durrës. Vlora Airport, Green Coast, Rolling Hills.',
    alternates: {
      canonical: `/${locale}/gallery/`,
      languages: {
        sq: '/sq/galeri/',
        en: '/en/gallery/',
      },
    },
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('gallery');
  const tNav = await getTranslations('nav');

  const galleryItems = [
    { id: '1', src: '/images/gallery/project-1.webp', alt: 'Decorative wall with marble arches', category: 'plastering' as const, title: 'Decorative Wall' },
    { id: '2', src: '/images/gallery/project-2.webp', alt: 'Reception with marble counter', category: 'plastering' as const, title: 'Luxury Reception' },
    { id: '3', src: '/images/gallery/project-3.webp', alt: 'Arched openings with shelving', category: 'gypsum' as const, title: 'Modern Design' },
    { id: '4', src: '/images/gallery/project-4.webp', alt: 'Curved gypsum wall', category: 'gypsum' as const, title: 'Curved Wall' },
    { id: '5', src: '/images/gallery/project-5.webp', alt: 'Commercial gypsum installation', category: 'gypsum' as const, title: 'Commercial Space' },
    { id: '6', src: '/images/gallery/project-6.webp', alt: 'Commercial exterior painting', category: 'painting' as const, title: 'Commercial Facade' },
    { id: '7', src: '/images/gallery/project-7.webp', alt: 'Curved wall with LED lighting', category: 'plastering' as const, title: 'Modern Lighting' },
    { id: '8', src: '/images/gallery/project-8.webp', alt: 'Marble counter with lighting', category: 'plastering' as const, title: 'Luxury Details' },
  ];

  const breadcrumbs = [{ label: tNav('gallery') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/gallery/` },
        ]}
      />

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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      <CTA />
    </>
  );
}
