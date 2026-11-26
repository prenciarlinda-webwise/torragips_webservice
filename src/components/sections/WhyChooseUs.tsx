import { useTranslations } from 'next-intl';

const FEATURES = ['experience', 'quality', 'team', 'pricing', 'warranty', 'support'];

export default function WhyChooseUs() {
  const t = useTranslations('whyUs');

  return (
    <section className="section-padding bg-plaster-100">
      <div className="container-custom">
        <div className="sec-head is-center">
          <h2 className="h2">{t('title')}</h2>
          <p className="lead">{t('subtitle')}</p>
        </div>

        {/* Numerals come from a CSS counter (see .numbered), not from the markup. */}
        <div className="numbered grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((id) => (
            <div key={id} className="card p-6 md:p-7">
              <span className="num mb-4" aria-hidden="true" />
              <h3 className="h3 mb-2">{t(`${id}.title`)}</h3>
              <p className="copy">{t(`${id}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
