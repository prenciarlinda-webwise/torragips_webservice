import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const t = useTranslations('breadcrumbs');

  const allItems = [{ label: t('home'), href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-2 text-sm">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-neutral-400 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="text-text-light hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
