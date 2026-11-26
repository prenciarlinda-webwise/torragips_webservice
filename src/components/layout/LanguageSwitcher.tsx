'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
  // Kept for callers that still pass it; the header is always on a light surface now.
  isScrolled?: boolean;
};

const LOCALES = [
  { code: 'sq', label: 'SQ', name: 'Albanian' },
  { code: 'en', label: 'EN', name: 'English' },
];

export default function LanguageSwitcher(_props: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => router.replace(pathname, { locale: l.code })}
          aria-label={l.name}
          aria-current={locale === l.code ? 'true' : undefined}
          className={cn(
            'border-b-2 pb-0.5 transition-colors',
            locale === l.code ? 'border-tint text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-900'
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
