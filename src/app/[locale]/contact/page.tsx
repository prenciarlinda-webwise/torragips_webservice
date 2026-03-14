import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { ContactForm } from '@/components/forms';
import { BreadcrumbSchema } from '@/components/seo';
import { COMPANY, SOCIAL_LINKS } from '@/lib/constants';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for English locale
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
      color: 'bg-primary',
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
      color: 'bg-green-600',
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
      color: 'bg-dark-700',
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container-custom relative z-10">
          <Breadcrumbs items={breadcrumbs} className="text-white/60 mb-8" />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center p-4 rounded-xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <div>
                  <div className="text-sm text-text-light">{method.label}</div>
                  <div className="font-semibold text-dark-800">{method.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-dark-800 mb-4">
                  {isAlbanian ? 'Informacion Kontakti' : 'Contact Information'}
                </h2>
                <p className="text-text-light">
                  {isAlbanian
                    ? 'Na kontaktoni për një konsultë falas dhe ofertë të personalizuar.'
                    : 'Contact us for a free consultation and personalized quote.'}
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-800">{t('info.address')}</h3>
                      <p className="text-text-light">{COMPANY.locations.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-800">{t('info.hours')}</h3>
                      <p className="text-text-light">{t('info.hoursValue')}</p>
                      <p className="text-sm text-primary mt-1">
                        {isAlbanian
                          ? 'Për projekte komerciale: orare fleksibël'
                          : 'For commercial projects: flexible hours'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-neutral-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95765.98846961377!2d19.74884565!3d41.3275459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sTirana%2C%20Albania!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            </div>

            {/* Contact Form - sends via WhatsApp */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-dark-800">
                      {isAlbanian ? 'Dërgoni Mesazh në WhatsApp' : 'Send a Message via WhatsApp'}
                    </h2>
                  </div>
                  <p className="text-text-light mb-6">
                    {isAlbanian
                      ? 'Plotësoni të dhënat dhe do të hapim WhatsApp me mesazhin tuaj.'
                      : 'Fill in your details and we will open WhatsApp with your message.'}
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-900">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-1">100+</div>
              <div className="text-white/70 text-sm">
                {isAlbanian ? 'Projekte' : 'Projects'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">5+</div>
              <div className="text-white/70 text-sm">
                {isAlbanian ? 'Vite Eksperiencë' : 'Years Experience'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-white/70 text-sm">
                {isAlbanian ? 'Kënaqësi' : 'Satisfaction'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
