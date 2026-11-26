import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout';
import { ArrowIcon } from '@/components/ui/Icons';
import { CTA } from '@/components/sections';
import { BreadcrumbSchema } from '@/components/seo';
import { Link } from '@/lib/i18n/navigation';

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
    title: 'About Torra Gips - Gypsum Company in Albania - +355 68 858 0058',
    description: 'Torra Gips is a leading company for gypsum works, plastering and painting in Tirana and Durrës. 100+ completed projects including Vlora Airport.',
    alternates: {
      canonical: `/${locale}/about/`,
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

  const isAlbanian = locale === 'sq';

  const stats = [
    { value: '100+', label: isAlbanian ? 'Projekte të Përfunduara' : 'Completed Projects' },
    { value: '5+', label: isAlbanian ? 'Vite Eksperiencë' : 'Years Experience' },
    { value: '100%', label: isAlbanian ? 'Kënaqësi Klientësh' : 'Client Satisfaction' },
  ];

  const values = [
    {
      title: isAlbanian ? 'Cilësi e Lartë' : 'High Quality',
      description: isAlbanian
        ? 'Përdorim vetëm materialet më të mira nga Knauf dhe Rigips për rezultate të qëndrueshme.'
        : 'We use only the best materials from Knauf and Rigips for lasting results.',
    },
    {
      title: isAlbanian ? 'Ekip Profesional' : 'Professional Team',
      description: isAlbanian
        ? 'Mjeshtër me përvojë të gjatë, të trajnuar për çdo lloj projekti komercial ose rezidencial.'
        : 'Experienced craftsmen trained for any type of commercial or residential project.',
    },
    {
      title: isAlbanian ? 'Afate të Respektuara' : 'Deadlines Respected',
      description: isAlbanian
        ? 'Punojmë sipas orarit tuaj, edhe natën dhe fundjavë për projekte komerciale.'
        : 'We work according to your schedule, even nights and weekends for commercial projects.',
    },
    {
      title: isAlbanian ? 'Garanci e Plotë' : 'Full Warranty',
      description: isAlbanian
        ? 'Garanci për punën dhe materialet. Kujdesemi për cilësinë afatgjatë.'
        : 'Warranty for work and materials. We care about long-term quality.',
    },
  ];

  const commercialExperience = [
    isAlbanian ? 'Aeroporte' : 'Airports',
    isAlbanian ? 'Hotele & Resorte' : 'Hotels & Resorts',
    isAlbanian ? 'Zyra' : 'Offices',
    isAlbanian ? 'Qendra Tregtare' : 'Shopping Centers',
    isAlbanian ? 'Vila Luksoze' : 'Luxury Villas',
    isAlbanian ? 'Dyqane & Lokale' : 'Shops & Venues',
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

      <PageHeader title={t('title')} subtitle={t('subtitle')} breadcrumbs={breadcrumbs}>
        <div className="mt-12 grid grid-cols-3 border-t border-ink-900 md:mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="border-l border-line px-4 py-6 first:border-l-0 first:pl-0 md:px-8 md:py-8">
              <div className="wide text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl md:text-6xl">{stat.value}</div>
              <div className="mt-2 text-sm text-ink-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* Story Section */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="grid gap-x-14 gap-y-12 border-t border-ink-900 pt-8 md:pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="h2 mb-8">{t('story.title')}</h2>
              <p className="lead mb-6 max-w-2xl">
                {isAlbanian
                  ? 'Torra Gips është kompani lider në fushën e punimeve të gipsit, patinimit dhe lyerjes në Shqipëri. Me një fokus të veçantë në projektet komerciale, ne kemi ndërtuar një reputacion të fortë për cilësi, profesionalizëm dhe respektim të afateve.'
                  : 'Torra Gips is a leading company in gypsum works, plastering and painting in Albania. With a special focus on commercial projects, we have built a strong reputation for quality, professionalism and meeting deadlines.'}
              </p>
              <p className="copy mb-6 max-w-2xl">
                {isAlbanian
                  ? 'Ekipi ynë përbëhet nga mjeshtër me përvojë të gjatë, të trajnuar në teknikat më moderne dhe të pajisur me mjetet më të avancuara. Përdorim vetëm materiale cilësore nga prodhuesit më të njohur si Knauf dhe Rigips.'
                  : 'Our team consists of experienced craftsmen trained in the latest techniques and equipped with the most advanced tools. We use only quality materials from renowned manufacturers like Knauf and Rigips.'}
              </p>
              <p className="copy max-w-2xl">
                {isAlbanian
                  ? 'Kemi pasur nderin të punojmë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort, Rolling Hills dhe shumë projekte të tjera komerciale dhe rezidenciale në Tiranë dhe Durrës.'
                  : 'We have had the honor of working on prestigious projects such as Vlora International Airport, Green Coast Resort, Rolling Hills and many other commercial and residential projects in Tirana and Durrës.'}
              </p>
            </div>
            <figure className="lg:col-span-5">
              <div className="frame aspect-[3/4]">
                <Image
                  src="/images/gallery/panele-3d-mur-dekorativ-led-1.jpeg"
                  alt="Torra Gips"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h3 className="h3">Torra Gips</h3>
                <p className="text-sm text-ink-500">
                  {isAlbanian ? 'Tiranë & Durrës' : 'Tirana & Durrës'}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Commercial Experience */}
      <section className="section-padding on-dark bg-plaster-50 text-ink-800">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-5">
              <h2 className="h2">
                {isAlbanian ? 'Përvojë në Projekte Komerciale' : 'Commercial Project Experience'}
              </h2>
              <p className="lead mt-5 max-w-md">
                {isAlbanian
                  ? 'Kemi përvojë të gjerë në projekte komerciale të çdo lloji dhe shkalle.'
                  : 'We have extensive experience in commercial projects of all types and scales.'}
              </p>
            </div>
            <ul className="numbered grid content-start sm:grid-cols-2 sm:gap-x-10 lg:col-span-7">
              {commercialExperience.map((title, index) => (
                <li key={index} className="flex items-baseline gap-5 border-b border-line py-6 first:pt-0 sm:[&:nth-child(2)]:pt-0">
                  <span className="num" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">{title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-4">
              <h2 className="h2">
                {isAlbanian ? 'Pse të Na Zgjidhni' : 'Why Choose Us'}
              </h2>
            </div>
            <div className="lg:col-span-8">
              {values.map((value, index) => (
                <div key={index} className="grid gap-x-8 gap-y-2 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-5">
                  <h3 className="h3 md:col-span-2">{value.title}</h3>
                  <p className="copy md:col-span-3">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
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
              <p className="lead max-w-3xl">
                {t('founder.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-head">
            <div className="lg:col-span-4">
              <h2 className="h2">
                {t('mission.title')}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="lead mb-9 max-w-3xl">
                {t('mission.content')}
              </p>
              <Link href={isAlbanian ? '/kontakt' : '/contact'} className="btn-ink btn-lg">
                {isAlbanian ? 'Na Kontaktoni' : 'Contact Us'}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
