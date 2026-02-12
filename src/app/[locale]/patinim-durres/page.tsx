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
