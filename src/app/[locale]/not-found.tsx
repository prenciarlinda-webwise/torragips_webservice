import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-20">
      <div className="container-custom text-center">
        <div className="max-w-md mx-auto">
          <div className="text-8xl font-bold text-accent mb-4">404</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {t('title')}
          </h1>
          <p className="text-text-light mb-8">
            {t('description')}
          </p>
          <Link href="/">
            <Button variant="primary">
              {t('backHome')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
