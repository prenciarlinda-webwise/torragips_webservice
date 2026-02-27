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
      ? 'Punime Gipsi Durrës - +355 68 858 0058 - Torra Gips'
      : 'Gypsum Works Durrës - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Punime gipsi profesionale në Durrës. Tavane të varura, ndarja hapësirash dhe dekorime për hotele, resorte dhe projekte rezidenciale. 100+ projekte të përfunduara. Konsultë falas.'
      : 'Professional gypsum works in Durrës. Suspended ceilings, space partitions and decorations for hotels, resorts and residential projects. 100+ completed projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'punime-gipsi-durres' : 'gypsum-works-durres'}/`,
      languages: {
        sq: '/sq/punime-gipsi-durres/',
        en: '/en/gypsum-works-durres/',
      },
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Punime Gipsi Durrës - Torra Gips'
        : 'Gypsum Works Durrës - Torra Gips',
      description: locale === 'sq'
        ? 'Punime gipsi profesionale në Durrës. Tavane të varura, ndarja hapësirash dhe dekorime për hotele, resorte dhe projekte rezidenciale. 100+ projekte të përfunduara.'
        : 'Professional gypsum works in Durrës. Suspended ceilings, space partitions and decorations for hotels, resorts and residential projects. 100+ completed projects.',
      images: [{ url: '/images/services/gypsum/commercial-space-1.webp' }],
    },
  };
}

