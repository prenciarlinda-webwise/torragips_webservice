import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { BreadcrumbSchema } from '@/components/seo';
import { COMPANY } from '@/lib/constants';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for Albanian locale
export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return {
    title: t('title'),
    description: 'Kushtet dhe termat për shërbimet e Torra Gips. Lexoni për kushtet e shërbimit, garancinë, çmimet dhe politikën e anulimit.',
    alternates: {
      canonical: `/${locale}/kushtet-dhe-termat/`,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal.terms');

  const breadcrumbs = [{ label: t('title') }];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Kryefaqja', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/kushtet-dhe-termat/` },
        ]}
      />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
              {t('title')}
            </h1>
            <p className="text-text-light">
              {t('lastUpdated')}: Janar 2024
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl prose prose-lg">
            <h2>1. Pranimi i Kushteve</h2>
            <p>
              Duke përdorur shërbimet e {COMPANY.name}, ju pranoni këto kushte dhe terma.
              Nëse nuk pajtoheni me ndonjë kusht, ju lutemi mos përdorni shërbimet tona.
            </p>

            <h2>2. Shërbimet</h2>
            <p>
              {COMPANY.name} ofron shërbime profesionale të punimeve të gipsit, patinimit dhe lyerjes.
              Të gjitha shërbimet ofrohen sipas standardeve profesionale dhe materialeve cilësore.
            </p>

            <h2>3. Çmimet dhe Pagesa</h2>
            <ul>
              <li>Çmimet mund të ndryshojnë sipas projektit dhe kushteve specifike</li>
              <li>Oferta përfundimtare jepet pas vlerësimit të vendit të punës</li>
              <li>Pagesa bëhet sipas marrëveshjes me klientin</li>
              <li>Për projekte të mëdha, mund të kërkohet paradhënie</li>
            </ul>

            <h2>4. Garancia</h2>
            <p>
              Ofrojmë garanci për cilësinë e punës sonë. Garancia mbulon defektet në
              material dhe punë për një periudhë të caktuar pas përfundimit të projektit.
            </p>

            <h2>5. Përgjegjësia</h2>
            <p>
              {COMPANY.name} nuk mban përgjegjësi për dëme që rezultojnë nga:
            </p>
            <ul>
              <li>Përdorimi i gabuar i shërbimeve</li>
              <li>Faktorë të jashtëm përtej kontrollit tonë</li>
              <li>Ndryshime të bëra nga klienti pas përfundimit të punës</li>
            </ul>

            <h2>6. Anulimi</h2>
            <p>
              Klienti ka të drejtë të anulojë porosinë duke njoftuar paraprakisht.
              Kushtet e anulimit diskutohen gjatë marrëveshjes fillestare.
            </p>

            <h2>7. Kontakti</h2>
            <p>
              Për pyetje në lidhje me kushtet dhe termat, na kontaktoni:
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
