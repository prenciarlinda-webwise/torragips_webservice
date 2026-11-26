import Image from 'next/image';
import type { ContentSection } from '@/content/pages/types';
import RichText from './RichText';

// Long-form page content. Sections alternate white / light grey; each has a
// heading, intro copy, then its cards, table or numbered steps.
export default function SpecSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s, idx) => {
        const hasImages = s.items?.some((i) => i.image);
        const stepCols = s.steps && s.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

        return (
          <section key={s.title} className={idx % 2 === 0 ? 'section-padding bg-plaster-50' : 'section-padding bg-plaster-100'}>
            <div className="container-custom">
              <div className="sec-head">
                <h2 className="h2">{s.title}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="lead">
                    <RichText text={p} />
                  </p>
                ))}
              </div>

              {s.items && hasImages && (
                // Two columns (four items form 2 rows x 2 columns); on wide screens each
                // card puts the uncropped photo beside its text.
                <div className="grid gap-6 md:grid-cols-2">
                  {s.items.map((item) => (
                    <article key={item.title} className="card group flex flex-col xl:flex-row">
                      {item.image && (
                        <div className="shrink-0 xl:w-[42%]">
                          <div className="frame aspect-[3/4]">
                            <Image
                              src={item.image}
                              alt={item.alt ?? item.title}
                              fill
                              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 45vw, 100vw"
                            />
                          </div>
                        </div>
                      )}
                      <div className="p-5 md:p-7">
                        <h3 className="h3 mb-3">{item.title}</h3>
                        <p className="copy">
                          <RichText text={item.text} />
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {s.items && !hasImages && (
                <div className="grid gap-6 md:grid-cols-2">
                  {s.items.map((item) => (
                    <article key={item.title} className="card p-6 md:p-7">
                      <h3 className="h3 mb-3">{item.title}</h3>
                      <p className="copy">
                        <RichText text={item.text} />
                      </p>
                    </article>
                  ))}
                </div>
              )}

              {s.table && (
                <div className="overflow-x-auto border border-line">
                  <table className="w-full min-w-[640px] bg-plaster-50 text-left text-[0.9375rem]">
                    <thead className="bg-sage-600 text-white">
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} scope="col" className="px-5 py-4 align-bottom font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-line align-top">
                          <th scope="row" className="px-5 py-4 font-semibold text-ink-900">
                            {row[0]}
                          </th>
                          {row.slice(1).map((cell, i) => (
                            <td key={i} className="px-5 py-4 text-ink-600">
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
                <p key={i} className="copy mt-6 max-w-4xl">
                  <RichText text={p} />
                </p>
              ))}

              {s.steps && (
                <ol className={`grid gap-6 sm:grid-cols-2 ${stepCols}`}>
                  {s.steps.map((step, i) => (
                    <li key={step.title} className="card p-6 md:p-7">
                      <span className="mb-5 flex h-10 w-10 items-center justify-center bg-sage-600 text-base font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="copy">
                        <strong className="mb-2 block text-lg font-bold leading-snug text-ink-900">{step.title}:</strong>{' '}
                        <RichText text={step.text} />
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
