import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  HomeGypsumContent,
  ServicesOverview,
  FeaturedProjects,
  WhyChooseUs,
  Testimonials,
  ServiceAreas,
  FAQ,
  CTA,
  VideoShowcase,
} from '@/components/sections';
import StickyMobileCTA from '@/components/features/StickyMobileCTA';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

// Home targets exactly one keyword: "punime gipsi" (EN: "gypsum works").
// No city names or secondary services in Title/H1: cities are owned by
// /punime-gipsi-tirane/ and /punime-gipsi-durres/.
const meta = {
  sq: {
    title: 'Punime Gipsi - +355 68 858 0058 - Torra Gips',
    description:
      'Punime gipsi me materiale Knauf dhe Rigips për shtëpi, zyra dhe objekte komerciale. Matje dhe preventiv falas. Telefononi: +355 68 858 0058.',
  },
  en: {
    title: 'Gypsum Works - +355 68 858 0058 - Torra Gips',
    description:
      'Gypsum works with Knauf and Rigips materials for homes, offices and commercial buildings. Free measurement and quote. Call: +355 68 858 0058.',
  },
};

const faqItems = {
  sq: {
    title: 'Pyetje të Shpeshta për Punime Gipsi',
    items: [
      {
        question: 'Si llogaritet kostoja për punime gipsi?',
        answer:
          'Kostoja përcaktohet pas matjes falas në objekt, në varësi të sipërfaqes, llojit të pllakave Knauf/Rigips, izolimit dhe dizajnit të tavanit.',
      },
      {
        question: 'Cilin material përdorni për punime gipsi?',
        answer:
          'Përdorim sisteme të certifikuara Knauf dhe Rigips (pllaka standarde, kundër lagështirës dhe kundër zjarrit).',
      },
      {
        question: 'Sa ditë zgjat montimi i gipsit në një apartament 2+1?',
        answer: 'Montimi i plotë i tavaneve dhe mureve ndarëse përfundon brenda 4 deri në 7 ditë pune.',
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions About Gypsum Works',
    items: [
      {
        question: 'How is the cost of gypsum works calculated?',
        answer:
          'The cost is set after a free on-site measurement, depending on the area, the type of Knauf/Rigips boards, the insulation and the ceiling design.',
      },
      {
        question: 'What materials do you use for gypsum works?',
        answer:
          'We use certified Knauf and Rigips systems (standard, moisture-resistant and fire-resistant boards).',
      },
      {
        question: 'How many days does gypsum installation take in a 2-bedroom apartment?',
        answer: 'Full installation of ceilings and partition walls is completed within 4 to 7 working days.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = locale === 'sq' ? meta.sq : meta.en;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        sq: '/sq/',
        en: '/en/',
        'x-default': '/en/',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      images: [{ url: '/images/og-default.webp', width: 1200, height: 630, alt: 'Torra Gips' }],
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faq = locale === 'sq' ? faqItems.sq : faqItems.en;

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema locale={locale} />

      <Hero />
      <HomeGypsumContent locale={locale} />
      <FeaturedProjects />
      <WhyChooseUs />
      <VideoShowcase locale={locale} limit={6} />
      <Testimonials />
      <ServicesOverview />
      <ServiceAreas />
      <FAQ items={faq.items} title={faq.title} />
      <CTA />
      <StickyMobileCTA />
    </>
  );
}
