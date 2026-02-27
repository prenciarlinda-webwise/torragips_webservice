import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Only generate this page for Albanian locale
export function generateStaticParams() {
  return [{ locale: 'sq' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'sq'
      ? 'Lyerje Profesionale Tiranë - +355 68 858 0058 - Torra Gips'
      : 'Professional Painting Tirana - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Lyerje profesionale në Tiranë. Lyerje brendshme dhe jashtme, bojëra ekologjike dhe efekte dekorative për projekte komerciale dhe rezidenciale. 100+ projekte. Konsultë falas.'
      : 'Professional painting in Tirana. Interior and exterior painting, eco-friendly paints and decorative effects for commercial and residential projects. 100+ projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'lyerje-tirane' : 'painting-tirana'}/`,
      languages: {
        sq: '/sq/lyerje-tirane/',
        en: '/en/painting-tirana/',
      },
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Lyerje Profesionale Tiranë - Torra Gips'
        : 'Professional Painting Tirana - Torra Gips',
      description: locale === 'sq'
        ? 'Lyerje profesionale në Tiranë. Lyerje brendshme dhe jashtme, bojëra ekologjike dhe efekte dekorative. 100+ projekte të përfunduara.'
        : 'Professional painting in Tirana. Interior and exterior painting, eco-friendly paints and decorative effects. 100+ completed projects.',
      images: [{ url: '/images/services/painting/commercial-exterior-2.webp' }],
    },
  };
}

