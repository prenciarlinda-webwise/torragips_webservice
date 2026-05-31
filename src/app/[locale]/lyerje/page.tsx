import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';
import { BreadcrumbSchema } from '@/components/seo';

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
      ? 'Lyerje Profesionale Tiranë & Durrës - +355 68 858 0058 - Torra Gips'
      : 'Professional Painting Tirana & Durrës - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Lyerje profesionale për projekte komerciale dhe rezidenciale në Tiranë e Durrës. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës. Telefononi për ofertë falas.'
      : 'Professional painting for commercial and residential projects in Tirana and Durrës. 100+ completed projects including Vlora Airport. Call for a free quote.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'lyerje' : 'painting'}/`,
      languages: {
        sq: '/sq/lyerje/',
        en: '/en/painting/',
      },
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Lyerje Profesionale Tiranë & Durrës - Torra Gips'
        : 'Professional Painting Tirana & Durrës - Torra Gips',
      description: locale === 'sq'
        ? 'Lyerje profesionale për projekte komerciale dhe rezidenciale në Tiranë e Durrës. 100+ projekte të përfunduara.'
        : 'Professional painting for commercial and residential projects in Tirana and Durrës. 100+ completed projects.',
      images: [{ url: '/images/services/painting/commercial-exterior-2.webp' }],
    },
  };
}

