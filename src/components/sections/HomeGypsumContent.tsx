import Image from 'next/image';
import { COMPANY } from '@/lib/constants';

type Props = { locale: string };

const content = {
  sq: {
    typesTitle: 'Llojet e Punimeve të Gipsit',
    types: [
      {
        title: 'Tavane të Varura me Gips',
        text: 'Montim i tavaneve të sheshta, akustike dhe me pllaka kundër lagështirës (jeshile) për banja, kuzhina dhe ambiente komerciale.',
        image: '/images/services/gypsum/tavan-gipsi-banjo-1.webp',
        alt: 'Tavan i varur me gips kundër lagështirës në banjo',
      },
      {
        title: 'Punime Gipsi për Sallone me Ndriçim LED',
        text: 'Tavane dekorative me nivele, kanale të fshehura për ndriçim LED dhe korniza moderne për sallone e dhoma gjumi.',
        image: '/images/services/gypsum/tavan-gipsi-per-sallon-1.webp',
        alt: 'Punime gipsi për sallon me ndriçim LED të fshehur',
      },
      {
        title: 'Mure Ndarëse me Gips dhe Izolim',
        text: 'Konstruksion metalik i dyfishtë me pllaka gipsi dhe lesh guri për izolim maksimal termik dhe akustik.',
        image: '/images/services/gypsum/wall-installation-1.webp',
        alt: 'Mur ndarës me gips dhe izolim me lesh guri',
      },
    ],
    specsTitle: 'Specifikimet Teknike dhe Afatet e Punimeve të Gipsit',
    specsHead: ['Lloji i Punimit', 'Sistemi i Materialit', 'Afati Mesatar (Apartament 2+1)'],
    specs: [
      ['Tavan i varur i thjeshtë', 'Knauf / Rigips 12.5mm', '3 - 4 ditë pune'],
      ['Tavan dekorativ me ndriçim LED', 'Knauf / Rigips + Profil LED', '5 - 7 ditë pune'],
      ['Mur ndarës me izolim akustik', 'Pllakë e dyfishtë + Lesh Guri', '4 - 6 ditë pune'],
    ],
    costTitle: 'Çfarë Ndikon në Koston e Punimeve të Gipsit?',
    costText:
      'Kostoja e punimeve të gipsit llogaritet pas matjes në objekt bazuar në sipërfaqen totale (m²), llojin e pllakës (standarde, kundër lagështirës ose kundër zjarrit), kompleksitetin e dizajnit me ndriçim LED dhe trashësinë e izolimit me lesh guri. Për preventiv të saktë, telefononi në',
  },
  en: {
    typesTitle: 'Types of Gypsum Works',
    types: [
      {
        title: 'Suspended Gypsum Ceilings',
        text: 'Installation of flat, acoustic and moisture-resistant (green board) ceilings for bathrooms, kitchens and commercial spaces.',
        image: '/images/services/gypsum/tavan-gipsi-banjo-1.webp',
        alt: 'Moisture-resistant suspended gypsum ceiling in a bathroom',
      },
      {
        title: 'Gypsum Works for Living Rooms with LED Lighting',
        text: 'Multi-level decorative ceilings, hidden LED lighting channels and modern cornices for living rooms and bedrooms.',
        image: '/images/services/gypsum/tavan-gipsi-per-sallon-1.webp',
        alt: 'Living room gypsum ceiling with hidden LED lighting',
      },
      {
        title: 'Gypsum Partition Walls with Insulation',
        text: 'Double metal stud framing with gypsum boards and rock wool for maximum thermal and acoustic insulation.',
        image: '/images/services/gypsum/wall-installation-1.webp',
        alt: 'Gypsum partition wall with rock wool insulation',
      },
    ],
    specsTitle: 'Technical Specifications and Timelines for Gypsum Works',
    specsHead: ['Type of Work', 'Material System', 'Average Timeline (2-Bedroom Apartment)'],
    specs: [
      ['Simple suspended ceiling', 'Knauf / Rigips 12.5mm', '3 - 4 working days'],
      ['Decorative ceiling with LED lighting', 'Knauf / Rigips + LED profile', '5 - 7 working days'],
      ['Partition wall with acoustic insulation', 'Double board + rock wool', '4 - 6 working days'],
    ],
    costTitle: 'What Affects the Cost of Gypsum Works?',
    costText:
      'The cost of gypsum works is calculated after an on-site measurement, based on the total area (m²), the board type (standard, moisture-resistant or fire-resistant), the complexity of the LED lighting design and the thickness of the rock wool insulation. For an exact quote, call',
  },
};

export default function HomeGypsumContent({ locale }: Props) {
  const c = locale === 'sq' ? content.sq : content.en;
  const tel = `tel:${COMPANY.whatsapp}`;

  return (
    <>
      {/* Types of gypsum works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{c.typesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.types.map((type) => (
              <article
                key={type.title}
                className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image src={type.image} alt={type.alt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-800 mb-3">{type.title}</h3>
                  <p className="text-text-light leading-relaxed">{type.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specs and timelines table */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title text-center mb-10">{c.specsTitle}</h2>
          <div className="overflow-x-auto rounded-xl shadow-soft">
            <table className="w-full bg-white text-left">
              <thead className="bg-primary text-white">
                <tr>
                  {c.specsHead.map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.specs.map((row) => (
                  <tr key={row[0]} className="border-t border-neutral-200">
                    <th scope="row" className="px-5 py-4 font-semibold text-dark-800">
                      {row[0]}
                    </th>
                    <td className="px-5 py-4 text-text">{row[1]}</td>
                    <td className="px-5 py-4 text-text">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cost factors (no prices) */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="section-title mb-6">{c.costTitle}</h2>
          <p className="text-lg text-text-light leading-relaxed">
            {c.costText}{' '}
            <a href={tel} className="font-semibold text-primary hover:underline">
              {COMPANY.phone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
