import { COMPANY, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import JsonLd from './JsonLd';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      contactType: 'customer service',
      email: COMPANY.email,
      areaServed: 'AL',
      availableLanguage: ['Albanian', 'English'],
    },
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.tiktok,
      SOCIAL_LINKS.google,
    ],
  };

  return <JsonLd data={schema} />;
}