export default async function PaintingTiranaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAlbanian = locale === 'sq';

  const commercialCategories = isAlbanian ? [
    { icon: 'office' as const, title: 'Zyra & Korporata' },
    { icon: 'hotel' as const, title: 'Apartamente Moderne' },
    { icon: 'shopping' as const, title: 'Dyqane & Showroom' },
    { icon: 'airport' as const, title: 'Restorante & Lokale' },
  ] : [
    { icon: 'office' as const, title: 'Offices & Corporate' },
    { icon: 'hotel' as const, title: 'Modern Apartments' },
    { icon: 'shopping' as const, title: 'Shops & Showrooms' },
    { icon: 'airport' as const, title: 'Restaurants & Venues' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Njohje e Tregut Urban', description: 'Dimë çfarë ngjyrash funksionojnë në zyrat e Bllokut dhe apartamentet e Komunës.' },
    { title: 'Bojëra për Klimën e Tiranës', description: 'Dulux dhe Caparol të zgjedhura për ndryshimet e temperaturës -5°C deri +40°C.' },
    { title: 'Ekip Lokal në Tiranë', description: 'Piktorët tanë janë në Tiranë - arrijmë shpejt dhe pa kosto shtesë transporti.' },
    { title: 'Lyerje pa Ndërprerje Biznesi', description: 'Punojmë natën dhe fundjavë për restorante, dyqane dhe zyra aktive.' },
    { title: 'Nga Studio te Pallati', description: 'Trajtojmë çdo madhësi - nga garsonierat te fasadat e pallateve.' },
    { title: 'Konsultim Ngjyrash Falas', description: 'Vizitë në Tiranë me kampionë bojërash për zgjedhje të saktë.' },
  ] : [
    { title: 'Urban Market Knowledge', description: 'We know which colors work in Blloku offices and Komuna apartments.' },
    { title: 'Paints for Tirana Climate', description: 'Dulux and Caparol selected for temperature swings from -5°C to +40°C.' },
    { title: 'Local Team in Tirana', description: 'Our painters are in Tirana - we arrive quickly with no extra transport costs.' },
    { title: 'No Business Disruption', description: 'We work nights and weekends for active restaurants, shops and offices.' },
    { title: 'From Studio to Tower', description: 'We handle every size - from studio apartments to building facades.' },
    { title: 'Free Color Consultation', description: 'Tirana visit with paint samples for accurate color selection.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Vizitë në Tiranë', description: 'Inspektim falas + kampionë ngjyrash' },
    { step: '2', title: 'Zgjedhje Bojërash', description: 'Dulux, Jotun ose Caparol' },
    { step: '3', title: 'Përgatitje Sipërfaqesh', description: 'Riparime, stuko dhe mbrojtje' },
    { step: '4', title: 'Lyerje Profesionale', description: 'Aplikim i pastër me rul ose pistoletë' },
    { step: '5', title: 'Pastrim & Dorëzim', description: 'Ambient i gatshëm për përdorim' },
  ] : [
    { step: '1', title: 'Tirana Visit', description: 'Free inspection + color samples' },
    { step: '2', title: 'Paint Selection', description: 'Dulux, Jotun or Caparol' },
    { step: '3', title: 'Surface Preparation', description: 'Repairs, putty and protection' },
    { step: '4', title: 'Professional Painting', description: 'Clean application by roller or spray' },
    { step: '5', title: 'Cleanup & Handover', description: 'Environment ready for use' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Lyerje Tiranë',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Lyerje Profesionale në Tiranë',
    heroSubtitle: 'Lyerje brendshme dhe jashtme për biznese dhe banesa në Tiranë. Mbulojmë Bllokun, Komunën e Parisit, Kashar dhe gjithë zonat urbane. 100+ projekte të përfunduara. Bojëra Dulux, Jotun dhe Caparol. Konsultë falas.',
    introContent: [
      'Lyerja profesionale në Tiranë është një shërbim thelbësor për çdo projekt ndërtimi ose rinovimi në kryeqytetin shqiptar. Torra Gips ofron shërbime lyerjeje të nivelit më të lartë për biznese, zyra, hotele, restorante dhe banesa në të gjitha lagjet e Tiranës. Me përvojë të gjerë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort, Rolling Hills dhe Lion Park, ekipi ynë garanton cilësi vizuale që bën përshtypje në çdo ambient.',
      'Tirana si qendër ekonomike dhe kulturore e Shqipërisë kërkon standarde të larta lyerjeje. Qoftë një zyrë moderne në Bllok, një apartament në Komunën e Parisit, një hapësirë komerciale në qendrën e Tiranës ose një villë në Kashar, ne adaptojmë teknikat dhe materialet sipas nevojave specifike të çdo ambienti. Kombinojmë bojëra premium Dulux, Jotun dhe Caparol me teknika profesionale aplikimi për rezultate që zgjasin.',
      'Në tregun dinamik të ndërtimit në Tiranë, bizneset dhe pronarët e pronave kanë nevojë për partnerë të besueshëm që kuptojnë kërkesat lokale. Nga pallatet e reja në periferi deri tek rinovimet e ndërtesave historike në qendër, Torra Gips ofron zgjidhje lyerjeje të plota duke respektuar afatet dhe standardet e cilësisë.',
    ],
    contentSections: [
      {
        title: 'Çfarë Përfshin Lyerja Brendshme në Tiranë?',
        content: 'Lyerja brendshme në Tiranë kërkon njohuri të veçanta për tipologjitë e ndërtesave urbane. Nga apartamentet moderne në pallate deri tek zyrat e biznesit në zonën qendrore, ne ofrojmë zgjidhje të personalizuara për çdo hapësirë.',
        listItems: [
          'Lyerje murash, tavanesh dhe elementeve arkitekturore në apartamente dhe zyra',
          'Përfundime mat, saten dhe me shkëlqim për ambiente komerciale dhe rezidenciale',
          'Bojëra ekologjike me emetime të ulëta VOC, ideale për zyra dhe banesa familjare',
          'Lyerje e specializuar për ambiente me trafik të lartë si restorante dhe dyqane në Bllok',
          'Përgatitje profesionale e sipërfaqeve duke përfshirë riparime të çarjeve dhe lagështirës',
          'Mbrojtje e mobilieve, dyshemeve dhe pajisjeve gjatë punës në ambiente të banuara',
        ],
      },
      {
        title: 'Pse Është e Rëndësishme Lyerja Jashtme në Tiranë?',
        content: 'Klima kontinentale e Tiranës me verëra të nxehta dhe dimra të ftohtë kërkon bojëra jashtme cilësore. Fasadat e ndërtesave në Tiranë ekspozohen ndaj ndryshimeve të mëdha të temperaturës, shiut dhe pluhurit urban.',
        listItems: [
          'Bojëra elastike që përballojnë ndryshimet e temperaturës -5°C deri +40°C të Tiranës',
          'Rezistencë ndaj rrezeve UV dhe zbehjes nga dielli intensiv i verës',
          'Mbrojtje kundër lagështisë dhe myshkut, veçanërisht për ndërtesat pranë lumit Lana',
          'Përgatitje dhe riparime fasadash për pallate dhe ndërtesa komerciale',
          'Lyerje e strukturave metalike dhe elementeve dekorative të fasadave',
          'Trajtime anti-pluhur dhe vetë-pastruese për zonën urbane të Tiranës',
        ],
      },
      {
        title: 'Çfarë Efektesh Dekorative Ofrojmë në Tiranë?',
        content: 'Tirana është qyteti ku dizajni i brendshëm po evoluon me shpejtësi. Bizneset dhe pronarët kërkojnë efekte dekorative unike që dallojnë ambientet e tyre. Ne sjellim teknikat më të reja për klientët më kërkues të kryeqytetit.',
        listItems: [
          'Efekt mermeri dhe guri natyral për lobi zyrtare dhe hotele në qendër',
          'Teknika sponge dhe rag-rolling për restorante dhe bare në Bllok',
          'Efekte metalike dhe perlë për ambiente luksoze në Komunën e Parisit',
          'Mural dhe dizajne artistike për biznese krijuese dhe agjenci',
          'Stencil dhe motive dekorative për dyqane dhe showroom',
          'Efekte antike dhe patine për rinovime të ndërtesave karakteristike',
        ],
      },
      {
        title: 'Cilat Zona të Tiranës Mbulojmë për Lyerje?',
        content: 'Torra Gips ofron shërbime lyerjeje në të gjitha zonat e Tiranës dhe rrethinave. Pavarësisht se ku ndodhet projekti juaj, ekipi ynë arrin shpejt dhe fillon punën menjëherë.',
        listItems: [
          'Blloku dhe qendra historike e Tiranës - zyra, restorante, hotele',
          'Komuna e Parisit dhe Myslym Shyri - apartamente dhe biznese',
          'Kashar dhe Kombinat - villa, fabrika dhe ambiente industriale',
          'Zona e re urbane Tiranë-Durrës - projekte të reja ndërtimi',
          'Sauk, Lunder dhe kodrat e Tiranës - villa dhe rezidenca luksoze',
          'Yzberisht, Kamëz dhe Bathore - projekte rezidenciale dhe komerciale',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Lyerje Apartamentesh në Tiranë',
        description: 'Ngjyra moderne për apartamentet e reja në Bllok dhe Komunë. Bojëra ekologjike Dulux ideale për familje me fëmijë.',
        features: ['Apartamente të reja', 'VOC i ulët', 'Sigurt për familjen', 'Ngjyra moderne'],
      },
      {
        icon: 'partition' as const,
        title: 'Fasada Pallatesh Urbane',
        description: 'Lyerje e jashtme për kullat e reja dhe pallatet ekzistuese të Tiranës. Bojëra anti-pluhur Caparol për zonën urbane.',
        features: ['Kulla moderne', 'Anti-pluhur', 'Rezistencë temperature', 'Pallate ekzistuese'],
      },
      {
        icon: 'decoration' as const,
        title: 'Efekte për Biznese në Bllok',
        description: 'Efekte mermeri, metalike dhe artizanale për restorantet, baret dhe zyrat krijuese të kryeqytetit.',
        features: ['Restorante Blloku', 'Zyra krijuese', 'Efekte artizanale', 'Mural urban'],
      },
      {
        icon: 'insulation' as const,
        title: 'Lyerje Komerciale & Industriale',
        description: 'Dysheme epoksi për garazhe dhe magazine, trajtime anti-bakteriale për klinika dhe lyerje për hapësira pune.',
        features: ['Garazhe & magazine', 'Klinika & spitale', 'Hapësira pune', 'Epoksi industriale'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A ofroni lyerje profesionale për apartamente në Tiranë?',
        answer: 'Po, ofrojmë lyerje profesionale për apartamente në të gjitha lagjet e Tiranës, përfshirë Bllokun, Komunën e Parisit, Myslym Shyrin dhe zonat e reja. Përdorim bojëra ekologjike Dulux dhe Jotun për ambiente të sigurta familjare.',
      },
      {
        question: 'Sa kohë zgjat lyerja e një apartamenti në Tiranë?',
        answer: 'Për një apartament mesatar në Tiranë (80-120 m²), lyerja zgjat zakonisht 3-5 ditë pune, duke përfshirë përgatitjen e sipërfaqeve. Për projekte komerciale më të mëdha, koha varet nga sipërfaqja dhe kompleksiteti.',
      },
      {
        question: 'A punoni me projekte komerciale në qendrën e Tiranës?',
        answer: 'Po, kemi përvojë të gjerë me projekte komerciale në Tiranë. Kemi lyer zyra, restorante, hotele dhe qendra tregtare në zonën qendrore. Punojmë edhe natën ose në fundjavë për të mos ndërprerë biznesin tuaj.',
      },
      {
        question: 'Cilat bojëra rekomandoni për apartamentet në Tiranë?',
        answer: 'Për apartamentet në Tiranë rekomandojmë bojëra premium Dulux ose Caparol për brendësinë, me përfundim mat ose saten. Për banjot dhe kuzhinat, përdorim bojëra speciale anti-lagështirë. Të gjitha bojërat janë ekologjike me VOC të ulët.',
      },
      {
        question: 'A bëni lyerje fasadash për pallate në Tiranë?',
        answer: 'Po, ofrojmë lyerje fasadash për pallate dhe ndërtesa komerciale në gjithë Tiranën. Përdorim bojëra të specializuara Caparol dhe Jotun që përballojnë klimën e Tiranës me ndryshime të mëdha temperature.',
      },
      {
        question: 'Si mund të caktoj një takim për lyerje në Tiranë?',
        answer: 'Na telefononi në +355 68 858 0058 ose na shkruani në WhatsApp. Vizita dhe vlerësimi janë falas kudo në Tiranë. Sillni matjet dhe preferencat tuaja të ngjyrave për ofertë më të saktë.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Lyerjeje Ofrojmë në Tiranë?',
      commercialExperience: 'Ku Kemi Kryer Lyerje Komerciale në Tiranë?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Lyerje në Tiranë?',
      howWeWork: 'Si Funksionon Procesi i Lyerjes në Tiranë?',
      serviceAreas: 'Cilat Zona të Tiranës Mbulojmë?',
      faq: 'Pyetje të Shpeshta për Lyerjen në Tiranë',
      readyToStart: 'Gati për Projektin Tuaj të Lyerjes në Tiranë?',
    },
    relatedLinks: [
      { href: '/lyerje-durres', label: 'Lyerje Profesionale në Durrës' },
      { href: '/lyerje', label: 'Lyerje Profesionale' },
      { href: '/patinim-tirane', label: 'Patinim Profesional në Tiranë' },
    ],
  } : {
    serviceName: 'Painting Tirana',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Professional Painting in Tirana',
    heroSubtitle: 'Interior and exterior painting for businesses and homes in Tirana. We cover Blloku, Komuna e Parisit, Kashar and all urban areas. 100+ completed projects. Dulux, Jotun and Caparol paints. Free consultation.',
    introContent: [
      'Professional painting in Tirana is an essential service for any construction or renovation project in the Albanian capital. Torra Gips delivers the highest standard of painting services for businesses, offices, hotels, restaurants and homes across all neighborhoods of Tirana. With extensive experience in prestigious projects like Vlora International Airport, Green Coast Resort, Rolling Hills and Lion Park, our team guarantees visual quality that impresses in every environment.',
      'Tirana as the economic and cultural center of Albania demands high painting standards. Whether it is a modern office in Blloku, an apartment in Komuna e Parisit, a commercial space in central Tirana or a villa in Kashar, we adapt our techniques and materials to the specific needs of each environment. We combine premium Dulux, Jotun and Caparol paints with professional application techniques for results that last.',
      'In Tirana\'s dynamic construction market, businesses and property owners need reliable partners who understand local requirements. From new residential buildings on the outskirts to renovations of historic buildings in the center, Torra Gips provides complete painting solutions while respecting deadlines and quality standards.',
    ],
    contentSections: [
      {
        title: 'What Does Interior Painting Include in Tirana?',
        content: 'Interior painting in Tirana requires specialized knowledge of urban building typologies. From modern apartments in residential towers to business offices in the central zone, we provide customized solutions for every space.',
        listItems: [
          'Painting of walls, ceilings and architectural elements in apartments and offices',
          'Matte, satin and gloss finishes for commercial and residential environments',
          'Eco-friendly paints with low VOC emissions, ideal for offices and family homes',
          'Specialized painting for high-traffic environments like restaurants and shops in Blloku',
          'Professional surface preparation including crack and moisture repairs',
          'Protection of furniture, floors and equipment during work in occupied spaces',
        ],
      },
      {
        title: 'Why Is Exterior Painting Important in Tirana?',
        content: 'Tirana\'s continental climate with hot summers and cold winters demands quality exterior paints. Building facades in Tirana are exposed to large temperature variations, rain and urban dust.',
        listItems: [
          'Elastic paints that withstand Tirana\'s temperature variations from -5°C to +40°C',
          'UV resistance and fade prevention from intense summer sunlight',
          'Protection against moisture and mold, especially for buildings near the Lana river',
          'Facade preparation and repairs for residential towers and commercial buildings',
          'Painting of metal structures and decorative facade elements',
          'Anti-dust and self-cleaning treatments for Tirana\'s urban zone',
        ],
      },
      {
        title: 'What Decorative Painting Effects Do We Offer in Tirana?',
        content: 'Tirana is a city where interior design is evolving rapidly. Businesses and homeowners seek unique decorative effects that distinguish their spaces. We bring the latest techniques for the most demanding clients in the capital.',
        listItems: [
          'Marble and natural stone effects for official lobbies and hotels in the center',
          'Sponge and rag-rolling techniques for restaurants and bars in Blloku',
          'Metallic and pearl effects for luxury environments in Komuna e Parisit',
          'Murals and artistic designs for creative businesses and agencies',
          'Stencils and decorative motifs for shops and showrooms',
          'Antique effects and patina for renovations of characteristic buildings',
        ],
      },
      {
        title: 'Which Areas of Tirana Do We Cover for Painting?',
        content: 'Torra Gips provides painting services across all areas of Tirana and its surroundings. Regardless of where your project is located, our team arrives quickly and starts work immediately.',
        listItems: [
          'Blloku and the historic center of Tirana - offices, restaurants, hotels',
          'Komuna e Parisit and Myslym Shyri - apartments and businesses',
          'Kashar and Kombinat - villas, factories and industrial environments',
          'The new Tirana-Durrës urban zone - new construction projects',
          'Sauk, Lunder and the hills of Tirana - villas and luxury residences',
          'Yzberisht, Kamëz and Bathore - residential and commercial projects',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Tirana Apartment Painting',
        description: 'Modern colors for new apartments in Blloku and Komuna. Eco-friendly Dulux paints ideal for families with children.',
        features: ['New apartments', 'Low VOC', 'Family safe', 'Modern colors'],
      },
      {
        icon: 'partition' as const,
        title: 'Urban Building Facades',
        description: 'Exterior painting for Tirana\'s new towers and existing buildings. Anti-dust Caparol paints for the urban zone.',
        features: ['Modern towers', 'Anti-dust', 'Temperature resistance', 'Existing buildings'],
      },
      {
        icon: 'decoration' as const,
        title: 'Effects for Blloku Businesses',
        description: 'Marble, metallic and artisanal effects for the capital\'s restaurants, bars and creative offices.',
        features: ['Blloku restaurants', 'Creative offices', 'Artisanal effects', 'Urban murals'],
      },
      {
        icon: 'insulation' as const,
        title: 'Commercial & Industrial Painting',
        description: 'Epoxy floors for garages and warehouses, anti-bacterial treatments for clinics and painting for workspaces.',
        features: ['Garages & warehouses', 'Clinics & hospitals', 'Workspaces', 'Industrial epoxy'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you offer professional painting for apartments in Tirana?',
        answer: 'Yes, we offer professional painting for apartments in all neighborhoods of Tirana, including Blloku, Komuna e Parisit, Myslym Shyri and new development areas. We use eco-friendly Dulux and Jotun paints for safe family environments.',
      },
      {
        question: 'How long does apartment painting take in Tirana?',
        answer: 'For an average apartment in Tirana (80-120 m²), painting typically takes 3-5 working days, including surface preparation. For larger commercial projects, the timeframe depends on surface area and complexity.',
      },
      {
        question: 'Do you work on commercial projects in central Tirana?',
        answer: 'Yes, we have extensive experience with commercial projects in Tirana. We have painted offices, restaurants, hotels and shopping centers in the central zone. We also work evenings or weekends to avoid disrupting your business.',
      },
      {
        question: 'Which paints do you recommend for Tirana apartments?',
        answer: 'For Tirana apartments we recommend premium Dulux or Caparol paints for interiors, with matte or satin finishes. For bathrooms and kitchens, we use special anti-moisture paints. All paints are eco-friendly with low VOC.',
      },
      {
        question: 'Do you paint building facades in Tirana?',
        answer: 'Yes, we offer facade painting for residential towers and commercial buildings throughout Tirana. We use specialized Caparol and Jotun paints that withstand Tirana\'s climate with its large temperature variations.',
      },
      {
        question: 'How can I book a painting appointment in Tirana?',
        answer: 'Call us at +355 68 858 0058 or write to us on WhatsApp. Visits and assessments are free anywhere in Tirana. Bring your measurements and color preferences for a more accurate quote.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Painting Services Do We Offer in Tirana?',
      commercialExperience: 'Where Have We Done Commercial Painting in Tirana?',
      whyChooseUs: 'Why Choose Torra Gips for Painting in Tirana?',
      howWeWork: 'How Does the Painting Process Work in Tirana?',
      serviceAreas: 'Which Areas of Tirana Do We Cover?',
      faq: 'Frequently Asked Questions About Painting in Tirana',
      readyToStart: 'Ready for Your Painting Project in Tirana?',
    },
    relatedLinks: [
      { href: '/painting-durres', label: 'Professional Painting in Durrës' },
      { href: '/painting', label: 'Professional Painting Services' },
      { href: '/wall-plastering-tirana', label: 'Professional Plastering in Tirana' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/${isAlbanian ? 'lyerje-tirane' : 'painting-tirana'}/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Lyerje' : 'Painting', url: `/${locale}/${isAlbanian ? 'lyerje' : 'painting'}/` },
          { name: isAlbanian ? 'Lyerje Tiranë' : 'Painting Tirana', url: `/${locale}/${isAlbanian ? 'lyerje-tirane' : 'painting-tirana'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
