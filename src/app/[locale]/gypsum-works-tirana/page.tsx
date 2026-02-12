// English alias for punime-gipsi-tirane - uses same locale-aware component
import GypsumWorksTiranaPage, { generateMetadata } from '../punime-gipsi-tirane/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default GypsumWorksTiranaPage;
