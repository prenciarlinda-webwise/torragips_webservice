'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { useQuoteModal } from '@/components/modals';
import { CloseIcon } from '@/components/ui/Icons';
import LanguageSwitcher from './LanguageSwitcher';

interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const locale = useLocale();
  const { open: openQuote } = useQuoteModal();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-plaster-50 transition-opacity duration-200 lg:hidden',
        isOpen ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
      )}
      aria-hidden={!isOpen}
    >
      <div className="container-custom flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
        <span className="wide text-lg font-semibold text-ink-900">Menu</span>
        <button onClick={onClose} className="-mr-2 p-2 text-ink-900" aria-label="Close menu">
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="container-custom flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line py-5">
              <Link href={item.href} onClick={onClose} className="wide block text-2xl font-semibold tracking-tight text-ink-900">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-4 space-y-3">
                  {item.children.map((child) => (
                    <li key={child.href} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <Link href={child.href} onClick={onClose} className="text-lg text-ink-600">
                        {child.label}
                      </Link>
                      {child.children?.map((loc) => (
                        <Link key={loc.href} href={loc.href} onClick={onClose} className="text-sm text-ink-400">
                          {loc.label}
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-custom flex shrink-0 items-center justify-between gap-6 border-t border-line py-5">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={() => {
            onClose();
            openQuote();
          }}
          className="btn-ink flex-1"
        >
          {locale === 'sq' ? 'Merr Ofertë' : 'Get Quote'}
        </button>
      </div>
    </div>
  );
}
