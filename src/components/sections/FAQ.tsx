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
          question: 'A punoni me projekte komerciale të mëdha?',
          answer: 'Po, specializohemi në projekte komerciale të çdo shkalle - nga zyra dhe dyqane deri tek aeroportet, hotelet dhe qendrat tregtare. Kemi përvojë me projekte si Aeroporti i Vlorës, Green Coast Resort dhe Rolling Hills.',
        },
        {
          question: 'Sa kohë zgjat një projekt komercial?',
          answer: 'Koha varet nga madhësia dhe kompleksiteti i projektit. Për projekte të vogla komerciale 1-2 javë, për projekte mesatare 2-4 javë, ndërsa për projekte të mëdha mund të zgjasin disa muaj. Punojmë sipas afateve tuaja.',
        },
        {
          question: 'A mund të punoni jashtë orarit të punës?',
          answer: 'Po, për projekte komerciale ofrojmë fleksibilitet të plotë. Mund të punojmë natën ose në fundjavë për të minimizuar ndërprerjen e aktivitetit tuaj të biznesit.',
        },
        {
          question: 'Cilat standarde sigurie ndiqni?',
          answer: 'Ndjekim të gjitha standardet e sigurisë në punë. Ekipi ynë është i trajnuar për projekte komerciale dhe përdorim pajisje mbrojtëse. Jemi të siguruar plotësisht.',
        },
        {
          question: 'Si funksionon procesi i ofertës për projekte të mëdha?',
          answer: 'Për projekte komerciale, ofrojmë vizitë falas në vend, vlerësim të detajuar dhe ofertë të personalizuar. Mund të punojmë me arkitektët dhe kontraktorët tuaj.',
        },
      ]
    : [
        {
          question: 'Do you work on large commercial projects?',
          answer: 'Yes, we specialize in commercial projects of all scales - from offices and retail stores to airports, hotels and shopping centers. We have experience with projects like Vlora Airport, Green Coast Resort and Rolling Hills.',
        },
        {
          question: 'How long does a commercial project take?',
          answer: 'Duration depends on project size and complexity. Small commercial projects take 1-2 weeks, medium projects 2-4 weeks, while large projects can take several months. We work according to your deadlines.',
        },
        {
          question: 'Can you work outside business hours?',
          answer: 'Yes, for commercial projects we offer full flexibility. We can work nights or weekends to minimize disruption to your business operations.',
        },
        {
          question: 'What safety standards do you follow?',
          answer: 'We follow all workplace safety standards. Our team is trained for commercial projects and we use protective equipment. We are fully insured.',
        },
        {
          question: 'How does the quoting process work for large projects?',
          answer: 'For commercial projects, we offer a free on-site visit, detailed assessment and personalized quote. We can work with your architects and contractors.',
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
