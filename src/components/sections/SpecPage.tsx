import type { Metadata } from 'next';
import type { SpecPageContent } from '@/content/pages/types';
import { BreadcrumbSchema, LocalBusinessSchema, ServiceSchema } from '@/components/seo';
import StickyMobileCTA from '@/components/features/StickyMobileCTA';
import Hero from './Hero';
import SpecSections from './SpecSections';
import SpecFAQ from './SpecFAQ';

export type LocalePaths = { sq: string; en: string }; // e.g. { sq: '/sq/patinim/', en: '/en/wall-plastering/' }

export function specMetadata(content: SpecPageContent, locale: string, paths: LocalePaths, ogImage?: string): Metadata {
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: locale === 'sq' ? paths.sq : paths.en,
      languages: { sq: paths.sq, en: paths.en, 'x-default': paths.en },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: { title: content.metaTitle, description: content.metaDescription },
  };
}

type Props = {
  content: SpecPageContent;
  locale: string;
  path: string; // this page's own path, with trailing slash
  heroImage: string;
  schema: 'service' | 'business'; // service hubs vs city money pages
  city?: 'Tiranë' | 'Durrës';
  children?: React.ReactNode; // extra trust sections rendered before the FAQ
};

export default function SpecPage({ content, locale, path, heroImage, schema, city, children }: Props) {
  const home = locale === 'sq' ? 'Kryefaqja' : 'Home';

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: home, url: `/${locale}/` },
          { name: content.h1, url: path },
        ]}
      />
      {schema === 'service' ? (
        <ServiceSchema name={content.h1} description={content.metaDescription} url={path} image={heroImage} locale={locale} />
      ) : (
        <LocalBusinessSchema locale={locale} city={city} />
      )}

      <Hero title={content.h1} answer={content.answer} cta={content.cta} image={heroImage} />
      <SpecSections sections={content.sections} />
      {children}
      <SpecFAQ title={content.faq.title} items={content.faq.items} />
      <StickyMobileCTA cta={content.cta} />
    </>
  );
}
