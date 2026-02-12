import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import JsonLd from './JsonLd';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author?: string;
}

export default function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  author = COMPANY.name,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    ...(image && { image: `${SITE_CONFIG.url}${image}` }),
    datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: SITE_CONFIG.url,
    },
  };

  return <JsonLd data={schema} />;
}