export default async function GypsumWorksDurresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAlbanian = locale === 'sq';

  const commercialCategories = isAlbanian ? [
    { icon: 'hotel' as const, title: 'Hotele Bregdetare' },
    { icon: 'shopping' as const, title: 'Resorte & Spa' },
    { icon: 'office' as const, title: 'Restorante & Bare' },
    { icon: 'airport' as const, title: 'Vila Bregdetare' },
  ] : [
    { icon: 'hotel' as const, title: 'Coastal Hotels' },
    { icon: 'shopping' as const, title: 'Resorts & Spas' },
    { icon: 'office' as const, title: 'Restaurants & Bars' },
    { icon: 'airport' as const, title: 'Coastal Villas' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Ekspertizë Bregdetare', description: 'Përvojë e veçantë me projekte turistike - hotele, resorte dhe vila përgjatë bregdetit.' },
    { title: 'Materiale Hidrofuge', description: 'Panele gipsi Knauf dhe Rigips anti-lagështi, të projektuara për klimën detare të Durrësit.' },
    { title: 'Ekip me Përvojë Hoteliere', description: 'Mjeshtër që dinë të punojnë në hotele aktive pa shqetësuar mysafirët.' },
    { title: 'Punë Gjatë & Jashtë Sezonit', description: 'Planifikojmë projektet e mëdha në dimër dhe riparime urgjente gjatë sezonit.' },
    { title: 'Zgjidhje Anti-Korrozion', description: 'Skelete metalike me trajtime të veçanta kundër kripës dhe lagështisë detare.' },
    { title: 'Konsultë Falas në Durrës', description: 'Vizitë e shpejtë falas në çdo zonë - nga Plazhi te Porto Romano.' },
  ] : [
    { title: 'Coastal Expertise', description: 'Special experience with tourism projects - hotels, resorts and villas along the coastline.' },
    { title: 'Hydrophobic Materials', description: 'Moisture-resistant Knauf and Rigips gypsum panels designed for Durrës maritime climate.' },
    { title: 'Hotel-Experienced Team', description: 'Craftsmen who know how to work in active hotels without disturbing guests.' },
    { title: 'On & Off Season Work', description: 'We plan large projects in winter and handle urgent repairs during the season.' },
    { title: 'Anti-Corrosion Solutions', description: 'Metal frames with special treatments against salt and maritime moisture.' },
    { title: 'Free Consultation in Durrës', description: 'Quick free visit to any area - from the Beach to Porto Romano.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Inspektim Bregdetar', description: 'Vlerësim i kushteve klimatike' },
    { step: '2', title: 'Ofertë e Përshtatur', description: 'Zgjidhje për klimën detare' },
    { step: '3', title: 'Materiale Hidrofuge', description: 'Panele anti-lagështi Knauf' },
    { step: '4', title: 'Instalim i Specializuar', description: 'Teknika anti-korrozion' },
    { step: '5', title: 'Testim & Dorëzim', description: 'Garanci afatgjatë bregdetare' },
  ] : [
    { step: '1', title: 'Coastal Inspection', description: 'Climate conditions assessment' },
    { step: '2', title: 'Tailored Quote', description: 'Solutions for maritime climate' },
    { step: '3', title: 'Hydrophobic Materials', description: 'Moisture-resistant Knauf panels' },
    { step: '4', title: 'Specialized Install', description: 'Anti-corrosion techniques' },
    { step: '5', title: 'Testing & Handover', description: 'Long-term coastal warranty' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Punime Gipsi Durrës',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Punime Gipsi Profesionale në Durrës',
    heroSubtitle: 'Tavane të varura, ndarja hapësirash, dekorime arkitekturore dhe izolim akustik për hotele, resorte dhe projekte rezidenciale në Durrës. Materiale Knauf dhe Rigips. Konsultë falas.',
    introContent: [
      'Punimet e gipsit profesionale në Durrës janë thelbësore për industrinë e turizmit dhe ndërtimit në qytetin më të madh bregdetar të Shqipërisë. Durrësi, me plazhin e tij të famshëm, portin tregtar dhe industrinë e lulëzuar të hoteleve e resorteve, kërkon punime gipsi të nivelit më të lartë. Torra Gips ofron zgjidhje të specializuara për hotelet, resortet, restorantet dhe bizneset përgjatë bregdetit, si edhe për projektet rezidenciale në zona si Plazhi, Currila, Shkozet, Porto Romano dhe qendra e Durrësit. Me 100+ projekte të përfunduara në mbarë Shqipërinë, duke përfshirë Aeroportin e Vlorës, Green Coast Resort, Rolling Hills dhe Lion Park, ne sjellim ekspertizë të pakrahasueshme në çdo projekt.',
      'Industria e turizmit në Durrës është në rritje të vazhdueshme, me hotele dhe resorte të reja që hapen çdo sezon. Këto projekte kërkojnë punime gipsi që kombinojnë elegancën estetike me rezistencën ndaj kushteve bregdetare. Ekipi ynë ka përvojë të veçantë me materialet që performojnë shkëlqyeshëm në ambientin detar - lagështia, kripësia e ajrit dhe ndryshimet e temperaturës janë faktorë që ne i marrim parasysh në çdo projekt. Materialet Knauf dhe Rigips që përdorim janë zgjedhur posaçërisht për qëndrueshmëri në kushtet e Durrësit.',
      'Përveç sektorit të turizmit, Durrësi ka një treg të gjerë rezidencial dhe komercial që ka nevojë për punime gipsi cilësore. Nga apartamentet pranë plazhit deri te vilat në Currila, nga zyrat në qendër të qytetit deri te magazinat në zonën industriale të Porto Romanos, ne ofrojmë zgjidhje të plota. Konsulta jonë falas në vend ju lejon të merrni një vlerësim profesional para se të filloni projektin tuaj.',
    ],
    contentSections: [
      {
        title: 'Çfarë Punimesh Gipsi Ofrojmë në Durrës?',
        content: 'Në Durrës ofrojmë shërbime të specializuara gipsi që i përshtaten nevojave unike të qytetit bregdetar. Hotelet dhe resortet në zonën e plazhit kanë kërkesa të veçanta për cilësi dhe estetikë, ndërsa bizneset në qendër të Durrësit kërkojnë zgjidhje moderne dhe funksionale.',
        listItems: [
          'Tavane të varura për lobira hotelesh, restorante dhe salla konferencash',
          'Ndarja dhomash hoteliere dhe hapësirash komerciale me izolim akustik',
          'Dekorime elegante për ambiente luksoz turistike',
          'Izolim akustik i specializuar për hotele pranë rrugëve kryesore',
          'Sisteme rezistente ndaj lagështisë për ambiente bregdetare',
          'Zgjidhje të personalizuara për secilin biznes në Durrës',
        ],
      },
      {
        title: 'Si Realizohen Tavanet e Gipsit në Durrës?',
        content: 'Instalimi i tavaneve të gipsit në Durrës kërkon vëmendje të veçantë ndaj kushteve klimatike bregdetare. Ekipi ynë përdor teknika të adaptuara që sigurojnë qëndrueshmëri afatgjatë edhe në ambientin detar. Para fillimit të punës, bëjmë një vlerësim të plotë të ambientit duke marrë parasysh lagështinë, ventilimin dhe ekspozimin ndaj diellit.',
        listItems: [
          'Vlerësim i kushteve klimatike dhe lagështisë së ambientit',
          'Përzgjedhje e materialeve të përshtatshme për kushte bregdetare',
          'Montim i skeletit metalik me trajtime anti-korrozion',
          'Aplikim i paneleve hidrofuge Knauf dhe Rigips për zona me lagështi',
          'Përfundim i sipërfaqeve me produkte rezistente ndaj klimës detare',
          'Testim dhe kontroll cilësie para dorëzimit përfundimtar',
        ],
      },
      {
        title: 'Pse të Zgjidhni Gipsin për Projektin Tuaj në Durrës?',
        content: 'Gipsi është zgjidhja ideale për projektet në Durrës falë aftësisë së tij për t\'u adaptuar me kushtet bregdetare. Hotelet, resortet dhe banesat pranë detit kanë nevojë për materiale që ofrojnë performancë të lartë edhe në kushte lagështie. Panelet e gipsit hidrofug nga Knauf dhe Rigips janë zgjidhja perfekte.',
        listItems: [
          'Rezistencë e lartë ndaj lagështisë - ideal për kushte bregdetare',
          'Izolim termik që mban freskinë në verë dhe ngrohtësinë në dimër',
          'Izolim akustik për hotele dhe ambiente turistike',
          'Instalim i shpejtë - minimizoni ndërprerjen gjatë sezonit turistik',
          'Dizajne elegante që ngrenë nivelin e çdo ambienti hotelier',
          'Mirëmbajtje minimale - e rëndësishme për bizneset e turizmit',
        ],
      },
      {
        title: 'Cilat Zona të Durrësit Mbulojmë?',
        content: 'Torra Gips ofron shërbime në të gjitha zonat e Durrësit dhe rrethinave, duke përfshirë zonat turistike bregdetare dhe qendrën e qytetit. Ekipi ynë njeh mirë gjeografinë e Durrësit dhe është i gatshëm të vijë në çdo lokacion.',
        listItems: [
          'Plazhi i Durrësit - hotele, resorte, restorante dhe bare bregdetare',
          'Currila - vila luksoz dhe komplekse rezidenciale me pamje deti',
          'Shkozet - zona rezidenciale dhe biznese të reja në zhvillim',
          'Porto Romano - projekte industriale dhe komerciale',
          'Qendra e Durrësit - zyra, dyqane dhe ndërtesa historike',
          'Golem, Kavajë dhe bregdeti jugor i Durrësit',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Tavane për Hotele & Resorte',
        description: 'Tavane elegante për lobi-t e hoteleve, restorante bregdetare dhe salla konferencash. Dizajne që krijojnë atmosferë luksoz turistike.',
        features: ['Lobira hotelesh', 'Restorante bregdetare', 'Salla eventesh', 'Atmosferë luksoz'],
      },
      {
        icon: 'partition' as const,
        title: 'Ndarja Dhomash Hoteliere',
        description: 'Ndarja e shpejtë e dhomave për hotele dhe resorte me izolim akustik të lartë. Minimizojmë ndërprerjen gjatë sezonit turistik.',
        features: ['Dhoma hotelesh', 'Izolim superior akustik', 'Instalim i shpejtë', 'Pa ndërprerje sezoni'],
      },
      {
        icon: 'decoration' as const,
        title: 'Dekorime për Industrinë Turistike',
        description: 'Elemente dekorative elegante për hotele 4-5 yje, restorante me pamje deti dhe ambiente spa. Stili mesdhetar bregdetar.',
        features: ['Stil mesdhetar', 'Hotele 4-5 yje', 'Ambiente spa', 'Pamje deti'],
      },
      {
        icon: 'insulation' as const,
        title: 'Mbrojtje nga Lagështia Detare',
        description: 'Panele hidrofuge Knauf dhe Rigips që rezistojnë lagështinë, kripën dhe ndryshimet e temperaturës bregdetare. Ideale për Durrësin.',
        features: ['Anti-lagështi', 'Rezistencë ndaj kripës', 'Qëndrueshmëri detare', 'Mirëmbajtje minimale'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A keni përvojë me projekte hoteliere në Durrës?',
        answer: 'Po, kemi përvojë të gjerë me projekte hoteliere dhe turistike. Kemi punuar në projekte prestigjioze si Green Coast Resort dhe jemi të specializuar në punime gipsi për hotele, resorte dhe restorante bregdetare.',
      },
      {
        question: 'A përdorni materiale rezistente ndaj lagështisë për projektet në Durrës?',
        answer: 'Po, për projektet në Durrës dhe zonën bregdetare përdorim panele gipsi hidrofug nga Knauf dhe Rigips. Këto materiale janë projektuar posaçërisht për ambiente me lagështi të lartë dhe performojnë shkëlqyeshëm në klimën detare.',
      },
      {
        question: 'Sa kohë zgjat instalimi i gipsit për një hotel në Durrës?',
        answer: 'Koha varet nga madhësia e projektit. Për dhoma individuale hoteliere 2-3 ditë, për kate të plota 1-2 javë, ndërsa projektet e mëdha hoteliere mund të zgjasin disa javë. Planifikojmë punën për të minimizuar ndikimin në aktivitetin e hotelit.',
      },
      {
        question: 'A mund të punoni gjatë sezonit turistik në Durrës?',
        answer: 'Po, kuptojmë rëndësinë e sezonit turistik për bizneset në Durrës. Mund të punojmë natën ose në orare të përshtatshme për të mos shqetësuar mysafirët e hotelit tuaj. Gjithashtu planifikojmë projekte të mëdha jashtë sezonit kur është e mundur.',
      },
      {
        question: 'Cilat zona të Durrësit mbuloni?',
        answer: 'Mbulojmë të gjithë Durrësin - Plazhin, Currilën, Shkozet, Porto Romanon, qendrën e qytetit, si edhe Golem, Kavajë dhe bregdetin jugor. Konsulta dhe vizita në vend janë falas. Na telefononi në +355 68 858 0058.',
      },
      {
        question: 'A ofroni garanci për punimet e gipsit në Durrës?',
        answer: 'Po, të gjitha punimet tona në Durrës mbulohen me garanci të plotë që përfshin materialin dhe instalimin. Materialet Knauf dhe Rigips që përdorim janë të certifikuara dhe të përshtatshme për kushtet klimatike të Durrësit.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Gipsi Ofrojmë në Durrës?',
      commercialExperience: 'Ku Kemi Punuar me Gips në Durrës?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips në Durrës?',
      howWeWork: 'Si Funksionon Procesi Ynë në Durrës?',
      serviceAreas: 'Cilat Zona të Durrësit Mbulojmë?',
      faq: 'Pyetje të Shpeshta për Punimet e Gipsit në Durrës',
      readyToStart: 'Gati për Projektin Tuaj të Gipsit në Durrës?',
    },
    relatedLinks: [
      { href: '/punime-gipsi-tirane', label: 'Punime Gipsi në Tiranë' },
      { href: '/punime-gipsi', label: 'Punime Gipsi Profesionale' },
      { href: '/patinim-durres', label: 'Patinim Profesional në Durrës' },
    ],
  } : {
    serviceName: 'Gypsum Works Durrës',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Professional Gypsum Works in Durrës',
    heroSubtitle: 'Suspended ceilings, space partitions, architectural decorations and acoustic insulation for hotels, resorts and residential projects in Durrës. Knauf and Rigips materials. Free consultation.',
    introContent: [
      'Professional gypsum works in Durrës are essential for the tourism and construction industry in Albania\'s largest coastal city. Durrës, with its famous beach, commercial port and thriving hotel and resort industry, demands gypsum works of the highest standard. Torra Gips provides specialized solutions for hotels, resorts, restaurants and businesses along the coastline, as well as residential projects in areas such as Plazhi, Currila, Shkozet, Porto Romano and the center of Durrës. With 100+ completed projects across Albania, including Vlora Airport, Green Coast Resort, Rolling Hills and Lion Park, we bring unmatched expertise to every project.',
      'The tourism industry in Durrës is growing continuously, with new hotels and resorts opening every season. These projects require gypsum works that combine aesthetic elegance with resistance to coastal conditions. Our team has particular experience with materials that perform excellently in the maritime environment - humidity, salt air and temperature fluctuations are factors we consider in every project. The Knauf and Rigips materials we use are specifically selected for durability in Durrës conditions.',
      'Beyond the tourism sector, Durrës has a broad residential and commercial market that needs quality gypsum works. From beachfront apartments to villas in Currila, from city center offices to warehouses in the Porto Romano industrial zone, we offer comprehensive solutions. Our free on-site consultation allows you to receive a professional assessment before starting your project.',
    ],
    contentSections: [
      {
        title: 'What Gypsum Works Do We Offer in Durrës?',
        content: 'In Durrës we offer specialized gypsum services tailored to the unique needs of the coastal city. Hotels and resorts in the beach area have particular requirements for quality and aesthetics, while businesses in central Durrës seek modern and functional solutions.',
        listItems: [
          'Suspended ceilings for hotel lobbies, restaurants and conference halls',
          'Hotel room and commercial space partitions with acoustic insulation',
          'Elegant decorations for luxury tourism environments',
          'Specialized acoustic insulation for hotels near main roads',
          'Moisture-resistant systems for coastal environments',
          'Customized solutions for every business in Durrës',
        ],
      },
      {
        title: 'How Are Gypsum Ceilings Installed in Durrës?',
        content: 'Gypsum ceiling installation in Durrës requires special attention to coastal climatic conditions. Our team uses adapted techniques that ensure long-term durability even in the maritime environment. Before starting work, we carry out a complete assessment of the environment considering humidity, ventilation and sun exposure.',
        listItems: [
          'Assessment of climatic conditions and ambient humidity',
          'Selection of materials suitable for coastal conditions',
          'Metal frame assembly with anti-corrosion treatments',
          'Application of hydrophobic Knauf and Rigips panels for humid areas',
          'Surface finishing with products resistant to the maritime climate',
          'Testing and quality control before final handover',
        ],
      },
      {
        title: 'Why Choose Gypsum for Your Durrës Project?',
        content: 'Gypsum is the ideal solution for projects in Durrës thanks to its ability to adapt to coastal conditions. Hotels, resorts and residences near the sea need materials that offer high performance even in humid conditions. Hydrophobic gypsum panels from Knauf and Rigips are the perfect solution.',
        listItems: [
          'High moisture resistance - ideal for coastal conditions',
          'Thermal insulation that keeps coolness in summer and warmth in winter',
          'Acoustic insulation for hotels and tourism environments',
          'Quick installation - minimize disruption during tourist season',
          'Elegant designs that elevate any hotel environment',
          'Minimal maintenance - important for tourism businesses',
        ],
      },
      {
        title: 'What Areas of Durrës Do We Cover?',
        content: 'Torra Gips provides services across all areas of Durrës and surroundings, including coastal tourism zones and the city center. Our team knows the geography of Durrës well and is ready to come to any location.',
        listItems: [
          'Durrës Beach - hotels, resorts, restaurants and coastal bars',
          'Currila - luxury villas and residential complexes with sea views',
          'Shkozet - residential zones and new developing businesses',
          'Porto Romano - industrial and commercial projects',
          'Durrës city center - offices, shops and historic buildings',
          'Golem, Kavajë and the southern coast of Durrës',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Ceilings for Hotels & Resorts',
        description: 'Elegant ceilings for hotel lobbies, coastal restaurants and conference halls. Designs that create a luxurious tourism atmosphere.',
        features: ['Hotel lobbies', 'Coastal restaurants', 'Event halls', 'Luxury atmosphere'],
      },
      {
        icon: 'partition' as const,
        title: 'Hotel Room Partitions',
        description: 'Quick room divisions for hotels and resorts with superior acoustic insulation. We minimize disruption during the tourist season.',
        features: ['Hotel rooms', 'Superior acoustic insulation', 'Quick installation', 'No season disruption'],
      },
      {
        icon: 'decoration' as const,
        title: 'Tourism Industry Decorations',
        description: 'Elegant decorative elements for 4-5 star hotels, sea-view restaurants and spa environments. Mediterranean coastal style.',
        features: ['Mediterranean style', '4-5 star hotels', 'Spa environments', 'Sea views'],
      },
      {
        icon: 'insulation' as const,
        title: 'Maritime Moisture Protection',
        description: 'Hydrophobic Knauf and Rigips panels that resist humidity, salt and coastal temperature changes. Ideal for Durrës.',
        features: ['Anti-moisture', 'Salt resistance', 'Maritime durability', 'Minimal maintenance'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you have experience with hotel projects in Durrës?',
        answer: 'Yes, we have extensive experience with hotel and tourism projects. We have worked on prestigious projects like Green Coast Resort and specialize in gypsum works for hotels, resorts and coastal restaurants.',
      },
      {
        question: 'Do you use moisture-resistant materials for projects in Durrës?',
        answer: 'Yes, for projects in Durrës and the coastal zone we use hydrophobic gypsum panels from Knauf and Rigips. These materials are specifically designed for high-humidity environments and perform excellently in the maritime climate.',
      },
      {
        question: 'How long does gypsum installation take for a hotel in Durrës?',
        answer: 'Duration depends on the project size. For individual hotel rooms 2-3 days, for full floors 1-2 weeks, while large hotel projects can take several weeks. We plan the work to minimize impact on hotel operations.',
      },
      {
        question: 'Can you work during the tourist season in Durrës?',
        answer: 'Yes, we understand the importance of the tourist season for businesses in Durrës. We can work at night or at suitable hours to avoid disturbing hotel guests. We also plan large projects in the off-season when possible.',
      },
      {
        question: 'What areas of Durrës do you cover?',
        answer: 'We cover all of Durrës - the Beach, Currila, Shkozet, Porto Romano, the city center, as well as Golem, Kavajë and the southern coast. Consultation and on-site visits are free. Call us at +355 68 858 0058.',
      },
      {
        question: 'Do you offer warranty for gypsum works in Durrës?',
        answer: 'Yes, all our works in Durrës are covered by a full warranty that includes both the material and installation. The Knauf and Rigips materials we use are certified and suitable for the climatic conditions of Durrës.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Gypsum Services Do We Offer in Durrës?',
      commercialExperience: 'Where Have We Done Gypsum Work in Durrës?',
      whyChooseUs: 'Why Choose Torra Gips in Durrës?',
      howWeWork: 'How Does Our Process Work in Durrës?',
      serviceAreas: 'What Areas of Durrës Do We Cover?',
      faq: 'Frequently Asked Questions About Gypsum Works in Durrës',
      readyToStart: 'Ready for Your Gypsum Project in Durrës?',
    },
    relatedLinks: [
      { href: '/gypsum-works-tirana', label: 'Gypsum Works in Tirana' },
      { href: '/gypsum-works', label: 'Professional Gypsum Works' },
      { href: '/wall-plastering-durres', label: 'Professional Plastering in Durrës' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/punime-gipsi-durres/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Punime Gipsi' : 'Gypsum Works', url: `/${locale}/${isAlbanian ? 'punime-gipsi' : 'gypsum-works'}/` },
          { name: isAlbanian ? 'Punime Gipsi Durrës' : 'Gypsum Works Durrës', url: `/${locale}/${isAlbanian ? 'punime-gipsi-durres' : 'gypsum-works-durres'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
