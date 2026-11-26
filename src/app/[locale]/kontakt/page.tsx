import type { Metadata } from 'next';
import HiringNotice from '@/components/features/HiringNotice';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout';
import { ContactForm } from '@/components/forms';
import { BreadcrumbSchema } from '@/components/seo';
import { COMPANY } from '@/lib/constants';

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
    title: 'Kontaktoni Torra Gips - Punime Gipsi Tiranë - +355 68 858 0058',
    description: 'Kontaktoni Torra Gips për punime gipsi, patinim dhe lyerje në Tiranë dhe Durrës. Telefononi +355 68 858 0058 ose dërgoni mesazh për konsultë falas.',
    alternates: {
      canonical: `/${locale}/kontakt/`,
      languages: {
        sq: '/sq/kontakt/',
        en: '/en/contact/',
        'x-default': '/en/contact/',
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tNav = await getTranslations('nav');

  const breadcrumbs = [{ label: tNav('contact') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/kontakt/` },
        ]}
      />

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs} />

      {/* Contact details */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid border-t border-ink-900 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-line py-7 lg:border-b-0 lg:pr-8">
              <h3 className="mb-2 text-sm font-medium text-ink-500">{t('info.phone')}</h3>
              <a href={`tel:${COMPANY.phone}`} className="wide text-lg font-semibold tracking-tight text-ink-900 transition-colors hover:text-tint md:text-xl">
                {COMPANY.phone}
              </a>
            </div>
            <div className="border-b border-line py-7 sm:pl-8 lg:border-b-0 lg:border-l lg:px-8">
              <h3 className="mb-2 text-sm font-medium text-ink-500">{t('info.email')}</h3>
              <a href={`mailto:${COMPANY.email}`} className="wide text-lg [overflow-wrap:anywhere] font-semibold tracking-tight text-ink-900 transition-colors hover:text-tint md:text-xl">
                {COMPANY.email}
              </a>
            </div>
            <div className="border-b border-line py-7 sm:border-b-0 lg:border-l lg:px-8">
              <h3 className="mb-2 text-sm font-medium text-ink-500">{t('info.address')}</h3>
              <p className="wide text-lg font-semibold tracking-tight text-ink-900 md:text-xl">{COMPANY.locations.join(', ')}</p>
            </div>
            <div className="py-7 sm:pl-8 lg:border-l lg:px-8 lg:pr-0">
              <h3 className="mb-2 text-sm font-medium text-ink-500">{t('info.hours')}</h3>
              <p className="wide text-lg font-semibold tracking-tight text-ink-900 md:text-xl">{t('info.hoursValue')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - sends via WhatsApp */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-5">
              <h2 className="h2">
                Dërgoni Mesazh në WhatsApp
              </h2>
              <p className="lead mt-5 max-w-md">
                Plotësoni të dhënat dhe do të hapim WhatsApp me mesazhin tuaj.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <HiringNotice locale={locale} variant="page" />
    </>
  );
}
