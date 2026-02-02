import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import JsonLd from './JsonLd';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
  locale: string;
}

export default function ServiceSchema({
  name,
  description,
  url,
  image,
  priceRange,
  locale,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: COMPANY.name,
      telephone: COMPANY.phone,
      email: COMPANY.email,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Tiranë',
      },
      {
        '@type': 'City',
        name: 'Durrës',
      },
    ],
    ...(image && { image: `${SITE_CONFIG.url}${image}` }),
    ...(priceRange && { priceRange }),
  };

  return <JsonLd data={schema} />;
}
