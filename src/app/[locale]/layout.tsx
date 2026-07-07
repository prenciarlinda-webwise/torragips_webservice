import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/features/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    sq: 'Punime Gipsi, Patinim & Lyerje në Tiranë dhe Durrës - Torra Gips',
    en: 'Gypsum Works, Plastering & Painting in Tirana and Durrës - Torra Gips',
  };

  const descriptions = {
    sq: 'Torra Gips ofron shërbime profesionale të punimeve të gipsit, patinimit dhe lyerjes në Tiranë dhe Durrës. Cilësi e lartë dhe ekip profesional.',
    en: 'Torra Gips offers professional gypsum works, plastering and painting services in Tirana and Durrës. High quality and professional team.',
  };

  return {
    title: {
      default: titles[locale as keyof typeof titles] || titles.sq,
      // Pages set their own full title (brand already included), so pass it
      // through unchanged. A `%s - Brand` template here double-printed the brand
      // (e.g. "… - Torra Gips - Torra Gips").
      template: '%s',
    },
    description: descriptions[locale as keyof typeof descriptions] || descriptions.sq,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      type: 'website',
      locale: locale === 'sq' ? 'sq_AL' : 'en_US',
      url: SITE_CONFIG.url,
      siteName: COMPANY.name,
      title: titles[locale as keyof typeof titles] || titles.sq,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.sq,
      images: [{ url: '/images/og-default.webp', width: 1200, height: 630, alt: COMPANY.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.sq,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.sq,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T37M76GZ');`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T37M76GZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
