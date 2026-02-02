'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';
import { Modal, Button, Input, Textarea, Select } from '@/components/ui';

export default function WhatsAppButton() {
  const t = useTranslations();
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    message: '',
  });

  const services = [
    { value: 'gypsum', label: t('nav.servicesItems.gypsum') },
    { value: 'plastering', label: t('nav.servicesItems.plastering') },
    { value: 'painting', label: t('nav.servicesItems.painting') },
  ];

  const handleQuickContact = () => {
    const message = t('whatsapp.defaultMessage');
    window.open(getWhatsAppLink(COMPANY.phone, message), '_blank');
  };

  const handleFormSubmit = () => {
    const serviceLabel = services.find(s => s.value === formData.service)?.label || '';
    const message = locale === 'sq'
      ? `Përshëndetje! Quhem ${formData.name}. Jam i/e interesuar për ${serviceLabel}. ${formData.message}`
      : `Hello! My name is ${formData.name}. I am interested in ${serviceLabel}. ${formData.message}`;

    window.open(getWhatsAppLink(COMPANY.phone, message), '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', service: '', message: '' });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Quick Contact Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center space-x-3 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label={t('whatsapp.buttonLabel')}
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pl-4 transition-all duration-300 whitespace-nowrap">
            {t('whatsapp.quickContact')}
          </span>
          <div className="w-14 h-14 flex items-center justify-center">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </button>
      </div>

      {/* Quick Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('whatsapp.quickContact')}
        size="md"
      >
        <div className="p-6 space-y-4">
          <p className="text-text-light">
            {locale === 'sq'
              ? 'Plotësoni të dhënat dhe do të hapim WhatsApp me mesazhin tuaj.'
              : 'Fill in your details and we will open WhatsApp with your message.'}
          </p>

          <Input
            label={t('contact.form.name')}
            placeholder={t('contact.form.namePlaceholder')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Select
            label={t('contact.form.service')}
            placeholder={t('contact.form.selectService')}
            options={services}
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          />

          <Textarea
            label={t('contact.form.message')}
            placeholder={t('contact.form.messagePlaceholder')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
          />

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={handleQuickContact}
              className="flex-1"
            >
              {locale === 'sq' ? 'Mesazh i Shpejtë' : 'Quick Message'}
            </Button>
            <Button
              variant="primary"
              onClick={handleFormSubmit}
              disabled={!formData.name || !formData.service}
              className="flex-1 !bg-green-500 hover:!bg-green-600"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
