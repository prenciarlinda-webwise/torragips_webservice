'use client';

import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';
import { QuoteButton } from '@/components/modals';
import { FAQSchema, LocalBusinessSchema } from '@/components/seo';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import VideoShowcase from './VideoShowcase';

type ServiceFeature = {
  title: string;
  description: string;
  icon: 'ceiling' | 'partition' | 'decoration' | 'insulation';
  features: string[];
};

type FAQItem = {
  question: string;
  answer: string;
};

type CommercialCategory = {
  icon: 'airport' | 'hotel' | 'office' | 'shopping';
  title: string;
};

type ContentSection = {
  title: string;
  content: string;
  listItems?: string[];
};

type RelatedLink = {
  href: string;
  label: string;
};

type SectionTitles = {
  whatWeOffer?: string;
  commercialExperience?: string;
  whyChooseUs?: string;
  howWeWork?: string;
  serviceAreas?: string;
  faq?: string;
  readyToStart?: string;
};

type ServicePageProps = {
  locale: string;
  serviceName: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceFeatures: ServiceFeature[];
  commercialCategories: CommercialCategory[];
  benefits: { title: string; description: string }[];
  processSteps: { step: string; title: string; description: string }[];
  faqItems: FAQItem[];
  introContent?: string[];
  contentSections?: ContentSection[];
  sectionTitles?: SectionTitles;
  relatedLinks?: RelatedLink[];
  videos?: 'gips' | 'lyerje';
};

const icons = {
  ceiling: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  partition: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
    </svg>
  ),
  decoration: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  insulation: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const commercialIcons = {
  airport: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  hotel: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  office: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  shopping: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
};

