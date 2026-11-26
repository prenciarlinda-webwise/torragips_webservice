import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SpecPage, { specMetadata } from '@/components/sections/SpecPage';
import VideoShowcase from '@/components/sections/VideoShowcase';
import { lyerje } from '@/content/pages/lyerje';

type Props = {
  params: Promise<{ locale: string }>;
};

// SQ page; the EN alias (painting) re-exports this file.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

const PATHS = { sq: '/sq/lyerje/', en: '/en/painting/' };
const HERO = '/images/services/painting/commercial-exterior-2.webp';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(lyerje[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, HERO);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'sq' ? 'sq' : 'en';

  return (
    <SpecPage content={lyerje[loc]} locale={locale} path={PATHS[loc]} heroImage={HERO} schema="service">
      <VideoShowcase locale={locale} category="lyerje" />
    </SpecPage>
  );
}
