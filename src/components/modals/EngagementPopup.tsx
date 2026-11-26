'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';
import { useQuoteModal } from './QuoteModalContext';

const DISMISS_KEY = 'torragips_engagement_popup_shown';
const TRIGGER_DELAY_MS = 15000;

export default function EngagementPopup() {
  const locale = useLocale();
  const { open: openQuote } = useQuoteModal();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const startTimer = () => {
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;
      timerRef.current = setTimeout(() => {
        setVisible(true);
      }, TRIGGER_DELAY_MS);
    };

    window.addEventListener('scroll', startTimer, { passive: true });

    return () => {
      window.removeEventListener('scroll', startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, '1');
  };

  const handleQuote = () => {
    dismiss();
    openQuote();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-[90] animate-slide-up">
      <div className="on-dark relative bg-plaster-50 shadow-strong">

        <div className="relative p-6">
          <button
            onClick={dismiss}
            className="absolute right-3 top-3 p-1.5 text-ink-500 transition-colors hover:text-ink-900"
            aria-label={locale === 'sq' ? 'Mbyll' : 'Close'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="wide mb-2 pr-6 text-xl font-semibold tracking-tight text-ink-900">
            {locale === 'sq' ? 'Nuk keni kohë për të humbur?' : 'No time to lose?'}
          </p>
          <p className="mb-5 text-sm leading-relaxed text-ink-600">
            {locale === 'sq'
              ? 'Na telefononi direkt për projektin tuaj ose plotësoni formularin dhe ju kontaktojmë ne.'
              : "Call us directly to talk about your project, or fill out the form and we'll reach out to you."}
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${COMPANY.phone}`}
              className="btn-light flex-1 !px-4 !text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {locale === 'sq' ? 'Telefono Tani' : 'Call Now'}
            </a>
            <button
              onClick={handleQuote}
              className="btn-line-light flex-1 !px-4 !text-sm"
            >
              {locale === 'sq' ? 'Plotëso Formularin' : 'Fill the Form'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
