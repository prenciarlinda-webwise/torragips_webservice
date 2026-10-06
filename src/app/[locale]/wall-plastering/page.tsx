// English alias for patinim - uses same locale-aware component
import PlasteringPage, { generateMetadata } from '../patinim/page';

// Only generate this page for English locale
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PlasteringPage;
