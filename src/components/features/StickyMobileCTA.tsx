import { COMPANY } from '@/lib/constants';
import type { PageCta } from '@/content/pages/types';

export const whatsappHref = (message: string) =>
  `https://wa.me/${COMPANY.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;

// Mobile-only bottom bar with the page's two primary lead actions.
export default function StickyMobileCTA({ cta }: { cta: PageCta }) {
  return (
    <div
      id="sticky-mobile-cta"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-2 bg-white/95 backdrop-blur border-t border-neutral-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
    >
      <a
        href={`tel:${COMPANY.whatsapp}`}
        className="flex items-center justify-center rounded-lg bg-accent text-white font-semibold text-sm py-3 px-2 text-center"
      >
        {cta.call}
      </a>
      <a
        href={whatsappHref(cta.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-green-600 text-white font-semibold text-sm py-3 px-2 text-center"
      >
        {cta.whatsapp}
      </a>
    </div>
  );
}
