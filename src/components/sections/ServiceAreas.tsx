import { useTranslations, useLocale } from 'next-intl';

export default function ServiceAreas() {
  const t = useTranslations('areas');
  const locale = useLocale();

  const areas = [
    {
      name: t('tirana'),
      description: 'Tiranë, Kashar, Kamëz, Farkë, Vaqarr',
    },
    {
      name: t('durres'),
      description: 'Durrës, Shkozet, Plazh, Currila',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Areas List */}
          <div className="space-y-4">
            {areas.map((area, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-2xl p-6 flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-800 mb-1">{area.name}</h3>
                  <p className="text-text-light">{area.description}</p>
                </div>
              </div>
            ))}

            {/* Contact Info */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold text-dark-800 mb-3">
                {locale === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}
              </h3>
              <div className="space-y-2 text-text-light">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +355 68 858 0058
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  torragips@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d383483.7474060648!2d19.649991999999994!3d41.33133579999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa960a1e5eab1fc9%3A0xe0f1ec40292dfb0b!2sPunime%20Gipsi%20-%20Torra%20Gips!5e0!3m2!1sen!2s!4v1770036082020!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Torra Gips Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
