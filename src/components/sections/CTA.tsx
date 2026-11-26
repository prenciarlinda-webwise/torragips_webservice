import { useTranslations } from 'next-intl';
import { QuoteButton } from '@/components/modals';
import { ArrowIcon } from '@/components/ui/Icons';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="bg-cta py-16 md:py-20">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="h2 text-cta-ink">{t('title')}</h2>
        <p className="lead mb-8 mt-4 text-cta-ink/80">{t('subtitle')}</p>
        <QuoteButton size="lg" className="!bg-ink-900 !text-white hover:!bg-sage-700">
          {t('button')}
          <ArrowIcon />
        </QuoteButton>
      </div>
    </section>
  );
}