export default async function PaintingPage({ params }: Props) {
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
    { title: 'Bojëra Premium', description: 'Dulux, Jotun, Caparol - markat më të njohura.' },
    { title: 'Ekologjike & Sigurt', description: 'Bojëra me emetime të ulëta VOC për shëndetin tuaj.' },
    { title: 'Ekip Profesional', description: 'Piktorë me përvojë të gjatë në projekte komerciale.' },
    { title: 'Punë e Shpejtë', description: 'Respektojmë afatet pa kompromentuar cilësinë.' },
    { title: 'Garanci Afatgjatë', description: 'Ngjyra që zgjasin 5-10+ vite pa probleme.' },
    { title: 'Çmime Transparente', description: 'Oferta të qarta pa kosto të fshehura.' },
  ] : [
    { title: 'Premium Paints', description: 'Dulux, Jotun, Caparol - the most renowned brands.' },
    { title: 'Eco-Friendly & Safe', description: 'Low VOC emission paints for your health.' },
    { title: 'Professional Team', description: 'Painters with extensive experience in commercial projects.' },
    { title: 'Fast Work', description: 'We respect deadlines without compromising quality.' },
    { title: 'Long-Term Warranty', description: 'Colors that last 5-10+ years without problems.' },
    { title: 'Transparent Pricing', description: 'Clear quotes with no hidden costs.' },
  ];

  const processSteps = isAlbanian ? [
    { step: '1', title: 'Konsultim', description: 'Zgjedhje ngjyrash' },
    { step: '2', title: 'Ofertë', description: 'Çmim i detajuar' },
    { step: '3', title: 'Përgatitje', description: 'Sipërfaqet & mbrojtje' },
    { step: '4', title: 'Lyerje', description: 'Aplikim profesional' },
    { step: '5', title: 'Dorëzim', description: 'Pastrim & kontroll' },
  ] : [
    { step: '1', title: 'Consultation', description: 'Color selection' },
    { step: '2', title: 'Quote', description: 'Detailed pricing' },
    { step: '3', title: 'Preparation', description: 'Surfaces & protection' },
    { step: '4', title: 'Painting', description: 'Professional application' },
    { step: '5', title: 'Delivery', description: 'Cleaning & control' },
  ];

  const pageData = isAlbanian ? {
    serviceName: 'Lyerje',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Lyerje Profesionale në Tiranë dhe Durrës',
    heroSubtitle: 'Lyerje brendshme dhe jashtme, bojëra ekologjike dhe efekte dekorative për projekte komerciale dhe rezidenciale. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës. Bojëra Dulux, Jotun dhe Caparol. Konsultë falas.',
    introContent: [
      'Lyerja profesionale është faza përfundimtare që jep jetë çdo projekti. Torra Gips ofron shërbime lyerjeje të nivelit më të lartë për projekte komerciale dhe rezidenciale në Tiranë, Durrës dhe gjithë Shqipërinë qendrore. Me përvojë të gjerë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort dhe Rolling Hills, ne garantojmë cilësi vizuale që bën përshtypje.',
      'Lyerja është faza përfundimtare që jep jetë çdo projekti. Ekipi ynë i specializuar kombinon teknikat tradicionale me teknologjitë moderne të aplikimit për rezultate të përsosura. Përdorim vetëm bojëra premium nga prodhuesit më të njohur për ngjyra që ruhen të gjalla me vite.',
      'Në projektet komerciale, lyerja profesionale është vendimtare për imazhin e biznesit tuaj. Ngjyrat e zgjedhura siç duhet ndikojnë në perceptimin e klientëve dhe krijojnë atmosferën e duhur për çdo lloj ambienti, qoftë zyrë, hotel, dyqan ose restorant.',
    ],
    contentSections: [
      {
        title: 'Çfarë Përfshin Lyerja Brendshme Profesionale?',
        content: 'Lyerja brendshme transformon plotësisht ambientet, duke krijuar atmosferën e dëshiruar dhe duke reflektuar identitetin e biznesit ose stilin personal. Ne ofrojmë konsultim ngjyrash profesional dhe ekzekutim të përsosur.',
        listItems: [
          'Lyerje murash, tavanesh dhe elementeve arkitekturore',
          'Përfundime mat, saten dhe me shkëlqim',
          'Bojëra ekologjike me emetime të ulëta VOC',
          'Lyerje e specializuar për ambiente komerciale me trafik të lartë',
          'Përgatitje profesionale e sipërfaqeve para lyerjes',
          'Mbrojtje e mobilieve dhe pajisjeve gjatë punës',
        ],
      },
      {
        title: 'Pse Është e Rëndësishme Lyerja Jashtme?',
        content: 'Lyerja jashtme duhet të kombinojë estetikën me mbrojtjen afatgjatë. Bojërat tona të specializuara mbrojnë fasadat nga kushtet e ashpra atmosferike të Shqipërisë, duke ruajtur ngjyrat e gjalla për vite.',
        listItems: [
          'Bojëra elastike që përballojnë ndryshimet e temperaturës',
          'Rezistencë ndaj rrezeve UV dhe zbehjes',
          'Mbrojtje kundër lagështisë dhe myshkut',
          'Përgatitje dhe riparime fasadash para lyerjes',
          'Lyerje e strukturave metalike dhe drurit',
          'Trajtime hidrofobe dhe anti-grafiti',
        ],
      },
      {
        title: 'Çfarë Efektesh Dekorative Ofrojmë?',
        content: 'Për klientët që kërkojnë diçka më shumë se lyerja e thjeshtë, ofrojmë efekte dekorative që transformojnë muret në vepra arti. Ideale për lobi hotele, restorante, dyqane luksoze dhe ambiente të veçanta.',
        listItems: [
          'Efekt mermeri dhe guri natyral',
          'Teknika sponge dhe rag-rolling',
          'Efekte metalike dhe perlë',
          'Mural dhe dizajne artistike',
          'Stencil dhe motive dekorative',
          'Efekte antike dhe patine',
        ],
      },
      {
        title: 'Kur Keni Nevojë për Lyerje Industriale?',
        content: 'Për ambiente industriale dhe aplikime të veçanta, ofrojmë zgjidhje të specializuara që plotësojnë kërkesat teknike më të rrepta.',
        listItems: [
          'Lyerje dyshemesh epoksi për garazhe dhe magazine',
          'Trajtime anti-bakteriale për ambiente shëndetësore',
          'Lyerje rezistente ndaj kimikateve',
          'Bojëra termike reflektuese',
          'Trajtime kundër zjarrit',
          'Lyerje për ambiente ushqimore',
        ],
      },
      {
        title: 'Sa Kushton Lyerja për Metër Katror në Tiranë dhe Durrës?',
        content: 'Cmimi i lyerjes varet nga përgatitja e sipërfaqes, numri i duarve dhe cilësia e bojës. Si orientim, lyerja standarde e brendshme me dy duar fillon zakonisht nga 350 deri 600 Lek për metër katror, ndërsa fasadat dhe efektet dekorative kushtojnë më shumë. Faktorë si patinimi paraprak, lartësia e tavaneve dhe gjendja e mureve ndikojnë në vlerë. Ofrojmë vizitë dhe vlerësim falas në Tiranë e Durrës para çdo oferte.',
        listItems: [
          'Lyerje e brendshme standarde: rreth 350-600 Lek/m2',
          'Patinim para lyerjes: kosto shtesë sipas gjendjes',
          'Fasada e jashtme me bojëra elastike: cmim më i lartë',
          'Efektet dekorative dhe mermeri llogariten veçmas',
          'Sipërfaqet mbi 200 m2 marrin cmime më të favorshme',
          'Vizita dhe oferta në Bllok, Kashar, Farkë e Plazh janë falas',
        ],
      },
      {
        title: 'Cilat Janë Gabimet më të Shpeshta gjatë Lyerjes?',
        content: 'Shumica e problemeve me lyerjen vijnë nga përgatitja e dobët dhe nga ngutja. Aplikimi i bojës mbi sipërfaqe me lagështi, anashkalimi i primerit ose hollimi i tepërt i bojës shkaktojnë zbehje, çarje dhe shtresa të pabarabarta. Gjithashtu, lyerja në temperatura shumë të ulëta ngadalëson tharjen dhe dëmton ngjitjen. Ne respektojmë kohët e tharjes mes duarve, zakonisht 2 deri 4 orë, dhe përgatisim çdo sipërfaqe me kujdes.',
        listItems: [
          'Mosaplikimi i primerit mbi suva të reja',
          'Lyerja mbi mure me lagështi ose pluhur',
          'Hollimi i tepërt që ul mbulimin e bojës',
          'Mosrespektimi i kohës së tharjes mes duarve',
          'Përdorimi i rolerave të papërshtatshëm për sipërfaqen',
          'Anashkalimi i mbrojtjes së dyshemeve dhe mobilieve',
        ],
      },
      {
        title: 'Sa Zgjat Lyerja dhe Si Mirëmbahet?',
        content: 'Një lyerje cilësore me bojëra premium si Dulux, Jotun ose Caparol ruan ngjyrat e gjalla për 5 deri 10 vjet në ambiente të brendshme, ndërsa fasadat e jashtme në Tiranë dhe Durrës zgjasin zakonisht 6 deri 8 vjet para se të kërkojnë rifreskim, për shkak të diellit dhe ajrit bregdetar. Sipërfaqet e lyera me bojë të lavueshme pastrohen lehtë me një leckë të lagësht pa dëmtuar ngjyrën.',
        listItems: [
          'Lyerje e brendshme që zgjat 5 deri 10 vjet',
          'Fasada që rifreskohen çdo 6 deri 8 vjet',
          'Bojëra të lavueshme që pastrohen me leckë të lagësht',
          'Riparime me prekje pa rilyer gjithë murin',
          'Garanci mbi punën dhe materialet e përdorura',
          'Këshilla për ruajtjen e ngjyrës në kohë',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Lyerje Brendshme',
        description: 'Transformim total i ambienteve me ngjyra të zgjedhura profesionalisht dhe aplikim të përsosur.',
        features: ['Përfundime mat/saten', 'Bojëra ekologjike', 'Konsultim ngjyrash', 'Mbrojtje mobiliejsh'],
      },
      {
        icon: 'partition' as const,
        title: 'Lyerje Jashtme',
        description: 'Mbrojtje afatgjatë dhe estetikë e përsosur për fasadat e ndërtesave tuaja.',
        features: ['Rezistencë UV', 'Mbrojtje lagështie', 'Ngjyra të qëndrueshme', 'Trajtime speciale'],
      },
      {
        icon: 'decoration' as const,
        title: 'Efekte Dekorative',
        description: 'Teknika artistike që transformojnë muret e zakonshme në vepra arti unike.',
        features: ['Efekt mermeri', 'Tekstura artistike', 'Mural', 'Dizajne të personalizuara'],
      },
      {
        icon: 'insulation' as const,
        title: 'Lyerje Industriale',
        description: 'Zgjidhje të specializuara për ambiente industriale dhe aplikime teknike.',
        features: ['Epoksi dyshemesh', 'Anti-bakteriale', 'Rezistencë kimike', 'Trajtime zjarri'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'A punoni me projekte komerciale të mëdha lyerjeje?',
        answer: 'Po, specializohemi në projekte komerciale të çdo shkalle. Kemi përvojë me hotele, qendra tregtare, zyra dhe ambiente industriale. Ekipi ynë punon shpejt dhe me cilësi.',
      },
      {
        question: 'Sa kohë zgjat lyerja e një ambienti komercial?',
        answer: 'Koha varet nga sipërfaqja dhe përgatitja e nevojshme. Për ambiente mesatare 1-3 ditë, ndërsa projekte të mëdha mund të kërkojnë 1-2 javë. Mund të punojmë jashtë orarit për të mos ndërprerë biznesin.',
      },
      {
        question: 'Cilat bojëra përdorni?',
        answer: 'Përdorim bojëra premium nga prodhues të njohur si Dulux, Jotun dhe Caparol. Për ambiente të brendshme preferojmë bojëra ekologjike me emetime të ulëta VOC.',
      },
      {
        question: 'A ofroni lyerje natën ose në fundjavë?',
        answer: 'Po, për projekte komerciale ofrojmë fleksibilitet të plotë. Kuptojmë që biznesi juaj nuk mund të mbyllet, prandaj punojmë sipas orarit tuaj.',
      },
      {
        question: 'Si mund të marr një ofertë për projektin tim?',
        answer: 'Na kontaktoni me telefon, email ose WhatsApp. Vizita dhe vlerësimi janë falas. Sillni matjet dhe nëse keni preferenca ngjyrash për ofertë më të saktë.',
      },
      {
        question: 'A ofroni garanci për lyerjen?',
        answer: 'Po, ofrojmë garanci të plotë. Bojërat cilësore që përdorim zgjasin 5-10+ vite pa probleme kur aplikohen siç duhet.',
      },
      {
        question: 'Sa kohë duhet të presim para se të lyejmë suva ose patinim të ri?',
        answer: 'Suvaja e re kërkon zakonisht 2 deri 4 javë për tharje të plotë para lyerjes, ndërsa patinimi me masë gipsi tharet brenda 24 deri 48 orë. Lyerja shumë herët mbyll lagështinë brenda murit dhe shkakton flluska. Ne testojmë lagështinë para se të fillojmë.',
      },
      {
        question: 'Sa litra bojë nevojiten për të lyer një dhomë?',
        answer: 'Një litër bojë cilësore mbulon rreth 10 deri 12 metra katror për duar. Për një dhomë 20 metra katror me dy duar nevojiten afërsisht 8 deri 10 litra bojë. Sasia varet nga thithja e murit dhe ngjyra. Ne llogarisim materialin saktë gjatë vlerësimit falas.',
      },
      {
        question: 'A ofroni konsulencë për zgjedhjen e ngjyrave?',
        answer: 'Po, ofrojmë konsulencë falas për zgjedhjen e ngjyrave sipas ndriçimit, madhësisë së ambientit dhe stilit tuaj. Përdorim bojëra me VOC të ulët, të sigurta për dhoma fëmijësh dhe ambiente pune, dhe mund të përgatisim mostra ngjyrash në mur para se të vendosni për ngjyrën finale.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Lyerjeje Ofrojmë?',
      commercialExperience: 'Ku Kemi Kryer Lyerje Komerciale?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Lyerjen?',
      howWeWork: 'Si Funksionon Procesi i Lyerjes?',
      serviceAreas: 'Ku Ofrojmë Shërbime Lyerjeje?',
      faq: 'Pyetje të Shpeshta për Lyerjen',
      readyToStart: 'Gati për Projektin Tuaj të Lyerjes?',
    },
    relatedLinks: [
      { href: '/lyerje-tirane', label: 'Lyerje Profesionale në Tiranë' },
      { href: '/lyerje-durres', label: 'Lyerje Profesionale në Durrës' },
      { href: '/blog/zgjedhja-e-ngjyrave-per-shtepine', label: 'Si të Zgjidhni Ngjyrat për Shtëpinë' },
      { href: '/blog/si-te-pergatisni-muret-per-lyerje', label: 'Si të Përgatisni Muret për Lyerje' },
      { href: '/punime-gipsi', label: 'Punime Gipsi Profesionale' },
      { href: '/patinim', label: 'Patinim Profesional Murash' },
    ],
  } : {
    serviceName: 'Painting',
    heroImage: '/images/services/painting/commercial-exterior-2.webp',
    heroTitle: 'Professional Painting in Tirana and Durrës',
    heroSubtitle: 'Interior and exterior painting, eco-friendly paints and decorative effects for commercial and residential projects. 100+ completed projects including Vlora Airport. Dulux, Jotun and Caparol paints. Free consultation.',
    introContent: [
      'Professional painting is the final phase that brings every project to life. Torra Gips offers the highest level painting services for commercial and residential projects in Tirana, Durrës and all of central Albania. With extensive experience in prestigious projects like Vlora International Airport, Green Coast Resort and Rolling Hills, we guarantee visual quality that impresses.',
      'Painting is the final phase that brings every project to life. Our specialized team combines traditional techniques with modern application technologies for perfect results. We use only premium paints from the most renowned manufacturers for colors that stay vibrant for years.',
      'In commercial projects, professional painting is crucial for your business image. Properly chosen colors influence customer perception and create the right atmosphere for any type of environment, whether office, hotel, store or restaurant.',
    ],
    contentSections: [
      {
        title: 'What Does Professional Interior Painting Include?',
        content: 'Interior painting completely transforms environments, creating the desired atmosphere and reflecting business identity or personal style. We offer professional color consultation and perfect execution.',
        listItems: [
          'Painting of walls, ceilings and architectural elements',
          'Matte, satin and gloss finishes',
          'Eco-friendly paints with low VOC emissions',
          'Specialized painting for high-traffic commercial environments',
          'Professional surface preparation before painting',
          'Protection of furniture and equipment during work',
        ],
      },
      {
        title: 'Why Is Exterior Painting Important?',
        content: 'Exterior painting must combine aesthetics with long-term protection. Our specialized paints protect facades from harsh Albanian weather conditions, keeping colors vibrant for years.',
        listItems: [
          'Elastic paints that withstand temperature changes',
          'UV resistance and fade prevention',
          'Protection against moisture and mold',
          'Facade preparation and repairs before painting',
          'Painting of metal structures and wood',
          'Hydrophobic and anti-graffiti treatments',
        ],
      },
      {
        title: 'What Decorative Painting Effects Do We Offer?',
        content: 'For clients seeking more than simple painting, we offer decorative effects that transform walls into works of art. Ideal for hotel lobbies, restaurants, luxury stores and special environments.',
        listItems: [
          'Marble and natural stone effects',
          'Sponge and rag-rolling techniques',
          'Metallic and pearl effects',
          'Murals and artistic designs',
          'Stencils and decorative motifs',
          'Antique effects and patina',
        ],
      },
      {
        title: 'When Do You Need Industrial Painting?',
        content: 'For industrial environments and special applications, we offer specialized solutions that meet the strictest technical requirements.',
        listItems: [
          'Epoxy floor painting for garages and warehouses',
          'Anti-bacterial treatments for healthcare environments',
          'Chemical-resistant painting',
          'Reflective thermal paints',
          'Fire retardant treatments',
          'Painting for food service environments',
        ],
      },
      {
        title: 'How Much Does Painting Cost Per Square Meter in Tirana and Durres?',
        content: 'Painting cost depends on surface preparation, number of coats and paint quality. As a guide, standard interior painting with two coats usually starts from 350 to 600 Lek per square meter, while facades and decorative effects cost more. Factors such as prior plastering, ceiling height and wall condition affect the price. We offer a free on-site visit and assessment across Tirana and Durres before any quote.',
        listItems: [
          'Standard interior painting: around 350-600 Lek/m2',
          'Plastering before painting: extra cost by condition',
          'Exterior facade with elastic paints: higher price',
          'Decorative and marble effects calculated separately',
          'Surfaces over 200 m2 receive more favorable rates',
          'Visits and quotes in Blloku, Kashar, Farke and Plazh are free',
        ],
      },
      {
        title: 'What Are the Most Common Painting Mistakes?',
        content: 'Most painting problems come from poor preparation and rushing. Applying paint over damp surfaces, skipping primer or over-thinning the paint causes fading, cracking and uneven layers. Painting in very low temperatures also slows drying and harms adhesion. We respect drying times between coats, usually 2 to 4 hours, and carefully prepare every surface before the first coat.',
        listItems: [
          'Not applying primer over new plaster',
          'Painting over damp or dusty walls',
          'Over-thinning that reduces paint coverage',
          'Ignoring drying time between coats',
          'Using rollers unsuited to the surface',
          'Skipping protection of floors and furniture',
        ],
      },
      {
        title: 'How Long Does Painting Last and How Is It Maintained?',
        content: 'Quality painting with premium paints such as Dulux, Jotun or Caparol keeps colors vivid for 5 to 10 years indoors, while exterior facades in Tirana and Durres typically last 6 to 8 years before needing a refresh due to sun exposure and coastal air. Surfaces painted with washable paint clean easily with a damp cloth without harming the color.',
        listItems: [
          'Interior painting that lasts 5 to 10 years',
          'Facades refreshed every 6 to 8 years',
          'Washable paints cleaned with a damp cloth',
          'Touch-up repairs without repainting the whole wall',
          'Warranty on the work and materials used',
          'Advice on keeping the color looking new',
        ],
      },
    ],
    serviceFeatures: [
      {
        icon: 'ceiling' as const,
        title: 'Interior Painting',
        description: 'Total transformation of environments with professionally chosen colors and perfect application.',
        features: ['Matte/satin finishes', 'Eco-friendly paints', 'Color consulting', 'Furniture protection'],
      },
      {
        icon: 'partition' as const,
        title: 'Exterior Painting',
        description: 'Long-term protection and perfect aesthetics for your building facades.',
        features: ['UV resistance', 'Moisture protection', 'Stable colors', 'Special treatments'],
      },
      {
        icon: 'decoration' as const,
        title: 'Decorative Effects',
        description: 'Artistic techniques that transform ordinary walls into unique works of art.',
        features: ['Marble effect', 'Artistic textures', 'Murals', 'Custom designs'],
      },
      {
        icon: 'insulation' as const,
        title: 'Industrial Painting',
        description: 'Specialized solutions for industrial environments and technical applications.',
        features: ['Floor epoxy', 'Anti-bacterial', 'Chemical resistance', 'Fire treatment'],
      },
    ],
    commercialCategories,
    benefits,
    processSteps,
    faqItems: [
      {
        question: 'Do you work on large commercial painting projects?',
        answer: 'Yes, we specialize in commercial projects of all scales. We have experience with hotels, shopping centers, offices and industrial environments. Our team works fast and with quality.',
      },
      {
        question: 'How long does commercial painting take?',
        answer: 'Duration depends on surface area and preparation needed. For medium environments 1-3 days, while large projects may require 1-2 weeks. We can work outside hours to not interrupt business.',
      },
      {
        question: 'What paints do you use?',
        answer: 'We use premium paints from renowned manufacturers like Dulux, Jotun and Caparol. For interior environments we prefer eco-friendly paints with low VOC emissions.',
      },
      {
        question: 'Do you offer painting at night or on weekends?',
        answer: 'Yes, for commercial projects we offer full flexibility. We understand that your business cannot close, so we work according to your schedule.',
      },
      {
        question: 'How can I get a quote for my project?',
        answer: 'Contact us by phone, email or WhatsApp. Visits and assessments are free. Bring measurements and color preferences for a more accurate quote.',
      },
      {
        question: 'Do you offer warranty for painting?',
        answer: 'Yes, we offer full warranty. The quality paints we use last 5-10+ years without problems when properly applied.',
      },
      {
        question: 'How long should we wait before painting new plaster or filler?',
        answer: 'New plaster usually needs 2 to 4 weeks to dry fully before painting, while gypsum filler dries within 24 to 48 hours. Painting too early traps moisture inside the wall and causes blisters. We test moisture before we start any work.',
      },
      {
        question: 'How many liters of paint are needed to paint a room?',
        answer: 'One liter of quality paint covers about 10 to 12 square meters per coat. For a 20 square meter room with two coats you need roughly 8 to 10 liters. The amount depends on wall absorption and color. We calculate materials precisely during the free assessment.',
      },
      {
        question: 'Do you offer color consultation?',
        answer: 'Yes, we offer free color consultation based on lighting, room size and your style. We use low VOC paints that are safe for children rooms and workspaces, and we can prepare sample patches on the wall before you decide on the final color.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Painting Services Do We Offer?',
      commercialExperience: 'Where Have We Done Commercial Painting?',
      whyChooseUs: 'Why Choose Torra Gips for Painting?',
      howWeWork: 'How Does the Painting Process Work?',
      serviceAreas: 'Where Do We Offer Painting Services?',
      faq: 'Frequently Asked Questions About Painting',
      readyToStart: 'Ready for Your Painting Project?',
    },
    relatedLinks: [
      { href: '/painting-tirana', label: 'Professional Painting in Tirana' },
      { href: '/painting-durres', label: 'Professional Painting in Durrës' },
      { href: '/blog/choosing-paint-colors-for-your-home', label: 'Choosing Paint Colors for Your Home' },
      { href: '/blog/how-to-prepare-walls-for-painting', label: 'How to Prepare Walls for Painting' },
      { href: '/gypsum-works', label: 'Professional Gypsum Works' },
      { href: '/wall-plastering', label: 'Professional Wall Plastering' },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: pageData.serviceName, url: `/${locale}/lyerje/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
