import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SpecPage, { specMetadata } from '@/components/sections/SpecPage';
import VideoShowcase from '@/components/sections/VideoShowcase';
import { punimeGipsiTirane } from '@/content/pages/punime-gipsi-tirane';

type Props = {
  params: Promise<{ locale: string }>;
};

// SQ page; the EN alias (gypsum-works-tirana) re-exports this file.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

const PATHS = { sq: '/sq/punime-gipsi-tirane/', en: '/en/gypsum-works-tirana/' };
const HERO = '/images/gallery/lion-park-projekt-gipsi.avif';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(punimeGipsiTirane[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, HERO);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'sq' ? 'sq' : 'en';

  return (
    <SpecPage content={punimeGipsiTirane[loc]} locale={locale} path={PATHS[loc]} heroImage={HERO} schema="business" city="Tiranë">
      <VideoShowcase locale={locale} category="gips" limit={4} />
    </SpecPage>
  );
}
