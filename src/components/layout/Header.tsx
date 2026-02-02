'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pages with dark hero backgrounds (service pages, EN contact, EN about)
  const hasDarkHero = pathname.includes('/punime-gipsi') ||
                      pathname.includes('/gypsum-works') ||
                      pathname.includes('/patinim') ||
                      pathname.includes('/wall-plastering') ||
                      pathname.includes('/lyerje') ||
                      pathname.includes('/painting') ||
                      pathname.includes('/contact') ||
                      pathname.includes('/about');

  // Use dark text on light backgrounds (homepage, etc.) when not scrolled
  const useDarkText = !hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    {
      href: locale === 'sq' ? '/sherbime' : '/services',
      label: t('services'),
      children: [
        {
          href: locale === 'sq' ? '/punime-gipsi' : '/gypsum-works',
          label: t('servicesItems.gypsum')
        },
        {
          href: locale === 'sq' ? '/patinim' : '/wall-plastering',
          label: t('servicesItems.plastering')
        },
        {
          href: locale === 'sq' ? '/lyerje' : '/painting',
          label: t('servicesItems.painting')
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="Torra Gips"
              width={120}
              height={120}
              className={cn(
                'h-14 w-auto transition-all',
                !isScrolled && !useDarkText && 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    pathname === item.href
                      ? isScrolled || useDarkText
                        ? 'text-primary bg-primary/10'
                        : 'text-white bg-white/20'
                      : isScrolled || useDarkText
                        ? 'text-dark-800 hover:text-primary hover:bg-primary/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className="inline-block ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-medium py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-dark-800 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher isScrolled={isScrolled || useDarkText} />

            {/* CTA Button - Desktop */}
            <Link
              href={locale === 'sq' ? '/kontakt' : '/contact'}
              className={cn(
                'hidden lg:inline-flex px-5 py-2.5 rounded-lg font-semibold transition-colors',
                isScrolled || useDarkText
                  ? 'bg-primary text-white hover:bg-primary-700'
                  : 'bg-accent text-white hover:bg-accent-700'
              )}
            >
              {locale === 'sq' ? 'Merr Ofertë' : 'Get Quote'}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled || useDarkText ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
              )}
              aria-label="Open menu"
            >
              <svg
                className={cn('w-6 h-6', isScrolled || useDarkText ? 'text-dark-800' : 'text-white')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
