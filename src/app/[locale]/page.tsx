import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  ServicesOverview,
  FeaturedProjects,
  WhyChooseUs,
  Testimonials,
  CTA,
  VideoShowcase,
} from '@/components/sections';
import SpecSections from '@/components/sections/SpecSections';
import KleringRibbon from '@/components/sections/KleringRibbon';
import JobApply from '@/components/sections/JobApply';
import SpecFAQ from '@/components/sections/SpecFAQ';
import { specMetadata } from '@/components/sections/SpecPage';
import StickyMobileCTA from '@/components/features/StickyMobileCTA';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/seo';
import { home } from '@/content/pages/home';

type Props = {
  params: Promise<{ locale: string }>;
};

// Home targets exactly one keyword: "punime gipsi" (EN: "gypsum works").
// No city names or secondary services in Title/H1: cities are owned by
// /punime-gipsi-tirane/ and /punime-gipsi-durres/.
const PATHS = { sq: '/sq/', en: '/en/' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(home[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, '/images/og-default.webp');
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = home[locale === 'sq' ? 'sq' : 'en'];
  const trust =
    locale === 'sq'
      ? '100+ projekte të përfunduara · 5+ vite eksperiencë · Materiale Knauf dhe Rigips'
      : '100+ completed projects · 5+ years of experience · Knauf and Rigips materials';

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema locale={locale} />

      <Hero
        title={c.h1}
        answer={c.answer}
        cta={c.cta}
        trust={trust}
        image="/images/gallery/projekt_komercial_torra_gips.webp"
      />
      <ServicesOverview />
      <KleringRibbon />
      <Testimonials />
      <SpecSections sections={c.sections} />
      <FeaturedProjects />
      <WhyChooseUs />
      <VideoShowcase locale={locale} limit={6} />
      <SpecFAQ title={c.faq.title} items={c.faq.items} />
      <JobApply />
      <CTA />
      <StickyMobileCTA cta={c.cta} />
    </>
  );
}
