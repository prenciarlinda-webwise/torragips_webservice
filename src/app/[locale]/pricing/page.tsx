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

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Request Free Quote Gypsum & Painting Tirana - +355 68 858 0058 - Torra Gips',
    description: 'Get a free quote for gypsum works, plastering and painting in Tirana and Durrës. Free consultation and on-site visit.',
    alternates: {
      canonical: `/${locale}/pricing/`,
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations('services');
  const tCommon = await getTranslations('common');

  const services = [
    {
      id: 'gypsum',
      title: tServices('gypsum.title'),
      description: 'Suspended ceilings, room partitions, architectural decorations and acoustic insulation with quality materials.',
      features: ['Modern LED ceilings', 'Room partitions', 'Acoustic insulation', 'Special decorations', 'Work warranty'],
    },
    {
      id: 'plastering',
      title: tServices('plastering.title'),
      description: 'Professional interior and exterior wall plastering with traditional and modern techniques.',
      features: ['Interior plastering', 'Exterior plastering', 'Decorative plaster', 'Repairs', 'Paint preparation'],
    },
    {
      id: 'painting',
      title: tServices('painting.title'),
      description: 'Professional wall and facade painting with quality paints and durable finishes.',
      features: ['Interior painting', 'Exterior painting', 'Eco-friendly paints', 'Decorative effects', 'Color consultation'],
    },
  ];

  const breadcrumbs = [{ label: 'Request Quote' }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}/` },
          { name: 'Request Quote', url: `/${locale}/pricing/` },
        ]}
      />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              Request Free Quote
            </h1>
            <p className="text-xl text-text-light">
              Contact us for a professional assessment and personalized quote based on your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} hover className="relative overflow-hidden">
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-text-light mb-6">{service.description}</p>

                  <div className="mb-6">
                    <p className="font-semibold text-primary mb-3">Includes:</p>
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

                  <Link href="/contact">
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
              Every project is unique. Contact us for a free consultation and we will visit the work site to make an accurate assessment.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Contact Us Now
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
