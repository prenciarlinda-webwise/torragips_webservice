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
      ? 'Punime Gipsi Profesionale Tiranë & Durrës - +355 68 858 0058 - Torra Gips'
      : 'Professional Gypsum Works Tirana & Durrës - +355 68 858 0058 - Torra Gips',
    description: locale === 'sq'
      ? 'Punime gipsi profesionale për projekte komerciale dhe rezidenciale në Tiranë e Durrës. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës. Telefononi për ofertë falas.'
      : 'Professional gypsum works for commercial and residential projects in Tirana and Durrës. 100+ completed projects including Vlora Airport. Call for a free quote.',
    alternates: {
      canonical: `/${locale}/${locale === 'sq' ? 'punime-gipsi' : 'gypsum-works'}/`,
      languages: {
        sq: '/sq/punime-gipsi/',
        en: '/en/gypsum-works/',
      },
    },
    openGraph: {
      title: locale === 'sq'
        ? 'Punime Gipsi Profesionale Tiranë & Durrës - Torra Gips'
        : 'Professional Gypsum Works Tirana & Durrës - Torra Gips',
      description: locale === 'sq'
        ? 'Punime gipsi profesionale për projekte komerciale dhe rezidenciale në Tiranë e Durrës. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës.'
        : 'Professional gypsum works for commercial and residential projects in Tirana and Durrës. 100+ completed projects including Vlora Airport.',
      images: [{ url: '/images/services/gypsum/commercial-space-1.webp' }],
    },
  };
}

