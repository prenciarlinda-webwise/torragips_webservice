'use client';

import { useRef } from 'react';
import { JsonLd } from '@/components/seo';
import { SHORT_VIDEOS, YOUTUBE_CHANNEL_URL, type ShortVideo } from '@/lib/constants/videos';

type Props = {
  locale: string;
  /** Filter by service; omit to show all videos. */
  category?: ShortVideo['category'];
  /** Max videos to show (default 8). */
  limit?: number;
};

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/oar2.jpg`;

export default function VideoShowcase({ locale, category, limit = 8 }: Props) {
  const isSq = locale === 'sq';
  const trackRef = useRef<HTMLDivElement>(null);

  const videos = SHORT_VIDEOS.filter((v) => !category || v.category === category).slice(0, limit);
  if (videos.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const title = (v: ShortVideo) => (isSq ? v.titleSq : v.titleEn);
  const heading = isSq ? 'Punët tona në video' : 'Our work on video';
  const intro = isSq
    ? 'Shikoni punime reale gipsi, tavane dhe lyerje nga kantieret tona në Tiranë dhe Durrës.'
    : 'Watch real gypsum, ceiling and painting work from our job sites in Tirana and Durrës.';

  const schema = videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${title(v)} | Torra Gips`,
    description: isSq
      ? `${v.titleSq} nga Torra Gips, Tiranë dhe Durrës.`
      : `${v.titleEn} by Torra Gips, Tirana and Durrës.`,
    thumbnailUrl: thumb(v.id),
    uploadDate: v.uploadDate,
    ...(v.seconds ? { duration: `PT${v.seconds}S` } : {}),
    contentUrl: `https://www.youtube.com/shorts/${v.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    publisher: { '@id': 'https://www.torragips.com/#business' },
  }));

  return (
    <section className="py-16 bg-white">
      <JsonLd data={schema as unknown as Record<string, any>} />
      <div className="container-custom">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-3">{heading}</h2>
          <p className="text-neutral-600">{intro}</p>
        </div>

        {/* Slider: swipe on touch, arrows on desktop. Each card opens the Short on YouTube. */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={isSq ? 'Videoja e mëparshme' : 'Previous videos'}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-neutral-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={isSq ? 'Videoja tjetër' : 'Next videos'}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-neutral-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${isSq ? 'Shiko në YouTube' : 'Watch on YouTube'}: ${title(v)}`}
                className="group snap-start shrink-0 w-[46%] sm:w-[31%] md:w-[23%] lg:w-[18.5%]"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-dark-800 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb(v.id)}
                    alt={title(v)}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium leading-snug">
                    {title(v)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            {isSq ? 'Shiko të gjitha videot në YouTube' : 'Watch all videos on YouTube'} →
          </a>
        </div>
      </div>
    </section>
  );
}
