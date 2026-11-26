import { useTranslations } from 'next-intl';
import { COMPANY } from '@/lib/constants';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
      {/* Poster fallback (also covers reduced-motion / video load) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/videos/hero-punime-gipsi-poster.webp')" }}
      />

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/hero-punime-gipsi-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero-punime-gipsi-komerciale.webm" type="video/webm" />
        <source src="/videos/hero-punime-gipsi-komerciale.mp4" type="video/mp4" />
      </video>

      {/* Dark scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-900/75 to-black/70" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto lg:mx-0">
            {t('subtitle')}
          </p>

          {/* CTAs: call + WhatsApp floor plan */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={`tel:${COMPANY.whatsapp}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-accent hover:bg-accent-700 text-white shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('callCta')}
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp.replace('+', '')}?text=${encodeURIComponent(t('whatsappMessage'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              {t('whatsappCta')}
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm md:text-base text-white/75">{t('trust')}</p>
        </div>
      </div>
    </section>
  );
}
