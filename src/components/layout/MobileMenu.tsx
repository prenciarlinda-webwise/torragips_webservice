'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 transform transition-transform lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg text-primary">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg font-medium text-text hover:text-accent hover:bg-accent/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg text-text-light hover:text-accent hover:bg-accent/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <Link
              href={locale === 'sq' ? '/kontakt' : '/contact'}
              onClick={onClose}
              className="block w-full btn-primary text-center"
            >
              {locale === 'sq' ? 'Merr Ofertë' : 'Get Quote'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