export default async function GypsumWorksPage({ params }: Props) {
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
    serviceName: 'Punime Gipsi',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Punime Gipsi Profesionale në Tiranë dhe Durrës',
    heroSubtitle: 'Tavane të varura, ndarja hapësirash, dekorime arkitekturore dhe izolim akustik për projekte komerciale dhe rezidenciale. 100+ projekte të përfunduara përfshirë Aeroportin e Vlorës. Materiale Knauf dhe Rigips. Konsultë falas.',
    introContent: [
      'Punimet e gipsit profesionale janë zgjidhja ideale për projekte moderne komerciale dhe rezidenciale. Torra Gips është kompania lider për punime gipsi në Shqipëri, me fokus të veçantë në projektet komerciale të mëdha. Kemi pasur nderin të punojmë në disa nga projektet më prestigjioze të vendit, duke përfshirë Aeroportin Ndërkombëtar të Vlorës, resortin Green Coast, kompleksin Rolling Hills dhe qendrën komerciale Lion Park.',
      'Me vite eksperiencë në industrinë e ndërtimit, ne kemi ndërtuar një reputacion të fortë për cilësi të jashtëzakonshme, respektim të afateve dhe profesionalizëm në çdo detaj. Ekipi ynë i specializuar përbëhet nga mjeshtër me përvojë të gjatë që përdorin teknikat më të avancuara dhe materialet më cilësore nga prodhues të njohur si Knauf dhe Rigips.',
      'Gipsi është materiali ideal për projekte moderne për shkak të vetive të tij unike: është i lehtë por shumë i qëndrueshëm, ofron izolim të shkëlqyer termik dhe akustik, është rezistent ndaj zjarrit dhe lejon krijimin e dizajneve të pakufizuara. Qoftë për një zyrë moderne, një hotel luksoz, një qendër tregtare ose një shtëpi private, ne ofrojmë zgjidhje të personalizuara që plotësojnë çdo nevojë.',
    ],
    contentSections: [
      {
        title: 'Çfarë Janë Tavanet e Varura me Gips?',
        content: 'Tavanet e varura me gips janë specialiteti ynë kryesor dhe një nga shërbimet më të kërkuara për projekte komerciale. Në aeroportet, hotelet dhe zyrat moderne, tavanet e gipsit luajnë një rol kyç në estetikë dhe funksionalitet. Ne ofrojmë dizajne të personalizuara që integrojnë sisteme ndriçimi, ajrimi dhe zjarri në mënyrë elegante.',
        listItems: [
          'Tavane me nivele të shumta për efekt vizual dramatik',
          'Integrim profesional i sistemeve LED, spoteve dhe ndriçimit indirekt',
          'Fshehje elegante e kabllove elektrike, tubacioneve dhe sistemeve HVAC',
          'Izolim superior akustik për ambiente pune dhe hotele',
          'Dizajne minimaliste moderne ose klasike me detaje dekorative',
          'Sisteme të certifikuara për mbrojtje nga zjarri',
        ],
      },
      {
        title: 'Si Funksionojnë Ndarjet e Hapësirash me Gips?',
        content: 'Ndarjet me panel gipsi janë zgjidhja ideale për riorganizimin e hapësirave komerciale dhe rezidenciale. Për zyra moderne që kërkojnë fleksibilitet, hotele që kanë nevojë për dhoma shtesë, ose qendra tregtare që ndryshojnë konfigurimin, ndarjet tona ofrojnë instalim të shpejtë pa ndërhyrje strukturore.',
        listItems: [
          'Instalim i shpejtë dhe i pastër - minimizojmë ndërprerjen e aktivitetit tuaj',
          'Izolim akustik i shkëlqyer midis hapësirave - ideal për zyra dhe hotele',
          'Mundësi për integrim të dyerve, dritareve dhe elementeve të tjera',
          'Rezistencë ndaj zjarrit sipas standardeve ndërkombëtare',
          'Fleksibilitet për modifikime dhe zgjerime të ardhshme',
          'Sipërfaqe të gatshme për çdo lloj përfundimi',
        ],
      },
      {
        title: 'Çfarë Dekorimesh Arkitekturore Ofron Gipsi?',
        content: 'Për projekte që kërkojnë diçka të veçantë, ofrojmë dekorime arkitekturore me gips që shtojnë karakter dhe elegancë hapësirave. Nga lobi-t e hoteleve deri te sallat e konferencave, detajet dekorative krijojnë atmosferë unike.',
        listItems: [
          'Korniza dhe profile dekorative për ambiente elegante',
          'Kolona dhe kapitele për ambiente klasike',
          'Rozeta dhe elemente qendrore për llambadarë',
          'Relieve dhe elemente skulpturore të personalizuara',
          'Riprodhime të dizajneve historike për restaurime',
          'Dizajne moderne dhe minimaliste sipas kërkesës',
        ],
      },
      {
        title: 'Pse Është i Rëndësishëm Izolimi Akustik me Gips?',
        content: 'Izolimi është veçanërisht i rëndësishëm për projekte komerciale ku komforti dhe funksionaliteti janë prioritet. Ne ofrojmë zgjidhje të specializuara që përmirësojnë ndjeshëm performancën e ndërtesave.',
        listItems: [
          'Izolim akustik për zyra, studio regjistrimi dhe ambiente konferencash',
          'Izolim termik që redukton kostot e ngrohjes dhe ftohjes',
          'Sisteme të specializuara për mbrojtje maksimale nga zjarri',
          'Zgjidhje për ambiente me lagështi të lartë (banjot, kuzhinat industriale)',
          'Certifikime sipas standardeve europiane dhe ndërkombëtare',
          'Konsultim teknik për zgjidhjen optimale',
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
        question: 'A punoni me projekte komerciale të mëdha?',
        answer: 'Po, specializohemi në projekte komerciale të çdo shkalle - nga zyra dhe dyqane deri tek aeroportet, hotelet dhe qendrat tregtare. Kemi përvojë me projekte prestigjioze si Aeroporti i Vlorës, Green Coast Resort dhe Rolling Hills.',
      },
      {
        question: 'Sa kohë zgjat një projekt komercial i punimeve të gipsit?',
        answer: 'Koha varet nga madhësia dhe kompleksiteti. Për projekte të vogla komerciale 1-2 javë, mesatare 2-4 javë, ndërsa projektet e mëdha mund të zgjasin disa muaj. Punojmë sipas afateve tuaja dhe mund të punojmë jashtë orarit të punës për të minimizuar ndërprerjen.',
      },
      {
        question: 'A mund të punoni natën ose në fundjavë?',
        answer: 'Po, për projekte komerciale ofrojmë fleksibilitet të plotë. Kuptojmë që biznesi juaj nuk mund të ndërpritet, prandaj mund të punojmë natën ose në fundjavë sipas nevojave tuaja.',
      },
      {
        question: 'Cilat standarde sigurie dhe cilësie ndiqni?',
        answer: 'Ndjekim të gjitha standardet europiane të sigurisë në punë. Ekipi ynë është i trajnuar dhe përdorim pajisje mbrojtëse. Materialet tona janë të certifikuara nga Knauf dhe Rigips. Jemi të siguruar plotësisht.',
      },
      {
        question: 'Si mund të marr një ofertë për projektin tim?',
        answer: 'Na kontaktoni me telefon, email ose WhatsApp për një konsultë falas. Për një vlerësim më të saktë, ju lutem na sillni matjet e projektit dhe planin arkitekturor nëse disponohet. Vizita në vend është falas.',
      },
      {
        question: 'A ofroni garanci për punën tuaj?',
        answer: 'Po, ofrojmë garanci të plotë për të gjitha punimet tona. Garancia mbulon çdo defekt në instalim dhe material. Ne jemi të përkushtuar ndaj cilësisë dhe kënaqësisë së klientit.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'Çfarë Shërbimesh Gipsi Ofrojmë?',
      commercialExperience: 'Ku Kemi Punuar me Gips Komercial?',
      whyChooseUs: 'Pse të Zgjidhni Torra Gips për Punime Gipsi?',
      howWeWork: 'Si Funksionon Procesi i Punimeve të Gipsit?',
      serviceAreas: 'Ku Ofrojmë Shërbime Punimesh Gipsi?',
      faq: 'Pyetje të Shpeshta për Punimet e Gipsit',
      readyToStart: 'Gati për Projektin Tuaj të Gipsit?',
    },
    relatedLinks: [
      { href: '/punime-gipsi-tirane', label: 'Punime Gipsi në Tiranë' },
      { href: '/punime-gipsi-durres', label: 'Punime Gipsi në Durrës' },
      { href: '/patinim', label: 'Patinim Profesional Murash' },
      { href: '/lyerje', label: 'Lyerje Profesionale' },
    ],
  } : {
    serviceName: 'Gypsum Works',
    heroImage: '/images/services/gypsum/commercial-space-1.webp',
    heroTitle: 'Professional Gypsum Works in Tirana and Durrës',
    heroSubtitle: 'Suspended ceilings, space partitions, architectural decorations and acoustic insulation for commercial and residential projects. 100+ completed projects including Vlora Airport. Knauf and Rigips materials. Free consultation.',
    introContent: [
      'Professional gypsum works are the ideal solution for modern commercial and residential projects. Torra Gips is the leading company for gypsum works in Albania, with a special focus on large commercial projects. We have had the honor of working on some of the most prestigious projects in the country, including Vlora International Airport, Green Coast Resort, Rolling Hills complex and Lion Park commercial center.',
      'With years of experience in the construction industry, we have built a strong reputation for exceptional quality, deadline compliance and professionalism in every detail. Our specialized team consists of experienced craftsmen who use the most advanced techniques and highest quality materials from renowned manufacturers like Knauf and Rigips.',
      'Gypsum is the ideal material for modern projects due to its unique properties: it is lightweight yet very durable, offers excellent thermal and acoustic insulation, is fire resistant and allows for unlimited design possibilities. Whether for a modern office, a luxury hotel, a shopping center or a private home, we offer customized solutions that meet every need.',
    ],
    contentSections: [
      {
        title: 'What Are Suspended Gypsum Ceilings?',
        content: 'Suspended gypsum ceilings are our main specialty and one of the most requested services for commercial projects. In airports, hotels and modern offices, gypsum ceilings play a key role in aesthetics and functionality. We offer customized designs that elegantly integrate lighting, ventilation and fire systems.',
        listItems: [
          'Multi-level ceilings for dramatic visual effect',
          'Professional integration of LED systems, spotlights and indirect lighting',
          'Elegant concealment of electrical cables, pipes and HVAC systems',
          'Superior acoustic insulation for work environments and hotels',
          'Minimalist modern or classic designs with decorative details',
          'Certified fire protection systems',
        ],
      },
      {
        title: 'How Do Gypsum Space Partitions Work?',
        content: 'Gypsum panel partitions are the ideal solution for reorganizing commercial and residential spaces. For modern offices requiring flexibility, hotels needing extra rooms, or shopping centers changing configurations, our partitions offer quick installation without structural intervention.',
        listItems: [
          'Fast and clean installation - we minimize disruption to your business',
          'Excellent acoustic insulation between spaces - ideal for offices and hotels',
          'Possibility for integration of doors, windows and other elements',
          'Fire resistance according to international standards',
          'Flexibility for future modifications and expansions',
          'Surfaces ready for any type of finish',
        ],
      },
      {
        title: 'What Architectural Decorations Does Gypsum Offer?',
        content: 'For projects that require something special, we offer architectural gypsum decorations that add character and elegance to spaces. From hotel lobbies to conference halls, decorative details create a unique atmosphere.',
        listItems: [
          'Decorative frames and profiles for elegant environments',
          'Columns and capitals for classic environments',
          'Rosettes and central elements for chandeliers',
          'Customized reliefs and sculptural elements',
          'Reproductions of historical designs for restorations',
          'Modern and minimalist designs on request',
        ],
      },
      {
        title: 'Why Is Acoustic Insulation with Gypsum Important?',
        content: 'Insulation is especially important for commercial projects where comfort and functionality are priorities. We offer specialized solutions that significantly improve building performance.',
        listItems: [
          'Acoustic insulation for offices, recording studios and conference rooms',
          'Thermal insulation that reduces heating and cooling costs',
          'Specialized systems for maximum fire protection',
          'Solutions for high humidity environments (bathrooms, industrial kitchens)',
          'Certifications according to European and international standards',
          'Technical consulting for the optimal solution',
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
        question: 'Do you work on large commercial projects?',
        answer: 'Yes, we specialize in commercial projects of all scales - from offices and stores to airports, hotels and shopping centers. We have experience with prestigious projects like Vlora Airport, Green Coast Resort and Rolling Hills.',
      },
      {
        question: 'How long does a commercial gypsum works project take?',
        answer: 'Duration depends on size and complexity. Small commercial projects take 1-2 weeks, medium 2-4 weeks, while large projects can take several months. We work according to your deadlines and can work outside business hours to minimize disruption.',
      },
      {
        question: 'Can you work nights or weekends?',
        answer: 'Yes, for commercial projects we offer full flexibility. We understand that your business cannot be interrupted, so we can work nights or weekends according to your needs.',
      },
      {
        question: 'What safety and quality standards do you follow?',
        answer: 'We follow all European workplace safety standards. Our team is trained and we use protective equipment. Our materials are certified by Knauf and Rigips. We are fully insured.',
      },
      {
        question: 'How can I get a quote for my project?',
        answer: 'Contact us by phone, email or WhatsApp for a free consultation. For a more accurate estimate, please provide project measurements and architectural plan if available. On-site visits are free.',
      },
      {
        question: 'Do you offer warranty for your work?',
        answer: 'Yes, we offer full warranty for all our work. The warranty covers any defects in installation and materials. We are committed to quality and customer satisfaction.',
      },
    ],
    sectionTitles: {
      whatWeOffer: 'What Gypsum Services Do We Offer?',
      commercialExperience: 'Where Have We Done Commercial Gypsum Work?',
      whyChooseUs: 'Why Choose Torra Gips for Gypsum Works?',
      howWeWork: 'How Does the Gypsum Works Process Work?',
      serviceAreas: 'Where Do We Offer Gypsum Works Services?',
      faq: 'Frequently Asked Questions About Gypsum Works',
      readyToStart: 'Ready for Your Gypsum Project?',
    },
    relatedLinks: [
      { href: '/gypsum-works-tirana', label: 'Gypsum Works in Tirana' },
      { href: '/gypsum-works-durres', label: 'Gypsum Works in Durrës' },
      { href: '/wall-plastering', label: 'Professional Wall Plastering' },
      { href: '/painting', label: 'Professional Painting Services' },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/punime-gipsi/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: pageData.serviceName, url: `/${locale}/punime-gipsi/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
