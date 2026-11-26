import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SpecPage, { specMetadata } from '@/components/sections/SpecPage';
import { patinim } from '@/content/pages/patinim';

type Props = {
  params: Promise<{ locale: string }>;
};

// SQ page; the EN alias (wall-plastering) re-exports this file.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

const PATHS = { sq: '/sq/patinim/', en: '/en/wall-plastering/' };
const HERO = '/images/services/plastering/accent-wall.webp';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return specMetadata(patinim[locale === 'sq' ? 'sq' : 'en'], locale, PATHS, HERO);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'sq' ? 'sq' : 'en';

  return (
    <SpecPage content={patinim[loc]} locale={locale} path={PATHS[loc]} heroImage={HERO} schema="service">
    </SpecPage>
  );
}
