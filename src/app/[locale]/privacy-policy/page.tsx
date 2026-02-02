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
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return {
    title: t('title'),
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
          { name: 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/privacy-policy/` },
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
            <h2>1. Information We Collect</h2>
            <p>
              When you contact us through our contact form or WhatsApp, we collect:
            </p>
            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Your message or inquiry</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>The information we collect is used to:</p>
            <ul>
              <li>Contact you regarding your inquiry</li>
              <li>Provide information about our services</li>
              <li>Send you quotes if you have expressed interest</li>
            </ul>

            <h2>3. Data Storage</h2>
            <p>
              Your personal data is stored securely and is not shared with third parties
              except when required by law.
            </p>

            <h2>4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Our website uses cookies to improve user experience.
              Cookies are small text files stored on your device.
            </p>

            <h2>6. Contact</h2>
            <p>
              For questions regarding our privacy policy, contact us at:
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
