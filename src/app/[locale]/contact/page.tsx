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

// Only generate this page for English locale
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact Torra Gips - Gypsum Works Tirana - +355 68 858 0058',
    description: 'Contact Torra Gips for gypsum works, plastering and painting in Tirana and Durrës. Call +355 68 858 0058 or send a message for a free consultation.',
    alternates: {
      canonical: `/${locale}/contact/`,
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

  const isAlbanian = locale === 'sq';
  const breadcrumbs = [{ label: tNav('contact') }];

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('info.phone'),
      value: COMPANY.phone,
      href: `tel:${COMPANY.phone}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: isAlbanian ? 'Dërgo Mesazh' : 'Send Message',
      href: `https://wa.me/${COMPANY.whatsapp}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: t('info.email'),
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/${isAlbanian ? 'kontakt' : 'contact'}/` },
        ]}
      />

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs} />

      {/* Quick Contact Methods */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid border-t border-ink-900 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group border-b border-line py-7 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <div className="mb-2 flex items-center gap-2.5 text-sm font-medium text-ink-500">
                  <span className="text-ink-900 [&>svg]:h-4 [&>svg]:w-4">{method.icon}</span>
                  {method.label}
                </div>
                <div className="wide break-all text-xl font-semibold tracking-tight text-ink-900 transition-colors group-hover:text-tint md:text-2xl">
                  {method.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="section-head">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <h2 className="h2">
                {isAlbanian ? 'Informacion Kontakti' : 'Contact Information'}
              </h2>
              <p className="lead mt-5 max-w-md">
                {isAlbanian
                  ? 'Na kontaktoni për një konsultë falas dhe ofertë të personalizuar.'
                  : 'Contact us for a free consultation and personalized quote.'}
              </p>

              <div className="mt-10 border-t border-line">
                <div className="grid grid-cols-3 gap-4 border-b border-line py-5">
                  <h3 className="text-sm font-medium text-ink-500">{t('info.address')}</h3>
                  <p className="col-span-2 font-semibold text-ink-900">{COMPANY.locations.join(', ')}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-line py-5">
                  <h3 className="text-sm font-medium text-ink-500">{t('info.hours')}</h3>
                  <div className="col-span-2">
                    <p className="font-semibold text-ink-900">{t('info.hoursValue')}</p>
                    <p className="mt-1 text-sm text-tint">
                      {isAlbanian
                        ? 'Për projekte komerciale: orare fleksibël'
                        : 'For commercial projects: flexible hours'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-10 border border-line">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95765.98846961377!2d19.74884565!3d41.3275459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sTirana%2C%20Albania!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            </div>

            {/* Contact Form - sends via WhatsApp */}
            <div className="mt-6 lg:col-span-7 lg:mt-0">
              <div className="border border-line bg-plaster-100 p-6 md:p-10">
                <h2 className="text-2xl font-semibold text-ink-900 md:text-3xl">
                  {isAlbanian ? 'Dërgoni Mesazh në WhatsApp' : 'Send a Message via WhatsApp'}
                </h2>
                <p className="copy mb-8 mt-3">
                  {isAlbanian
                    ? 'Plotësoni të dhënat dhe do të hapim WhatsApp me mesazhin tuaj.'
                    : 'Fill in your details and we will open WhatsApp with your message.'}
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="on-dark bg-plaster-50 text-ink-800">
        <div className="container-custom">
          <div className="grid grid-cols-3">
            <div className="py-10 md:py-14">
              <div className="wide text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">100+</div>
              <div className="mt-2 text-sm text-ink-500">
                {isAlbanian ? 'Projekte' : 'Projects'}
              </div>
            </div>
            <div className="border-l border-line py-10 pl-5 md:px-8 md:py-14">
              <div className="wide text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">5+</div>
              <div className="mt-2 text-sm text-ink-500">
                {isAlbanian ? 'Vite Eksperiencë' : 'Years Experience'}
              </div>
            </div>
            <div className="border-l border-line py-10 pl-5 md:px-8 md:py-14">
              <div className="wide text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">100%</div>
              <div className="mt-2 text-sm text-ink-500">
                {isAlbanian ? 'Kënaqësi' : 'Satisfaction'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HiringNotice locale={locale} variant="page" />
    </>
  );
}
