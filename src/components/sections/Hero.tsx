import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-primary-50" />

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-text-light mb-8 max-w-xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={locale === 'sq' ? '/kontakt' : '/contact'}>
                <Button size="lg" variant="primary" className="bg-accent hover:bg-accent-700 text-white">
                  {t('cta')}
                </Button>
              </Link>
              <Link href={locale === 'sq' ? '/sherbime' : '/services'}>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  {locale === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-text-light">
                  {locale === 'sq' ? 'Projekte' : 'Projects'}
                </div>
              </div>
              <div className="w-px h-12 bg-neutral-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-text-light">
                  {locale === 'sq' ? 'Vite Eksperiencë' : 'Years Experience'}
                </div>
              </div>
              <div className="w-px h-12 bg-neutral-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-text-light">
                  {locale === 'sq' ? 'Kënaqësi' : 'Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Service highlights */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Service Cards */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-dark-800 font-semibold mb-1">
                  {locale === 'sq' ? 'Punime Gipsi' : 'Gypsum Works'}
                </h3>
                <p className="text-text-light text-sm">
                  {locale === 'sq' ? 'Tavane, ndarja, dekorime' : 'Ceilings, partitions, decorations'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-soft hover:shadow-medium transition-shadow mt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-dark-800 font-semibold mb-1">
                  {locale === 'sq' ? 'Patinim' : 'Plastering'}
                </h3>
                <p className="text-text-light text-sm">
                  {locale === 'sq' ? 'Suva, patinim muri' : 'Plaster, wall finishing'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-dark-800 font-semibold mb-1">
                  {locale === 'sq' ? 'Lyerje' : 'Painting'}
                </h3>
                <p className="text-text-light text-sm">
                  {locale === 'sq' ? 'Bojë, efekte dekorative' : 'Paint, decorative effects'}
                </p>
              </div>

              <div className="bg-accent rounded-2xl p-6 shadow-medium mt-8">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">
                  {locale === 'sq' ? 'Cilësi e Garantuar' : 'Quality Guaranteed'}
                </h3>
                <p className="text-white/80 text-sm">
                  {locale === 'sq' ? 'Materiale premium Knauf & Rigips' : 'Premium Knauf & Rigips materials'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
