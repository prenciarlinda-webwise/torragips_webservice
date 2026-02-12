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
      ? 'Çmime Orientuese Punime Gipsi & Lyerje Tiranë - +355 68 858 0058 - Torra Gips'
      : 'Indicative Prices Gypsum Works & Painting Tirana - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Çmime orientuese për punime gipsi, tavane të varura, patinim dhe lyerje në Tiranë dhe Durrës. Çmimi final varet nga projekti. Telefononi për ofertë falas.'
      : 'Indicative prices for gypsum works, suspended ceilings, plastering and painting in Tirana and Durrës. Final price depends on the project. Call for a free quote.',
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

  const wallPrices = [
    {
      type: 'TIP 1',
      sq: 'Veshje gipsi (Knauf GKB 12.5mm standard i bardhë)',
      en: 'Gypsum cladding (standard white Knauf GKB 12.5mm)',
      price: '2,800',
      unit: 'm²',
    },
    {
      type: 'TIP 2',
      sq: 'Veshje gipsi (Knauf GKBI 12.5mm i gjelbër rezistent ndaj lagështirës)',
      en: 'Gypsum cladding (moisture-resistant green Knauf GKBI 12.5mm)',
      price: '3,000',
      unit: 'm²',
    },
    {
      type: 'TIP 3',
      sq: 'Mur ndarës (i gjelbër brenda + i bardhë jashtë)',
      en: 'Partition wall (green inside + white outside)',
      price: '3,800',
      unit: 'm²',
    },
    {
      type: 'TIP 4',
      sq: 'Mur ndarës (i bardhë nga të dyja anët)',
      en: 'Partition wall (white both sides)',
      price: '3,500',
      unit: 'm²',
    },
    {
      type: 'TIP 5',
      sq: 'Mur ndarës me strukturë të dyfishtë',
      en: 'Double structure partition wall',
      price: '4,500',
      unit: 'm²',
    },
    {
      type: '',
      sq: 'Përforcim me profil UA',
      en: 'UA Profile reinforcement',
      price: '1,000',
      unit: 'ml',
    },
    {
      type: '',
      sq: 'Izolim me lesh guri',
      en: 'Rock wool insulation',
      price: '500',
      unit: 'm²',
    },
    {
      type: '',
      sq: 'Trajtim këndi me alumin',
      en: 'Corner aluminum treatment',
      price: '300',
      unit: 'ml',
    },
  ];

  const ceilingPrices = [
    {
      sq: 'Tavan i varur standard (Knauf GKB i bardhë)',
      en: 'Standard suspended ceiling (white Knauf GKB)',
      price: '2,100',
      unit: 'm²',
    },
    {
      sq: 'Tavan i varur rezistent ndaj lagështirës (Knauf GKBI i gjelbër)',
      en: 'Moisture-resistant suspended ceiling (green Knauf GKBI)',
      price: '2,300',
      unit: 'm²',
    },
    {
      sq: 'Patinim + lyerje (Knauf super finish + bojë plastike)',
      en: 'Plastering + painting (Knauf super finish + plastic paint)',
      price: '950',
      unit: 'm²',
    },
    {
      sq: 'Binar magnetik i integruar',
      en: 'Magnetic recessed track',
      price: '2,500',
      unit: 'ml',
    },
    {
      sq: 'Xhep LED / zgavër',
      en: 'LED pocket / recess',
      price: '1,200',
      unit: 'ml',
    },
    {
      sq: 'Panel aksesi 40x40',
      en: 'Access panel 40x40',
      price: '3,500',
      unit: locale === 'sq' ? 'copë' : 'pc',
    },
  ];

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

  const breadcrumbs = [{ label: locale === 'sq' ? 'Çmime' : 'Pricing' }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'sq' ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: locale === 'sq' ? 'Çmime' : 'Pricing', url: `/${locale}/cmime/` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              {locale === 'sq' ? 'Çmime Orientuese' : 'Indicative Prices'}
            </h1>
            <p className="text-xl text-text-light">
              {locale === 'sq'
                ? 'Çmimet e mëposhtme janë orientuese dhe mund të ndryshojnë sipas kushteve të projektit. Kontaktoni për ofertë të saktë.'
                : 'The prices below are indicative and may vary depending on project conditions. Contact us for an accurate quote.'}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="container-custom py-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-800 text-sm">
              {locale === 'sq'
                ? 'Çmimet e listuara janë orientuese dhe përfshijnë vetëm punën e dorës me material. Çmimi final përcaktohet pas vizitës në vend dhe varet nga sipërfaqja, lartësia, kushtet e objektit dhe kërkesat specifike të projektit.'
                : 'Listed prices are indicative and include labor with materials only. The final price is determined after an on-site visit and depends on surface area, height, site conditions, and specific project requirements.'}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-12">

          {/* A. Partition Walls & Cladding */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
              {locale === 'sq' ? 'Mure Ndarëse dhe Veshje Gipsi' : 'Partition Walls & Gypsum Cladding'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left px-4 py-3 font-semibold text-primary-800 border-b border-primary-100">
                      {locale === 'sq' ? 'Përshkrimi' : 'Description'}
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-primary-800 border-b border-primary-100 whitespace-nowrap">
                      {locale === 'sq' ? 'Çmimi (Lek)' : 'Price (Lek)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wallPrices.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 border-b border-neutral-100">
                        {item.type && (
                          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded mr-2">
                            {item.type}
                          </span>
                        )}
                        <span className="text-text">
                          {locale === 'sq' ? item.sq : item.en}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-neutral-100 text-right whitespace-nowrap">
                        <span className="font-semibold text-primary-800">{item.price}</span>
                        <span className="text-text-light text-sm ml-1">/{item.unit}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Suspended Ceilings */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
              {locale === 'sq' ? 'Tavane të Varura' : 'Suspended Ceilings'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left px-4 py-3 font-semibold text-primary-800 border-b border-primary-100">
                      {locale === 'sq' ? 'Përshkrimi' : 'Description'}
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-primary-800 border-b border-primary-100 whitespace-nowrap">
                      {locale === 'sq' ? 'Çmimi (Lek)' : 'Price (Lek)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ceilingPrices.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 border-b border-neutral-100 text-text">
                        {locale === 'sq' ? item.sq : item.en}
                      </td>
                      <td className="px-4 py-3 border-b border-neutral-100 text-right whitespace-nowrap">
                        <span className="font-semibold text-primary-800">{item.price}</span>
                        <span className="text-text-light text-sm ml-1">/{item.unit}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer note below tables */}
          <div className="bg-neutral-50 rounded-xl p-6">
            <p className="text-text-light text-sm">
              {locale === 'sq'
                ? '* Të gjitha çmimet përfshijnë materialin dhe punën e dorës. Çmimet nuk përfshijnë transport jashtë Tiranës. Për projekte në Durrës ose qytete të tjera, transporti llogaritet veçmas. Çmimi final konfirmohet pas vizitës në vend.'
                : '* All prices include materials and labor. Prices do not include transport outside Tirana. For projects in Durrës or other cities, transport is calculated separately. The final price is confirmed after an on-site visit.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 text-center mb-10">
            {locale === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
          </h2>
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
