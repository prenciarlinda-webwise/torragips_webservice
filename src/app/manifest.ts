import { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: 'Torra Gips',
    description: 'Shërbime profesionale të punimeve të gipsit, patinimit dhe lyerjes në Tiranë dhe Durrës.',
    start_url: '/sq/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a5f',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
