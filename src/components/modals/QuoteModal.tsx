'use client';

import { useLocale } from 'next-intl';
import { Modal } from '@/components/ui';
import { ContactForm } from '@/components/forms';
import { useQuoteModal } from './QuoteModalContext';

export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const locale = useLocale();

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size="lg"
      title={locale === 'sq' ? 'Merr Ofertë Falas' : 'Get Your Free Quote'}
    >
      <div className="p-6 md:p-8">
        <p className="text-text-light mb-6">
          {locale === 'sq'
            ? "Plotësoni të dhënat dhe do t'ju kontaktojmë menjëherë në WhatsApp."
            : "Fill in your details and we'll get back to you right away on WhatsApp."}
        </p>
        <ContactForm />
      </div>
    </Modal>
  );
}
