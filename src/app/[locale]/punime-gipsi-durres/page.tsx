import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SpecPage, { specMetadata } from '@/components/sections/SpecPage';
import VideoShowcase from '@/components/sections/VideoShowcase';
import { punimeGipsiDurres } from '@/content/pages/punime-gipsi-durres';

type Props = {
  params: Promise<{ locale: string }>;
};

// SQ page; the EN alias (gypsum-works-durres) re-exports this file.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

const PATHS = { sq: '/sq/punime-gipsi-durres/', en: '/en/gypsum-works-durres/' };
const HERO = '/images/gallery/green-coast-projekt.webp';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(punimeGipsiDurres[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, HERO);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'sq' ? 'sq' : 'en';

  return (
    <SpecPage content={punimeGipsiDurres[loc]} locale={locale} path={PATHS[loc]} heroImage={HERO} schema="business" city="Durrës">
      <VideoShowcase locale={locale} category="gips" limit={4} />
    </SpecPage>
  );
}
