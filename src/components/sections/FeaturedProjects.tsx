import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';

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
    image: '/images/gallery/project-1.webp',
  },
];

export default function FeaturedProjects() {
  const locale = useLocale();

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="py-20 bg-dark-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
            {locale === 'sq' ? 'Projekte Komerciale' : 'Commercial Projects'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {locale === 'sq' ? 'Projektet Tona të Mëdha' : 'Our Major Projects'}
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {locale === 'sq'
              ? 'Kemi pasur nderin të punojmë në disa nga projektet më prestigjioze në Shqipëri. Nga aeroportet tek resortet luksoze, ne sjellim cilësi profesionale.'
              : 'We\'ve had the privilege of working on some of Albania\'s most prestigious projects. From airports to luxury resorts, we deliver professional quality.'}
          </p>
        </div>

        {/* Featured Projects - Large Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[240px]'}`}>
                <Image
                  src={project.image}
                  alt={locale === 'sq' ? project.nameSq : project.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-3">
                    {locale === 'sq' ? project.categorySq : project.categoryEn}
                  </span>
                  <h3 className={`font-bold text-white mb-1 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {locale === 'sq' ? project.nameSq : project.nameEn}
                  </h3>
                  <p className="text-neutral-300 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {locale === 'sq' ? project.locationSq : project.locationEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects - Smaller Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative h-[200px]">
                <Image
                  src={project.image}
                  alt={locale === 'sq' ? project.nameSq : project.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 bg-primary/80 text-white text-xs font-medium rounded mb-2">
                    {locale === 'sq' ? project.categorySq : project.categoryEn}
                  </span>
                  <h3 className="font-semibold text-white text-lg">
                    {locale === 'sq' ? project.nameSq : project.nameEn}
                  </h3>
                  <p className="text-neutral-400 text-xs">
                    {locale === 'sq' ? project.locationSq : project.locationEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-12 pt-12 border-t border-dark-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100+</div>
              <div className="text-neutral-400 text-sm">
                {locale === 'sq' ? 'Projekte të Përfunduara' : 'Completed Projects'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-neutral-400 text-sm">
                {locale === 'sq' ? 'Klientë Komercialë' : 'Commercial Clients'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5+</div>
              <div className="text-neutral-400 text-sm">
                {locale === 'sq' ? 'Vite Eksperiencë' : 'Years Experience'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
              <div className="text-neutral-400 text-sm">
                {locale === 'sq' ? 'Kënaqësi Klienti' : 'Client Satisfaction'}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href={locale === 'sq' ? '/kontakt' : '/contact'}
            className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors"
          >
            {locale === 'sq' ? 'Na Kontaktoni për Projektin Tuaj' : 'Contact Us for Your Project'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
