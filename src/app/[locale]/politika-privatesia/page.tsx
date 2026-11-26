import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout';
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
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return {
    title: t('title'),
    description: 'Politika e privatësisë për faqen e internetit të Torra Gips. Mësoni si mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale.',
    alternates: {
      canonical: `/${locale}/politika-privatesia/`,
      languages: {
        sq: '/sq/politika-privatesia/',
        en: '/en/privacy-policy/',
        'x-default': '/en/privacy-policy/',
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal.privacy');

  const breadcrumbs = [{ label: t('title') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Kryefaqja', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/politika-privatesia/` },
        ]}
      />

      <PageHeader title={t('title')} breadcrumbs={breadcrumbs}>
        <p className="mt-6 text-sm text-ink-500">
          {t('lastUpdated')}: Janar 2024
        </p>
      </PageHeader>

      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="border-t border-ink-900" />
          <div className="prose prose-lg max-w-3xl pt-10 md:pt-14 lg:ml-[33.333%]">
            <h2>1. Informacioni që Mbledhim</h2>
            <p>
              Kur na kontaktoni përmes formularit të kontaktit ose WhatsApp, ne mbledhim:
            </p>
            <ul>
              <li>Emrin tuaj</li>
              <li>Adresën e emailit</li>
              <li>Numrin e telefonit</li>
              <li>Mesazhin ose kërkesën tuaj</li>
            </ul>

            <h2>2. Si e Përdorim Informacionin</h2>
            <p>Informacioni i mbledhur përdoret për:</p>
            <ul>
              <li>Të ju kontaktuar në lidhje me kërkesën tuaj</li>
              <li>Të ju ofruar informacion për shërbimet tona</li>
              <li>Të ju dërguar oferta nëse keni shprehur interes</li>
            </ul>

            <h2>3. Ruajtja e të Dhënave</h2>
            <p>
              Të dhënat tuaja personale ruhen në mënyrë të sigurt dhe nuk ndahen me palë të treta
              përveç rasteve kur kërkohet nga ligji.
            </p>

            <h2>4. Të Drejtat Tuaja</h2>
            <p>Ju keni të drejtë të:</p>
            <ul>
              <li>Kërkoni qasje në të dhënat tuaja personale</li>
              <li>Kërkoni korrigjimin e të dhënave të pasakta</li>
              <li>Kërkoni fshirjen e të dhënave tuaja</li>
              <li>Tërhiqni pëlqimin për përpunimin e të dhënave</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Faqja jonë e internetit përdor cookies për të përmirësuar përvojën e përdoruesit.
              Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tuaj.
            </p>

            <h2>6. Kontakti</h2>
            <p>
              Për pyetje në lidhje me politikën e privatësisë, na kontaktoni në:
            </p>
            <ul>
              <li>Email: {COMPANY.email}</li>
              <li>Telefon: {COMPANY.phone}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
