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
      ? 'Lyerje Profesionale Durrës - +355 68 858 0058 - Torra Gips'
      : 'Professional Painting Durrës - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Lyerje profesionale në Durrës. Lyerje brendshme dhe jashtme për hotele, resorte dhe prona bregdetare. Bojëra rezistente ndaj klimës detare. 100+ projekte. Konsultë falas.'
      : 'Professional painting in Durrës. Interior and exterior painting for hotels, resorts and coastal properties. Paints resistant to maritime climate. 100+ projects. Free consultation.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'lyerje-durres' : 'painting-durres'}/`,
      languages: {
        sq: '/sq/lyerje-durres/',
        en: '/en/painting-durres/',
      },
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Lyerje Profesionale Durrës - Torra Gips'
        : 'Professional Painting Durrës - Torra Gips',
      description: locale === 'sq'
        ? 'Lyerje profesionale në Durrës. Lyerje brendshme dhe jashtme për hotele, resorte dhe prona bregdetare. 100+ projekte të përfunduara.'
        : 'Professional painting in Durrës. Interior and exterior painting for hotels, resorts and coastal properties. 100+ completed projects.',
      images: [{ url: '/images/services/painting/commercial-exterior-2.webp' }],
    },
  };
}

export default async function PaintingDurresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAlbanian = locale === 'sq';

  const commercialCategories = isAlbanian ? [
    { icon: 'hotel' as const, title: 'Hotele Bregdetare' },
    { icon: 'shopping' as const, title: 'Bara & Restorante Plazhi' },
    { icon: 'office' as const, title: 'Vila me Pamje Deti' },
    { icon: 'airport' as const, title: 'Komplekse Turistike' },
  ] : [
    { icon: 'hotel' as const, title: 'Coastal Hotels' },
    { icon: 'shopping' as const, title: 'Beach Bars & Restaurants' },
    { icon: 'office' as const, title: 'Sea View Villas' },
    { icon: 'airport' as const, title: 'Tourist Complexes' },
  ];

  const benefits = isAlbanian ? [
    { title: 'Bojëra Anti-Kripë', description: 'Caparol dhe Jotun marine - të formuluara për ajrin e kripur të bregdetit.' },
    { title: 'Rezistencë UV Bregdetare', description: 'Ngjyra që nuk zbehen nga dielli intensiv i verës së Durrësit.' },
    { title: 'Ekip me Përvojë Detare', description: 'Piktorë që njohin sfidat e lyerjes pranë detit dhe lagështisë.' },
    { title: 'Gati Para Sezonit', description: 'Punojmë në dimër dhe pranverë për hotele gati kur hapet sezoni.' },
    { title: 'Bojëra Kundër Myshkut', description: 'Trajtime speciale anti-kërpudhë për ambiente bregdetare me lagështi.' },
    { title: 'Vizitë Falas në Bregdet', description: 'Inspektim falas kudo në Durrës - nga Plazhi deri te Gjiri i Lalzit.' },
  ] : [
    { title: 'Anti-Salt Paints', description: 'Caparol and Jotun marine - formulated for the coastal salt air.' },
    { title: 'Coastal UV Resistance', description: 'Colors that don\'t fade from Durrës\'s intense summer sunlight.' },
    { title: 'Maritime-Experienced Team', description: 'Painters who know the challenges of painting near the sea and humidity.' },
    { title: 'Ready Before Season', description: 'We work in winter and spring so hotels are ready when the season opens.' },
    { title: 'Anti-Mold Paints', description: 'Special anti-fungal treatments for humid coastal environments.' },
    { title: 'Free Coastal Visit', description: 'Free inspection anywhere in Durrës - from the Beach to Lalzi Bay.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Inspektim Bregdetar', description: 'Vlerësim i dëmtimeve nga kripa' },
    { step: '2', title: 'Bojëra për Detin', description: 'Zgjedhje anti-kripë dhe anti-UV' },
    { step: '3', title: 'Trajtim Anti-Lagështi', description: 'Mbrojtje e sipërfaqeve nga deti' },
    { step: '4', title: 'Lyerje e Specializuar', description: 'Aplikim për kushte detare' },
    { step: '5', title: 'Garanci Bregdetare', description: 'Qëndrueshmëri 5-8 vite pranë detit' },
  ] : [
    { step: '1', title: 'Coastal Inspection', description: 'Salt damage assessment' },
    { step: '2', title: 'Marine Paints', description: 'Anti-salt and anti-UV selection' },
    { step: '3', title: 'Anti-Moisture Treatment', description: 'Surface protection from the sea' },
    { step: '4', title: 'Specialized Painting', description: 'Application for maritime conditions' },
    { step: '5', title: 'Coastal Warranty', description: '5-8 year durability near the sea' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Lyerje Durrës',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Lyerje Profesionale në Durrës',
    heroSubtitle: 'Lyerje brendshme dhe jashtme për hotele, resorte dhe prona bregdetare në Durrës. Bojëra të specializuara kundër klimës detare, kripës dhe lagështisë. 100+ projekte përfshirë Green Coast Resort. Konsultë falas.',
    introContent: [
      'Lyerja profesionale në Durrës është veçanërisht e rëndësishme për shkak të klimës bregdetare që sjell sfida unike për çdo sipërfaqe të lyer. Torra Gips ofron shërbime lyerjeje të specializuara për industrinë turistike, hotelet, resortet dhe pronat bregdetare në të gjithë zonën e Durrësit. Me përvojë në projekte si Green Coast Resort, Rolling Hills dhe Lion Park, ne dimë si të mbrojmë dhe zbukurojmë ndërtesat në kushte detare.',
      'Durrësi si qyteti i dytë i Shqipërisë dhe destinacioni kryesor turistik kërkon standarde lyerjeje që përballojnë ajrin e kripur, lagështirën e lartë dhe rrezet UV intensive të bregdetit. Nga hotelet luksoze në Plazh deri tek resortet në Currila, vilat në Shkozet dhe pronat industriale në Porto Romano, çdo projekt kërkon bojëra dhe teknika të adaptuara për mjedisin bregdetar.',
      'Sektori i turizmit në Durrës po rritet me shpejtësi, duke sjellë kërkesa të larta për lyerje cilësore në hotele, restorante, bara plazhi dhe ambiente argëtimi. Torra Gips është partneri i besueshëm që garanton rezultate të shkëlqyera edhe në kushtet më të vështira klimatike të bregdetit shqiptar.',
    ],
    contentSections: [
      {
        title: 'Çfarë Përfshin Lyerja Brendshme në Durrës?',
        content: 'Lyerja brendshme në Durrës kërkon vëmendje të veçantë ndaj lagështisë që karakterizon klimën bregdetare. Ambientet e hoteleve, resorteve dhe banesave pranë detit kanë nevojë për bojëra anti-lagështirë dhe trajtime të veçanta.',
        listItems: [
          'Lyerje me bojëra anti-lagështirë për dhoma hoteli dhe apartamente bregdetare',
          'Përfundime rezistente ndaj myshkut dhe kondensimit në ambiente pranë detit',
          'Bojëra ekologjike me emetime të ulëta VOC për hotele dhe resorte turistike',
          'Lyerje e specializuar për restorante, bara plazhi dhe ambiente me trafik të lartë sezonal',
          'Trajtime anti-bakteriale për banjot e hoteleve dhe hapësirat e SPA',
          'Rinovim i shpejtë midis sezoneve turistike pa ndërprerje të gjatë',
        ],
      },
      {
        title: 'Pse Është e Rëndësishme Lyerja Jashtme në Durrës?',
        content: 'Fasadat në Durrës përballen me sfidat më të ashpra: ajri i kripur i detit, lagështira e lartë, rrezet UV intensive dhe erërat e forta bregdetare. Bojërat e zakonshme degradohen shpejt në këto kushte, ndaj nevojiten zgjidhje profesionale.',
        listItems: [
          'Bojëra speciale anti-kripë që mbrojnë fasadat nga korozioni i ajrit detar',
          'Rezistencë e lartë ndaj rrezeve UV për ngjyra që nuk zbehen nga dielli bregdetar',
          'Trajtime hidrofobe kundër lagështisë dhe shirave intensive bregdetare',
          'Bojëra elastike që përballojnë erërat e forta dhe ndryshimet e temperaturës',
          'Mbrojtje kundër kërpudhave, algave dhe myshkut në ambient detar',
          'Trajtime speciale për struktura metalike pranë detit kundër ndryshkut',
        ],
      },
      {
        title: 'Çfarë Efektesh Dekorative Ofrojmë në Durrës?',
        content: 'Industria turistike e Durrësit kërkon ambiente me karakter dhe stil. Hotelet, resortet dhe restorantet bregdetare përfitojnë nga efekte dekorative që krijojnë atmosferën mesdhetare dhe luksoze që turistët kërkojnë.',
        listItems: [
          'Efekt guri natyral dhe mermeri për lobi hotelesh dhe resortesh bregdetare',
          'Tekstura mesdhetare dhe efekte të frymëzuara nga deti',
          'Efekte metalike dhe perlë për SPA dhe ambiente relaksi',
          'Mural me tema detare dhe bregdetare për restorante dhe bara plazhi',
          'Efekte rustike dhe shabby-chic për villa turistike',
          'Patina dhe efekte antike për rinovimet e ndërtesave historike të Durrësit',
        ],
      },
      {
        title: 'Cilat Zona të Durrësit Mbulojmë për Lyerje?',
        content: 'Torra Gips ofron shërbime lyerjeje në të gjithë qytetin e Durrësit, bregdetin dhe zonat përreth. Nga hotelet e vijës bregdetare deri tek pronat industriale në porto, mbulojmë çdo zonë.',
        listItems: [
          'Plazhi i Durrësit dhe vija bregdetare - hotele, resorte, vila turistike',
          'Currila dhe Plazhi i Vjetër - restorante bregdetare dhe rezidenca',
          'Shkozet dhe zonat rezidenciale - apartamente dhe vila familjare',
          'Porto Romano dhe zona industriale - magazine, fabrika dhe zyra portuale',
          'Qendra historike e Durrësit - rinovime dhe projekte restaurimi',
          'Rruga Durrës-Tiranë dhe zonat e reja urbane - projekte të reja ndërtimi',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Lyerje për Hotele & Resorte',
        description: 'Bojëra anti-lagështi për dhoma hotelesh, lobby-t dhe ambiente SPA. Ngjyra që ruhen edhe në klimën detare.',
        features: ['Dhoma hotelesh', 'Lobby & SPA', 'Anti-lagështi', 'Ngjyra afatgjata'],
      },
      {
        icon: 'partition' as const,
        title: 'Fasada Anti-Kripë Bregdetare',
        description: 'Lyerje e jashtme me bojëra Jotun marine që rezistojnë ajrin e kripur, UV-në dhe stuhitë bregdetare të Durrësit.',
        features: ['Bojëra marine', 'Anti-kripë', 'Rezistencë UV', 'Mbrojtje stuhish'],
      },
      {
        icon: 'decoration' as const,
        title: 'Efekte Mesdhetare për Turizmin',
        description: 'Mural detare, efekte guri natyral dhe stil mesdhetar për restorante plazhi, bara dhe vila turistike.',
        features: ['Mural detare', 'Tema bregdetare', 'Stil mesdhetar', 'Vila turistike'],
      },
      {
        icon: 'insulation' as const,
        title: 'Rinovim Sezonal Hotelesh',
        description: 'Lyerje e shpejtë midis sezoneve turistike. Rifreskim dhomash, fasadash dhe ambientesh pa ndërprerje të gjatë.',
        features: ['Midis sezoneve', 'Rifreskim i shpejtë', 'Pa ndërprerje', 'Hotel & resort'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A specializoheni në lyerje për hotele dhe resorte në Durrës?',
        answer: 'Po, kemi përvojë të gjerë me hotele dhe resorte bregdetare në Durrës. Përdorim bojëra të specializuara kundër lagështisë dhe klimës detare. Punojmë shpejt midis sezoneve për të mos ndërprerë aktivitetin tuaj turistik.',
      },
      {
        question: 'Cilat bojëra janë më të mira për pronat bregdetare në Durrës?',
        answer: 'Për pronat bregdetare në Durrës rekomandojmë bojëra Caparol dhe Jotun të formuluara për klima detare. Këto bojëra ofrojnë rezistencë ndaj kripës, lagështisë, UV-së dhe myshkut, duke ruajtur ngjyrat e gjalla për vite.',
      },
      {
        question: 'Sa shpesh duhet rilyer një ndërtesë pranë detit në Durrës?',
        answer: 'Me bojëra cilësore të aplikuara siç duhet, një fasadë bregdetare në Durrës zgjat 5-8 vite pa nevojë për rilyerje. Pa trajtime të duhura, degradimi mund të ndodhë brenda 2-3 viteve për shkak të ajrit të kripur.',
      },
      {
        question: 'A bëni lyerje për restorante dhe bara plazhi në Durrës?',
        answer: 'Po, ofrojmë lyerje të specializuar për restorante, bara plazhi dhe ambiente argëtimi në bregdetin e Durrësit. Përdorim bojëra rezistente ndaj lagështisë, pastrimit intensiv dhe trafikut të lartë sezonal.',
      },
      {
        question: 'A punoni gjatë sezonit të ulët turistik në Durrës?',
        answer: 'Po, sezoni i ulët (tetor-prill) është koha ideale për lyerje në Durrës. Shumica e hoteleve dhe resorteve preferojnë rinovimet në këtë periudhë. Na kontaktoni herët për të planifikuar projektin tuaj.',
      },
      {
        question: 'Si mund të marr ofertë për lyerje në Durrës?',
        answer: 'Na telefononi në +355 68 858 0058 ose na shkruani në WhatsApp. Vizita dhe vlerësimi janë falas kudo në Durrës dhe bregdet. Ekipi ynë do të vlerësojë gjendjen e sipërfaqeve dhe do të rekomandojë zgjidhjen më të mirë.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Lyerjeje Ofrojmë në Durrës?',
      commercialExperience: 'Ku Kemi Kryer Lyerje Komerciale në Durrës?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Lyerje në Durrës?',
      howWeWork: 'Si Funksionon Procesi i Lyerjes në Durrës?',
      serviceAreas: 'Cilat Zona të Durrësit Mbulojmë?',
      faq: 'Pyetje të Shpeshta për Lyerjen në Durrës',
      readyToStart: 'Gati për Projektin Tuaj të Lyerjes në Durrës?',
    },
    relatedLinks: [
      { href: '/lyerje-tirane', label: 'Lyerje Profesionale në Tiranë' },
      { href: '/lyerje', label: 'Lyerje Profesionale' },
      { href: '/patinim-durres', label: 'Patinim Profesional në Durrës' },
    ],
  } : {
    serviceName: 'Painting Durrës',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Professional Painting in Durrës',
    heroSubtitle: 'Interior and exterior painting for hotels, resorts and coastal properties in Durrës. Specialized paints against maritime climate, salt air and humidity. 100+ projects including Green Coast Resort. Free consultation.',
    introContent: [
      'Professional painting in Durrës is particularly important due to the coastal climate that brings unique challenges for every painted surface. Torra Gips offers specialized painting services for the tourism industry, hotels, resorts and coastal properties throughout the Durrës area. With experience in projects like Green Coast Resort, Rolling Hills and Lion Park, we know how to protect and beautify buildings in maritime conditions.',
      'Durrës as Albania\'s second largest city and primary tourist destination demands painting standards that withstand salt air, high humidity and the intensive UV rays of the coastline. From luxury hotels on the beach to resorts in Currila, villas in Shkozet and industrial properties at Porto Romano, every project requires paints and techniques adapted for the coastal environment.',
      'The tourism sector in Durrës is growing rapidly, bringing high demands for quality painting in hotels, restaurants, beach bars and entertainment venues. Torra Gips is the trusted partner that guarantees excellent results even in the most challenging climatic conditions of the Albanian coastline.',
    ],
    contentSections: [
      {
        title: 'What Does Interior Painting Include in Durrës?',
        content: 'Interior painting in Durrës requires special attention to the humidity that characterizes the coastal climate. Hotel rooms, resort interiors and seaside residences need anti-moisture paints and specialized treatments.',
        listItems: [
          'Painting with anti-moisture paints for hotel rooms and coastal apartments',
          'Mold and condensation resistant finishes for seaside environments',
          'Eco-friendly paints with low VOC emissions for tourist hotels and resorts',
          'Specialized painting for restaurants, beach bars and high-traffic seasonal venues',
          'Anti-bacterial treatments for hotel bathrooms and SPA areas',
          'Fast renovation between tourist seasons without long interruptions',
        ],
      },
      {
        title: 'Why Is Exterior Painting Important in Durrës?',
        content: 'Facades in Durrës face the harshest challenges: salt air from the sea, high humidity, intensive UV rays and strong coastal winds. Ordinary paints degrade quickly in these conditions, which is why professional solutions are needed.',
        listItems: [
          'Special anti-salt paints that protect facades from sea air corrosion',
          'High UV resistance for colors that do not fade from coastal sunlight',
          'Hydrophobic treatments against humidity and intensive coastal rainfall',
          'Elastic paints that withstand strong winds and temperature changes',
          'Protection against fungi, algae and mold in the maritime environment',
          'Special treatments for metal structures near the sea against rust',
        ],
      },
      {
        title: 'What Decorative Painting Effects Do We Offer in Durrës?',
        content: 'Durrës\'s tourism industry demands environments with character and style. Coastal hotels, resorts and restaurants benefit from decorative effects that create the Mediterranean and luxurious atmosphere that tourists seek.',
        listItems: [
          'Natural stone and marble effects for coastal hotel and resort lobbies',
          'Mediterranean textures and sea-inspired effects',
          'Metallic and pearl effects for SPA and relaxation environments',
          'Sea-themed and coastal murals for restaurants and beach bars',
          'Rustic and shabby-chic effects for tourist villas',
          'Patina and antique effects for renovations of historic Durrës buildings',
        ],
      },
      {
        title: 'Which Areas of Durrës Do We Cover for Painting?',
        content: 'Torra Gips provides painting services across the entire city of Durrës, the coastline and surrounding areas. From beachfront hotels to industrial properties at the port, we cover every zone.',
        listItems: [
          'Durrës Beach and the coastline - hotels, resorts, tourist villas',
          'Currila and Old Beach - coastal restaurants and residences',
          'Shkozet and residential areas - apartments and family villas',
          'Porto Romano and the industrial zone - warehouses, factories and port offices',
          'Historic center of Durrës - renovations and restoration projects',
          'Durrës-Tirana road and new urban zones - new construction projects',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Hotel & Resort Painting',
        description: 'Anti-moisture paints for hotel rooms, lobbies and SPA environments. Colors that last even in maritime climate.',
        features: ['Hotel rooms', 'Lobbies & SPA', 'Anti-moisture', 'Long-lasting colors'],
      },
      {
        icon: 'partition' as const,
        title: 'Anti-Salt Coastal Facades',
        description: 'Exterior painting with Jotun marine paints that resist salt air, UV and Durrës coastal storms.',
        features: ['Marine paints', 'Anti-salt', 'UV resistance', 'Storm protection'],
      },
      {
        icon: 'decoration' as const,
        title: 'Mediterranean Tourism Effects',
        description: 'Sea-themed murals, natural stone effects and Mediterranean style for beach restaurants, bars and tourist villas.',
        features: ['Sea murals', 'Coastal themes', 'Mediterranean style', 'Tourist villas'],
      },
      {
        icon: 'insulation' as const,
        title: 'Seasonal Hotel Renovation',
        description: 'Quick painting between tourist seasons. Room, facade and environment refresh without long interruptions.',
        features: ['Between seasons', 'Quick refresh', 'No interruptions', 'Hotels & resorts'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you specialize in painting for hotels and resorts in Durrës?',
        answer: 'Yes, we have extensive experience with coastal hotels and resorts in Durrës. We use specialized paints against humidity and maritime climate. We work quickly between seasons to avoid disrupting your tourist activity.',
      },
      {
        question: 'Which paints are best for coastal properties in Durrës?',
        answer: 'For coastal properties in Durrës we recommend Caparol and Jotun paints formulated for maritime climates. These paints offer resistance to salt, humidity, UV and mold, keeping colors vibrant for years.',
      },
      {
        question: 'How often should a seaside building in Durrës be repainted?',
        answer: 'With quality paints properly applied, a coastal facade in Durrës lasts 5-8 years without needing repainting. Without proper treatments, degradation can occur within 2-3 years due to the salt air.',
      },
      {
        question: 'Do you paint restaurants and beach bars in Durrës?',
        answer: 'Yes, we offer specialized painting for restaurants, beach bars and entertainment venues on the Durrës coastline. We use paints resistant to humidity, intensive cleaning and high seasonal traffic.',
      },
      {
        question: 'Do you work during the low tourist season in Durrës?',
        answer: 'Yes, the low season (October-April) is the ideal time for painting in Durrës. Most hotels and resorts prefer renovations during this period. Contact us early to plan your project.',
      },
      {
        question: 'How can I get a painting quote in Durrës?',
        answer: 'Call us at +355 68 858 0058 or write to us on WhatsApp. Visits and assessments are free anywhere in Durrës and along the coast. Our team will assess surface conditions and recommend the best solution.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Painting Services Do We Offer in Durrës?',
      commercialExperience: 'Where Have We Done Commercial Painting in Durrës?',
      whyChooseUs: 'Why Choose Torra Gips for Painting in Durrës?',
      howWeWork: 'How Does the Painting Process Work in Durrës?',
      serviceAreas: 'Which Areas of Durrës Do We Cover?',
      faq: 'Frequently Asked Questions About Painting in Durrës',
      readyToStart: 'Ready for Your Painting Project in Durrës?',
    },
    relatedLinks: [
      { href: '/painting-tirana', label: 'Professional Painting in Tirana' },
      { href: '/painting', label: 'Professional Painting Services' },
      { href: '/wall-plastering-durres', label: 'Professional Plastering in Durrës' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/${isAlbanian ? 'lyerje-durres' : 'painting-durres'}/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: isAlbanian ? 'Lyerje' : 'Painting', url: `/${locale}/${isAlbanian ? 'lyerje' : 'painting'}/` },
          { name: isAlbanian ? 'Lyerje Durrës' : 'Painting Durrës', url: `/${locale}/${isAlbanian ? 'lyerje-durres' : 'painting-durres'}/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
