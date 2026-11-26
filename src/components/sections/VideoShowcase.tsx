'use client';

import { useRef } from 'react';
import { JsonLd } from '@/components/seo';
import { ArrowIcon } from '@/components/ui/Icons';
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

  const arrowBtn =
    'flex h-11 w-11 items-center justify-center border border-ink-400 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-plaster-50';

  return (
    <section className="section-padding">
      <JsonLd data={schema as unknown as Record<string, any>} />
      <div className="container-custom">
        <div className="sec-head is-center">
          <h2 className="h2">{heading}</h2>
          <p className="lead">{intro}</p>
        </div>

        <div className="relative">
          <div className="contents">
            <div className="absolute -top-16 right-0 hidden gap-2 md:flex">
              <button type="button" onClick={() => scrollBy(-1)} aria-label={isSq ? 'Videoja e mëparshme' : 'Previous videos'} className={arrowBtn}>
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label={isSq ? 'Videoja tjetër' : 'Next videos'} className={arrowBtn}>
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider: swipe on touch, arrows on desktop. Each card opens the Short on YouTube. */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/shorts/${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${isSq ? 'Shiko në YouTube' : 'Watch on YouTube'}: ${title(v)}`}
              className="group w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-[19%]"
            >
              <div className="frame aspect-[9/16]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(v.id)} alt={title(v)} loading="lazy" className="absolute inset-0 h-full w-full" />
                <span className="absolute bottom-0 left-0 flex h-12 w-12 items-center justify-center bg-cta text-cta-ink">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>
              <span className="mt-3 block text-sm font-medium leading-snug text-ink-800">{title(v)}</span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="link-rule">
            {isSq ? 'Shiko të gjitha videot në YouTube' : 'Watch all videos on YouTube'} →
          </a>
        </div>
      </div>
    </section>
  );
}
