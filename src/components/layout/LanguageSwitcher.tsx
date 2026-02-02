'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
  isScrolled?: boolean;
};

export default function LanguageSwitcher({ isScrolled = true }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn(
      'flex items-center rounded-lg p-1',
      isScrolled ? 'bg-neutral-100' : 'bg-white/10'
    )}>
      <button
        onClick={() => switchLocale('sq')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
          locale === 'sq'
            ? isScrolled
              ? 'bg-white text-primary shadow-sm'
              : 'bg-white text-dark-800 shadow-sm'
            : isScrolled
              ? 'text-text-light hover:text-text'
              : 'text-white/70 hover:text-white'
        )}
        aria-label="Albanian"
      >
        SQ
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
          locale === 'en'
            ? isScrolled
              ? 'bg-white text-primary shadow-sm'
              : 'bg-white text-dark-800 shadow-sm'
            : isScrolled
              ? 'text-text-light hover:text-text'
              : 'text-white/70 hover:text-white'
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
