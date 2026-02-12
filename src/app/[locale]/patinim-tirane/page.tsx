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
      ? 'Patinim Profesional Tiranë - +355 68 858 0058 - Torra Gips'
      : 'Professional Plastering Tirana - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Patinim profesional murash në Tiranë. Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash për projekte komerciale dhe rezidenciale. 100+ projekte. Konsultë falas.'
      : 'Professional wall plastering in Tirana. Interior and exterior plastering, decorative plaster and wall repairs for commercial and residential projects. 100+ projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'patinim-tirane' : 'wall-plastering-tirana'}/`,
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Patinim Profesional Tiranë - Torra Gips'
        : 'Professional Plastering Tirana - Torra Gips',
      description: locale === 'sq'
        ? 'Patinim profesional murash në Tiranë. Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash. 100+ projekte.'
        : 'Professional wall plastering in Tirana. Interior and exterior plastering, decorative plaster and wall repairs. 100+ projects.',
      images: [{ url: '/images/services/plastering/accent-wall.webp' }],
    },
  };
}

export default async function PlasteringTiranaPage({ params }: Props) {
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
    { title: 'Mjeshtëri Tradicionale', description: 'Teknika tradicionale të kombinuara me metoda moderne.' },
    { title: 'Materiale Cilësore', description: 'Produkte premium nga prodhuesit më të njohur europianë.' },
    { title: 'Ekip me Përvojë', description: 'Mjeshtër me dekada përvojë në patinim profesional.' },
    { title: 'Fleksibilitet Oraresh', description: 'Punojmë natën dhe fundjavë për projekte komerciale.' },
    { title: 'Garanci e Plotë', description: 'Garanci afatgjatë për çdo punë të kryer.' },
    { title: 'Çmime Transparente', description: 'Oferta të qarta pa surpriza.' },
  ] : [
    { title: 'Traditional Craftsmanship', description: 'Traditional techniques combined with modern methods.' },
    { title: 'Quality Materials', description: 'Premium products from the most renowned European manufacturers.' },
    { title: 'Experienced Team', description: 'Craftsmen with decades of experience in professional plastering.' },
    { title: 'Flexible Hours', description: 'We work nights and weekends for commercial projects.' },
    { title: 'Full Warranty', description: 'Long-term warranty for all work performed.' },
    { title: 'Transparent Pricing', description: 'Clear quotes with no surprises.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Inspektim', description: 'Vlerësim në vend' },
    { step: '2', title: 'Ofertë', description: 'Çmim i detajuar' },
    { step: '3', title: 'Përgatitje', description: 'Sipërfaqet e murit' },
    { step: '4', title: 'Patinim', description: 'Aplikim profesional' },
    { step: '5', title: 'Përfundim', description: 'Kontroll cilësie' },
  ] : [
    { step: '1', title: 'Inspection', description: 'On-site assessment' },
    { step: '2', title: 'Quote', description: 'Detailed pricing' },
    { step: '3', title: 'Preparation', description: 'Wall surfaces' },
    { step: '4', title: 'Plastering', description: 'Professional application' },
    { step: '5', title: 'Completion', description: 'Quality control' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Patinim Tiranë',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Patinim Profesional Murash në Tiranë',
    heroSubtitle: 'Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash në të gjithë Tiranën. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës dhe Lion Park. Materiale premium europiane. Konsultë falas.',
    introContent: [
      'Patinimi profesional i mureve në Tiranë është një shërbim thelbësor për ndërtimet e reja dhe rinovimet që po transformojnë kryeqytetin. Torra Gips ofron patinim të nivelit më të lartë në të gjitha zonat e Tiranës, duke përfshirë Bllokun, Komunën e Parisit, Kasharin, qendrën e Tiranës dhe lagjet e reja rezidenciale. Me përvojën tonë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort, Rolling Hills dhe Lion Park, ne kemi provuar se jemi zgjedhja e duhur për çdo projekt në Tiranë.',
      'Tirana është qyteti me rritjen më të shpejtë të ndërtimit në Shqipëri, me projekte që variojnë nga kullat moderne të Bllokut te komplekset rezidenciale të Kashrit dhe Farkës. Çdo ndërtesë kërkon patinim cilësor që garanton jetëgjatësi dhe estetikë. Ekipi ynë i specializuar njeh mirë specifikat e çdo zone të kryeqytetit dhe ofron zgjidhje të përshtatura për klimën dhe arkitekturën lokale.',
      'Në tregun e ndërtimit të Tiranës, ku standardet po rriten vazhdimisht, patinimi profesional bën diferencën mes një ndërtese të zakonshme dhe një projekti cilësor. Sipërfaqet e patinuara nga Torra Gips jo vetëm duken elegante, por gjithashtu mbrojnë strukturën nga lagështia, përmirësojnë izolimin termik dhe krijojnë bazën perfekte për përfundime luksoze.',
    ],
    contentSections: [
      {
        title: 'Çfarë Përfshin Patinimi Brendshëm në Tiranë?',
        content: 'Patinimi brendshëm në Tiranë kërkon njohuri të veçanta për shkak të varietetit të ndërtesave, nga pallatet e vjetra të qendrës te kullat e reja moderne. Ne ofrojmë sipërfaqe të lëmuara dhe uniforme për apartamente, zyra, dyqane dhe çdo ambient tjetër në kryeqytet.',
        listItems: [
          'Patinim me gips për sipërfaqe ultra të lëmuara në apartamente të reja',
          'Suva tradicionale për rinovimet e pallateve të vjetra të Tiranës',
          'Përgatitje sipërfaqesh për lyerje dhe përfundime luksoze',
          'Riparime muraturash në ndërtesa ekzistuese',
          'Sisteme patinimi të shpejtë për projekte me afate të ngushta',
          'Patinim i specializuar për banjo dhe kuzhina në apartamentet e Tiranës',
        ],
      },
      {
        title: 'Pse Është i Rëndësishëm Patinimi Jashtëm në Tiranë?',
        content: 'Klimatika e Tiranës me verëra të nxehta dhe dimra me lagështi kërkon patinim jashtëm të cilësisë së lartë. Fasadat e ndërtesave në Tiranë duhet të përballojnë luhatjet e temperaturës dhe reshjet e shiut, ndërsa ruajnë pamjen estetike.',
        listItems: [
          'Suva e jashtme rezistente ndaj kushteve klimatike të Tiranës',
          'Sisteme izoluese termike për kursim energjie në ndërtesat e kryeqytetit',
          'Përfundime dekorative fasadash për kullat moderne',
          'Riparime fasadash dhe restaurime në qendrën historike',
          'Trajtim kundër lagështisë për ndërtesa në zonat e ulëta',
          'Ngjyra të qëndrueshme ndaj rrezeve UV për diellshmërinë e Tiranës',
        ],
      },
      {
        title: 'Çfarë Efektesh Ofrojnë Suvat Dekorative në Tiranë?',
        content: 'Tregu i Tiranës kërkon gjithnjë e më shumë përfundime luksoze dhe dekorative. Suvaja dekorative është zgjedhja ideale për lobby-t e kullave, restorantet e Bllokut, zyrat përfaqësuese dhe vilat luksoze në periferi të kryeqytetit.',
        listItems: [
          'Efekt mermeri venecian për ambientet më prestigjioze të Tiranës',
          'Tekstura travertini për resorte dhe hotele në periferi',
          'Efekte metalike për zyra dhe hapësira komerciale moderne',
          'Suva antike për restorantet dhe lokalet e Bllokut',
          'Tekstura moderne minimaliste për apartamentet e reja',
          'Efekte të personalizuara sipas projektit arkitekturor',
        ],
      },
      {
        title: 'Cilat Zona të Tiranës Mbulojmë për Patinim?',
        content: 'Torra Gips ofron mbulim të plotë në të gjithë Tiranën dhe rrethinat. Pavarësisht nëse projekti juaj ndodhet në zemrën e kryeqytetit apo në zonat e reja të urbanizuara, ekipi ynë arrin kudo me shpejtësi dhe profesionalizëm.',
        listItems: [
          'Qendra e Tiranës dhe Blloku - projekte komerciale dhe rezidenciale',
          'Komuna e Parisit dhe Ish-Blloku - rinovime apartamentesh',
          'Kashar dhe Farkë - vila dhe komplekse të reja rezidenciale',
          'Sauk dhe Liqeni Artificial - ndërtesa luksoze',
          'Porcelan dhe Kombinat - projekte të mëdha rezidenciale',
          'Kamza dhe rrethinat - ndërtime të reja dhe rinovime',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Patinim Brendshëm',
        description: 'Sipërfaqe të lëmuara dhe uniforme për çdo lloj përfundimi. Ideale për ambiente komerciale dhe rezidenciale.',
        features: ['Sipërfaqe perfekte', 'Bazë për lyerje', 'Riparime muraturash', 'Përfundim i shpejtë'],
      },
      {
        icon: 'partition' as const,
        title: 'Patinim Jashtëm',
        description: 'Mbrojtje dhe estetikë për fasadat e ndërtesave. Rezistencë ndaj kushteve atmosferike.',
        features: ['Rezistencë atmosferike', 'Izolim termik', 'Ngjyra të qëndrueshme', 'Mbrojtje afatgjatë'],
      },
      {
        icon: 'decoration' as const,
        title: 'Suva Dekorative',
        description: 'Efekte artistike dhe tekstura unike për ambiente që kërkojnë diçka të veçantë.',
        features: ['Efekt mermeri', 'Tekstura travertini', 'Efekte metalike', 'Dizajne të personalizuara'],
      },
      {
        icon: 'insulation' as const,
        title: 'Riparime dhe Restaurime',
        description: 'Rivendosim pamjen origjinale të muraturave pa ndërhyrje të mëdha strukturore.',
        features: ['Riparime çarjesh', 'Restaurime uji', 'Trajtim lagështie', 'Rinovime të plota'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A ofroni patinim në të gjitha lagjet e Tiranës?',
        answer: 'Po, mbulojmë të gjithë Tiranën dhe rrethinat përfshirë Bllokun, Komunën e Parisit, Kasharin, Farkën, Saukun, Porcelanin, Kombinatin dhe Kamzën. Ekipi ynë arrin kudo brenda ditës për inspektim falas.',
      },
      {
        question: 'Sa kohë zgjat patinimi i një apartamenti në Tiranë?',
        answer: 'Për një apartament mesatar në Tiranë (80-120 m²), patinimi brendshëm kërkon zakonisht 3-7 ditë pune, në varësi të gjendjes së mureve dhe llojit të patinimit. Për projekte urgjente punojmë edhe me turne.',
      },
      {
        question: 'A mund të punoni gjatë natës për bizneset në Tiranë?',
        answer: 'Po, për dyqane, restorante, zyra dhe biznese të tjera në Tiranë ofrojmë patinim jashtë orarit të punës. Punojmë natën dhe në fundjavë për të mos ndërprerë aktivitetin tuaj.',
      },
      {
        question: 'Cilat materiale përdorni për patinimin në Tiranë?',
        answer: 'Përdorim vetëm materiale premium të certifikuara nga prodhuesit më të njohur europianë, të zgjedhura posaçërisht për klimën e Tiranës. Materialet tona janë rezistente ndaj lagështisë dhe ndryshimeve të temperaturës.',
      },
      {
        question: 'A keni përvojë me projekte të mëdha në Tiranë?',
        answer: 'Po, kemi kryer 100+ projekte në Shqipëri përfshirë projekte prestigjioze si Aeroporti i Vlorës, Green Coast Resort, Rolling Hills dhe Lion Park. Në Tiranë kemi punuar me kulla, zyra dhe komplekse rezidenciale.',
      },
      {
        question: 'Si mund të marr ofertë falas për patinim në Tiranë?',
        answer: 'Na kontaktoni në +355 68 858 0058 me telefon ose WhatsApp. Ofrojmë inspektim dhe vlerësim falas në çdo zonë të Tiranës. Sillni matjet ose planin arkitekturor për një ofertë më të saktë.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Patinimi Ofrojmë në Tiranë?',
      commercialExperience: 'Ku Kemi Kryer Patinim Komercial në Tiranë?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Patinimin në Tiranë?',
      howWeWork: 'Si Funksionon Procesi i Patinimit në Tiranë?',
      serviceAreas: 'Ku Ofrojmë Shërbime Patinimi në Tiranë?',
      faq: 'Pyetje të Shpeshta për Patinimin në Tiranë',
      readyToStart: 'Gati për Projektin Tuaj të Patinimit në Tiranë?',
    },
    relatedLinks: [
      { href: '/patinim-durres', label: 'Patinim Profesional në Durrës' },
      { href: '/patinim', label: 'Patinim Profesional Murash' },
      { href: '/punime-gipsi-tirane', label: 'Punime Gipsi në Tiranë' },
    ],
  } : {
    serviceName: 'Plastering Tirana',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Professional Wall Plastering in Tirana',
    heroSubtitle: 'Interior and exterior plastering, decorative plaster and wall repairs across all of Tirana. 100+ completed projects including Vlora Airport and Lion Park. Premium European materials. Free consultation.',
    introContent: [
      'Professional wall plastering in Tirana is an essential service for new constructions and renovations that are transforming the capital city. Torra Gips delivers the highest level plastering across all areas of Tirana, including Blloku, Komuna e Parisit, Kashar, the city center and new residential neighborhoods. With our experience on prestigious projects such as Vlora International Airport, Green Coast Resort, Rolling Hills and Lion Park, we have proven ourselves as the right choice for any project in Tirana.',
      'Tirana is the fastest-growing construction market in Albania, with projects ranging from the modern towers of Blloku to the residential complexes of Kashar and Farka. Every building requires quality plastering that guarantees longevity and aesthetics. Our specialized team knows the specifics of each area of the capital and offers solutions tailored to the local climate and architecture.',
      'In Tirana\'s construction market, where standards are constantly rising, professional plastering makes the difference between an ordinary building and a quality project. Surfaces plastered by Torra Gips not only look elegant, but also protect the structure from moisture, improve thermal insulation and create the perfect base for luxury finishes.',
    ],
    contentSections: [
      {
        title: 'What Does Interior Plastering Include in Tirana?',
        content: 'Interior plastering in Tirana requires specialized knowledge due to the variety of buildings, from old apartment blocks in the center to new modern towers. We offer smooth and uniform surfaces for apartments, offices, shops and every other environment in the capital.',
        listItems: [
          'Gypsum plastering for ultra-smooth surfaces in new apartments',
          'Traditional plaster for renovations of older Tirana buildings',
          'Surface preparation for painting and luxury finishes',
          'Wall repairs in existing buildings',
          'Fast plastering systems for tight deadline projects',
          'Specialized plastering for bathrooms and kitchens in Tirana apartments',
        ],
      },
      {
        title: 'Why Is Exterior Plastering Important in Tirana?',
        content: 'Tirana\'s climate with hot summers and humid winters demands high-quality exterior plastering. Building facades in Tirana must withstand temperature fluctuations and rainfall while maintaining their aesthetic appearance.',
        listItems: [
          'Weather-resistant exterior plaster suited to Tirana\'s climate',
          'Thermal insulation systems for energy savings in capital city buildings',
          'Decorative facade finishes for modern towers',
          'Facade repairs and restorations in the historic center',
          'Moisture treatment for buildings in low-lying areas',
          'UV-resistant colors for Tirana\'s sunny climate',
        ],
      },
      {
        title: 'What Effects Do Decorative Plasters Offer in Tirana?',
        content: 'Tirana\'s market increasingly demands luxury and decorative finishes. Decorative plaster is the ideal choice for tower lobbies, Blloku restaurants, representative offices and luxury villas on the outskirts of the capital.',
        listItems: [
          'Venetian marble effect for Tirana\'s most prestigious environments',
          'Travertine textures for resorts and hotels on the outskirts',
          'Metallic effects for offices and modern commercial spaces',
          'Antique plaster for Blloku restaurants and venues',
          'Modern minimalist textures for new apartments',
          'Customized effects according to architectural design',
        ],
      },
      {
        title: 'Which Areas of Tirana Do We Cover for Plastering?',
        content: 'Torra Gips offers full coverage across all of Tirana and surrounding areas. Whether your project is in the heart of the capital or in newly urbanized zones, our team arrives anywhere promptly and professionally.',
        listItems: [
          'Tirana Center and Blloku - commercial and residential projects',
          'Komuna e Parisit and former Blloku - apartment renovations',
          'Kashar and Farka - villas and new residential complexes',
          'Sauk and Artificial Lake - luxury buildings',
          'Porcelan and Kombinat - large residential projects',
          'Kamza and surroundings - new constructions and renovations',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Interior Plastering',
        description: 'Smooth and uniform surfaces for any type of finish. Ideal for commercial and residential environments.',
        features: ['Perfect surfaces', 'Paint base', 'Wall repairs', 'Fast finish'],
      },
      {
        icon: 'partition' as const,
        title: 'Exterior Plastering',
        description: 'Protection and aesthetics for building facades. Weather resistance.',
        features: ['Weather resistance', 'Thermal insulation', 'Stable colors', 'Long-term protection'],
      },
      {
        icon: 'decoration' as const,
        title: 'Decorative Plaster',
        description: 'Artistic effects and unique textures for environments that require something special.',
        features: ['Marble effect', 'Travertine textures', 'Metallic effects', 'Custom designs'],
      },
      {
        icon: 'insulation' as const,
        title: 'Repairs and Restorations',
        description: 'We restore the original appearance of walls without major structural interventions.',
        features: ['Crack repairs', 'Water restorations', 'Moisture treatment', 'Complete renovations'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you offer plastering in all neighborhoods of Tirana?',
        answer: 'Yes, we cover all of Tirana and surrounding areas including Blloku, Komuna e Parisit, Kashar, Farka, Sauk, Porcelan, Kombinat and Kamza. Our team arrives anywhere within the day for a free inspection.',
      },
      {
        question: 'How long does plastering an apartment in Tirana take?',
        answer: 'For an average Tirana apartment (80-120 m²), interior plastering typically takes 3-7 working days, depending on wall condition and type of plastering. For urgent projects we also work in shifts.',
      },
      {
        question: 'Can you work overnight for businesses in Tirana?',
        answer: 'Yes, for shops, restaurants, offices and other businesses in Tirana we offer plastering outside business hours. We work nights and weekends to not interrupt your business activity.',
      },
      {
        question: 'What materials do you use for plastering in Tirana?',
        answer: 'We use only premium certified materials from the most renowned European manufacturers, specifically selected for Tirana\'s climate. Our materials are resistant to moisture and temperature changes.',
      },
      {
        question: 'Do you have experience with large projects in Tirana?',
        answer: 'Yes, we have completed 100+ projects in Albania including prestigious projects such as Vlora Airport, Green Coast Resort, Rolling Hills and Lion Park. In Tirana we have worked on towers, offices and residential complexes.',
      },
      {
        question: 'How can I get a free plastering quote in Tirana?',
        answer: 'Contact us at +355 68 858 0058 by phone or WhatsApp. We offer free inspection and assessment in any area of Tirana. Bring measurements or architectural plans for a more accurate quote.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Plastering Services Do We Offer in Tirana?',
      commercialExperience: 'Where Have We Done Commercial Plastering in Tirana?',
      whyChooseUs: 'Why Choose Torra Gips for Plastering in Tirana?',
      howWeWork: 'How Does the Plastering Process Work in Tirana?',
      serviceAreas: 'Where Do We Offer Plastering Services in Tirana?',
      faq: 'Frequently Asked Questions About Plastering in Tirana',
      readyToStart: 'Ready for Your Plastering Project in Tirana?',
    },
    relatedLinks: [
      { href: '/wall-plastering-durres', label: 'Professional Plastering in Durrës' },
      { href: '/wall-plastering', label: 'Professional Wall Plastering' },
      { href: '/gypsum-works-tirana', label: 'Gypsum Works in Tirana' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/${isAlbanian ? 'patinim-tirane' : 'wall-plastering-tirana'}/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Patinim' : 'Plastering', url: `/${locale}/${isAlbanian ? 'patinim' : 'wall-plastering'}/` },
          { name: isAlbanian ? 'Patinim Tiranë' : 'Plastering Tirana', url: `/${locale}/${isAlbanian ? 'patinim-tirane' : 'wall-plastering-tirana'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
