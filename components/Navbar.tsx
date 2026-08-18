'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import ThemeToggle from './ThemeToggle';

const localeNames: Record<string, string> = {
  en: 'EN',
  vi: 'VI',
  ja: 'JA',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/industries`, label: t('industries') },
    { href: `/${locale}/team`, label: t('team') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setLangOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 xl:gap-3 shrink-0">
            <Image src="/logo-white.png" alt="SOLEON" width={44} height={44} className="object-contain" />
            <div>
              <span className="text-xl font-bold tracking-widest" style={{
                background: 'linear-gradient(135deg, #C38818, #F0C84A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                SOLEON
              </span>
              <p className="text-[9px] text-gray-500 tracking-widest uppercase hidden sm:block">{t('subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex flex-1 items-center justify-center px-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-lg group ${
                    active
                      ? 'text-[#C38818]'
                      : 'text-gray-300 hover:text-[#C38818]'
                  }`}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  <span
                    className={`absolute bottom-0 left-1.5 right-1.5 h-px rounded-full transition-all duration-300 ${
                      active
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-40'
                    }`}
                    style={{ background: 'linear-gradient(90deg, transparent, #C38818, transparent)' }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                aria-expanded={langOpen}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#C38818] transition-colors px-3 py-1.5 rounded border border-[#C38818]/30 hover:border-[#C38818]/60"
              >
                {localeNames[locale]}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-[#161616] border border-[#C38818]/20 rounded-lg shadow-xl overflow-hidden">
                  {['en', 'vi', 'ja'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        locale === loc
                          ? 'text-[#C38818] bg-[#C38818]/10'
                          : 'text-gray-300 hover:text-[#C38818] hover:bg-[#C38818]/5'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button — only at xl to save space at lg */}
            <Link
              href={`/${locale}/contact`}
              className="hidden xl:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)',
                color: 'white',
              }}
            >
              {t('bookConsultation')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="xl:hidden p-2 text-gray-300 hover:text-[#C38818]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="relative z-10 xl:hidden bg-[#0D0D0D]/98 backdrop-blur-md border-t border-[#C38818]/20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-[#C38818] bg-[#C38818]/10 border-l-2 border-[#C38818]'
                    : 'text-gray-300 hover:text-[#C38818] hover:bg-[#C38818]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center px-4 py-3 text-sm font-semibold rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)',
                color: 'white',
              }}
            >
              {t('bookConsultation')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
