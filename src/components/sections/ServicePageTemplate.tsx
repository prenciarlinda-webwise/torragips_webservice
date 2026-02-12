'use client';

import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';
import { FAQSchema } from '@/components/seo';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
}: ServicePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isAlbanian = locale === 'sq';

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={serviceName}
            fill
            className="object-cover"
            priority
          />
          {/* Strong overlay to hide image quality issues */}
          <div className="absolute inset-0 bg-dark-900/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-transparent to-dark-900/50" />
        </div>

        <div className="container-custom relative z-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+355688580058">
                  <Button size="lg" className="!bg-accent !text-white hover:!bg-accent-700">
                    +355 68 858 0058
                  </Button>
                </a>
                <a href="https://wa.me/355688580058" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="!bg-green-600 hover:!bg-green-700 !text-white">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="hidden lg:flex justify-end">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-accent mb-2">100+</div>
                  <div className="text-white/70 text-sm">{isAlbanian ? 'Projekte' : 'Projects'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-accent mb-2">5+</div>
                  <div className="text-white/70 text-sm">{isAlbanian ? 'Vite' : 'Years'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-accent mb-2">100%</div>
                  <div className="text-white/70 text-sm">{isAlbanian ? 'Kënaqësi' : 'Satisfaction'}</div>
                </div>
                <div className="bg-accent/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-accent/30">
                  <div className="text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/70 text-sm">{isAlbanian ? 'Mbështetje' : 'Support'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {sectionTitles?.whatWeOffer || (isAlbanian ? 'Çfarë Ofrojmë' : 'What We Offer')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {icons[service.icon]}
                </div>
                <h3 className="text-lg font-bold text-dark-800 mb-2">{service.title}</h3>
                <p className="text-text-light text-sm mb-4">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center text-xs text-text">
                      <span className="w-1 h-1 bg-accent rounded-full mr-2" />
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
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            {introContent && introContent.length > 0 && (
              <div className="max-w-4xl mx-auto mb-16">
                <div className="prose prose-lg max-w-none">
                  {introContent.map((paragraph, index) => (
                    <p key={index} className="text-text-light leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-12">
              {contentSections.map((section, index) => (
                <div key={index} className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-dark-800 mb-4">{section.title}</h2>
                  <p className="text-text-light leading-relaxed mb-6">{section.content}</p>
                  {section.listItems && section.listItems.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-neutral-200">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {section.listItems.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Experience Section */}
      <section className="py-16 bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {sectionTitles?.commercialExperience || (isAlbanian ? 'Përvojë në Projekte Komerciale' : 'Commercial Project Experience')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {isAlbanian
                ? 'Kemi përvojë të gjerë në projekte komerciale të çdo lloji dhe shkalle.'
                : 'We have extensive experience in commercial projects of all types and scales.'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {commercialCategories.map((category, index) => (
              <div
                key={index}
                className="p-6 bg-dark-800 rounded-xl text-center hover:bg-dark-700 transition-colors"
              >
                <div className="w-14 h-14 mx-auto bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-3">
                  {commercialIcons[category.icon]}
                </div>
                <h3 className="text-white font-semibold">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {sectionTitles?.whyChooseUs || (isAlbanian ? 'Pse të Na Zgjidhni' : 'Why Choose Us')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-dark-800 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-text-light">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {sectionTitles?.howWeWork || (isAlbanian ? 'Si Punojmë' : 'How We Work')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-dark-800 mb-1">{item.title}</h3>
                <p className="text-sm text-text-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas with Maps - MOVED DOWN */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {sectionTitles?.serviceAreas || (isAlbanian ? 'Zonat e Shërbimit' : 'Service Areas')}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              {isAlbanian
                ? 'Ofrojmë shërbime në Tiranë, Durrës dhe zonat përreth.'
                : 'We offer services in Tirana, Durrës and surrounding areas.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-dark-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tiranë
              </h3>
              <div className="rounded-xl overflow-hidden border border-neutral-200">
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
              <p className="text-sm text-text-light mt-2">Tiranë, Kashar, Kamëz, Farkë, Vaqarr</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-dark-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Durrës
              </h3>
              <div className="rounded-xl overflow-hidden border border-neutral-200">
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
              <p className="text-sm text-text-light mt-2">Durrës, Shkozet, Plazh, Golem, Kavajë</p>
            </div>
          </div>

          {/* Inline CTA */}
          <div className="bg-gradient-to-r from-primary to-primary-700 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isAlbanian ? 'Kërkoni një Ofertë Falas' : 'Request a Free Quote'}
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              {isAlbanian
                ? 'Për një vlerësim të saktë, sillni matjet dhe planin arkitekturor nëse disponohet.'
                : 'For an accurate estimate, bring measurements and architectural plan if available.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+355688580058">
                <Button size="lg" className="!bg-white !text-primary hover:!bg-neutral-100">
                  +355 68 858 0058
                </Button>
              </a>
              <a href="https://wa.me/355688580058" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="!bg-green-600 hover:!bg-green-700 !text-white">
                  WhatsApp
                </Button>
              </a>
              <a href="mailto:torragips@gmail.com">
                <Button size="lg" className="!bg-dark-800 hover:!bg-dark-700 !text-white">
                  Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <FAQSchema items={faqItems} />

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              {sectionTitles?.faq || (isAlbanian ? 'Pyetje të Shpeshta' : 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-dark-800 pr-4">{item.question}</span>
                  <svg
                    className={cn(
                      'w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300',
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
                  <p className="px-6 pb-4 text-text-light">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-dark-800 mb-8">
                {isAlbanian ? 'Shërbime të Lidhura' : 'Related Services'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    {link.label}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-16 bg-dark-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {sectionTitles?.readyToStart || (isAlbanian ? 'Gati për të Filluar?' : 'Ready to Start?')}
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAlbanian
              ? 'Na kontaktoni për një konsultë falas. Ekipi ynë është i gatshëm t\'ju ndihmojë.'
              : 'Contact us for a free consultation. Our team is ready to help you.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+355688580058">
              <Button size="lg" className="!bg-accent !text-white hover:!bg-accent-700">
                +355 68 858 0058
              </Button>
            </a>
            <Link href={isAlbanian ? '/kontakt' : '/contact'}>
              <Button size="lg" className="!bg-white !text-dark-800 hover:!bg-neutral-100">
                {isAlbanian ? 'Dërgo Mesazh' : 'Send Message'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
