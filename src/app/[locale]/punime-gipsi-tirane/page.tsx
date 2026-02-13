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
      ? 'Punime Gipsi Tiranë - +355 68 858 0058 - Torra Gips'
      : 'Gypsum Works Tirana - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Punime gipsi profesionale në Tiranë. Tavane të varura, ndarja hapësirash dhe dekorime për projekte komerciale dhe rezidenciale. 100+ projekte të përfunduara. Konsultë falas.'
      : 'Professional gypsum works in Tirana. Suspended ceilings, space partitions and decorations for commercial and residential projects. 100+ completed projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'punime-gipsi-tirane' : 'gypsum-works-tirana'}/`,
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Punime Gipsi Tiranë - Torra Gips'
        : 'Gypsum Works Tirana - Torra Gips',
      description: locale === 'sq'
        ? 'Punime gipsi profesionale në Tiranë. Tavane të varura, ndarja hapësirash dhe dekorime për projekte komerciale dhe rezidenciale. 100+ projekte të përfunduara.'
        : 'Professional gypsum works in Tirana. Suspended ceilings, space partitions and decorations for commercial and residential projects. 100+ completed projects.',
      images: [{ url: '/images/services/gypsum/commercial-space-1.webp' }],
    },
  };
}

export default async function GypsumWorksTiranaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAlbanian = locale === 'sq';

  const commercialCategories = isAlbanian ? [
    { icon: 'office' as const, title: 'Zyra Korporative' },
    { icon: 'hotel' as const, title: 'Apartamente Luksoz' },
    { icon: 'shopping' as const, title: 'Qendra Biznesi' },
    { icon: 'airport' as const, title: 'Klinika & Institucione' },
  ] : [
    { icon: 'office' as const, title: 'Corporate Offices' },
    { icon: 'hotel' as const, title: 'Luxury Apartments' },
    { icon: 'shopping' as const, title: 'Business Centers' },
    { icon: 'airport' as const, title: 'Clinics & Institutions' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Njohje e Tregut të Tiranës', description: 'Njohim çdo lagje të Tiranës - nga Blloku te Kashari, dimë çfarë funksionon për çdo zonë.' },
    { title: 'Materiale për Klimën Urbane', description: 'Panele Knauf dhe Rigips të zgjedhura për izolim termik në verët e nxehta të Tiranës.' },
    { title: 'Ekip Lokal në Tiranë', description: 'Mjeshtrat tanë janë të bazuar në Tiranë - vijnë shpejt dhe pa kosto shtesë transporti.' },
    { title: 'Pa Ndërprerje Aktiviteti', description: 'Punojmë në mbrëmje e fundjavë për zyrat dhe bizneset që nuk mund të mbyllen.' },
    { title: 'Projekte Rezidenciale & Komerciale', description: 'Nga apartamenti 2+1 në Komunë te zyra 500m² në Bllok - trajtojmë çdo madhësi.' },
    { title: 'Konsultë Falas në Tiranë', description: 'Vizitë falas brenda ditës në çdo zonë të Tiranës për vlerësim dhe ofertë.' },
  ] : [
    { title: 'Tirana Market Knowledge', description: 'We know every neighborhood in Tirana - from Blloku to Kashar, we know what works for each zone.' },
    { title: 'Materials for Urban Climate', description: 'Knauf and Rigips panels selected for thermal insulation in Tirana\'s hot summers.' },
    { title: 'Local Team in Tirana', description: 'Our craftsmen are based in Tirana - they arrive quickly with no extra transport costs.' },
    { title: 'No Business Disruption', description: 'We work evenings and weekends for offices and businesses that cannot close.' },
    { title: 'Residential & Commercial Projects', description: 'From a 2+1 apartment in Komuna to a 500m² office in Bllok - we handle every size.' },
    { title: 'Free Consultation in Tirana', description: 'Same-day free visit to any area of Tirana for assessment and quote.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Vizitë në Tiranë', description: 'Vlerësim falas në lokacionin tuaj' },
    { step: '2', title: 'Projekt Teknik', description: 'Matje precize dhe dizajn i detajuar' },
    { step: '3', title: 'Zgjedhje Materialesh', description: 'Panele Knauf & Rigips cilësore' },
    { step: '4', title: 'Instalim i Pastër', description: 'Punë pa ndërhyrje strukturore' },
    { step: '5', title: 'Inspektim Final', description: 'Garanci e plotë pune dhe materiali' },
  ] : [
    { step: '1', title: 'Tirana Visit', description: 'Free assessment at your location' },
    { step: '2', title: 'Technical Design', description: 'Precise measurements and detailed design' },
    { step: '3', title: 'Material Selection', description: 'Quality Knauf & Rigips panels' },
    { step: '4', title: 'Clean Installation', description: 'Work without structural intervention' },
    { step: '5', title: 'Final Inspection', description: 'Full work and material warranty' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Punime Gipsi Tiranë',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Punime Gipsi Profesionale në Tiranë',
    heroSubtitle: 'Tavane të varura, ndarja hapësirash, dekorime arkitekturore dhe izolim akustik për projekte komerciale dhe rezidenciale në Tiranë. Materiale Knauf dhe Rigips. Konsultë falas.',
    introContent: [
      'Punimet e gipsit profesionale në Tiranë janë një nga shërbimet më të kërkuara në industrinë e ndërtimit dhe rinovimit. Si kryeqyteti i Shqipërisë, Tirana ka një treg të gjerë për punime gipsi cilësore në zona si Blloku, Komuna e Parisit, Kashar, Kombinat dhe qendra e Tiranës. Torra Gips ofron zgjidhje të plota për çdo nevojë, nga apartamentet moderne deri te projektet komerciale të mëdha. Me 100+ projekte të përfunduara në të gjithë vendin, përfshirë Aeroportin Ndërkombëtar të Vlorës, Green Coast Resort, Rolling Hills dhe Lion Park, ne sjellim të njëjtin profesionalizëm në çdo projekt në Tiranë.',
      'Tirana po kalon një zhvillim të shpejtë urban me ndërtesa të reja rezidenciale dhe komerciale në rritje të vazhdueshme. Kjo rritje kërkon zgjidhje profesionale gipsi që kombinojnë estetikën moderne me funksionalitetin praktik. Ekipi ynë i specializuar njeh mirë nevojat e tregut tiranas - nga apartamentet luksoz në Bllok deri te zyrat moderne në Komunën e Parisit, nga vilat në periferi deri te qendrat tregtare të mëdha. Përdorim materialet më cilësore nga Knauf dhe Rigips për të garantuar qëndrueshmëri afatgjatë.',
      'Çdo projekt në Tiranë trajtohet me kujdesin maksimal nga ekipi ynë. Fillojmë me një konsultë falas në vendndodhjen tuaj, vlerësojmë nevojat specifike dhe hartojmë një plan pune të detajuar. Qoftë për një rinovim të plotë apartamenti ose një projekt komercial të madh, ne ofrojmë zgjidhje të personalizuara me materiale premium dhe mjeshtëri të lartë. Puna jonë mbulon tavanet e varura, ndarjet e hapësirave, dekorimet arkitekturore dhe izolimin akustik e termik.',
    ],
    contentSections: [
      {
        title: 'Çfarë Punimesh Gipsi Ofrojmë në Tiranë?',
        content: 'Në Tiranë ofrojmë gamën e plotë të punimeve të gipsit për projekte rezidenciale dhe komerciale. Nga apartamentet e reja në zonat e zhvillimit si Kashar dhe Farkë, deri te zyrat moderne në qendër të Tiranës, çdo projekt përfiton nga përvoja jonë e gjerë dhe materialet cilësore Knauf dhe Rigips.',
        listItems: [
          'Tavane të varura me dizajne moderne dhe klasike për çdo ambient',
          'Ndarja hapësirash me panel gipsi për zyra, hotele dhe banesa',
          'Dekorime arkitekturore - korniza, kolona, rozeta dhe relieve',
          'Izolim akustik dhe termik për komfort maksimal',
          'Integrim profesional i sistemeve LED dhe ndriçimit indirekt',
          'Zgjidhje të specializuara për mbrojtje nga zjarri',
        ],
      },
      {
        title: 'Si Realizohen Tavanet e Gipsit në Tiranë?',
        content: 'Procesi i instalimit të tavaneve të gipsit në Tiranë ndiqet me rigorozitet të plotë teknik. Ekipi ynë vlerëson strukturën ekzistuese, matë me precizion hapësirat dhe harton dizajnin optimal duke marrë parasysh ndriçimin natyror, lartësinë e ambientit dhe kërkesat estetike të klientit. Për ndërtesat e larta në qendër të Tiranës apo vilat në periferi, adaptojmë teknikat tona për çdo situatë.',
        listItems: [
          'Vlerësim teknik i strukturës ekzistuese para instalimit',
          'Montim i skeletit metalik sipas standardeve të Knauf dhe Rigips',
          'Aplikim i paneleve të gipsit me precizion milimetrik',
          'Përfundim i fugave dhe sipërfaqeve për rezultat të përsosur',
          'Integrim i ndriçimit LED, spoteve dhe sistemeve HVAC',
          'Kontroll përfundimtar i cilësisë para dorëzimit',
        ],
      },
      {
        title: 'Pse të Zgjidhni Gipsin për Projektin Tuaj në Tiranë?',
        content: 'Gipsi është materiali ideal për projektet në Tiranë për arsye të shumta. Klima e Tiranës, me verë të nxehtë dhe dimër të lagësht, kërkon materiale që ofrojnë izolim termik efikas. Gipsi ofron mbrojtje të shkëlqyer termike që ndihmon në kursimin e energjisë për ngrohje dhe ftohje, veçanërisht i rëndësishëm për ndërtesat e larta në qendër të qytetit.',
        listItems: [
          'Izolim termik superior - kurseni në faturat e energjisë gjatë gjithë vitit',
          'Izolim akustik i shkëlqyer - thelbësor për apartamentet dhe zyrat në Tiranë',
          'Rezistencë ndaj zjarrit sipas standardeve europiane',
          'Instalim i shpejtë dhe i pastër pa ndërhyrje strukturore',
          'Mundësi të pakufizuara dizajni për çdo stil arkitekturor',
          'Material i qëndrueshëm dhe miqësor ndaj mjedisit',
        ],
      },
      {
        title: 'Cilat Zona të Tiranës Mbulojmë?',
        content: 'Torra Gips ofron shërbime punimesh gipsi në të gjitha zonat e Tiranës dhe rrethinave. Ekipi ynë është i gatshëm të vijë në çdo lokacion brenda qytetit dhe periferisë, duke ofruar konsultë falas në vend për vlerësimin e projektit tuaj.',
        listItems: [
          'Blloku dhe qendra e Tiranës - apartamente luksoz dhe zyra moderne',
          'Komuna e Parisit - ndërtesa të reja rezidenciale dhe komerciale',
          'Kashar dhe Farkë - vila dhe komplekse rezidenciale në zhvillim',
          'Kombinat dhe Laprakë - rinovime apartamentesh dhe projekte rezidenciale',
          'Sauk dhe Liqeni i Thatë - zona rezidenciale dhe biznese lokale',
          'Kamzë, Paskuqan dhe rrethinat e tjera të Tiranës',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Tavane Gipsi për Apartamente në Tiranë',
        description: 'Tavane moderne ideale për apartamentet e reja në Bllok, Komunën e Parisit dhe Kashar. Dizajne që maksimizojnë lartësinë vizuale të ambienteve urbane.',
        features: ['Ideale për apartamente', 'Lartësi vizuale', 'LED i integruar', 'Dizajne urbane'],
      },
      {
        icon: 'partition' as const,
        title: 'Ndarja Zyrash & Apartamentesh',
        description: 'Zgjidhja perfekte për zyrat open-space në qendër të Tiranës dhe ndarjen e dhomave në apartamente të reja. Izolim akustik midis fqinjëve.',
        features: ['Zyra open-space', 'Ndarja dhomash', 'Izolim ndërmjet katesh', 'Pa zhurma'],
      },
      {
        icon: 'decoration' as const,
        title: 'Dekorime për Hapësira Rezidenciale',
        description: 'Korniza dhe profile moderne për apartamentet luksoz në Tiranë. Stili minimalist urban që kërkohet në projektet e reja rezidenciale.',
        features: ['Stil urban modern', 'Profile minimaliste', 'Ndriçim indirekt', 'Detaje elegante'],
      },
      {
        icon: 'insulation' as const,
        title: 'Izolim Termik për Klimën e Tiranës',
        description: 'Panele termoizoluese që mbrojnë nga vapët verore dhe të ftohti dimëror i Tiranës. Kurseni deri në 30% në faturat e energjisë.',
        features: ['Mbrojtje nga vapa', 'Kursim energjie 30%', 'Izolim akustik urban', 'Mbrojtje zjarri'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Sa kushton instalimi i tavanit të gipsit në Tiranë?',
        answer: 'Na kontaktoni për një konsultë falas dhe ofertë të personalizuar. Vizita në vendndodhjen tuaj në Tiranë është pa pagesë. Telefononi në +355 68 858 0058 ose na shkruani në WhatsApp.',
      },
      {
        question: 'A vini në çdo zonë të Tiranës?',
        answer: 'Po, mbulojmë të gjitha zonat e Tiranës përfshirë Bllokun, Komunën e Parisit, Kashar, Kombinat, Farkë, Sauk, Liqeni i Thatë, Laprakë, Kamzë, Paskuqan dhe të gjitha rrethinat.',
      },
      {
        question: 'Sa kohë zgjat instalimi i gipsit për një apartament në Tiranë?',
        answer: 'Për një apartament standard në Tiranë, punimet e gipsit zgjasin zakonisht 3-7 ditë pune varësisht nga kompleksiteti. Për projekte më të mëdha si vila ose zyra, koha mund të jetë 1-4 javë. Ofrojmë plan pune të detajuar para fillimit.',
      },
      {
        question: 'A mund të punoni jashtë orarit në Tiranë?',
        answer: 'Po, për klientët tanë në Tiranë ofrojmë fleksibilitet të plotë. Mund të punojmë në mbrëmje, natën ose fundjavë për projekte komerciale që nuk mund të ndërpresin aktivitetin gjatë ditës.',
      },
      {
        question: 'Cilat materiale gipsi përdorni për projektet në Tiranë?',
        answer: 'Përdorim ekskluzivisht materiale nga Knauf dhe Rigips, prodhuesit më të njohur në botë. Këto materiale garantojnë cilësi, qëndrueshmëri dhe performancë optimale për klimën e Tiranës.',
      },
      {
        question: 'A ofroni garanci për punimet e gipsit në Tiranë?',
        answer: 'Po, të gjitha punimet tona në Tiranë mbulohen me garanci të plotë. Garancia përfshin si materialin ashtu edhe punën e instalimit. Jemi të përkushtuar ndaj cilësisë dhe kënaqësisë së çdo klienti.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Gipsi Ofrojmë në Tiranë?',
      commercialExperience: 'Ku Kemi Punuar me Gips në Tiranë?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips në Tiranë?',
      howWeWork: 'Si Funksionon Procesi Ynë në Tiranë?',
      serviceAreas: 'Cilat Zona të Tiranës Mbulojmë?',
      faq: 'Pyetje të Shpeshta për Punimet e Gipsit në Tiranë',
      readyToStart: 'Gati për Projektin Tuaj të Gipsit në Tiranë?',
    },
    relatedLinks: [
      { href: '/punime-gipsi-durres', label: 'Punime Gipsi në Durrës' },
      { href: '/punime-gipsi', label: 'Punime Gipsi Profesionale' },
      { href: '/patinim-tirane', label: 'Patinim Profesional në Tiranë' },
    ],
  } : {
    serviceName: 'Gypsum Works Tirana',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Professional Gypsum Works in Tirana',
    heroSubtitle: 'Suspended ceilings, space partitions, architectural decorations and acoustic insulation for commercial and residential projects in Tirana. Knauf and Rigips materials. Free consultation.',
    introContent: [
      'Professional gypsum works in Tirana are among the most sought-after construction and renovation services in the Albanian capital. As the largest city in Albania, Tirana has a thriving market for quality gypsum work across neighborhoods such as Blloku, Komuna e Parisit, Kashar, Kombinat and the city center. Torra Gips delivers comprehensive solutions for every need, from modern apartments to large-scale commercial projects. With 100+ completed projects nationwide, including Vlora International Airport, Green Coast Resort, Rolling Hills and Lion Park, we bring the same level of professionalism to every project in Tirana.',
      'Tirana is experiencing rapid urban development with new residential and commercial buildings constantly rising across the city. This growth demands professional gypsum solutions that combine modern aesthetics with practical functionality. Our specialized team understands the Tirana market intimately - from luxury apartments in Blloku to modern offices in Komuna e Parisit, from suburban villas to large shopping centers. We use the highest quality materials from Knauf and Rigips to ensure long-lasting durability.',
      'Every project in Tirana receives our utmost attention. We begin with a free on-site consultation at your location, assess your specific needs and develop a detailed work plan. Whether it is a complete apartment renovation or a large commercial project, we provide customized solutions with premium materials and superior craftsmanship. Our work covers suspended ceilings, space partitions, architectural decorations and acoustic and thermal insulation.',
    ],
    contentSections: [
      {
        title: 'What Gypsum Works Do We Offer in Tirana?',
        content: 'In Tirana we offer the full range of gypsum works for residential and commercial projects. From new apartments in developing areas like Kashar and Farkë to modern offices in the city center, every project benefits from our extensive experience and quality Knauf and Rigips materials.',
        listItems: [
          'Suspended ceilings with modern and classic designs for any environment',
          'Space partitions with gypsum panels for offices, hotels and residences',
          'Architectural decorations - frames, columns, rosettes and reliefs',
          'Acoustic and thermal insulation for maximum comfort',
          'Professional integration of LED systems and indirect lighting',
          'Specialized fire protection solutions',
        ],
      },
      {
        title: 'How Are Gypsum Ceilings Installed in Tirana?',
        content: 'The gypsum ceiling installation process in Tirana follows rigorous technical standards. Our team evaluates the existing structure, precisely measures the spaces and designs the optimal layout considering natural lighting, ceiling height and the client\'s aesthetic requirements. For tall buildings in central Tirana or suburban villas, we adapt our techniques to each situation.',
        listItems: [
          'Technical assessment of the existing structure before installation',
          'Metal frame assembly according to Knauf and Rigips standards',
          'Gypsum panel application with millimeter precision',
          'Joint and surface finishing for a perfect result',
          'LED lighting, spotlight and HVAC system integration',
          'Final quality control before handover',
        ],
      },
      {
        title: 'Why Choose Gypsum for Your Tirana Project?',
        content: 'Gypsum is the ideal material for projects in Tirana for numerous reasons. Tirana\'s climate, with hot summers and damp winters, demands materials that provide efficient thermal insulation. Gypsum offers excellent thermal protection that helps save energy on heating and cooling, particularly important for tall buildings in the city center.',
        listItems: [
          'Superior thermal insulation - save on energy bills throughout the year',
          'Excellent acoustic insulation - essential for apartments and offices in Tirana',
          'Fire resistance according to European standards',
          'Quick and clean installation without structural intervention',
          'Unlimited design possibilities for any architectural style',
          'Durable and environmentally friendly material',
        ],
      },
      {
        title: 'What Areas of Tirana Do We Cover?',
        content: 'Torra Gips provides gypsum works services across all areas of Tirana and its surroundings. Our team is ready to come to any location within the city and its periphery, offering a free on-site consultation for your project assessment.',
        listItems: [
          'Blloku and central Tirana - luxury apartments and modern offices',
          'Komuna e Parisit - new residential and commercial buildings',
          'Kashar and Farkë - villas and developing residential complexes',
          'Kombinat and Laprakë - apartment renovations and residential projects',
          'Sauk and Liqeni i Thatë - residential zones and local businesses',
          'Kamzë, Paskuqan and other Tirana surroundings',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Gypsum Ceilings for Tirana Apartments',
        description: 'Modern ceilings ideal for new apartments in Blloku, Komuna e Parisit and Kashar. Designs that maximize the visual height of urban spaces.',
        features: ['Ideal for apartments', 'Visual height', 'Integrated LED', 'Urban designs'],
      },
      {
        icon: 'partition' as const,
        title: 'Office & Apartment Partitions',
        description: 'The perfect solution for open-space offices in central Tirana and room divisions in new apartments. Acoustic insulation between neighbors.',
        features: ['Open-space offices', 'Room dividers', 'Floor-to-floor insulation', 'Noise-free'],
      },
      {
        icon: 'decoration' as const,
        title: 'Residential Space Decorations',
        description: 'Modern frames and profiles for luxury apartments in Tirana. Urban minimalist style demanded in new residential developments.',
        features: ['Urban modern style', 'Minimalist profiles', 'Indirect lighting', 'Elegant details'],
      },
      {
        icon: 'insulation' as const,
        title: 'Thermal Insulation for Tirana Climate',
        description: 'Thermal insulation panels that protect from Tirana\'s summer heat and winter cold. Save up to 30% on energy bills.',
        features: ['Heat protection', '30% energy savings', 'Urban acoustic insulation', 'Fire protection'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'How much does gypsum ceiling installation cost in Tirana?',
        answer: 'Contact us for a free consultation and personalized quote. The on-site visit to your Tirana location is free of charge. Call +355 68 858 0058 or message us on WhatsApp.',
      },
      {
        question: 'Do you come to all areas of Tirana?',
        answer: 'Yes, we cover all areas of Tirana including Blloku, Komuna e Parisit, Kashar, Kombinat, Farkë, Sauk, Liqeni i Thatë, Laprakë, Kamzë, Paskuqan and all surrounding areas.',
      },
      {
        question: 'How long does gypsum installation take for an apartment in Tirana?',
        answer: 'For a standard apartment in Tirana, gypsum works typically take 3-7 working days depending on complexity. For larger projects like villas or offices, the timeline can be 1-4 weeks. We provide a detailed work plan before starting.',
      },
      {
        question: 'Can you work outside regular hours in Tirana?',
        answer: 'Yes, for our Tirana clients we offer full flexibility. We can work evenings, nights or weekends for commercial projects that cannot interrupt their daytime operations.',
      },
      {
        question: 'What gypsum materials do you use for projects in Tirana?',
        answer: 'We exclusively use materials from Knauf and Rigips, the most renowned manufacturers in the world. These materials guarantee quality, durability and optimal performance for Tirana\'s climate.',
      },
      {
        question: 'Do you offer warranty for gypsum works in Tirana?',
        answer: 'Yes, all our works in Tirana are covered by a full warranty. The warranty includes both the material and the installation work. We are committed to quality and the satisfaction of every client.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Gypsum Services Do We Offer in Tirana?',
      commercialExperience: 'Where Have We Done Gypsum Work in Tirana?',
      whyChooseUs: 'Why Choose Torra Gips in Tirana?',
      howWeWork: 'How Does Our Process Work in Tirana?',
      serviceAreas: 'What Areas of Tirana Do We Cover?',
      faq: 'Frequently Asked Questions About Gypsum Works in Tirana',
      readyToStart: 'Ready for Your Gypsum Project in Tirana?',
    },
    relatedLinks: [
      { href: '/gypsum-works-durres', label: 'Gypsum Works in Durrës' },
      { href: '/gypsum-works', label: 'Professional Gypsum Works' },
      { href: '/wall-plastering-tirana', label: 'Professional Plastering in Tirana' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/punime-gipsi-tirane/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Punime Gipsi' : 'Gypsum Works', url: `/${locale}/${isAlbanian ? 'punime-gipsi' : 'gypsum-works'}/` },
          { name: isAlbanian ? 'Punime Gipsi Tiranë' : 'Gypsum Works Tirana', url: `/${locale}/${isAlbanian ? 'punime-gipsi-tirane' : 'gypsum-works-tirana'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
