import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { GalleryGrid } from '@/components/features';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for Albanian locale
export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Galeri Projektesh Punime Gipsi & Lyerje - +355 68 858 0058 - Torra Gips',
    description: 'Shikoni projektet tona të përfunduara të punimeve të gipsit, patinimit dhe lyerjes në Tiranë dhe Durrës. Aeroporti i Vlorës, Green Coast, Rolling Hills.',
    alternates: {
      canonical: `/${locale}/galeri/`,
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

  // Gallery items with real images
  const galleryItems = [
    { id: '1', src: '/images/gallery/project-1.webp', alt: locale === 'sq' ? 'Mur dekorativ me harqe mermeri' : 'Decorative wall with marble arches', category: 'plastering' as const, title: locale === 'sq' ? 'Mur Dekorativ' : 'Decorative Wall' },
    { id: '2', src: '/images/gallery/project-2.webp', alt: locale === 'sq' ? 'Recepsion me banak mermeri' : 'Reception with marble counter', category: 'plastering' as const, title: locale === 'sq' ? 'Recepsion Luksoz' : 'Luxury Reception' },
    { id: '3', src: '/images/gallery/project-3.webp', alt: locale === 'sq' ? 'Hapje harku me rafte' : 'Arched openings with shelving', category: 'gypsum' as const, title: locale === 'sq' ? 'Dizajn Modern' : 'Modern Design' },
    { id: '4', src: '/images/gallery/project-4.webp', alt: locale === 'sq' ? 'Mur gipsi i lakuar' : 'Curved gypsum wall', category: 'gypsum' as const, title: locale === 'sq' ? 'Mur i Lakuar' : 'Curved Wall' },
    { id: '5', src: '/images/gallery/project-5.webp', alt: locale === 'sq' ? 'Instalim gipsi komercial' : 'Commercial gypsum installation', category: 'gypsum' as const, title: locale === 'sq' ? 'Hapësirë Komerciale' : 'Commercial Space' },
    { id: '6', src: '/images/gallery/project-6.webp', alt: locale === 'sq' ? 'Lyerje e jashtme komerciale' : 'Commercial exterior painting', category: 'painting' as const, title: locale === 'sq' ? 'Fasadë Komerciale' : 'Commercial Facade' },
    { id: '7', src: '/images/gallery/project-7.webp', alt: locale === 'sq' ? 'Mur i lakuar me ndriçim LED' : 'Curved wall with LED lighting', category: 'plastering' as const, title: locale === 'sq' ? 'Ndriçim Modern' : 'Modern Lighting' },
    { id: '8', src: '/images/gallery/project-8.webp', alt: locale === 'sq' ? 'Banak mermeri me ndriçim' : 'Marble counter with lighting', category: 'plastering' as const, title: locale === 'sq' ? 'Detaje Luksoze' : 'Luxury Details' },
  ];

  const breadcrumbs = [{ label: tNav('gallery') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/galeri/` },
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

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      <CTA />
    </>
  );
}
