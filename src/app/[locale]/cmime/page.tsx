import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SpecPage, { specMetadata } from '@/components/sections/SpecPage';
import { cmime } from '@/content/pages/cmime';

type Props = {
  params: Promise<{ locale: string }>;
};

// SQ page; the EN alias (pricing) re-exports this file.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

const PATHS = { sq: '/sq/cmime/', en: '/en/pricing/' };
const HERO = '/images/gallery/rolling-hills-projekt.webp';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(cmime[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, HERO);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'sq' ? 'sq' : 'en';

  return (
    <SpecPage content={cmime[loc]} locale={locale} path={PATHS[loc]} heroImage={HERO} schema="service">
    </SpecPage>
  );
}
