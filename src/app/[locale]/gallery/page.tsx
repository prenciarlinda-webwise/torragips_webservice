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
        'x-default': '/en/gallery/',
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
    { id: '1', src: '/images/services/gypsum/tavane-te-varura-me-led-1.webp', alt: 'Suspended ceiling with LED cove lighting', category: 'gypsum' as const, title: 'LED Cove Ceiling' },
    { id: '2', src: '/images/services/gypsum/punime-gipsi-per-televizor-1.webp', alt: 'Gypsum TV wall with fireplace niche', category: 'gypsum' as const, title: 'TV Wall in Gypsum' },
    { id: '3', src: '/images/services/gypsum/punime-gipsi-komerciale-4.webp', alt: 'Curved gypsum wall in a commercial space', category: 'gypsum' as const, title: 'Curved Gypsum Wall' },
    { id: '4', src: '/images/services/gypsum/modele-gipsi-per-sallone-1.webp', alt: 'Custom built-in gypsum shelving for a living room', category: 'gypsum' as const, title: 'Custom Gypsum Shelving' },
    { id: '5', src: '/images/services/gypsum/tavan-gipsi-per-sallon-1.webp', alt: 'Gypsum ceiling for a living room with lighting', category: 'gypsum' as const, title: 'Gypsum Ceiling for Living Room' },
    { id: '6', src: '/images/services/gypsum/patinimi-i-mureve-1.webp', alt: 'Finished hallway plastering', category: 'plastering' as const, title: 'Hallway Plastering' },
    { id: '7', src: '/images/services/gypsum/patinimi-i-mureve-3.webp', alt: 'Commercial space plastering with a Tirana view', category: 'plastering' as const, title: 'Commercial Space Plastering' },
    { id: '8', src: '/images/services/gypsum/dhome-gjumi-tavan-gipsi-1.webp', alt: 'Bedroom with a vaulted gypsum ceiling', category: 'gypsum' as const, title: 'Bedroom with Gypsum Ceiling' },
    { id: '9', src: '/images/services/gypsum/ngjyra-fasada-e-jashtme-1.webp', alt: 'Exterior facade painting of a modern villa', category: 'painting' as const, title: 'Exterior Facade Painting' },
    { id: '10', src: '/images/services/gypsum/punime-gipsi-komerciale-1.webp', alt: 'Gypsum partition wall in a commercial space', category: 'gypsum' as const, title: 'Commercial Gypsum Partition' },
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
