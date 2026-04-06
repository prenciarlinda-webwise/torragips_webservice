import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { Card, CardContent, Button } from '@/components/ui';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';
import { Link } from '@/lib/i18n/navigation';

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
    title: 'About Torra Gips - Gypsum Company in Albania - +355 68 858 0058',
    description: 'Torra Gips is a leading company for gypsum works, plastering and painting in Tirana and Durrës. 100+ completed projects including Vlora Airport.',
    alternates: {
      canonical: `/${locale}/about/`,
      languages: {
        sq: '/sq/rreth-nesh/',
        en: '/en/about/',
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tNav = await getTranslations('nav');

  const isAlbanian = locale === 'sq';

  const stats = [
    { value: '100+', label: isAlbanian ? 'Projekte të Përfunduara' : 'Completed Projects' },
    { value: '5+', label: isAlbanian ? 'Vite Eksperiencë' : 'Years Experience' },
    { value: '100%', label: isAlbanian ? 'Kënaqësi Klientësh' : 'Client Satisfaction' },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: isAlbanian ? 'Cilësi e Lartë' : 'High Quality',
      description: isAlbanian
        ? 'Përdorim vetëm materialet më të mira nga Knauf dhe Rigips për rezultate të qëndrueshme.'
        : 'We use only the best materials from Knauf and Rigips for lasting results.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: isAlbanian ? 'Ekip Profesional' : 'Professional Team',
      description: isAlbanian
        ? 'Mjeshtër me përvojë të gjatë, të trajnuar për çdo lloj projekti komercial ose rezidencial.'
        : 'Experienced craftsmen trained for any type of commercial or residential project.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: isAlbanian ? 'Afate të Respektuara' : 'Deadlines Respected',
      description: isAlbanian
        ? 'Punojmë sipas orarit tuaj, edhe natën dhe fundjavë për projekte komerciale.'
        : 'We work according to your schedule, even nights and weekends for commercial projects.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: isAlbanian ? 'Garanci e Plotë' : 'Full Warranty',
      description: isAlbanian
        ? 'Garanci për punën dhe materialet. Kujdesemi për cilësinë afatgjatë.'
        : 'Warranty for work and materials. We care about long-term quality.',
    },
  ];

  const commercialExperience = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: isAlbanian ? 'Aeroporte' : 'Airports',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: isAlbanian ? 'Hotele & Resorte' : 'Hotels & Resorts',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: isAlbanian ? 'Zyra' : 'Offices',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: isAlbanian ? 'Qendra Tregtare' : 'Shopping Centers',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: isAlbanian ? 'Vila Luksoze' : 'Luxury Villas',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m4-16v4m0 0h4m-4 0H7" />
        </svg>
      ),
      title: isAlbanian ? 'Dyqane & Lokale' : 'Shops & Venues',
    },
  ];

  const breadcrumbs = [{ label: tNav('about') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/${isAlbanian ? 'rreth-nesh' : 'about'}/` },
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

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-6">
                {t('story.title')}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-text-light leading-relaxed mb-6">
                  {isAlbanian
                    ? 'Torra Gips është kompani lider në fushën e punimeve të gipsit, patinimit dhe lyerjes në Shqipëri. Me një fokus të veçantë në projektet komerciale, ne kemi ndërtuar një reputacion të fortë për cilësi, profesionalizëm dhe respektim të afateve.'
                    : 'Torra Gips is a leading company in gypsum works, plastering and painting in Albania. With a special focus on commercial projects, we have built a strong reputation for quality, professionalism and meeting deadlines.'}
                </p>
                <p className="text-text-light leading-relaxed mb-6">
                  {isAlbanian
                    ? 'Ekipi ynë përbëhet nga mjeshtër me përvojë të gjatë, të trajnuar në teknikat më moderne dhe të pajisur me mjetet më të avancuara. Përdorim vetëm materiale cilësore nga prodhuesit më të njohur si Knauf dhe Rigips.'
                    : 'Our team consists of experienced craftsmen trained in the latest techniques and equipped with the most advanced tools. We use only quality materials from renowned manufacturers like Knauf and Rigips.'}
                </p>
                <p className="text-text-light leading-relaxed">
                  {isAlbanian
                    ? 'Kemi pasur nderin të punojmë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort, Rolling Hills dhe shumë projekte të tjera komerciale dhe rezidenciale në Tiranë dhe Durrës.'
                    : 'We have had the honor of working on prestigious projects such as Vlora International Airport, Green Coast Resort, Rolling Hills and many other commercial and residential projects in Tirana and Durrës.'}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="/images/logo.webp"
                    alt="Torra Gips"
                    className="w-48 h-48 mx-auto object-contain mb-6"
                  />
                  <h3 className="text-2xl font-bold text-dark-800 mb-2">Torra Gips</h3>
                  <p className="text-text-light">
                    {isAlbanian ? 'Tiranë & Durrës' : 'Tirana & Durrës'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Experience */}
      <section className="py-20 bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isAlbanian ? 'Përvojë në Projekte Komerciale' : 'Commercial Project Experience'}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {isAlbanian
                ? 'Kemi përvojë të gjerë në projekte komerciale të çdo lloji dhe shkalle.'
                : 'We have extensive experience in commercial projects of all types and scales.'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {commercialExperience.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-dark-800 rounded-xl text-center hover:bg-dark-700 transition-colors"
              >
                <div className="w-14 h-14 mx-auto bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-3">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {isAlbanian ? 'Pse të Na Zgjidhni' : 'Why Choose Us'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-dark-800 text-lg mb-2">{value.title}</h3>
                  <p className="text-text-light text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-800 rounded-full flex items-center justify-center mb-3">
                  <span className="text-4xl font-bold text-white">A</span>
                </div>
                <h3 className="font-bold text-primary-800">{t('founder.name')}</h3>
                <p className="text-sm text-text-light">{t('founder.role')}</p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">{t('founder.title')}</h2>
                <p className="text-text-light text-lg leading-relaxed">
                  {t('founder.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-xl text-text-light leading-relaxed mb-8">
              {t('mission.content')}
            </p>
            <Link href={isAlbanian ? '/kontakt' : '/contact'}>
              <Button size="lg" variant="primary">
                {isAlbanian ? 'Na Kontaktoni' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