export default function ServicePageTemplate({
  locale,
  serviceName,
  heroImage,
  heroTitle,
  heroSubtitle,
  serviceFeatures,
  commercialCategories,
  benefits,
  processSteps,
  faqItems,
  introContent,
  contentSections,
  sectionTitles,
  relatedLinks,
  videos,
}: ServicePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isAlbanian = locale === 'sq';

  return (
    <>
      <LocalBusinessSchema locale={locale} />

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center pt-[4.5rem]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={serviceName}
            fill
            className="object-cover"
            priority
          />
          {/* Strong overlay to hide image quality issues */}
          <div className="absolute inset-0 bg-plaster-50/85" />
        </div>

        <div className="container-custom relative z-10 py-24 lg:py-32">
          <div>
            {/* Text Content */}
            <div className="max-w-3xl">
              <h1 className="display mb-7">
                {heroTitle}
              </h1>
              <p className="lead mb-9 max-w-2xl">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+355688580058">
                  <Button size="lg" variant="secondary">
                    +355 68 858 0058
                  </Button>
                </a>
                <a href="https://wa.me/355688580058" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.whatWeOffer || (isAlbanian ? 'Çfarë Ofrojmë' : 'What We Offer')}
            </h2>
          </div>
          <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {serviceFeatures.map((service, index) => (
              <div
                key={index}
                className="border-t border-line py-7"
              >
                <h3 className="h3 mb-2">{service.title}</h3>
                <p className="mb-5 text-[0.9375rem] leading-relaxed text-ink-600">{service.description}</p>
                <ul className="border-t border-line">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="border-b border-line py-2.5 text-sm text-ink-800">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Sections - MOVED UP */}
      {contentSections && contentSections.length > 0 && (
        <section className="section-padding bg-plaster-100">
          <div className="container-custom">
            {introContent && introContent.length > 0 && (
              <div className="mb-16 max-w-3xl">
                <div className="prose prose-lg max-w-none">
                  {introContent.map((paragraph, index) => (
                    <p key={index} className="copy mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-12">
              {contentSections.map((section, index) => (
                <div key={index} className="grid gap-x-12 gap-y-4 border-t border-line pt-8 lg:grid-cols-12">
                  <h2 className="text-2xl font-semibold text-ink-900 md:text-3xl lg:col-span-4">{section.title}</h2>
                  <div className="lg:col-span-8">
                  <p className="copy mb-6">{section.content}</p>
                  {section.listItems && section.listItems.length > 0 && (
                    <div>
                      <ul className="grid gap-x-8 border-t border-line md:grid-cols-2">
                        {section.listItems.map((item, i) => (
                          <li key={i} className="border-b border-line py-3">
                            <span className="text-ink-800">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Experience Section */}
      <section className="section-padding on-dark bg-plaster-50 text-ink-800">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.commercialExperience || (isAlbanian ? 'Përvojë në Projekte Komerciale' : 'Commercial Project Experience')}
            </h2>
            <p className="lead max-w-2xl">
              {isAlbanian
                ? 'Kemi përvojë të gjerë në projekte komerciale të çdo lloji dhe shkalle.'
                : 'We have extensive experience in commercial projects of all types and scales.'}
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-ink-900 md:grid-cols-4">
            {commercialCategories.map((category, index) => (
              <div
                key={index}
                className="border-b border-line py-7 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
              >
                <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.whyChooseUs || (isAlbanian ? 'Pse të Na Zgjidhni' : 'Why Choose Us')}
            </h2>
          </div>
          <div className="numbered grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="border-t border-line py-7">
                <span className="num mb-4" aria-hidden="true" />
                <div>
                  <h3 className="h3 mb-2">{benefit.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-plaster-100">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.howWeWork || (isAlbanian ? 'Si Punojmë' : 'How We Work')}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 md:grid-cols-5">
            {processSteps.map((item, index) => (
              <div key={index} className="border-t border-ink-900 py-6">
                <div className="wide mb-4 text-4xl font-semibold leading-none tracking-tight text-tint">
                  {item.step}
                </div>
                <h3 className="mb-1 text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas with Maps - MOVED DOWN */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.serviceAreas || (isAlbanian ? 'Zonat e Shërbimit' : 'Service Areas')}
            </h2>
            <p className="lead max-w-2xl">
              {isAlbanian
                ? 'Ofrojmë shërbime në Tiranë, Durrës dhe zonat përreth.'
                : 'We offer services in Tirana, Durrës and surrounding areas.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="h3 mb-4">
                Tiranë
              </h3>
              <div className="border border-line">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95765.98846961377!2d19.74884565!3d41.3275459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sTirana%2C%20Albania!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tirana"
                />
              </div>
              <p className="mt-3 text-sm text-ink-500">Tiranë, Kashar, Kamëz, Farkë, Vaqarr</p>
            </div>

            <div>
              <h3 className="h3 mb-4">
                Durrës
              </h3>
              <div className="border border-line">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47832.14076418837!2d19.4147244!3d41.3234893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031a5c0eb2dc7%3A0x55e9f75c1e9e3359!2sDurr%C3%ABs%2C%20Albania!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Durrës"
                />
              </div>
              <p className="mt-3 text-sm text-ink-500">Durrës, Shkozet, Plazh, Golem, Kavajë</p>
            </div>
          </div>

          {/* Inline CTA */}
          <div className="on-dark bg-plaster-50 text-ink-800 p-8 md:p-12">
            <h3 className="h2 mb-4">
              {isAlbanian ? 'Kërkoni një Ofertë Falas' : 'Request a Free Quote'}
            </h3>
            <p className="lead mb-8 max-w-xl">
              {isAlbanian
                ? 'Për një vlerësim të saktë, sillni matjet dhe planin arkitekturor nëse disponohet.'
                : 'For an accurate estimate, bring measurements and architectural plan if available.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+355688580058">
                <Button size="lg" variant="secondary">
                  +355 68 858 0058
                </Button>
              </a>
              <a href="https://wa.me/355688580058" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  WhatsApp
                </Button>
              </a>
              <a href="mailto:torragips@gmail.com">
                <Button size="lg" variant="outline">
                  Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {videos && <VideoShowcase locale={locale} category={videos} />}

      {/* FAQ Schema for SEO */}
      <FAQSchema items={faqItems} />

      {/* FAQ Section */}
      <section className="section-padding bg-plaster-100">
        <div className="container-custom">
          <div className="mb-10 border-t border-ink-900 pt-8 md:mb-14 md:pt-10">
            <h2 className="h2 mb-4">
              {sectionTitles?.faq || (isAlbanian ? 'Pyetje të Shpeshta' : 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="max-w-4xl">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-line"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="h3 pr-6">{item.question}</span>
                  <svg
                    className={cn(
                      'h-5 w-5 flex-shrink-0 text-ink-900 transition-transform duration-300',
                      openFaqIndex === index && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <p className="copy max-w-3xl pb-6">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="border-t border-ink-900 pt-8 md:pt-10">
              <h2 className="h2 mb-8">
                {isAlbanian ? 'Shërbime të Lidhura' : 'Related Services'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="btn-line"
                  >
                    {link.label}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-padding on-dark bg-plaster-50 text-ink-800">
        <div className="container-custom">
          <h2 className="h2 mb-4">
            {sectionTitles?.readyToStart || (isAlbanian ? 'Gati për të Filluar?' : 'Ready to Start?')}
          </h2>
          <p className="lead mb-8 max-w-xl">
            {isAlbanian
              ? 'Na kontaktoni për një konsultë falas. Ekipi ynë është i gatshëm t\'ju ndihmojë.'
              : 'Contact us for a free consultation. Our team is ready to help you.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+355688580058">
              <Button size="lg" variant="secondary">
                +355 68 858 0058
              </Button>
            </a>
            <QuoteButton size="lg" variant="outline">
              {isAlbanian ? 'Dërgo Mesazh' : 'Send Message'}
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}
