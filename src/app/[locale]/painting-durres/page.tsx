// English alias for lyerje-durres - uses same locale-aware component
import PaintingDurresPage, { generateMetadata } from '../lyerje-durres/page';

// Only generate this page for English locale
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export { generateMetadata };
export default PaintingDurresPage;
