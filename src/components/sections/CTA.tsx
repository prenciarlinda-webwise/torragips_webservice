import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';

export default function CTA() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-dark-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t('subtitle')}
          </p>
          <Link href={locale === 'sq' ? '/kontakt' : '/contact'}>
            <Button size="lg" className="!bg-accent !text-white hover:!bg-accent-700">
              {t('button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
