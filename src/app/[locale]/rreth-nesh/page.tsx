import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout';
import { WhyChooseUs, CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for Albanian locale
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Rreth Torra Gips - Kompani Gipsi në Shqipëri - +355 68 858 0058',
    description: 'Torra Gips është kompani lider për punime gipsi, patinim dhe lyerje në Tiranë dhe Durrës. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës.',
    alternates: {
      canonical: `/${locale}/rreth-nesh/`,
      languages: {
        sq: '/sq/rreth-nesh/',
        en: '/en/about/',
        'x-default': '/en/about/',
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tNav = await getTranslations('nav');

  const values = ['quality', 'integrity', 'innovation', 'customer'];

  const stats = [
    { value: '100+', label: locale === 'sq' ? 'Projekte' : 'Projects' },
    { value: '5+', label: locale === 'sq' ? 'Vite' : 'Years' },
    { value: '100%', label: locale === 'sq' ? 'Kënaqësi' : 'Satisfaction' },
  ];

  const breadcrumbs = [{ label: tNav('about') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/rreth-nesh/` },
        ]}
      />

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs} />

      {/* Story Section */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="grid gap-x-14 gap-y-12 border-t border-ink-900 pt-8 md:pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="h2 mb-6">{t('story.title')}</h2>
              <p className="lead max-w-2xl">{t('story.content')}</p>
              <div className="mt-12 grid grid-cols-3 border-t border-ink-900">
                {stats.map((stat) => (
                  <div key={stat.value} className="border-l border-line px-4 py-6 first:border-l-0 first:pl-0 md:px-8">
                    <div className="wide text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl md:text-5xl">{stat.value}</div>
                    <div className="mt-2 text-sm text-ink-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="frame aspect-[3/4]">
                <Image
                  src="/images/gallery/panele-3d-mur-dekorativ-led-1.jpeg"
                  alt="Torra Gips"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-plaster-100">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-4">
              <span className="display block text-tint">A</span>
              <h3 className="h3 mt-4">{t('founder.name')}</h3>
              <p className="mt-1 text-sm text-ink-500">{t('founder.role')}</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="h2 mb-6">{t('founder.title')}</h2>
              <p className="lead max-w-3xl">{t('founder.content')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pt-16 md:pt-24 lg:pt-28">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-4">
              <h2 className="h2">{t('mission.title')}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="lead max-w-3xl">{t('mission.content')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-4">
              <h2 className="h2">{t('values.title')}</h2>
            </div>
            <ul className="numbered grid content-start sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
              {values.map((key) => (
                <li key={key} className="flex items-baseline gap-5 border-b border-line py-6 first:pt-0 sm:[&:nth-child(2)]:pt-0">
                  <span className="num" aria-hidden="true" />
                  <h3 className="h3">{t(`values.${key}`)}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </>
  );
}
