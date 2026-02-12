// English alias for patinim-tirane - uses same locale-aware component
import PlasteringTiranaPage, { generateMetadata } from '../patinim-tirane/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PlasteringTiranaPage;
