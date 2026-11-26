import type { FaqItem } from '@/content/pages/types';
import { FAQSchema } from '@/components/seo';
import RichText, { stripLinks } from './RichText';

// Static FAQ: every question is a visible H3 with its answer always in the HTML,
// so search engines and AI answer engines can extract each pair.
export default function SpecFAQ({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="section-padding bg-plaster-100">
      <FAQSchema items={items.map((i) => ({ question: i.question, answer: stripLinks(i.answer) }))} />
      <div className="container-custom max-w-4xl">
        <div className="sec-head">
          <h2 className="h2">{title}</h2>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.question} className="card p-6 md:p-7">
              <h3 className="h3 mb-2">{item.question}</h3>
              <p className="copy">
                <RichText text={item.answer} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
