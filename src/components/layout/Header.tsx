'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { useQuoteModal } from '@/components/modals';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openQuote } = useQuoteModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    {
      href: locale === 'sq' ? '/sherbime' : '/services',
      label: t('services'),
      children: [
        {
          href: '/',
          label: t('servicesItems.gypsum'),
          children: [
            { href: locale === 'sq' ? '/punime-gipsi-tirane' : '/gypsum-works-tirana', label: locale === 'sq' ? 'Tiranë' : 'Tirana' },
            { href: locale === 'sq' ? '/punime-gipsi-durres' : '/gypsum-works-durres', label: 'Durrës' },
          ],
        },
        {
          href: locale === 'sq' ? '/patinim' : '/wall-plastering',
          label: t('servicesItems.plastering'),
        },
        {
          href: locale === 'sq' ? '/lyerje' : '/painting',
          label: t('servicesItems.painting'),
        },
      ],
    },
    { href: locale === 'sq' ? '/rreth-nesh' : '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: locale === 'sq' ? '/kontakt' : '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b bg-plaster-50 transition-shadow duration-200',
        isScrolled ? 'border-line shadow-[0_1px_12px_rgba(17,21,18,0.06)]' : 'border-line'
      )}
    >
      <div className="container-custom">
        <nav className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.webp"
              alt="Torra Gips"
              width={120}
              height={120}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-stretch gap-8 self-stretch lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <div key={item.href} className="group relative flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex h-full items-center gap-1.5 text-[0.9375rem] font-medium transition-colors',
                      active ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path d="M2 4.5l4 4 4-4" />
                      </svg>
                    )}
                    <span
                      className={cn(
                        'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-tint transition-transform duration-200',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full -ml-6 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="min-w-[17rem] border border-t-0 border-line bg-plaster-50">
                        {item.children.map((child) => (
                          <div key={child.href} className="border-t border-line px-6 py-4 first:border-t-0">
                            <Link href={child.href} className="block font-semibold text-ink-900 hover:text-tint">
                              {child.label}
                            </Link>
                            {child.children && (
                              <div className="mt-1.5 flex gap-1">
                                {child.children.map((loc, i) => (
                                  <span key={loc.href} className="flex items-center">
                                    <Link href={loc.href} className="text-sm text-ink-500 hover:text-tint">
                                      {loc.label}
                                    </Link>
                                    {i < (child.children?.length ?? 0) - 1 && (
                                      <span className="mx-1.5 text-sm text-ink-300">·</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            <LanguageSwitcher />

            <button type="button" onClick={openQuote} className="btn-ink hidden lg:inline-flex">
              {locale === 'sq' ? 'Merr Ofertë' : 'Get Quote'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="-mr-2 p-2 text-ink-900 lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d="M3 8h18M3 16h18" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
