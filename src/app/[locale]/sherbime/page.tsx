import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { PageHeader } from '@/components/layout';
import { ArrowIcon } from '@/components/ui/Icons';
import { CTA } from '@/components/sections';
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
    title: 'Shërbime Ndërtimi Tiranë & Durrës - +355 68 858 0058 - Torra Gips',
    description: 'Punime gipsi, patinim murash dhe lyerje profesionale në Tiranë dhe Durrës. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës. Konsultë falas.',
    alternates: {
      canonical: `/${locale}/sherbime/`,
      languages: {
        sq: '/sq/sherbime/',
        en: '/en/services/',
        'x-default': '/en/services/',
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');

  const services = [
    { id: 'gypsum', href: '/', image: '/images/gallery/tavan-gipsi-sallon-profile-led-2.jpeg' },
    { id: 'plastering', href: '/patinim', image: '/images/services/gypsum/patinimi-i-mureve-1.webp' },
    { id: 'painting', href: '/lyerje', image: '/images/services/painting/commercial-exterior-1.webp' },
  ];

  const breadcrumbs = [{ label: tNav('services') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/sherbime/` },
        ]}
      />

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs} />

      {/* Services */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="grid gap-y-14 border-t border-ink-900 pt-10 md:pt-12 lg:grid-cols-3 lg:gap-x-10">
            {services.map((service) => (
              <article key={service.id} className="group flex flex-col">
                <div className="frame aspect-[3/4]">
                  <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>

                <h2 className="mt-7 text-2xl font-semibold text-ink-900 md:text-[1.75rem]">
                  {t(`${service.id}.title`)}
                </h2>
                <p className="copy mt-3">{t(`${service.id}.description`)}</p>

                <Link href={service.href} className="link-rule mt-7 self-start">
                  {tCommon('learnMore')}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
