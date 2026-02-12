// English alias for punime-gipsi-durres - uses same locale-aware component
import GypsumWorksDurresPage, { generateMetadata } from '../punime-gipsi-durres/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default GypsumWorksDurresPage;
