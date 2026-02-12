import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Breadcrumbs } from '@/components/layout';
import { Card, CardContent, Button } from '@/components/ui';
import { FAQ, CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for Albanian locale
export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'sq'
      ? 'Kërko Ofertë Falas Gips & Lyerje Tiranë - +355 68 858 0058 - Torra Gips'
      : 'Request Free Quote Gypsum & Painting Tirana - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Merrni ofertë falas për punime gipsi, patinim dhe lyerje në Tiranë dhe Durrës. Konsultë pa detyrim dhe vizitë falas në vend.'
      : 'Get a free quote for gypsum works, plastering and painting in Tirana and Durrës. Free consultation and on-site visit.',
    alternates: {
      canonical: `/${locale}/cmime/`,
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pricing');
  const tNav = await getTranslations('nav');
  const tServices = await getTranslations('services');
  const tCommon = await getTranslations('common');

  const services = [
    {
      id: 'gypsum',
      title: tServices('gypsum.title'),
      description: locale === 'sq'
        ? 'Tavane të varura, ndarja dhomash, dekorime arkitekturore dhe izolime akustike me materiale cilësore.'
        : 'Suspended ceilings, room partitions, architectural decorations and acoustic insulation with quality materials.',
      features: locale === 'sq'
        ? ['Tavane moderne me LED', 'Ndarja dhomash', 'Izolim akustik', 'Dekorime speciale', 'Garanci pune']
        : ['Modern LED ceilings', 'Room partitions', 'Acoustic insulation', 'Special decorations', 'Work warranty'],
    },
    {
      id: 'plastering',
      title: tServices('plastering.title'),
      description: locale === 'sq'
        ? 'Patinim profesional i mureve të brendshme dhe të jashtme me teknika tradicionale dhe moderne.'
        : 'Professional interior and exterior wall plastering with traditional and modern techniques.',
      features: locale === 'sq'
        ? ['Patinim i brendshëm', 'Patinim i jashtëm', 'Suva dekorative', 'Riparime', 'Përgatitje për lyerje']
        : ['Interior plastering', 'Exterior plastering', 'Decorative plaster', 'Repairs', 'Paint preparation'],
    },
    {
      id: 'painting',
      title: tServices('painting.title'),
      description: locale === 'sq'
        ? 'Lyerje profesionale e mureve dhe fasadave me bojëra cilësore dhe përfundime të qëndrueshme.'
        : 'Professional wall and facade painting with quality paints and durable finishes.',
      features: locale === 'sq'
        ? ['Lyerje e brendshme', 'Lyerje e jashtme', 'Bojëra ekologjike', 'Efekte dekorative', 'Këshillim ngjyrash']
        : ['Interior painting', 'Exterior painting', 'Eco-friendly paints', 'Decorative effects', 'Color consultation'],
    },
  ];

  const breadcrumbs = [{ label: locale === 'sq' ? 'Kërko Ofertë' : 'Request Quote' }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: locale === 'sq' ? 'Kërko Ofertë' : 'Request Quote', url: `/${locale}/cmime/` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              {locale === 'sq' ? 'Kërko Ofertë Falas' : 'Request Free Quote'}
            </h1>
            <p className="text-xl text-text-light">
              {locale === 'sq'
                ? 'Na kontaktoni për një vlerësim profesional dhe ofertë të personalizuar sipas nevojave tuaja.'
                : 'Contact us for a professional assessment and personalized quote based on your needs.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} hover className="relative overflow-hidden">
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    {locale === 'sq' ? 'Popullar' : 'Popular'}
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-text-light mb-6">{service.description}</p>

                  <div className="mb-6">
                    <p className="font-semibold text-primary mb-3">
                      {locale === 'sq' ? 'Përfshin:' : 'Includes:'}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-text-light">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={locale === 'sq' ? '/kontakt' : '/contact'}>
                    <Button variant={index === 0 ? 'primary' : 'outline'} className="w-full">
                      {tCommon('getQuote')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-light max-w-2xl mx-auto mb-6">
              {locale === 'sq'
                ? 'Çdo projekt është unik. Na kontaktoni për një konsultë falas dhe do të vizitojmë vendin e punës për të bërë një vlerësim të saktë.'
                : 'Every project is unique. Contact us for a free consultation and we will visit the work site to make an accurate assessment.'}
            </p>
            <Link href={locale === 'sq' ? '/kontakt' : '/contact'}>
              <Button size="lg" variant="primary">
                {locale === 'sq' ? 'Na Kontaktoni Tani' : 'Contact Us Now'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
