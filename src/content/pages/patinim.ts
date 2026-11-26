import type { SpecPageContent } from './types';

const IMG = '/images/services/gypsum';

export const patinim: Record<'sq' | 'en', SpecPageContent> = {
  sq: {
    metaTitle: 'Patinim Muresh - +355 68 858 0058 - Torra Gips',
    metaDescription:
      'Patinim profesional për mure dhe tavane me cilësi Q3 dhe Q4. Sipërfaqe perfekte gati për lyerje, pa pluhur. Preventiv falas: +355 68 858 0058.',
    h1: 'Patinim Muresh dhe Tavanesh',
    answer:
      'Torra Gips kryen patinim profesional të mureve dhe tavaneve me standardin Q3 dhe Q4, me zmerilim me vakum pa pluhur dhe preventiv falas brenda 48 orësh.',
    cta: {
      call: 'Telefono Tani: +355 68 858 0058',
      whatsapp: 'Kërko Matje Falas në WhatsApp',
      whatsappMessage: 'Përshëndetje Torra Gips, dua të kërkoj matje falas për patinim.',
    },
    sections: [
      {
        title: 'Llojet e Patinimit që Realizojmë',
        paragraphs: [
          'Patinimi është faza vendimtare që përcakton se si do të duket muri pasi të ndizen dritat. Edhe boja më e shtrenjtë nuk mbulon dot valëzimet, gropat apo gjurmët e mallës nëse patinimi nuk është ekzekutuar me saktësi. Ekipi ynë aplikon sisteme të plota patinimi për apartamente, vila, zyra dhe objekte komerciale.',
        ],
        items: [
          {
            title: 'Patinim me Makinë Airless',
            text: 'Për sipërfaqe të mëdha, pallate të reja, zyra dhe ambiente biznesi përdorim patinimin me makinë Airless. Sprucimi mekanik garanton trashësi uniforme të materialit në të gjithë murin, shpejtësi tre herë më të lartë se puna tradicionale dhe lidhje më të fortë me bazën. Pasi materiali aplikohet me presion, nivelohet me spatulat profesionale fleksibël (skimming blades) për një sipërfaqe plotësisht të rrafshët.',
            image: `${IMG}/patinimi-i-mureve-1.webp`,
            alt: 'Patinim muresh me makinë Airless',
          },
          {
            title: 'Patinimi i Mureve të Suvasë dhe Gipsit',
            text: 'Muret e reja të suvatuara kërkojnë përgatitje të ndryshme nga pllakat e gipsit. Për muret me suva aplikojmë fillimisht astar fiksues (primer) që rregullon thithjen e ujit, më pas vendosim shtresën e parë niveluese (gips-patinë) dhe dy shtresa finale stukoje të imët. Për muret dhe tavanet e reja nga [punimet e gipsit](/sq/), trajtojmë fillimisht fugat me shirit letre mikroperforuar dhe stukim elastik, pastaj kalojmë në patinimin e plotë të sipërfaqes për të eliminuar çdo ndryshim teksture mes pllakës dhe bashkimit.',
            image: `${IMG}/patinimi-i-mureve-2.webp`,
            alt: 'Patinim i mureve të suvasë dhe gipsit',
          },
          {
            title: 'Riparim Plasaritjesh dhe Rikonstruksion Muresh të Vjetra',
            text: 'Në apartamentet ekzistuese ku muret kanë çarje, lagështi të tharë ose shtresa të vjetra boje që po bien, nuk patinojmë kurrë mbi sipërfaqe të pasigurta. Kruajmë pjesët e shkëputura, hapim plasaritjet në formë V, vendosim rrjetë fibre xhami kundër çarjeve dhe aplikojmë astar kuarci ose lidhës para patinimit final. Kjo parandalon rishfaqjen e plasaritjeve pas disa muajsh.',
            image: `${IMG}/patinimi-i-mureve-3.webp`,
            alt: 'Riparim plasaritjesh para patinimit',
          },
          {
            title: 'Zmerilim Mekanik me Vakum dhe Kontroll me Dritë Anësore',
            text: 'Pas tharjes së shtresës finale, kryejmë zmerilimin me makina profesionale të lidhura me thithës industrial pluhuri (vakum). Ky proces mban ambientin të pastër dhe garanton lëmim uniform. Çdo mur dhe tavan kontrollohet me llambë anësore (grazing light) për të korrigjuar edhe mikro-defektet më të vogla përpara se të fillojë faza e lyerjes.',
            image: `${IMG}/patinimi-i-mureve-4.webp`,
            alt: 'Zmerilim mekanik i patinimit me vakum',
          },
        ],
      },
      {
        title: 'Standardet e Patinimit (Q3 vs Q4) dhe Afatet',
        table: {
          head: ['Standardi i Finiturës', 'Përshkrimi Teknik', 'Ku Rekomandohet', 'Afati Mesatar (Apartament 2+1)'],
          rows: [
            ['Standardi Q2', 'Stukim i bashkimeve të gipsit dhe vidave', 'Mure ku vendoset letër muri e trashë ose veshje druri', '1 - 2 ditë pune'],
            ['Standardi Q3', 'Patinim i plotë me 2 shtresa dhe zmerilim', 'Mure standarde për bojë plastike mat', '3 - 4 ditë pune'],
            ['Standardi Q4 (Ekstra)', 'Patinim 3-shtresor me stuko finale dhe kontroll me dritë anësore', 'Mure me ndriçim LED anësor, bojëra saten dhe dekorative', '4 - 5 ditë pune'],
            ['Patinim me Makinë Airless', 'Aplikim mekanik i njëtrajtshëm në sipërfaqe të mëdha', 'Zyra, hotele, komplekse banimi dhe vila', 'Sipas sipërfaqes (m²)'],
          ],
        },
      },
      {
        title: 'Procesi i Punës për Patinim Muresh',
        steps: [
          {
            title: 'Inspektimi i Bazës dhe Matja Falas',
            text: 'Verifikojmë gjendjen e suvasë, lagështinë e murit dhe drejtësinë e këndeve me lazer për të zgjedhur sistemin e duhur të patinimit.',
          },
          {
            title: 'Mbrojtja e Ambientit',
            text: 'Mbulojmë dyshemetë, kornizat e dritareve dhe dyert me najlon dhe shirit mbrojtës për të shmangur njollat e stukos.',
          },
          {
            title: 'Aplikimi Shtresor dhe Këndoret',
            text: 'Vendosim këndore alumini ose PVC në çdo cep të ekspozuar për mbrojtje nga goditjet, aplikojmë astarin dhe shtresat e patinimit duke respektuar kohën e tharjes mes tyre.',
          },
          {
            title: 'Zmerilimi dhe Dorëzimi',
            text: 'Lëmojmë sipërfaqen me vakum, kontrollojmë me dritë anësore dhe e dorëzojmë objektin plotësisht gati për [lyerje shtëpie](/sq/lyerje/).',
          },
        ],
      },
      {
        title: 'Zonat ku Kryejmë Patinim',
        paragraphs: [
          'Operojmë me ekipe të dedikuara për patinim në Tiranë dhe Durrës, si dhe marrim përsipër projekte të mëdha në të gjithë Shqipërinë.',
          'Në Tiranë punojmë në Bllok, Qendër, Komunën e Parisit, Astir, Don Bosko, Yzberisht, Fresk, Porcelan, Ali Demi, Laprakë, Kombinat, Kashar, Kamëz dhe Farkë. Në Durrës punojmë në Qendër, Currila, Shkozet, Plazh, Golem, Qerret dhe Gjirin e Lalzit.',
        ],
      },
    ],
    faq: {
      title: 'Pyetje të Shpeshta për Patinimin',
      items: [
        {
          question: 'Cili është ndryshimi mes patinimit Q3 dhe Q4?',
          answer:
            'Standardi Q3 jep një sipërfaqe të lëmuar e të mjaftueshme për bojëra normale mat. Standardi Q4 përfshin një shtresë shtesë stukoje ekstra të imët dhe kontroll me dritë anësore, i domosdoshëm për mure ku bie dritë direkte nga shiritat LED ose dritare të mëdha.',
        },
        {
          question: 'Sa kohë duhet të thahet patinimi përpara lyerjes?',
          answer:
            'Në kushte normale temperature dhe ajrosjeje, patinimi thahet plotësisht brenda 24 deri në 48 orësh. Lyerja nuk duhet të fillojë kurrë mbi patinë të lagur sepse shkakton fryrje të bojës.',
        },
        {
          question: 'A përdorni materiale të gatshme (në kovë) apo pluhur?',
          answer:
            'Për shtresën e parë mbushëse përdorim materiale profesionale pluhur (Knauf, Rigips ose Semin) për fortësi mekanike, ndërsa për shtresën finale përdorim stuko të gatshme ekstra të imët që jep lëmim si pasqyrë.',
        },
        {
          question: 'Si mund të marr një preventiv për patinimin e mureve?',
          answer:
            'Telefononi në [+355 68 858 0058](tel:+355688580058) ose dërgoni planimetrinë në WhatsApp. Për të parë faktorët që ndikojnë në ofertë, vizitoni faqen [punime gipsi çmimi](/sq/cmime/).',
        },
      ],
    },
  },

  en: {
    metaTitle: 'Wall Plastering - +355 68 858 0058 - Torra Gips',
    metaDescription:
      'Professional plastering for walls and ceilings to Q3 and Q4 quality. Perfect surfaces ready for painting, dust-free. Free quote: +355 68 858 0058.',
    h1: 'Wall and Ceiling Plastering',
    answer:
      'Torra Gips delivers professional wall and ceiling plastering to the Q3 and Q4 standard, with dust-free vacuum sanding and a free quote within 48 hours.',
    cta: {
      call: 'Call Now: +355 68 858 0058',
      whatsapp: 'Request a Free Measurement on WhatsApp',
      whatsappMessage: 'Hello Torra Gips, I would like to request a free measurement for plastering.',
    },
    sections: [
      {
        title: 'Types of Plastering We Deliver',
        paragraphs: [
          'Plastering is the decisive phase that determines how a wall looks once the lights are on. Even the most expensive paint cannot hide waves, dents or trowel marks if the plastering is not executed precisely. Our team applies complete plastering systems for apartments, villas, offices and commercial buildings.',
        ],
        items: [
          {
            title: 'Airless Machine Plastering',
            text: 'For large surfaces, new apartment blocks, offices and business premises we use Airless machine plastering. Mechanical spraying guarantees uniform material thickness across the whole wall, three times the speed of traditional work and a stronger bond with the base. Once the material is applied under pressure, it is leveled with flexible professional skimming blades for a perfectly flat surface.',
            image: `${IMG}/patinimi-i-mureve-1.webp`,
            alt: 'Wall plastering with an Airless machine',
          },
          {
            title: 'Plastering Rendered and Gypsum Walls',
            text: 'New rendered walls need different preparation from gypsum boards. On rendered walls we first apply a fixing primer that regulates water absorption, then a first leveling coat (gypsum skim) and two fine finishing coats. For new walls and ceilings from [gypsum works](/en/), we first treat the joints with micro-perforated paper tape and elastic compound, then skim the full surface to eliminate any texture difference between board and joint.',
            image: `${IMG}/patinimi-i-mureve-2.webp`,
            alt: 'Plastering rendered and gypsum walls',
          },
          {
            title: 'Crack Repair and Renovation of Old Walls',
            text: 'In existing apartments where walls have cracks, dried damp or old peeling paint layers, we never plaster over unsound surfaces. We scrape off loose areas, open cracks in a V shape, embed anti-crack fiberglass mesh and apply quartz or bonding primer before the final skim. This prevents cracks from reappearing after a few months.',
            image: `${IMG}/patinimi-i-mureve-3.webp`,
            alt: 'Crack repair before plastering',
          },
          {
            title: 'Mechanical Vacuum Sanding and Grazing Light Inspection',
            text: 'Once the final coat has dried, we sand with professional machines connected to an industrial dust extractor (vacuum). This keeps the space clean and guarantees an even finish. Every wall and ceiling is checked with a grazing light to correct even the smallest micro-defects before the painting phase begins.',
            image: `${IMG}/patinimi-i-mureve-4.webp`,
            alt: 'Mechanical vacuum sanding of plastered walls',
          },
        ],
      },
      {
        title: 'Plastering Standards (Q3 vs Q4) and Timelines',
        table: {
          head: ['Finish Standard', 'Technical Description', 'Recommended For', 'Average Timeline (2-Bedroom Apartment)'],
          rows: [
            ['Q2 standard', 'Filling of gypsum joints and screws', 'Walls receiving heavy wallpaper or wood cladding', '1 - 2 working days'],
            ['Q3 standard', 'Full 2-coat skim with sanding', 'Standard walls for matt emulsion paint', '3 - 4 working days'],
            ['Q4 standard (Extra)', '3-coat skim with finishing compound and grazing light check', 'Walls with grazing LED light, satin and decorative paints', '4 - 5 working days'],
            ['Airless machine plastering', 'Uniform mechanical application on large surfaces', 'Offices, hotels, residential complexes and villas', 'By surface area (m²)'],
          ],
        },
      },
      {
        title: 'Our Wall Plastering Process',
        steps: [
          {
            title: 'Base Inspection and Free Measurement',
            text: 'We check the condition of the render, the wall moisture and the straightness of corners with a laser to choose the right plastering system.',
          },
          {
            title: 'Protecting the Space',
            text: 'We cover floors, window frames and doors with plastic sheeting and protective tape to avoid compound stains.',
          },
          {
            title: 'Layered Application and Corner Beads',
            text: 'We fit aluminium or PVC corner beads on every exposed edge for impact protection, then apply the primer and plaster coats, respecting the drying time between them.',
          },
          {
            title: 'Sanding and Handover',
            text: 'We sand the surface with vacuum extraction, check it with grazing light and hand over the property fully ready for [house painting](/en/painting/).',
          },
        ],
      },
      {
        title: 'Where We Carry Out Plastering',
        paragraphs: [
          'We operate dedicated plastering teams in Tirana and Durrës, and we take on large projects across Albania.',
          'In Tirana we work in Blloku, the Center, Komuna e Parisit, Astir, Don Bosko, Yzberisht, Fresku, Porcelan, Ali Demi, Laprakë, Kombinat, Kashar, Kamëz and Farkë. In Durrës we work in the Center, Currila, Shkozet, Plazh, Golem, Qerret and the Gulf of Lalzi.',
        ],
      },
    ],
    faq: {
      title: 'Frequently Asked Questions About Plastering',
      items: [
        {
          question: 'What is the difference between Q3 and Q4 plastering?',
          answer:
            'The Q3 standard gives a smooth surface suitable for normal matt paints. The Q4 standard adds an extra coat of extra-fine compound and a grazing light check, essential for walls hit by direct light from LED strips or large windows.',
        },
        {
          question: 'How long does plaster need to dry before painting?',
          answer:
            'In normal temperature and ventilation conditions, plaster dries fully within 24 to 48 hours. Painting should never start on wet plaster because it causes the paint to blister.',
        },
        {
          question: 'Do you use ready-mixed (bucket) or powder materials?',
          answer:
            'For the first filling coat we use professional powder materials (Knauf, Rigips or Semin) for mechanical strength, while for the final coat we use extra-fine ready-mixed compound that gives a mirror-smooth finish.',
        },
        {
          question: 'How can I get a quote for wall plastering?',
          answer:
            'Call [+355 68 858 0058](tel:+355688580058) or send your floor plan on WhatsApp. To see the factors that affect the quote, visit our [gypsum works prices](/en/pricing/) page.',
        },
      ],
    },
  },
};
