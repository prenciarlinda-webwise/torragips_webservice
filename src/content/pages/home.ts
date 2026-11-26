import type { SpecPageContent } from './types';

const IMG = '/images/services/gypsum';

export const home: Record<'sq' | 'en', SpecPageContent> = {
  sq: {
    metaTitle: 'Punime Gipsi - +355 68 858 0058 - Torra Gips',
    metaDescription:
      'Punime gipsi me materiale Knauf dhe Rigips për shtëpi, zyra dhe objekte komerciale. Matje dhe preventiv falas. Telefononi: +355 68 858 0058.',
    h1: 'Punime Gipsi',
    answer:
      'Torra Gips realizon punime gipsi me materiale të certifikuara Knauf dhe Rigips, me matje në vend dhe preventiv falas brenda 48 orësh.',
    cta: {
      call: 'Telefono Tani: +355 68 858 0058',
      whatsapp: 'Dërgo Planimetrinë në WhatsApp',
      whatsappMessage: "Përshëndetje Torra Gips, dua t'ju dërgoj planimetrinë për punime gipsi.",
    },
    sections: [
      {
        title: 'Llojet e Punimeve të Gipsit që Realizojmë',
        paragraphs: [
          'Ekipi ynë ekzekuton sisteme të plota të ndërtimit të thatë për apartamente, vila private, zyra, klinika, hotele dhe objekte komerciale. Çdo projekt realizohet duke respektuar normat teknike të montimit, pa improvizime në konstruksion apo në materiale.',
        ],
        items: [
          {
            title: 'Tavane të Varura me Gips',
            text: 'Montojmë tavane të varura të sheshta, akustike dhe me struktura të përforcuara. Përdorim profile metalike të zinkuara me trashësi 0.6mm (UD dhe CD) dhe varëse me fiksim të sigurt në soletë, duke eliminuar rrezikun e lëshimit ose çarjes me kalimin e kohës. Për banja, kuzhina dhe ambiente me lagështi të lartë aplikojmë pllaka gipsi jeshile (H2) rezistente ndaj ujit, ndërsa për zyra dhe lokale instalojmë panele akustike që thithin zhurmën.',
            image: `${IMG}/dhome-gjumi-tavan-gipsi-4.webp`,
            alt: 'Tavan i varur me gips kundër lagështirës në banjo',
          },
          {
            title: 'Punime Gipsi për Sallone dhe Ndriçim LED',
            text: 'Salloni është hapësira ku saktësia e montimit duket menjëherë. Realizojmë tavane dekorative me nivele, kanale të fshehura për shirita LED, profile hije (shadow gap) rreth perimetrit të murit, kuti të fshehura për perde dhe mure televizori me gips. Çdo kënd dhe bashkim nivelohet me lazer 360 gradë dhe përforcohet me këndore alumini ose letre me metal, në mënyrë që drita anësore e LED-it të mos nxjerrë asnjë defekt.',
            image: '/images/gallery/tavan-gipsi-dekorativ-kaseta-1.jpeg',
            alt: 'Punime gipsi për sallon me ndriçim LED të fshehur',
          },
          {
            title: 'Mure Ndarëse me Gips dhe Izolim Akustik e Termik',
            text: 'Ndërtojmë mure ndarëse me gips që zëvendësojnë plotësisht muraturën tradicionale me tullë, me peshë më të ulët dhe izolim shumë më të lartë. Konstruksioni realizohet me profile CW dhe UW (50mm, 75mm ose 100mm), shirit akustik izolues në të gjithë perimetrin, mbushje me lesh guri me dendësi të lartë dhe veshje me pllakë gipsi të dyfishtë 12.5mm nga të dyja anët. Ky sistem garanton qetësi maksimale mes dhomave të gjumit, zyrave dhe ambienteve shëndetësore.',
            image: '/images/gallery/tavan-gipsi-korridor-profil-led-1.jpeg',
            alt: 'Mur ndarës me gips dhe izolim me lesh guri',
          },
          {
            title: 'Veshje Muresh me Gips dhe Sisteme Kundër Zjarrit',
            text: 'Për mure të shtrembra prej betoni ose tulle, aplikojmë veshje me konstruksion metalik (kartonxhesi) dhe izolim termik të brendshëm, duke krijuar sipërfaqe plotësisht të drejta gati për finiturë. Për ambiente komerciale, kafaze shkallësh, dhoma teknike dhe oxhaqe montojmë pllaka gipsi të kuqe (DF) rezistente ndaj zjarrit, të certifikuara sipas standardeve evropiane të sigurisë.',
            image: '/images/gallery/panele-3d-mur-dekorativ-led-1.jpeg',
            alt: 'Veshje muresh me gips në objekt komercial',
          },
        ],
      },
      {
        title: 'Specifikimet Teknike, Materialet dhe Afatet',
        table: {
          head: ['Lloji i Punimit', 'Pllaka e Gipsit', 'Konstruksioni dhe Izolimi', 'Afati Mesatar (Apartament 2+1)'],
          rows: [
            ['Tavan i varur i thjeshtë', 'Knauf / Rigips 12.5mm (E bardhë)', 'Profile UD/CD 0.6mm + varëse', '3 - 4 ditë pune'],
            ['Tavan dekorativ me ndriçim LED', 'Knauf / Rigips 12.5mm', 'Profile të dyfishta + kanal LED', '5 - 7 ditë pune'],
            ['Tavan për banjo dhe kuzhinë', 'Pllakë jeshile kundër lagështirës (H2)', 'Profile antikorrozion', '1 - 2 ditë pune'],
            ['Mur ndarës me izolim akustik', 'Pllakë e dyfishtë 12.5mm', 'Profile CW/UW + Lesh Guri + Shirit akustik', '4 - 6 ditë pune'],
            ['Sistem kundër zjarrit', 'Pllakë e kuqe (DF) 12.5mm / 15mm', 'Konstruksion i certifikuar + Lesh Guri', 'Sipas projektit'],
          ],
        },
        after: [
          'Cilësia e një punimi gipsi nuk varet vetëm nga pllaka, por nga materialet e bashkimit. Për mbushjen e fugave përdorim stukim profesional (Knauf Uniflott ose Fugenfüller) të kombinuar me shirit letre mikroperforuar ose fibre xhami, duke parandaluar plasaritjet në nyjet e tavanit.',
        ],
      },
      {
        title: 'Si Funksionon Procesi i Punës me Torra Gips',
        steps: [
          {
            title: 'Matja me Lazer dhe Kontrolli Teknik',
            text: 'Ekipi ynë vjen falas në objektin tuaj, mat me saktësi sipërfaqet dhe kontrollon lartësitë, tubacionet e kondicionimit dhe pikën e instalimeve elektrike.',
          },
          {
            title: 'Preventivi i Detajuar brenda 48 Orësh',
            text: 'Përgatisim ofertën e qartë me listën e materialeve Knauf/Rigips dhe afatin e saktë të përfundimit, pa kosto të fshehura.',
          },
          {
            title: 'Montimi dhe Koordinimi në Kantier',
            text: 'Punojmë në koordinim të plotë me elektricistin dhe hidraulikun tuaj, duke lënë hapjet ekzakte për spote, shirita LED, grila ajrimi dhe kasa dyersh.',
          },
          {
            title: 'Kontrolli Final dhe Dorëzimi i Pastër',
            text: 'Përpara dorëzimit verifikojmë çdo nivel dhe bashkim me dritë anësore dhe pastrojmë mbetjet e punës, duke e lënë objektin gati për fazën e [patinimit](/sq/patinim/) dhe [lyerjes](/sq/lyerje/).',
          },
        ],
      },
      {
        title: 'Zonat e Shërbimit',
        paragraphs: [
          'Operojmë me ekipe të dedikuara për [punime gipsi në Tiranë](/sq/punime-gipsi-tirane/) dhe [punime gipsi në Durrës](/sq/punime-gipsi-durres/), si dhe marrim përsipër projekte rezidenciale e komerciale në të gjithë Shqipërinë.',
        ],
      },
    ],
    faq: {
      title: 'Pyetje të Shpeshta për Punime Gipsi',
      items: [
        {
          question: 'Cilin material përdorni për punime gipsi, Knauf apo Rigips?',
          answer:
            'Punojmë me të dy sistemet e certifikuara, Knauf dhe Rigips. Zgjedhja bëhet sipas specifikimit të projektit tuaj ose preferencës së arkitektit, duke garantuar gjithmonë material origjinal me trashësi 12.5mm.',
        },
        {
          question: 'Pse çahen shpesh tavanet e gipsit dhe si e parandaloni këtë?',
          answer:
            'Çarjet ndodhin kur përdoren profile të holla (0.4mm), kur vidat vendosen në distanca të gabuara ose kur fugat mbushen pa shirit përforcues. Ne përdorim profile 0.6mm, montim të kryqëzuar dhe shirit letre me stukim elastik për të eliminuar çdo çarje.',
        },
        {
          question: 'Sa ditë zgjat montimi i gipsit në një apartament 2+1?',
          answer:
            'Për një apartament standard 2+1, montimi i plotë i tavaneve të varura, kutive të perdeve dhe mureve ndarëse përfundon mesatarisht brenda 4 deri në 7 ditë pune.',
        },
        {
          question: 'A realizoni punime gipsi edhe me materialin tuaj, edhe vetëm me krah pune?',
          answer:
            'Po. Mund të furnizojmë të gjithë paketën e materialeve direkt në objekt me çmime shumice, ose të kryejmë vetëm montimin profesional me materialet e siguruara nga ju.',
        },
        {
          question: 'Si mund të marr një preventiv për punime gipsi?',
          answer:
            'Telefononi direkt në [+355 68 858 0058](tel:+355688580058) ose dërgoni planimetrinë në WhatsApp. Për të parë faktorët që ndikojnë në ofertë, vizitoni faqen [punime gipsi çmimi](/sq/cmime/).',
        },
      ],
    },
  },

  en: {
    metaTitle: 'Gypsum Works - +355 68 858 0058 - Torra Gips',
    metaDescription:
      'Gypsum works with Knauf and Rigips materials for homes, offices and commercial buildings. Free measurement and quote. Call: +355 68 858 0058.',
    h1: 'Gypsum Works',
    answer:
      'Torra Gips delivers gypsum works with certified Knauf and Rigips materials, with on-site measurement and a free quote within 48 hours.',
    cta: {
      call: 'Call Now: +355 68 858 0058',
      whatsapp: 'Send Your Floor Plan on WhatsApp',
      whatsappMessage: 'Hello Torra Gips, I would like to send you my floor plan for gypsum works.',
    },
    sections: [
      {
        title: 'Types of Gypsum Works We Deliver',
        paragraphs: [
          'Our team builds complete drywall systems for apartments, private villas, offices, clinics, hotels and commercial buildings. Every project follows the technical installation standards, with no improvisation in the framing or the materials.',
        ],
        items: [
          {
            title: 'Suspended Gypsum Ceilings',
            text: 'We install flat, acoustic and reinforced suspended ceilings. We use 0.6mm galvanized metal profiles (UD and CD) and hangers securely fixed to the slab, eliminating the risk of sagging or cracking over time. For bathrooms, kitchens and high-humidity spaces we fit green moisture-resistant (H2) gypsum boards, while for offices and venues we install sound-absorbing acoustic panels.',
            image: `${IMG}/dhome-gjumi-tavan-gipsi-4.webp`,
            alt: 'Moisture-resistant suspended gypsum ceiling in a bathroom',
          },
          {
            title: 'Gypsum Works for Living Rooms and LED Lighting',
            text: 'The living room is where installation accuracy shows immediately. We build multi-level decorative ceilings, hidden LED strip channels, shadow gap profiles around the wall perimeter, concealed curtain pockets and gypsum TV walls. Every corner and joint is leveled with a 360-degree laser and reinforced with aluminium or metal-paper corner beads, so the grazing LED light reveals no defects.',
            image: '/images/gallery/tavan-gipsi-dekorativ-kaseta-1.jpeg',
            alt: 'Living room gypsum ceiling with hidden LED lighting',
          },
          {
            title: 'Gypsum Partition Walls with Acoustic and Thermal Insulation',
            text: 'We build gypsum partition walls that fully replace traditional brick masonry, with lower weight and far better insulation. The framing uses CW and UW profiles (50mm, 75mm or 100mm), acoustic sealing tape around the entire perimeter, high-density rock wool infill and double 12.5mm gypsum boards on both sides. This system delivers maximum quiet between bedrooms, offices and healthcare spaces.',
            image: '/images/gallery/tavan-gipsi-korridor-profil-led-1.jpeg',
            alt: 'Gypsum partition wall with rock wool insulation',
          },
          {
            title: 'Gypsum Wall Lining and Fire-Resistant Systems',
            text: 'For uneven concrete or brick walls, we apply metal-framed drywall lining with internal thermal insulation, creating perfectly straight surfaces ready for finishing. For commercial spaces, stairwells, technical rooms and chimneys we install red fire-resistant (DF) gypsum boards, certified to European safety standards.',
            image: '/images/gallery/panele-3d-mur-dekorativ-led-1.jpeg',
            alt: 'Gypsum wall lining in a commercial building',
          },
        ],
      },
      {
        title: 'Technical Specifications, Materials and Timelines',
        table: {
          head: ['Type of Work', 'Gypsum Board', 'Framing and Insulation', 'Average Timeline (2-Bedroom Apartment)'],
          rows: [
            ['Simple suspended ceiling', 'Knauf / Rigips 12.5mm (white)', 'UD/CD 0.6mm profiles + hangers', '3 - 4 working days'],
            ['Decorative ceiling with LED lighting', 'Knauf / Rigips 12.5mm', 'Double profiles + LED channel', '5 - 7 working days'],
            ['Bathroom and kitchen ceiling', 'Green moisture-resistant board (H2)', 'Anti-corrosion profiles', '1 - 2 working days'],
            ['Partition wall with acoustic insulation', 'Double 12.5mm board', 'CW/UW profiles + rock wool + acoustic tape', '4 - 6 working days'],
            ['Fire-resistant system', 'Red (DF) board 12.5mm / 15mm', 'Certified framing + rock wool', 'Per project'],
          ],
        },
        after: [
          'The quality of gypsum work depends not only on the board but on the jointing materials. For filling joints we use professional compound (Knauf Uniflott or Fugenfüller) combined with micro-perforated paper tape or fiberglass tape, preventing cracks at the ceiling joints.',
        ],
      },
      {
        title: 'How the Work Process with Torra Gips Works',
        steps: [
          {
            title: 'Laser Measurement and Technical Check',
            text: 'Our team visits your property for free, measures the surfaces precisely and checks ceiling heights, air-conditioning ducts and electrical points.',
          },
          {
            title: 'Detailed Quote within 48 Hours',
            text: 'We prepare a clear quote with the list of Knauf/Rigips materials and the exact completion timeline, with no hidden costs.',
          },
          {
            title: 'Installation and On-Site Coordination',
            text: 'We work in full coordination with your electrician and plumber, leaving exact openings for spotlights, LED strips, ventilation grilles and door frames.',
          },
          {
            title: 'Final Inspection and Clean Handover',
            text: 'Before handover we check every level and joint with grazing light and clear away all work debris, leaving the property ready for the [plastering](/en/wall-plastering/) and [painting](/en/painting/) phase.',
          },
        ],
      },
      {
        title: 'Service Areas',
        paragraphs: [
          'We operate dedicated teams for [gypsum works in Tirana](/en/gypsum-works-tirana/) and [gypsum works in Durrës](/en/gypsum-works-durres/), and we take on residential and commercial projects across Albania.',
        ],
      },
    ],
    faq: {
      title: 'Frequently Asked Questions About Gypsum Works',
      items: [
        {
          question: 'Which material do you use for gypsum works, Knauf or Rigips?',
          answer:
            "We work with both certified systems, Knauf and Rigips. The choice follows your project specification or your architect's preference, always with original 12.5mm material.",
        },
        {
          question: 'Why do gypsum ceilings often crack and how do you prevent it?',
          answer:
            'Cracks happen when thin profiles (0.4mm) are used, when screws are placed at the wrong spacing or when joints are filled without reinforcing tape. We use 0.6mm profiles, cross-braced installation and paper tape with elastic compound to eliminate cracking.',
        },
        {
          question: 'How many days does gypsum installation take in a 2-bedroom apartment?',
          answer:
            'For a standard 2-bedroom apartment, full installation of suspended ceilings, curtain pockets and partition walls is completed on average within 4 to 7 working days.',
        },
        {
          question: 'Do you do gypsum works with your own materials, or labor only?',
          answer:
            'Yes, both. We can supply the full material package directly to the site at wholesale prices, or carry out only the professional installation with materials you provide.',
        },
        {
          question: 'How can I get a quote for gypsum works?',
          answer:
            'Call us directly on [+355 68 858 0058](tel:+355688580058) or send your floor plan on WhatsApp. To see the factors that affect the quote, visit our [gypsum works prices](/en/pricing/) page.',
        },
      ],
    },
  },
};
