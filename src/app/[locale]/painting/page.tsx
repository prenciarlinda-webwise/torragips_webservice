// English alias for lyerje - uses same locale-aware component
import PaintingPage, { generateMetadata } from '../lyerje/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PaintingPage;
