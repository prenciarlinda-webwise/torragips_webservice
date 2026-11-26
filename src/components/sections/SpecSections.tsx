import Image from 'next/image';
import type { ContentSection } from '@/content/pages/types';
import RichText from './RichText';

export default function SpecSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s, idx) => (
        <section key={s.title} className={idx % 2 === 0 ? 'section-padding bg-white' : 'section-padding bg-neutral-50'}>
          <div className={s.items?.some((i) => i.image) ? 'container-custom' : 'container-custom max-w-4xl'}>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-6">{s.title}</h2>

            {s.paragraphs?.map((p, i) => (
              <p key={i} className="text-lg text-text-light leading-relaxed mb-4 max-w-4xl">
                <RichText text={p} />
              </p>
            ))}

            {s.items && (
              <div className={s.items.some((i) => i.image) ? 'grid md:grid-cols-2 gap-6 mt-8' : 'space-y-8 mt-8'}>
                {s.items.map((item) => (
                  <article
                    key={item.title}
                    className={item.image ? 'bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden' : ''}
                  >
                    {item.image && (
                      <div className="relative aspect-[16/9] w-full">
                        <Image src={item.image} alt={item.alt ?? item.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className={item.image ? 'p-6' : ''}>
                      <h3 className="text-xl font-bold text-primary-800 mb-3">{item.title}</h3>
                      <p className="text-text-light leading-relaxed">
                        <RichText text={item.text} />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {s.table && (
              <div className="overflow-x-auto rounded-xl shadow-soft mt-8">
                <table className="w-full min-w-[640px] bg-white text-left text-sm md:text-base">
                  <thead className="bg-primary text-white">
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-4 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row) => (
                      <tr key={row[0]} className="border-t border-neutral-200 align-top">
                        <th scope="row" className="px-4 py-4 font-semibold text-dark-800">
                          {row[0]}
                        </th>
                        {row.slice(1).map((cell, i) => (
                          <td key={i} className="px-4 py-4 text-text">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {s.after?.map((p, i) => (
              <p key={i} className="text-lg text-text-light leading-relaxed mt-6">
                <RichText text={p} />
              </p>
            ))}

            {s.steps && (
              <ol className="mt-8 space-y-6">
                {s.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-lg text-text-light leading-relaxed">
                      <strong className="text-dark-800">{step.title}:</strong> <RichText text={step.text} />
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
