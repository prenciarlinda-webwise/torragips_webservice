import { SITE_CONFIG, COMPANY } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const BASE = SITE_CONFIG.url;

// Curated service / area / company links per locale. Kept in sync with the
// actual routes under src/app/[locale]/. Blog links below are generated.
const SECTIONS = {
  en: {
    services: [
      ['Gypsum Works', '/en/gypsum-works/', 'Suspended ceilings, space partitions, architectural decorations and acoustic/thermal insulation.'],
      ['Wall Plastering', '/en/wall-plastering/', 'Interior and exterior plastering, decorative plaster, wall repairs and restorations.'],
      ['Painting', '/en/painting/', 'Interior and exterior painting, decorative effects and durable finishes.'],
      ['Pricing', '/en/pricing/', 'Indicative prices per m² (in Lek) for gypsum cladding, partition walls, suspended ceilings and finishing.'],
    ],
    areas: [
      ['Gypsum Works in Tirana', '/en/gypsum-works-tirana/'],
      ['Gypsum Works in Durrës', '/en/gypsum-works-durres/'],
      ['Wall Plastering in Tirana', '/en/wall-plastering-tirana/'],
      ['Wall Plastering in Durrës', '/en/wall-plastering-durres/'],
      ['Painting in Tirana', '/en/painting-tirana/'],
      ['Painting in Durrës', '/en/painting-durres/'],
    ],
    company: [
      ['About Torra Gips', '/en/about/'],
      ['Contact', '/en/contact/'],
      ['Gallery', '/en/gallery/'],
    ],
  },
  sq: {
    services: [
      ['Punime Gipsi', '/sq/punime-gipsi/', 'Tavane të varura, ndarja hapësirash, dekorime arkitekturore dhe izolim akustik e termik.'],
      ['Patinim', '/sq/patinim/', 'Patinim i brendshëm dhe i jashtëm, suva dekorative, riparime dhe restaurime muraturash.'],
      ['Lyerje', '/sq/lyerje/', 'Lyerje e brendshme dhe e jashtme, efekte dekorative dhe përfundime të qëndrueshme.'],
      ['Çmime', '/sq/cmime/', 'Çmime orientuese për m² (në Lek) për veshje gipsi, mure ndarëse, tavane të varura dhe finitura.'],
    ],
    areas: [
      ['Punime Gipsi në Tiranë', '/sq/punime-gipsi-tirane/'],
      ['Punime Gipsi në Durrës', '/sq/punime-gipsi-durres/'],
      ['Patinim në Tiranë', '/sq/patinim-tirane/'],
      ['Patinim në Durrës', '/sq/patinim-durres/'],
      ['Lyerje në Tiranë', '/sq/lyerje-tirane/'],
      ['Lyerje në Durrës', '/sq/lyerje-durres/'],
    ],
    company: [
      ['Rreth Nesh', '/sq/rreth-nesh/'],
      ['Kontakt', '/sq/kontakt/'],
      ['Galeri', '/sq/galeri/'],
    ],
  },
} as const;

function linkList(items: ReadonlyArray<readonly [string, string, string?]>): string {
  return items
    .map(([label, path, desc]) => `- [${label}](${BASE}${path})${desc ? `: ${desc}` : ''}`)
    .join('\n');
}

function blogList(locale: 'en' | 'sq', limit: number): string {
  return getAllPosts(locale)
    .slice(0, limit)
    .map((p) => `- [${p.title}](${BASE}/${locale}/blog/${p.slug}/)`)
    .join('\n');
}

export function GET() {
  const summary =
    `${COMPANY.name} is a professional interior-finishing contractor based in Tirana, Albania, ` +
    `serving Tirana and Durrës. We provide gypsum works (punime gipsi), wall plastering (patinim) ` +
    `and painting (lyerje) for residential and commercial projects. 100+ completed projects including ` +
    `Vlora International Airport, Green Coast Resort, Rolling Hills and Lion Park. We use Knauf and Rigips ` +
    `gypsum systems and Dulux, Jotun and Caparol paints. Free on-site consultation. ` +
    `Phone/WhatsApp: ${COMPANY.phone}. Email: ${COMPANY.email}. Hours: Mon–Sat 08:00–18:00.`;

  const body = `# ${COMPANY.name}

> ${summary}

## Services
${linkList(SECTIONS.en.services)}

## Service areas
${linkList(SECTIONS.en.areas)}

## Company
${linkList(SECTIONS.en.company)}

## Guides
${blogList('en', 8)}

## Albanian (Shqip)
- [Faqja kryesore](${BASE}/sq/)
${linkList(SECTIONS.sq.services)}
${linkList(SECTIONS.sq.areas)}
${linkList(SECTIONS.sq.company)}

### Udhëzues (blog në shqip)
${blogList('sq', 8)}

## Optional
- [Blog (English)](${BASE}/en/blog/)
- [Privacy Policy](${BASE}/en/privacy-policy/)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
