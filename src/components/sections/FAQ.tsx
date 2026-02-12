'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { FAQSchema } from '@/components/seo';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultItems: FAQItem[] = locale === 'sq'
    ? [
        {
          question: 'Çfarë shërbimesh ofron Torra Gips në Tiranë dhe Durrës?',
          answer: 'Torra Gips ofron punime gipsi profesionale, patinim murash dhe lyerje për projekte komerciale dhe rezidenciale. Kemi përfunduar 100+ projekte përfshirë Aeroportin e Vlorës, Green Coast Resort dhe Rolling Hills.',
        },
        {
          question: 'Sa kohë zgjat një projekt punimesh gipsi ose patinimi?',
          answer: 'Koha varet nga madhësia dhe kompleksiteti. Projekte të vogla zgjasin 1-2 javë, mesatare 2-4 javë, ndërsa projekte të mëdha komerciale mund të kërkojnë disa muaj. Punojmë sipas afateve tuaja.',
        },
        {
          question: 'Cilat materiale përdor Torra Gips?',
          answer: 'Përdorim vetëm materiale premium të certifikuara nga Knauf dhe Rigips për punime gipsi, dhe bojëra Dulux, Jotun dhe Caparol për lyerje. Zgjedhim materialin optimal për çdo projekt.',
        },
        {
          question: 'A punoni jashtë orarit për projekte komerciale?',
          answer: 'Po, për projekte komerciale ofrojmë fleksibilitet të plotë. Punojmë natën dhe në fundjavë për të minimizuar ndërprerjen e aktivitetit të biznesit tuaj.',
        },
        {
          question: 'Si mund të marr një ofertë falas nga Torra Gips?',
          answer: 'Na kontaktoni me telefon në +355 68 858 0058, email ose WhatsApp. Ofrojmë vizitë falas në vend dhe vlerësim të detajuar pa detyrim.',
        },
      ]
    : [
        {
          question: 'What services does Torra Gips offer in Tirana and Durrës?',
          answer: 'Torra Gips offers professional gypsum works, wall plastering and painting for commercial and residential projects. We have completed 100+ projects including Vlora Airport, Green Coast Resort and Rolling Hills.',
        },
        {
          question: 'How long does a gypsum works or plastering project take?',
          answer: 'Duration depends on size and complexity. Small projects take 1-2 weeks, medium 2-4 weeks, while large commercial projects may require several months. We work according to your deadlines.',
        },
        {
          question: 'What materials does Torra Gips use?',
          answer: 'We use only premium certified materials from Knauf and Rigips for gypsum works, and Dulux, Jotun and Caparol paints for painting. We choose the optimal material for each project.',
        },
        {
          question: 'Do you work outside business hours for commercial projects?',
          answer: 'Yes, for commercial projects we offer full flexibility. We work nights and weekends to minimize disruption to your business operations.',
        },
        {
          question: 'How can I get a free quote from Torra Gips?',
          answer: 'Contact us by phone at +355 68 858 0058, email or WhatsApp. We offer free on-site visits and detailed assessments with no obligation.',
        },
      ];

  const faqItems = items || defaultItems;

  return (
    <section className="section-padding bg-neutral-50">
      <FAQSchema items={faqItems} />
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mx-auto">{t('subtitle')}</p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-dark-800 pr-4">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    'w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <p className="px-6 pb-4 text-text-light">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
