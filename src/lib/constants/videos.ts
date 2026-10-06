// YouTube Shorts from https://www.youtube.com/@PunimeGipsi-TorraGips
// To add a video: append an entry here. Newest first. `seconds` is optional.
export type ShortVideo = {
  id: string;
  category: 'gips' | 'lyerje';
  titleSq: string;
  titleEn: string;
  uploadDate: string; // YYYY-MM-DD
  seconds?: number;
};

export const SHORT_VIDEOS: ShortVideo[] = [
  { id: 'eJW6xO0sFOk', category: 'gips', titleSq: 'Punime Gipsi në Proces', titleEn: 'Gypsum Works in Progress', uploadDate: '2026-10-04' },
  { id: 'yrAUUZAMqNA', category: 'lyerje', titleSq: 'Lyerje Profesionale e Ambienteve', titleEn: 'Professional Interior Painting', uploadDate: '2026-10-02', seconds: 20 },
  { id: 'YDWExvGYw0w', category: 'gips', titleSq: 'Punime Profesionale Gipsi', titleEn: 'Professional Gypsum Works', uploadDate: '2026-09-28', seconds: 16 },
  { id: '36cj64GHKyk', category: 'gips', titleSq: 'Punime Gipsi në Proces', titleEn: 'Gypsum Works in Progress', uploadDate: '2026-09-25', seconds: 21 },
  { id: 'adnsafMcpKE', category: 'gips', titleSq: 'Shërbime Gipsi Profesionale', titleEn: 'Professional Gypsum Services', uploadDate: '2026-09-23', seconds: 41 },
  { id: 'MkKDntZ0cEE', category: 'lyerje', titleSq: 'Lyerje Profesionale e Ambienteve', titleEn: 'Professional Interior Painting', uploadDate: '2026-09-21', seconds: 22 },
  { id: 'UguGEWglGkI', category: 'gips', titleSq: 'Punime Gipsi Profesionale', titleEn: 'Professional Gypsum Works', uploadDate: '2026-09-19', seconds: 32 },
  { id: 'SbipHOvyWNg', category: 'gips', titleSq: 'Tavane Gipsi', titleEn: 'Gypsum Ceilings', uploadDate: '2026-09-14', seconds: 81 },
  { id: 'FUrqkhifxCs', category: 'gips', titleSq: 'Punime Gipsi në Proces', titleEn: 'Gypsum Works in Progress', uploadDate: '2026-09-11', seconds: 53 },
  { id: 'IGPeAgdsEpE', category: 'gips', titleSq: 'Punime Profesionale Gipsi', titleEn: 'Professional Gypsum Works', uploadDate: '2026-09-07', seconds: 21 },
  { id: 'AVsuwYpIdBg', category: 'gips', titleSq: 'Punime Gipsi', titleEn: 'Gypsum Works', uploadDate: '2026-09-04', seconds: 16 },
  { id: '7VgrclnLjY8', category: 'lyerje', titleSq: 'Lyerje e Brendshme Profesionale', titleEn: 'Professional Interior Painting', uploadDate: '2026-09-02', seconds: 28 },
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@PunimeGipsi-TorraGips';
