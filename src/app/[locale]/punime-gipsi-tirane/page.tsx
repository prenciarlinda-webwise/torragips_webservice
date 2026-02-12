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
    { icon: 'airport' as const, title: 'Aeroporte' },
    { icon: 'hotel' as const, title: 'Hotele & Resorte' },
    { icon: 'office' as const, title: 'Zyra & Biznese' },
    { icon: 'shopping' as const, title: 'Qendra Tregtare' },
  ] : [
    { icon: 'airport' as const, title: 'Airports' },
    { icon: 'hotel' as const, title: 'Hotels & Resorts' },
    { icon: 'office' as const, title: 'Offices & Business' },
    { icon: 'shopping' as const, title: 'Shopping Centers' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Përvojë e Gjerë', description: 'Vite përvoje në projekte komerciale të çdo shkalle.' },
    { title: 'Materiale Premium', description: 'Përdorim vetëm Knauf dhe Rigips - prodhuesit më të njohur.' },
    { title: 'Ekip i Specializuar', description: 'Mjeshtër me trajnim profesional dhe përvojë të gjatë.' },
    { title: 'Afate të Respektuara', description: 'Punojmë sipas orarit tuaj, edhe natën dhe fundjavë.' },
    { title: 'Garanci e Plotë', description: 'Garanci për punën dhe materialet e përdorura.' },
    { title: 'Çmime Konkurruese', description: 'Cilësi premium me çmime të arsyeshme.' },
  ] : [
    { title: 'Extensive Experience', description: 'Years of experience in commercial projects of all scales.' },
    { title: 'Premium Materials', description: 'We use only Knauf and Rigips - the most renowned manufacturers.' },
    { title: 'Specialized Team', description: 'Craftsmen with professional training and extensive experience.' },
    { title: 'Deadlines Respected', description: 'We work according to your schedule, even nights and weekends.' },
    { title: 'Full Warranty', description: 'Warranty for work and materials used.' },
    { title: 'Competitive Prices', description: 'Premium quality at reasonable prices.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Konsultë', description: 'Vizitë falas në vend' },
    { step: '2', title: 'Ofertë', description: 'Çmim i detajuar' },
    { step: '3', title: 'Planifikim', description: 'Orare fleksibël' },
    { step: '4', title: 'Ekzekutim', description: 'Punë profesionale' },
    { step: '5', title: 'Dorëzim', description: 'Kontroll cilësie' },
  ] : [
    { step: '1', title: 'Consult', description: 'Free on-site visit' },
    { step: '2', title: 'Quote', description: 'Detailed pricing' },
    { step: '3', title: 'Planning', description: 'Flexible schedules' },
    { step: '4', title: 'Execution', description: 'Professional work' },
    { step: '5', title: 'Delivery', description: 'Quality control' },
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
        title: 'Tavane të Varura',
        description: 'Tavane moderne me nivele të ndryshme, integrim LED dhe spote, dizajne minimaliste ose klasike për çdo ambient.',
        features: ['Dizajne me nivele', 'Ndriçim LED i integruar', 'Spote dhe strip LED', 'Efekte moderne'],
      },
      {
        icon: 'partition' as const,
        title: 'Ndarja Hapësirash',
        description: 'Riorganizoni hapësirat me panel gipsi pa ndërhyrje strukturore. Izolim akustik i shkëlqyer për zyra dhe hotele.',
        features: ['Instalim i shpejtë', 'Izolim akustik', 'Pa prishje', 'Fleksibilitet total'],
      },
      {
        icon: 'decoration' as const,
        title: 'Dekorime Arkitekturore',
        description: 'Korniza, kolona, rozeta dhe elemente skulpturore që shtojnë elegancë dhe personalitet hapësirave.',
        features: ['Korniza dekorative', 'Kolona klasike', 'Rozeta', 'Relieve artistike'],
      },
      {
        icon: 'insulation' as const,
        title: 'Izolim Akustik & Termik',
        description: 'Zgjidhje profesionale për studio, zyra, hotele dhe ambiente që kërkojnë izolim të veçantë.',
        features: ['Izolim akustik', 'Kursim energjie', 'Mbrojtje zjarri', 'Rezistencë lagështie'],
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
        title: 'Suspended Ceilings',
        description: 'Modern ceilings with different levels, LED integration and spotlights, minimalist or classic designs for any environment.',
        features: ['Multi-level designs', 'Integrated LED lighting', 'Spots and LED strips', 'Modern effects'],
      },
      {
        icon: 'partition' as const,
        title: 'Space Partitions',
        description: 'Reorganize spaces with gypsum panels without structural intervention. Excellent acoustic insulation for offices and hotels.',
        features: ['Quick installation', 'Acoustic insulation', 'Non-destructive', 'Total flexibility'],
      },
      {
        icon: 'decoration' as const,
        title: 'Architectural Decorations',
        description: 'Frames, columns, rosettes and sculptural elements that add elegance and personality to spaces.',
        features: ['Decorative frames', 'Classic columns', 'Rosettes', 'Artistic reliefs'],
      },
      {
        icon: 'insulation' as const,
        title: 'Acoustic & Thermal Insulation',
        description: 'Professional solutions for studios, offices, hotels and environments requiring special insulation.',
        features: ['Acoustic insulation', 'Energy saving', 'Fire protection', 'Moisture resistance'],
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
