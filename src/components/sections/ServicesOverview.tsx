import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { QuoteButton } from '@/components/modals';
import { ArrowIcon } from '@/components/ui/Icons';

export default function ServicesOverview() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    {
      id: 'gypsum',
      href: '/',
      image: '/images/gallery/tavan-gipsi-profil-led-dhome-2.jpeg',
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
      image: '/images/services/painting/commercial-exterior-1.webp',
      imageAlt: locale === 'sq' ? 'Lyerje fasade të jashtme nga Torra Gips' : 'Exterior facade painting by Torra Gips',
      features: locale === 'sq'
        ? ['Lyerje brendshme', 'Lyerje jashtme', 'Bojëra ekologjike', 'Efekte dekorative']
        : ['Interior painting', 'Exterior painting', 'Eco-friendly paints', 'Decorative effects'],
    },
  ];

  return (
    <section className="section-padding bg-plaster-50">
      <div className="container-custom">
        <div className="sec-head">
          <h2 className="h2">{t('services.title')}</h2>
          <p className="lead">{t('services.subtitle')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="card-hover group flex flex-col">
              <div className="frame aspect-[3/4]">
                <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="mb-3 text-xl font-bold text-ink-900 md:text-2xl">{t(`services.${service.id}.title`)}</h3>
                <p className="copy mb-5">{t(`services.${service.id}.shortDescription`)}</p>

                <ul className="mb-6 space-y-2.5 text-[0.9375rem] text-ink-800">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="h-4 w-4 shrink-0 text-tint" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M3 8.5l3.2 3.2L13 4.8" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-2 border-t border-line pt-5 text-[0.9375rem] font-bold text-tint">
                  {t('common.learnMore')}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-10 text-center">
          <p className="lead mb-6">
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
