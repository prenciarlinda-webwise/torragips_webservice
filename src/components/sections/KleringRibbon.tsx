import { useLocale, useTranslations } from 'next-intl';
import { QuoteButton } from '@/components/modals';
import { ArrowIcon } from '@/components/ui/Icons';

// Call-to-action ribbon: part payment by klering (barter) is accepted.
export default function KleringRibbon() {
  const locale = useLocale();
  const t = useTranslations('common');
  const sq = locale === 'sq';

  return (
    <section className="on-dark bg-plaster-50">
      <div className="container-custom flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
        <p className="text-2xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-3xl">
          {sq ? 'Nuk Mbuloni Dot 100% të Shumës?' : "Can't Cover 100% of the Amount?"}{' '}
          <span className="text-tint">{sq ? 'Punojmë me % Kleringu.' : 'We Work with % Klering.'}</span>
        </p>
        <QuoteButton size="lg" className="shrink-0">
          {t('getQuote')}
          <ArrowIcon />
        </QuoteButton>
      </div>
    </section>
  );
}
