import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { QuoteButton } from '@/components/modals';

export default function ServicesOverview() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    {
      id: 'gypsum',
      href: locale === 'sq' ? '/punime-gipsi' : '/gypsum-works',
      image: '/images/services/gypsum/tavane-te-varura-me-led-1.webp',
      imageAlt: locale === 'sq' ? 'Tavan i varur me ndriçim LED nga Torra Gips' : 'Suspended gypsum ceiling with LED lighting by Torra Gips',
      features: locale === 'sq'
        ? ['Tavane moderne', 'Ndarja dhomash', 'Izolim akustik', 'Dizajne me porosi']
        : ['Modern ceilings', 'Room partitions', 'Acoustic insulation', 'Custom designs'],
    },
    {
      id: 'plastering',
      href: locale === 'sq' ? '/patinim' : '/wall-plastering',
      image: '/images/services/gypsum/patinimi-i-mureve-1.webp',
      imageAlt: locale === 'sq' ? 'Patinim i mureve të brendshme nga Torra Gips' : 'Interior wall plastering by Torra Gips',
      features: locale === 'sq'
        ? ['Patinim brendshëm', 'Patinim jashtëm', 'Suva dekorative', 'Riparime muraturash']
        : ['Interior plastering', 'Exterior plastering', 'Decorative plaster', 'Wall repairs'],
    },
    {
      id: 'painting',
      href: locale === 'sq' ? '/lyerje' : '/painting',
      image: '/images/services/gypsum/ngjyra-fasada-e-jashtme-1.webp',
      imageAlt: locale === 'sq' ? 'Lyerje fasade të jashtme nga Torra Gips' : 'Exterior facade painting by Torra Gips',
      features: locale === 'sq'
        ? ['Lyerje brendshme', 'Lyerje jashtme', 'Bojëra ekologjike', 'Efekte dekorative']
        : ['Interior painting', 'Exterior painting', 'Eco-friendly paints', 'Decorative effects'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">{t('services.title')}</h2>
          <p className="text-lg text-text-light">{t('services.subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group block"
            >
              <div className="h-full bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden hover:border-primary-300 hover:bg-white hover:shadow-medium transition-all duration-300">
                {/* Service Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-primary transition-colors">
                    {t(`services.${service.id}.title`)}
                  </h3>

                  {/* Short Description */}
                  <p className="text-text-light mb-5 text-sm leading-relaxed">
                    {t(`services.${service.id}.shortDescription`)}
                  </p>

                  {/* Subservices */}
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-text">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-primary font-medium text-sm mt-auto pt-4 border-t border-neutral-200">
                    {t('common.learnMore')}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-12 border-t border-neutral-100">
          <p className="text-neutral-600 mb-6">
            {locale === 'sq'
              ? 'Nuk jeni të sigurt cili shërbim ju nevojitet? Na kontaktoni për një konsultë falas.'
              : 'Not sure which service you need? Contact us for a free consultation.'}
          </p>
          <QuoteButton variant="primary" size="lg">
            {t('common.getQuote')}
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
