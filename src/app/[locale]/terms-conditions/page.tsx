import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout';
import { BreadcrumbSchema } from '@/components/seo';
import { COMPANY } from '@/lib/constants';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return {
    title: t('title'),
    description: 'Terms and conditions for Torra Gips services. Read about our service terms, warranty, pricing and cancellation policy.',
    alternates: {
      canonical: `/${locale}/terms-conditions/`,
      languages: {
        sq: '/sq/kushtet-dhe-termat/',
        en: '/en/terms-conditions/',
      },
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
          { name: 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/terms-conditions/` },
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
              {t('lastUpdated')}: January 2024
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using the services of {COMPANY.name}, you accept these terms and conditions.
              If you do not agree with any term, please do not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              {COMPANY.name} provides professional gypsum works, plastering and painting services.
              All services are provided according to professional standards and quality materials.
            </p>

            <h2>3. Pricing and Payment</h2>
            <ul>
              <li>Prices may vary according to the project and specific conditions</li>
              <li>Final quote is given after site assessment</li>
              <li>Payment is made according to agreement with the client</li>
              <li>For large projects, advance payment may be required</li>
            </ul>

            <h2>4. Warranty</h2>
            <p>
              We offer warranty for the quality of our work. The warranty covers defects in
              materials and workmanship for a specified period after project completion.
            </p>

            <h2>5. Liability</h2>
            <p>
              {COMPANY.name} is not liable for damages resulting from:
            </p>
            <ul>
              <li>Misuse of services</li>
              <li>External factors beyond our control</li>
              <li>Changes made by the client after work completion</li>
            </ul>

            <h2>6. Cancellation</h2>
            <p>
              The client has the right to cancel the order with prior notice.
              Cancellation terms are discussed during the initial agreement.
            </p>

            <h2>7. Contact</h2>
            <p>
              For questions regarding terms and conditions, contact us:
            </p>
            <ul>
              <li>Email: {COMPANY.email}</li>
              <li>Phone: {COMPANY.phone}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
