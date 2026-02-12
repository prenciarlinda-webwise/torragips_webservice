// English alias for lyerje-tirane - uses same locale-aware component
import PaintingTiranaPage, { generateMetadata } from '../lyerje-tirane/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PaintingTiranaPage;
