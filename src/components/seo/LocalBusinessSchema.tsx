import { COMPANY, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import JsonLd from './JsonLd';

interface LocalBusinessSchemaProps {
  locale: string;
}

export default function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const descriptions = {
    sq: 'Shërbime profesionale të punimeve të gipsit, patinimit dhe lyerjes në Tiranë dhe Durrës.',
    en: 'Professional gypsum works, plastering and painting services in Tirana and Durrës.',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_CONFIG.url}/#business`,
    name: COMPANY.name,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.sq,
    url: SITE_CONFIG.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    image: `${SITE_CONFIG.url}/images/logo.svg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tiranë',
      addressRegion: 'Tiranë',
      addressCountry: 'AL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.3275,
      longitude: 19.8187,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Tiranë',
        '@id': 'https://www.wikidata.org/wiki/Q19689',
      },
      {
        '@type': 'City',
        name: 'Durrës',
        '@id': 'https://www.wikidata.org/wiki/Q179923',
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.tiktok,
      SOCIAL_LINKS.google,
    ],
    knowsAbout: [
      'Punime gipsi',
      'Tavane të varura me gips',
      'Punime gipsi për sallone',
      'Punime gipsi për televizor',
      'Ndarje hapësirash me panel gipsi',
      'Patinim murash',
      'Suva dekorative',
      'Lyerje shtëpie',
      'Lyerje e brendshme dhe e jashtme',
      'Izolim akustik dhe termik',
      'Rinovim apartamentesh',
      'Gypsum works',
      'Suspended gypsum ceilings',
      'Drywall partitions',
      'Wall plastering',
      'Decorative plaster',
      'Interior and exterior painting',
      'Apartment renovation',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '5',
      reviewCount: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'sq' ? 'Shërbimet Tona' : 'Our Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'sq' ? 'Punime Gipsi' : 'Gypsum Works',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'sq' ? 'Patinim' : 'Wall Plastering',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'sq' ? 'Lyerje' : 'Painting',
          },
        },
      ],
    },
  };

  return <JsonLd data={schema} />;
}
