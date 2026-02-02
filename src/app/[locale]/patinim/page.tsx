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
      ? 'Patinim Profesional Tiranë & Durrës | Suva Dekorative, Patinim Muri | Torra Gips'
      : 'Professional Plastering Tirana & Durrës | Decorative Plaster, Wall Plastering | Torra Gips',
    description: locale === 'sq'
      ? 'Shërbime Patinimi profesionale për projekte komerciale dhe rezidenciale. Patinim brendshëm dhe jashtëm, suva dekorative, riparime muraturash. Aeroporti i Vlorës, hotele, zyra. Ofertë falas!'
      : 'Professional plastering services for commercial and residential projects. Interior and exterior plastering, decorative plaster, wall repairs. Vlora Airport, hotels, offices. Free quote!',
    keywords: locale === 'sq'
      ? 'patinim, suva, patinim muri, patinim profesional, suva dekorative, patinim Tiranë, patinim Durrës, patinim komercial, patinim hotel'
      : 'plastering, plaster, wall plastering, professional plastering, decorative plaster, plastering Tirana, plastering Durrës, commercial plastering, hotel plastering',
  };
}

export default async function PlasteringPage({ params }: Props) {
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
    serviceName: 'Patinim',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Patinim Profesional për Projekte Komerciale dhe Rezidenciale',
    heroSubtitle: 'Ekspertë në patinim brendshëm dhe jashtëm, suva dekorative dhe riparime muraturash për aeroportet, hotelet, zyrat, qendrat tregtare dhe ambientet rezidenciale. Përfundime të përsosura me materiale premium.',
    introContent: [
      'Torra Gips ofron shërbime Patinimi të nivelit më të lartë për projekte komerciale dhe rezidenciale në Tiranë, Durrës dhe gjithë Shqipërinë qendrore. Me përvojë të gjerë në projekte prestigjioze si Aeroporti Ndërkombëtar i Vlorës, Green Coast Resort dhe Rolling Hills, ne garantojmë cilësi që tejkalon pritshmëritë.',
      'Patinimi është një art që kërkon mjeshtëri, durim dhe vëmendje ndaj detajeve. Ekipi ynë i specializuar ka vite përvojë në teknikat tradicionale dhe moderne të patinimit, duke përdorur materialet më cilësore për rezultate që zgjasin me dekada. Qoftë për një ndërtesë të re ose rinovim, ne ofrojmë zgjidhje të personalizuara.',
      'Në projektet komerciale, Patinimi luan një rol vendimtar në estetikën dhe funksionalitetin e ndërtesave. Sipërfaqet e patinuara siç duhet jo vetëm duken elegante, por gjithashtu mbrojnë muraturën nga lagështia, krijonjë bazë të shkëlqyer për lyerje dhe kontribuojnë në izolimin termik të ndërtesës.',
    ],
    contentSections: [
      {
        title: 'Patinim Brendshëm - Sipërfaqe të Përsosura',
        content: 'Patinimi brendshëm është baza për çdo përfundim të brendshëm cilësor. Ne ofrojmë sipërfaqe të lëmuara dhe uniforme që janë perfekte për lyerje, tapiceri ose çdo përfundim tjetër. Për ambiente komerciale, sigurojmë që çdo cep dhe qoshe të jetë e përsosur.',
        listItems: [
          'Patinim me gips për sipërfaqe ultra të lëmuara',
          'Suva tradicionale me çimento dhe gëlqere',
          'Përgatitje sipërfaqesh për lyerje dhe përfundime luksoze',
          'Riparime dhe restaurime muraturash',
          'Sisteme Patinimi të shpejtë për projekte me afate të ngushta',
          'Patinim i specializuar për ambiente me lagështi',
        ],
      },
      {
        title: 'Patinim Jashtëm - Mbrojtje dhe Estetikë',
        content: 'Patinimi jashtëm duhet të kombinojë estetikën me funksionalitetin. Produktet tona të specializuara mbrojnë muraturën nga kushtet atmosferike të Shqipërisë, duke ruajtur pamjen elegante për vite të tëra.',
        listItems: [
          'Suva e jashtme rezistente ndaj kushteve atmosferike',
          'Sisteme izoluese termike me suva',
          'Përfundime dekorative të jashtme',
          'Riparime fasadash dhe restaurime',
          'Trajtim kundër lagështisë dhe myshkut',
          'Ngjyra të qëndrueshme ndaj rrezeve UV',
        ],
      },
      {
        title: 'Suva Dekorative - Efekte Artistike',
        content: 'Suvaja dekorative transformon muraturën e zakonshme në vepra arti. Ne ofrojmë një gamë të gjerë efektesh dhe teksturash për ambiente komerciale dhe rezidenciale që kërkojnë diçka të veçantë.',
        listItems: [
          'Efekt mermeri venecian (stucco veneziano)',
          'Tekstura travertini dhe guri natyral',
          'Efekte metalike dhe perlë',
          'Suva antike dhe rustike',
          'Tekstura moderne minimaliste',
          'Efekte të personalizuara sipas kërkesës',
        ],
      },
      {
        title: 'Riparime dhe Restaurime Profesionale',
        content: 'Jo çdo projekt ka nevojë për patinim të plotë. Ne ofrojmë shërbime riparimesh dhe restaurimesh për muratura ekzistuese, duke rivendosur pamjen origjinale pa pasur nevojë për ndërhyrje të mëdha.',
        listItems: [
          'Riparime çarjesh dhe plasaritjesh',
          'Restaurime pas dëmtimeve nga uji',
          'Rinovime patinimesh të vjetra',
          'Përgatitje për rilyerje',
          'Trajtim problemesh të lagështisë',
          'Restaurime ndërtesash historike',
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
        question: 'A punoni me projekte komerciale të mëdha Patinimi?',
        answer: 'Po, specializohemi në projekte komerciale të çdo shkalle. Kemi përvojë me projekte si Aeroporti i Vlorës, hotele luksoze dhe qendra tregtare. Ekipi ynë është i trajnuar për standarde të larta dhe afate të ngushta.',
      },
      {
        question: 'Sa kohë zgjat Patinimi i një ambienti komercial?',
        answer: 'Koha varet nga sipërfaqja dhe lloji i patinimit. Për ambiente mesatare 2-5 ditë, ndërsa projekte të mëdha mund të kërkojnë disa javë. Mund të punojmë me turne për të përshpejtuar procesin.',
      },
      {
        question: 'Cilat materiale përdorni për patinimin?',
        answer: 'Përdorim vetëm materiale premium të certifikuara nga prodhuesit më të njohur europianë. Zgjedhim materialin optimal sipas kushteve dhe kërkesave specifike të projektit tuaj.',
      },
      {
        question: 'A ofroni patinim jashtë orarit të punës?',
        answer: 'Po, për projekte komerciale ofrojmë fleksibilitet të plotë. Punojmë natën dhe në fundjavë për të mos ndërprerë aktivitetin tuaj të biznesit.',
      },
      {
        question: 'Si mund të marr një ofertë për projektin tim?',
        answer: 'Na kontaktoni me telefon, email ose WhatsApp. Vizita në vend dhe vlerësimi janë falas. Për ofertë më të saktë, sillni matjet dhe planin arkitekturor nëse disponohet.',
      },
      {
        question: 'A ofroni garanci për patinimin?',
        answer: 'Po, ofrojmë garanci të plotë për punën dhe materialet. Patinimi i kryer siç duhet zgjat me dekada pa probleme.',
      },
    ],
  } : {
    serviceName: 'Plastering',
    heroImage: '/images/services/plastering/accent-wall.webp',
    heroTitle: 'Professional Plastering for Commercial and Residential Projects',
    heroSubtitle: 'Experts in interior and exterior plastering, decorative plaster and wall repairs for airports, hotels, offices, shopping centers and residential environments. Perfect finishes with premium materials.',
    introContent: [
      'Torra Gips offers the highest level plastering services for commercial and residential projects in Tirana, Durrës and all of central Albania. With extensive experience in prestigious projects like Vlora International Airport, Green Coast Resort and Rolling Hills, we guarantee quality that exceeds expectations.',
      'Plastering is an art that requires craftsmanship, patience and attention to detail. Our specialized team has years of experience in traditional and modern plastering techniques, using the highest quality materials for results that last decades. Whether for a new building or renovation, we offer customized solutions.',
      'In commercial projects, plastering plays a decisive role in the aesthetics and functionality of buildings. Properly plastered surfaces not only look elegant, but also protect the masonry from moisture, create an excellent base for painting and contribute to the thermal insulation of the building.',
    ],
    contentSections: [
      {
        title: 'Interior Plastering - Perfect Surfaces',
        content: 'Interior plastering is the foundation for any quality interior finish. We offer smooth and uniform surfaces that are perfect for painting, wallpaper or any other finish. For commercial environments, we ensure that every corner is perfect.',
        listItems: [
          'Gypsum plastering for ultra-smooth surfaces',
          'Traditional cement and lime plaster',
          'Surface preparation for painting and luxury finishes',
          'Wall repairs and restorations',
          'Fast plastering systems for tight deadlines',
          'Specialized plastering for humid environments',
        ],
      },
      {
        title: 'Exterior Plastering - Protection and Aesthetics',
        content: 'Exterior plastering must combine aesthetics with functionality. Our specialized products protect masonry from Albanian weather conditions, maintaining an elegant appearance for years.',
        listItems: [
          'Weather-resistant exterior plaster',
          'Thermal insulation systems with plaster',
          'Decorative exterior finishes',
          'Facade repairs and restorations',
          'Treatment against moisture and mold',
          'UV-resistant colors',
        ],
      },
      {
        title: 'Decorative Plaster - Artistic Effects',
        content: 'Decorative plaster transforms ordinary masonry into works of art. We offer a wide range of effects and textures for commercial and residential environments that require something special.',
        listItems: [
          'Venetian marble effect (stucco veneziano)',
          'Travertine and natural stone textures',
          'Metallic and pearl effects',
          'Antique and rustic plaster',
          'Modern minimalist textures',
          'Customized effects on request',
        ],
      },
      {
        title: 'Professional Repairs and Restorations',
        content: 'Not every project needs complete plastering. We offer repair and restoration services for existing walls, restoring the original appearance without major interventions.',
        listItems: [
          'Crack and split repairs',
          'Restorations after water damage',
          'Renovation of old plaster',
          'Preparation for repainting',
          'Moisture problem treatment',
          'Historic building restorations',
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
        question: 'Do you work on large commercial plastering projects?',
        answer: 'Yes, we specialize in commercial projects of all scales. We have experience with projects like Vlora Airport, luxury hotels and shopping centers. Our team is trained for high standards and tight deadlines.',
      },
      {
        question: 'How long does commercial plastering take?',
        answer: 'Duration depends on surface area and type of plastering. For medium environments 2-5 days, while large projects may require several weeks. We can work in shifts to speed up the process.',
      },
      {
        question: 'What materials do you use for plastering?',
        answer: 'We use only premium certified materials from the most renowned European manufacturers. We choose the optimal material according to the specific conditions and requirements of your project.',
      },
      {
        question: 'Do you offer plastering outside business hours?',
        answer: 'Yes, for commercial projects we offer full flexibility. We work nights and weekends to not interrupt your business activity.',
      },
      {
        question: 'How can I get a quote for my project?',
        answer: 'Contact us by phone, email or WhatsApp. On-site visits and assessments are free. For a more accurate quote, bring measurements and architectural plan if available.',
      },
      {
        question: 'Do you offer warranty for plastering?',
        answer: 'Yes, we offer full warranty for work and materials. Properly done plastering lasts decades without problems.',
      },
    ],
  };

  return (
    <>
      <ServiceSchema
        name={pageData.serviceName}
        description={pageData.heroSubtitle}
        url={`/${locale}/patinim/`}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: isAlbanian ? 'Kryefaqja' : 'Home', url: `/${locale}/` },
          { name: pageData.serviceName, url: `/${locale}/patinim/` },
        ]}
      />

      <ServicePageTemplate
        locale={locale}
        {...pageData}
      />
    </>
  );
}
