import { useLocale } from 'next-intl';
import Image from 'next/image';
import { QuoteButton } from '@/components/modals';
import { ArrowIcon } from '@/components/ui/Icons';

type Project = {
  id: string;
  nameEn: string;
  nameSq: string;
  categoryEn: string;
  categorySq: string;
  locationEn: string;
  locationSq: string;
  image: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 'vlora-airport',
    nameEn: 'Vlora International Airport',
    nameSq: 'Aeroporti Ndërkombëtar i Vlorës',
    categoryEn: 'Airport & Aviation',
    categorySq: 'Aeroport & Aviacion',
    locationEn: 'Vlora, Albania',
    locationSq: 'Vlorë, Shqipëri',
    image: '/images/gallery/gips-projekt-komercial-aeroporti-vlores.webp',
    featured: true,
  },
  {
    id: 'rolling-hills',
    nameEn: 'Rolling Hills Residence',
    nameSq: 'Rezidenca Rolling Hills',
    categoryEn: 'Luxury Residential Complex',
    categorySq: 'Kompleks Rezidencial Luksoz',
    locationEn: 'Tirana, Albania',
    locationSq: 'Tiranë, Shqipëri',
    image: '/images/gallery/rolling-hills-projekt.webp',
    featured: true,
  },
  {
    id: 'green-coast',
    nameEn: 'Green Coast Resort',
    nameSq: 'Green Coast Resort',
    categoryEn: 'Hospitality & Tourism',
    categorySq: 'Turizëm & Hoteleri',
    locationEn: 'Palasa, Albania',
    locationSq: 'Palasë, Shqipëri',
    image: '/images/gallery/green-coast-projekt.webp',
    featured: true,
  },
  {
    id: 'lion-park',
    nameEn: 'Lion Park Commercial Center',
    nameSq: 'Qendra Komerciale Lion Park',
    categoryEn: 'Commercial & Retail',
    categorySq: 'Komercial & Shitje',
    locationEn: 'Tirana, Albania',
    locationSq: 'Tiranë, Shqipëri',
    image: '/images/gallery/lion-park-projekt-gipsi.avif',
  },
  {
    id: 'classic-shpk',
    nameEn: 'Classic SHPK Automotive',
    nameSq: 'Classic SHPK Automotive',
    categoryEn: 'Automotive & Showroom',
    categorySq: 'Automjetë & Showroom',
    locationEn: 'Tirana-Durres Highway',
    locationSq: 'Autostrada Tiranë-Durrës',
    image: '/images/gallery/projekt_komercial_torra_gips.webp',
  },
  {
    id: 'beauty-salon-bllok',
    nameEn: 'Luxury Beauty Salon',
    nameSq: 'Sallon Bukurie Luksoz',
    categoryEn: 'Beauty & Wellness',
    categorySq: 'Bukuri & Mirëqenie',
    locationEn: 'Bllok, Tirana',
    locationSq: 'Bllok, Tiranë',
    image: '/images/gallery/project-7.webp',
  },
];

export default function FeaturedProjects() {
  const locale = useLocale();
  const sq = locale === 'sq';

  // Same order as the data above: the three featured projects first, then the rest.
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  const stats = [
    { value: '100+', label: sq ? 'Projekte të Përfunduara' : 'Completed Projects' },
    { value: '50+', label: sq ? 'Klientë Komercialë' : 'Commercial Clients' },
    { value: '5+', label: sq ? 'Vite Eksperiencë' : 'Years Experience' },
    { value: '100%', label: sq ? 'Kënaqësi Klienti' : 'Client Satisfaction' },
  ];

  return (
    <section className="on-dark section-padding bg-plaster-50 text-ink-800">
      <div className="container-custom">
        <div className="sec-head is-center">
          <div className="contents">
            <span className="block text-sm font-bold text-tint">
              {sq ? 'Projekte Komerciale' : 'Commercial Projects'}
            </span>
            <h2 className="h2">{sq ? 'Projektet Tona të Mëdha' : 'Our Major Projects'}</h2>
          </div>
          <div className="contents">
            <p className="lead">
              {sq
                ? 'Kemi pasur nderin të punojmë në disa nga projektet më prestigjioze në Shqipëri. Nga aeroportet tek resortet luksoze, ne sjellim cilësi profesionale.'
                : "We've had the privilege of working on some of Albania's most prestigious projects. From airports to luxury resorts, we deliver professional quality."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((project) => (
            <figure key={project.id} className="card group">
              <div className="frame aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={sq ? project.nameSq : project.nameEn}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <figcaption className="p-5">
                <span className="text-sm text-ink-500">{sq ? project.categorySq : project.categoryEn}</span>
                <h3 className="mt-1 text-lg font-bold text-ink-900">{sq ? project.nameSq : project.nameEn}</h3>
                <p className="mt-1 text-sm text-ink-500">{sq ? project.locationSq : project.locationEn}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 border border-line md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-line p-6 text-center odd:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0">
              <p className="text-3xl font-extrabold tracking-tight text-tint md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <QuoteButton>
            {sq ? 'Na Kontaktoni për Projektin Tuaj' : 'Contact Us for Your Project'}
            <ArrowIcon />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
