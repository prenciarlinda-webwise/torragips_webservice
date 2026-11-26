// English alias for cmime - uses same locale-aware component
import PricingPage, { generateMetadata } from '../cmime/page';

// Only generate this page for English locale
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PricingPage;
