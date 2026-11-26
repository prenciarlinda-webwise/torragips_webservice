import type { FaqItem } from '@/content/pages/types';
import { FAQSchema } from '@/components/seo';
import RichText, { stripLinks } from './RichText';

// Static FAQ: every question is a visible H3 with its answer always in the HTML,
// so search engines and AI answer engines can extract each pair.
export default function SpecFAQ({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="section-padding bg-neutral-50">
      <FAQSchema items={items.map((i) => ({ question: i.question, answer: stripLinks(i.answer) }))} />
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-8">{title}</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.question} className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-dark-800 mb-2">{item.question}</h3>
              <p className="text-text-light leading-relaxed">
                <RichText text={item.answer} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
