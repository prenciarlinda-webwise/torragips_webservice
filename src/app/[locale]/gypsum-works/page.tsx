// English alias for punime-gipsi - uses same locale-aware component
import GypsumWorksPage, { generateMetadata } from '../punime-gipsi/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default GypsumWorksPage;
