// English alias for patinim-durres - uses same locale-aware component
import PlasteringDurresPage, { generateMetadata } from '../patinim-durres/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PlasteringDurresPage;
