import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import JsonLd from './JsonLd';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export default function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = COMPANY.name,
}: ArticleSchemaProps) {
  const fullUrl = `${SITE_CONFIG.url}${url}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: fullUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    ...(image && { image: `${SITE_CONFIG.url}${image}` }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.webp`,
      },
    },
  };

  return <JsonLd data={schema} />;
}
