import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout';
import { BreadcrumbSchema } from '@/components/seo';
import { COMPANY } from '@/lib/constants';

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
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return {
    title: t('title'),
    description: 'Privacy policy for Torra Gips website. Learn how we collect, use and protect your personal data.',
    alternates: {
      canonical: `/${locale}/privacy-policy/`,
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
          { name: 'Home', url: `/${locale}/` },
          { name: t('title'), url: `/${locale}/privacy-policy/` },
        ]}
      />

      <PageHeader title={t('title')} breadcrumbs={breadcrumbs}>
        <p className="mt-6 text-sm text-ink-500">
          {t('lastUpdated')}: January 2024
        </p>
      </PageHeader>

      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="border-t border-ink-900" />
          <div className="prose prose-lg max-w-3xl pt-10 md:pt-14 lg:ml-[33.333%]">
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
