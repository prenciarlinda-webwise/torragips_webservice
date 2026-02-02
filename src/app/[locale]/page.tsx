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
