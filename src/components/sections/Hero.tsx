import Image from 'next/image';
import { useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';
import type { PageCta } from '@/content/pages/types';
import { whatsappHref } from '@/components/features/StickyMobileCTA';
import { ContactForm } from '@/components/forms';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';

type Props = {
  title: string;
  answer: string;
  cta: PageCta;
  trust?: string;
  // Full-width background photo of finished work.
  image?: string;
};

const DEFAULT_IMAGE = '/images/gallery/projekt_komercial_torra_gips.webp';

export default function Hero({ title, answer, cta, trust, image = DEFAULT_IMAGE }: Props) {
  const locale = useLocale();
  const facts = trust?.split(' · ') ?? [];

  return (
    <section className="pt-[4.5rem]">
      <div className="relative isolate flex overflow-hidden lg:min-h-[min(calc(100svh-8.25rem),46rem)]">
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        {/* Dark-blue scrim: solid behind the copy, lighter towards the form */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sage-900/90 via-sage-900/60 to-sage-900/25" />

        <div className="container-custom grid items-center gap-x-12 gap-y-10 py-12 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="on-dark lg:col-span-7">
            <h1 className="display">{title}</h1>
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white md:mt-6 md:text-xl">{answer}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={`tel:${COMPANY.whatsapp}`} className="btn-ink btn-lg">
                <PhoneIcon />
                {cta.call}
              </a>
              <a
                href={whatsappHref(cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-sage-900"
              >
                <WhatsAppIcon />
                {cta.whatsapp}
              </a>
            </div>
          </div>

          <div className="bg-plaster-50 p-6 shadow-strong md:p-8 lg:col-span-5">
            <h2 className="text-2xl font-extrabold text-ink-900">
              {locale === 'sq' ? 'Merr Ofertë Falas' : 'Get Your Free Quote'}
            </h2>
            <p className="mb-6 mt-2 text-[0.9375rem] text-ink-600">
              {locale === 'sq'
                ? "Plotësoni të dhënat dhe do t'ju kontaktojmë menjëherë në WhatsApp."
                : "Fill in your details and we'll get back to you right away on WhatsApp."}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      {facts.length > 0 && (
        <div className="on-dark bg-plaster-50">
          <p className="container-custom grid text-sm font-bold text-ink-900 sm:grid-cols-3 md:text-base">
            {facts.map((fact) => (
              <span
                key={fact}
                className="border-b border-line py-4 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-5 sm:first:border-l-0 sm:first:pl-0"
              >
                {fact}
              </span>
            ))}
          </p>
        </div>
      )}
    </section>
  );
}
