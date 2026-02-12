import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  ServicesOverview,
  FeaturedProjects,
  WhyChooseUs,
  Testimonials,
  ServiceAreas,
  FAQ,
  CTA,
} from '@/components/sections';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        sq: '/sq/',
        en: '/en/',
      },
    },
    openGraph: {
      images: [{ url: '/images/og-default.webp', width: 1200, height: 630, alt: 'Torra Gips' }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema locale={locale} />

      <Hero />
      <ServicesOverview />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <CTA />
    </>
  );
}
