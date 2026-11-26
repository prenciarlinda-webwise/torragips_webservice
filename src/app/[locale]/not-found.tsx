import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ArrowIcon } from '@/components/ui/Icons';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="pt-[4.5rem]">
      <div className="container-custom grid min-h-[70vh] items-end gap-x-14 gap-y-8 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div
            className="wide font-semibold leading-none tracking-tighter text-tint"
            style={{ fontSize: 'clamp(6rem, 22vw, 18rem)' }}
          >
            404
          </div>
        </div>
        <div className="border-t border-ink-900 pt-8 lg:col-span-5">
          <h1 className="h2 mb-4">{t('title')}</h1>
          <p className="lead mb-9">{t('description')}</p>
          <Link href="/" className="btn-ink btn-lg">
            {t('backHome')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
