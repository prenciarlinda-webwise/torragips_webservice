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
  title?: string;
  subtitle?: string;
}

export default function FAQ({ items, title, subtitle }: FAQProps) {
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
    <section className="section-padding bg-plaster-100">
      <FAQSchema items={faqItems} />
      <div className="container-custom">
        <div className="sec-head is-center">
          <h2 className="h2">{title ?? t('title')}</h2>
          <p className="lead">{subtitle ?? t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          <div className="contents">
            {faqItems.map((item, index) => (
              <div key={index} className="card px-6">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="h3">{item.question}</span>
                  <svg
                    className={cn('mt-1.5 h-4 w-4 shrink-0 text-ink-900 transition-transform duration-300', openIndex === index && 'rotate-45')}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path d="M8 1v14M1 8h14" />
                  </svg>
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300',
                    openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="copy pb-6">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
