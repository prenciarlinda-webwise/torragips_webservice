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

  // Gallery items - real Torra Gips project photos
  const galleryItems = [
    { id: '1', src: '/images/services/gypsum/tavane-te-varura-me-led-1.webp', alt: locale === 'sq' ? 'Tavan i varur me ndriçim LED cove' : 'Suspended ceiling with LED cove lighting', category: 'gypsum' as const, title: locale === 'sq' ? 'Tavan me Ndriçim LED' : 'LED Cove Ceiling' },
    { id: '2', src: '/images/services/gypsum/punime-gipsi-per-televizor-1.webp', alt: locale === 'sq' ? 'Mur gipsi për televizor me oxhak' : 'Gypsum TV wall with fireplace niche', category: 'gypsum' as const, title: locale === 'sq' ? 'Mur Gipsi për Televizor' : 'TV Wall in Gypsum' },
    { id: '3', src: '/images/services/gypsum/punime-gipsi-komerciale-4.webp', alt: locale === 'sq' ? 'Mur gipsi i lakuar në hapësirë komerciale' : 'Curved gypsum wall in a commercial space', category: 'gypsum' as const, title: locale === 'sq' ? 'Mur Gipsi i Lakuar' : 'Curved Gypsum Wall' },
    { id: '4', src: '/images/services/gypsum/modele-gipsi-per-sallone-1.webp', alt: locale === 'sq' ? 'Raft gipsi me porosi për sallon' : 'Custom built-in gypsum shelving for a living room', category: 'gypsum' as const, title: locale === 'sq' ? 'Raft Gipsi me Porosi' : 'Custom Gypsum Shelving' },
    { id: '5', src: '/images/services/gypsum/tavan-gipsi-per-sallon-1.webp', alt: locale === 'sq' ? 'Tavan gipsi për sallon me ndriçim' : 'Gypsum ceiling for a living room with lighting', category: 'gypsum' as const, title: locale === 'sq' ? 'Tavan Gipsi për Sallon' : 'Gypsum Ceiling for Living Room' },
    { id: '6', src: '/images/services/gypsum/patinimi-i-mureve-1.webp', alt: locale === 'sq' ? 'Patinim korridori i përfunduar' : 'Finished hallway plastering', category: 'plastering' as const, title: locale === 'sq' ? 'Patinim Korridori' : 'Hallway Plastering' },
    { id: '7', src: '/images/services/gypsum/patinimi-i-mureve-3.webp', alt: locale === 'sq' ? 'Patinim hapësire komerciale me pamje nga Tirana' : 'Commercial space plastering with a Tirana view', category: 'plastering' as const, title: locale === 'sq' ? 'Patinim Hapësire Komerciale' : 'Commercial Space Plastering' },
    { id: '8', src: '/images/services/gypsum/dhome-gjumi-tavan-gipsi-1.webp', alt: locale === 'sq' ? 'Dhomë gjumi me tavan gipsi të lartë' : 'Bedroom with a vaulted gypsum ceiling', category: 'gypsum' as const, title: locale === 'sq' ? 'Dhomë Gjumi me Tavan Gipsi' : 'Bedroom with Gypsum Ceiling' },
    { id: '9', src: '/images/services/gypsum/ngjyra-fasada-e-jashtme-1.webp', alt: locale === 'sq' ? 'Lyerje fasade e jashtme e një vile moderne' : 'Exterior facade painting of a modern villa', category: 'painting' as const, title: locale === 'sq' ? 'Lyerje Fasade e Jashtme' : 'Exterior Facade Painting' },
    { id: '10', src: '/images/services/gypsum/punime-gipsi-komerciale-1.webp', alt: locale === 'sq' ? 'Ndarje gipsi në ambient komercial' : 'Gypsum partition wall in a commercial space', category: 'gypsum' as const, title: locale === 'sq' ? 'Ndarje Gipsi Komerciale' : 'Commercial Gypsum Partition' },
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
