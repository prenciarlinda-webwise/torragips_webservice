import { useTranslations } from 'next-intl';
import { COMPANY } from '@/lib/constants';

// Mobile-only bottom bar with the two primary lead actions (call + WhatsApp floor plan).
export default function StickyMobileCTA() {
  const t = useTranslations('hero');
  const waHref = `https://wa.me/${COMPANY.whatsapp.replace('+', '')}?text=${encodeURIComponent(t('whatsappMessage'))}`;

  return (
    <div id="sticky-mobile-cta" className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-2 bg-white/95 backdrop-blur border-t border-neutral-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <a
        href={`tel:${COMPANY.whatsapp}`}
        className="flex items-center justify-center rounded-lg bg-accent text-white font-semibold text-sm py-3 px-2 text-center"
      >
        {t('callCta')}
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-green-600 text-white font-semibold text-sm py-3 px-2 text-center"
      >
        {t('whatsappCta')}
      </a>
    </div>
  );
}
