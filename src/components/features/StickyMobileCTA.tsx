import { COMPANY } from '@/lib/constants';
import type { PageCta } from '@/content/pages/types';

export const whatsappHref = (message: string) =>
  `https://wa.me/${COMPANY.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;

// Mobile-only bottom bar with the page's two primary lead actions.
export default function StickyMobileCTA({ cta }: { cta: PageCta }) {
  return (
    <div
      id="sticky-mobile-cta"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line md:hidden"
    >
      <a
        href={`tel:${COMPANY.whatsapp}`}
        className="flex min-h-[3.5rem] items-center justify-center bg-cta px-3 py-2.5 text-center text-sm font-bold leading-tight text-cta-ink"
      >
        {cta.call}
      </a>
      <a
        href={whatsappHref(cta.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[3.5rem] items-center justify-center bg-plaster-50 px-3 py-2.5 text-center text-sm font-bold leading-tight text-ink-900"
      >
        {cta.whatsapp}
      </a>
    </div>
  );
}
