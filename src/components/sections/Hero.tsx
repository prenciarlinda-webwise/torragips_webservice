import Image from 'next/image';
import { COMPANY } from '@/lib/constants';
import type { PageCta } from '@/content/pages/types';
import { whatsappHref } from '@/components/features/StickyMobileCTA';

type Props = {
  title: string;
  answer: string;
  cta: PageCta;
  trust?: string;
  // Background: the homepage uses the project video, other pages a photo.
  image?: string;
};

export default function Hero({ title, answer, cta, trust, image }: Props) {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
      {image ? (
        <Image src={image} alt="" fill priority className="object-cover" />
      ) : (
        <>
          {/* Poster fallback (also covers reduced-motion / video load) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/videos/hero-punime-gipsi-poster.webp')" }}
          />
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
        </>
      )}

      {/* Dark scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-900/75 to-black/70" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto lg:mx-0">{answer}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={`tel:${COMPANY.whatsapp}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-accent hover:bg-accent-700 text-white shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {cta.call}
            </a>
            <a
              href={whatsappHref(cta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              {cta.whatsapp}
            </a>
          </div>

          {trust && <p className="mt-8 text-sm md:text-base text-white/75">{trust}</p>}
        </div>
      </div>
    </section>
  );
}
