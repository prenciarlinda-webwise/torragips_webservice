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
      ? 'Patinim Profesional Durrës - +355 68 858 0058 - Torra Gips'
      : 'Professional Plastering Durrës - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Patinim profesional murash në Durrës. Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash për hotele, resorte dhe projekte rezidenciale. 100+ projekte. Konsultë falas.'
      : 'Professional wall plastering in Durrës. Interior and exterior plastering, decorative plaster and wall repairs for hotels, resorts and residential projects. 100+ projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'patinim-durres' : 'wall-plastering-durres'}/`,
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Patinim Profesional Durrës - Torra Gips'
        : 'Professional Plastering Durrës - Torra Gips',
      description: locale === 'sq'
        ? 'Patinim profesional murash në Durrës. Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash për hotele dhe resorte. 100+ projekte.'
        : 'Professional wall plastering in Durrës. Interior and exterior plastering, decorative plaster and wall repairs for hotels and resorts. 100+ projects.',
      images: [{ url: '/images/services/plastering/accent-wall.webp' }],
    },
  };
}

export default async function PlasteringDurresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAlbanian = locale === 'sq';

  const commercialCategories = isAlbanian ? [
    { icon: 'hotel' as const, title: 'Hotele & Resorte' },
    { icon: 'shopping' as const, title: 'Restorante Bregdetare' },
    { icon: 'office' as const, title: 'Vila me Pamje Deti' },
    { icon: 'airport' as const, title: 'Komplekse Pushimi' },
  ] : [
    { icon: 'hotel' as const, title: 'Hotels & Resorts' },
    { icon: 'shopping' as const, title: 'Coastal Restaurants' },
    { icon: 'office' as const, title: 'Sea View Villas' },
    { icon: 'airport' as const, title: 'Holiday Complexes' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Ekspertizë Bregdetare', description: 'Vite përvojë me projekte turistike - njohim sfidat e klimës detare.' },
    { title: 'Suva Anti-Kripë', description: 'Materiale të specializuara që rezistojnë ajrit të kripur të Durrësit.' },
    { title: 'Ekip me Përvojë Hoteliere', description: 'Mjeshtër që punojnë pa shqetësuar mysafirët e hoteleve aktive.' },
    { title: 'Gati Para Sezonit', description: 'Planifikojmë punimet në dimër për të qenë gati kur fillon sezoni.' },
    { title: 'Suva Kundër Lagështisë', description: 'Trajtime të veçanta për ndërtesa pranë detit dhe zona me lagështi.' },
    { title: 'Vizitë Falas në Durrës', description: 'Inspektim i shpejtë falas nga Plazhi deri te Porto Romano.' },
  ] : [
    { title: 'Coastal Expertise', description: 'Years of experience with tourism projects - we know the maritime climate challenges.' },
    { title: 'Anti-Salt Plaster', description: 'Specialized materials that resist Durrës salt air.' },
    { title: 'Hotel-Experienced Team', description: 'Craftsmen who work without disturbing guests at active hotels.' },
    { title: 'Ready Before Season', description: 'We plan work in winter to be ready when the season starts.' },
    { title: 'Anti-Moisture Plaster', description: 'Special treatments for seaside buildings and high-humidity zones.' },
    { title: 'Free Visit in Durrës', description: 'Quick free inspection from the Beach to Porto Romano.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Inspektim Bregdetar', description: 'Vlerësim i lagështisë dhe kripës' },
    { step: '2', title: 'Zgjedhje Materialesh', description: 'Suva anti-kripë e anti-lagështi' },
    { step: '3', title: 'Trajtim Paraprak', description: 'Mbrojtje kundër korrozionit' },
    { step: '4', title: 'Patinim i Specializuar', description: 'Teknika për klimë detare' },
    { step: '5', title: 'Testim & Garanci', description: 'Qëndrueshmëri afatgjatë bregdetare' },
  ] : [
    { step: '1', title: 'Coastal Inspection', description: 'Moisture and salt assessment' },
    { step: '2', title: 'Material Selection', description: 'Anti-salt and anti-moisture plaster' },
    { step: '3', title: 'Pre-Treatment', description: 'Corrosion protection' },
    { step: '4', title: 'Specialized Plastering', description: 'Maritime climate techniques' },
    { step: '5', title: 'Testing & Warranty', description: 'Long-term coastal durability' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Patinim Durrës',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Patinim Profesional Murash në Durrës',
    heroSubtitle: 'Patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash për hotele, resorte dhe projekte rezidenciale në Durrës. 100+ projekte të përfunduara përfshirë Green Coast Resort. Materiale premium europiane. Konsultë falas.',
    introContent: [
      'Patinimi profesional i mureve në Durrës është thelbësor për industrinë e turizmit dhe ndërtimit bregdetar që po lulëzon në qytetin më të madh portual të Shqipërisë. Torra Gips ofron shërbime patinimi të nivelit më të lartë në të gjitha zonat e Durrësit, duke përfshirë Plazhin, Currilën, Shkozet, Porto Romanon dhe gjithë bregdetin deri në Golem e Kavajë. Me përvojën tonë në projekte si Green Coast Resort, Aeroporti Ndërkombëtar i Vlorës, Rolling Hills dhe Lion Park, ne jemi partneri ideal për çdo projekt në zonën bregdetare.',
      'Durrësi është qendra e turizmit shqiptar me qindra hotele, resorte dhe komplekse apartamentesh që kërkojnë patinim të cilësisë së lartë. Klima bregdetare me kripë, lagështi dhe erëra të forta vendos kërkesa të veçanta për materialet dhe teknikat e patinimit. Ekipi ynë njeh thellësisht sfidat e ndërtimit bregdetar dhe përdor produkte të specializuara që rezistojnë kushtet detare për dekada.',
      'Bumi i ndërtimit në bregdetin e Durrësit, nga Plazhi i Vjetër te Gjiri i Lalzit, ka krijuar kërkesë të madhe për patinim profesional. Hotelet dhe resortet kërkojnë përfundime elegante që mbajnë pamjen luksoze pavarësisht ekspozimit ndaj kushteve bregdetare. Torra Gips ofron zgjidhje të provuara që kombinojnë bukurinë me qëndrueshmërinë.',
    ],
    contentSections: [
      {
        title: 'Çfarë Përfshin Patinimi Brendshëm në Durrës?',
        content: 'Patinimi brendshëm në Durrës kërkon vëmendje të veçantë ndaj lagështisë bregdetare. Hotelet, resortet dhe apartamentet e pushimit kanë nevojë për sipërfaqe që jo vetëm duken mirë, por gjithashtu rezistojnë kushteve të veçanta klimatike të bregdetit.',
        listItems: [
          'Patinim me gips anti-lagështi për hotele dhe resorte bregdetare',
          'Suva të specializuara për banjo dhe spa në hotele',
          'Përgatitje sipërfaqesh për përfundime luksoze në lobby dhe dhoma',
          'Riparime muraturash pas dëmtimeve nga lagështia detare',
          'Sisteme patinimi të shpejtë për përgatitjen e sezonit turistik',
          'Patinim i specializuar për restorante dhe bare bregdetare',
        ],
      },
      {
        title: 'Pse Është i Rëndësishëm Patinimi Jashtëm në Durrës?',
        content: 'Fasadat e ndërtesave në Durrës përballen me sfida unike: kripa detare, erërat e forta bregdetare dhe lagështia e lartë. Patinimi jashtëm duhet të jetë i nivelit të lartë për të mbrojtur strukturën dhe ruajtur pamjen estetike të ndërtesave turistike.',
        listItems: [
          'Suva e jashtme rezistente ndaj kripës detare dhe korrozionit',
          'Sisteme izoluese termike për kursim energjie në hotele',
          'Përfundime dekorative për fasadat e resorteve bregdetare',
          'Riparime fasadash pas dëmtimeve nga stuhitë bregdetare',
          'Trajtim kundër lagështisë dhe myshkut për ndërtesa pranë detit',
          'Ngjyra të qëndrueshme që nuk zbehen nga dielli dhe kripa',
        ],
      },
      {
        title: 'Çfarë Efektesh Ofrojnë Suvat Dekorative në Durrës?',
        content: 'Industria turistike e Durrësit kërkon përfundime luksoze dhe tërheqëse. Suvaja dekorative transformon lobby-t e hoteleve, restorantet bregdetare, dhoma VIP dhe vilat me pamje nga deti në hapësira mbresëlënëse.',
        listItems: [
          'Efekt mermeri venecian për lobby-t e hoteleve luksoze',
          'Tekstura travertini për resortet me stil mesdhetar',
          'Efekte gurit natyral për restorante dhe bare me atmosferë detare',
          'Suva me efekt rëre për ambiente që reflektojnë bregdetin',
          'Tekstura moderne për apartamentet premium të pushimit',
          'Efekte të personalizuara për projektet unike të turizmit',
        ],
      },
      {
        title: 'Cilat Zona të Durrësit Mbulojmë për Patinim?',
        content: 'Torra Gips ofron mbulim të plotë në gjithë zonën e Durrësit dhe bregdetin përreth. Nga qendra historike te resortet e reja në Golem dhe Gjirin e Lalzit, ekipi ynë arrin kudo me shpejtësi.',
        listItems: [
          'Plazhi i Durrësit - hotele, resorte dhe komplekse apartamentesh',
          'Currila - vila luksoze dhe ndërtesa me pamje nga deti',
          'Shkozet - projekte të mëdha rezidenciale dhe komerciale',
          'Porto Romano - zhvillime të reja industriale dhe komerciale',
          'Golem dhe Kavajë - resorte turistike dhe apartamente pushimi',
          'Gjiri i Lalzit - projekte ekskluzive bregdetare dhe turistike',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Patinim për Hotele Bregdetare',
        description: 'Suva anti-lagështi për dhomat e hoteleve, lobby-t dhe restorantet bregdetare. Rezistencë ndaj klimës detare të Durrësit.',
        features: ['Dhoma hotelesh', 'Lobby & restorante', 'Anti-lagështi', 'Klimë detare'],
      },
      {
        icon: 'partition' as const,
        title: 'Fasada Kundër Kripës Detare',
        description: 'Patinim jashtëm me suva speciale anti-kripë për ndërtesa pranë detit. Mbrojtje afatgjatë nga korozioni bregdetar.',
        features: ['Anti-kripë detare', 'Mbrojtje korrozioni', 'Rezistencë erërash', 'Fasada bregdetare'],
      },
      {
        icon: 'decoration' as const,
        title: 'Suva Dekorative Mesdhetare',
        description: 'Efekte guri natyral dhe stil mesdhetar për resorte, spa dhe restorante me pamje deti. Atmosferë luksoze turistike.',
        features: ['Stil mesdhetar', 'Resorte & spa', 'Efekt guri deti', 'Atmosferë turistike'],
      },
      {
        icon: 'insulation' as const,
        title: 'Riparime Dëmtimesh Detare',
        description: 'Restaurim muraturash të dëmtuara nga lagështia, kripa dhe stuhitë bregdetare. Rinovim para sezonit turistik.',
        features: ['Dëmtime lagështie', 'Dëmtime kripore', 'Rinovim sezonal', 'Restaurim i plotë'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A ofroni patinim për hotele dhe resorte në Durrës?',
        answer: 'Po, specializohemi në projekte hotelerie dhe turizmi në gjithë bregdetin e Durrësit. Kemi përvojë me resorte si Green Coast Resort dhe njohim mirë kërkesat e veçanta të industrisë turistike bregdetare.',
      },
      {
        question: 'Si i përballoni kushtet bregdetare të Durrësit në patinim?',
        answer: 'Përdorim materiale të specializuara anti-kripë dhe anti-lagështi nga prodhuesit më të njohur europianë. Këto produkte janë projektuar posaçërisht për klimën bregdetare dhe rezistojnë korrozionin e kripës detare.',
      },
      {
        question: 'A mund të përfundoni patinimin para sezonit turistik?',
        answer: 'Po, kuptojmë rëndësinë e afateve në industrinë turistike. Punojmë me turne dhe fundjavë për të siguruar që hoteli ose resorti juaj të jetë gati para fillimit të sezonit.',
      },
      {
        question: 'Sa kohë zgjat patinimi i një hoteli në Durrës?',
        answer: 'Koha varet nga madhësia e projektit. Për një hotel mesatar me 20-50 dhoma, patinimi i plotë brendshëm mund të kërkojë 2-4 javë. Me turne pune mund ta shkurtojmë ndjeshëm këtë kohë.',
      },
      {
        question: 'Cilat zona të Durrësit mbuloni?',
        answer: 'Mbulojmë gjithë Durrësin dhe bregdetin përreth: Plazhin, Currilën, Shkozetin, Porto Romanon, Golemin, Kavajën dhe Gjirin e Lalzit. Na kontaktoni në +355 68 858 0058 për inspektim falas.',
      },
      {
        question: 'A ofroni garanci të veçantë për ndërtesat bregdetare?',
        answer: 'Po, ofrojmë garanci të plotë për punën dhe materialet. Për ndërtesat bregdetare përdorim materiale me rezistencë ekstra ndaj kripës dhe lagështisë, të cilat zgjasin me dekada edhe në kushte detare.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Patinimi Ofrojmë në Durrës?',
      commercialExperience: 'Ku Kemi Kryer Patinim Komercial në Durrës?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Patinimin në Durrës?',
      howWeWork: 'Si Funksionon Procesi i Patinimit në Durrës?',
      serviceAreas: 'Ku Ofrojmë Shërbime Patinimi në Durrës?',
      faq: 'Pyetje të Shpeshta për Patinimin në Durrës',
      readyToStart: 'Gati për Projektin Tuaj të Patinimit në Durrës?',
    },
    relatedLinks: [
      { href: '/patinim-tirane', label: 'Patinim Profesional në Tiranë' },
      { href: '/patinim', label: 'Patinim Profesional Murash' },
      { href: '/punime-gipsi-durres', label: 'Punime Gipsi në Durrës' },
    ],
  } : {
    serviceName: 'Plastering Durrës',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Professional Wall Plastering in Durrës',
    heroSubtitle: 'Interior and exterior plastering, decorative plaster and wall repairs for hotels, resorts and residential projects in Durrës. 100+ completed projects including Green Coast Resort. Premium European materials. Free consultation.',
    introContent: [
      'Professional wall plastering in Durrës is essential for the booming tourism and coastal construction industry in Albania\'s largest port city. Torra Gips delivers the highest level plastering services across all areas of Durrës, including Plazhi, Currila, Shkozet, Porto Romano and the entire coastline to Golem and Kavaja. With our experience on projects like Green Coast Resort, Vlora International Airport, Rolling Hills and Lion Park, we are the ideal partner for any project in the coastal zone.',
      'Durrës is the center of Albanian tourism with hundreds of hotels, resorts and apartment complexes that require high-quality plastering. The coastal climate with salt, humidity and strong winds places special demands on plastering materials and techniques. Our team deeply understands the challenges of coastal construction and uses specialized products that withstand marine conditions for decades.',
      'The construction boom along the Durrës coastline, from the Old Beach to Lalzi Bay, has created huge demand for professional plastering. Hotels and resorts require elegant finishes that maintain their luxury appearance despite exposure to coastal conditions. Torra Gips offers proven solutions that combine beauty with durability.',
    ],
    contentSections: [
      {
        title: 'What Does Interior Plastering Include in Durrës?',
        content: 'Interior plastering in Durrës requires special attention to coastal humidity. Hotels, resorts and vacation apartments need surfaces that not only look great but also withstand the unique climatic conditions of the seaside.',
        listItems: [
          'Anti-moisture gypsum plastering for coastal hotels and resorts',
          'Specialized plaster for hotel bathrooms and spa facilities',
          'Surface preparation for luxury finishes in lobbies and rooms',
          'Wall repairs after marine humidity damage',
          'Fast plastering systems for tourist season preparation',
          'Specialized plastering for beachfront restaurants and bars',
        ],
      },
      {
        title: 'Why Is Exterior Plastering Important in Durrës?',
        content: 'Building facades in Durrës face unique challenges: sea salt, strong coastal winds and high humidity. Exterior plastering must be of the highest quality to protect the structure and maintain the aesthetic appearance of tourism buildings.',
        listItems: [
          'Exterior plaster resistant to sea salt and corrosion',
          'Thermal insulation systems for energy savings in hotels',
          'Decorative finishes for coastal resort facades',
          'Facade repairs after coastal storm damage',
          'Moisture and mold treatment for seaside buildings',
          'Colors that withstand sun and salt without fading',
        ],
      },
      {
        title: 'What Effects Do Decorative Plasters Offer in Durrës?',
        content: 'The tourism industry in Durrës demands luxury and attractive finishes. Decorative plaster transforms hotel lobbies, seaside restaurants, VIP rooms and sea-view villas into impressive spaces.',
        listItems: [
          'Venetian marble effect for luxury hotel lobbies',
          'Travertine textures for Mediterranean-style resorts',
          'Natural stone effects for restaurants and bars with seaside atmosphere',
          'Sand-effect plaster for environments reflecting the coastline',
          'Modern textures for premium vacation apartments',
          'Customized effects for unique tourism projects',
        ],
      },
      {
        title: 'Which Areas of Durrës Do We Cover for Plastering?',
        content: 'Torra Gips offers full coverage across all of Durrës and the surrounding coastline. From the historic center to the new resorts in Golem and Lalzi Bay, our team arrives anywhere promptly.',
        listItems: [
          'Durrës Beach - hotels, resorts and apartment complexes',
          'Currila - luxury villas and sea-view buildings',
          'Shkozet - large residential and commercial projects',
          'Porto Romano - new industrial and commercial developments',
          'Golem and Kavaja - tourist resorts and vacation apartments',
          'Lalzi Bay - exclusive coastal and tourism projects',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Plastering for Coastal Hotels',
        description: 'Anti-moisture plaster for hotel rooms, lobbies and coastal restaurants. Resistance to Durrës maritime climate.',
        features: ['Hotel rooms', 'Lobbies & restaurants', 'Anti-moisture', 'Maritime climate'],
      },
      {
        icon: 'partition' as const,
        title: 'Sea Salt-Resistant Facades',
        description: 'Exterior plastering with special anti-salt plaster for seaside buildings. Long-term protection from coastal corrosion.',
        features: ['Anti-sea salt', 'Corrosion protection', 'Wind resistance', 'Coastal facades'],
      },
      {
        icon: 'decoration' as const,
        title: 'Mediterranean Decorative Plaster',
        description: 'Natural stone effects and Mediterranean style for resorts, spas and sea-view restaurants. Luxurious tourism atmosphere.',
        features: ['Mediterranean style', 'Resorts & spas', 'Sea stone effect', 'Tourism atmosphere'],
      },
      {
        icon: 'insulation' as const,
        title: 'Maritime Damage Repairs',
        description: 'Restoration of walls damaged by moisture, salt and coastal storms. Renovation before the tourist season.',
        features: ['Moisture damage', 'Salt damage', 'Seasonal renovation', 'Complete restoration'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you offer plastering for hotels and resorts in Durrës?',
        answer: 'Yes, we specialize in hospitality and tourism projects across the entire Durrës coastline. We have experience with resorts like Green Coast Resort and deeply understand the specific requirements of the coastal tourism industry.',
      },
      {
        question: 'How do you handle the coastal conditions in Durrës for plastering?',
        answer: 'We use specialized anti-salt and anti-moisture materials from the most renowned European manufacturers. These products are specifically designed for coastal climates and resist sea salt corrosion.',
      },
      {
        question: 'Can you finish plastering before the tourist season?',
        answer: 'Yes, we understand the importance of deadlines in the tourism industry. We work in shifts and weekends to ensure your hotel or resort is ready before the season begins.',
      },
      {
        question: 'How long does hotel plastering in Durrës take?',
        answer: 'Duration depends on the project size. For a medium hotel with 20-50 rooms, complete interior plastering may take 2-4 weeks. With work shifts we can significantly shorten this time.',
      },
      {
        question: 'Which areas of Durrës do you cover?',
        answer: 'We cover all of Durrës and surrounding coastline: Plazhi, Currila, Shkozet, Porto Romano, Golem, Kavaja and Lalzi Bay. Contact us at +355 68 858 0058 for a free inspection.',
      },
      {
        question: 'Do you offer special warranty for coastal buildings?',
        answer: 'Yes, we offer full warranty for work and materials. For coastal buildings we use materials with extra resistance to salt and moisture, which last decades even in marine conditions.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Plastering Services Do We Offer in Durrës?',
      commercialExperience: 'Where Have We Done Commercial Plastering in Durrës?',
      whyChooseUs: 'Why Choose Torra Gips for Plastering in Durrës?',
      howWeWork: 'How Does the Plastering Process Work in Durrës?',
      serviceAreas: 'Where Do We Offer Plastering Services in Durrës?',
      faq: 'Frequently Asked Questions About Plastering in Durrës',
      readyToStart: 'Ready for Your Plastering Project in Durrës?',
    },
    relatedLinks: [
      { href: '/wall-plastering-tirana', label: 'Professional Plastering in Tirana' },
      { href: '/wall-plastering', label: 'Professional Wall Plastering' },
      { href: '/gypsum-works-durres', label: 'Gypsum Works in Durrës' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/${isAlbanian ? 'patinim-durres' : 'wall-plastering-durres'}/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Patinim' : 'Plastering', url: `/${locale}/${isAlbanian ? 'patinim' : 'wall-plastering'}/` },
          { name: isAlbanian ? 'Patinim Durrës' : 'Plastering Durrës', url: `/${locale}/${isAlbanian ? 'patinim-durres' : 'wall-plastering-durres'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
