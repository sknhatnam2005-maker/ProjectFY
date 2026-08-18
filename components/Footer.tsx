'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const serviceLinks = t.raw('serviceLinks') as string[];
  const services = serviceLinks.map((label) => ({ href: `/${locale}/services`, label }));

  const quickLinks = [
    { href: `/${locale}`,             label: tNav('home') },
    { href: `/${locale}/about`,       label: tNav('about') },
    { href: `/${locale}/team`,        label: tNav('team') },
    { href: `/${locale}/industries`,  label: tNav('industries') },
    { href: `/${locale}/contact`,     label: tNav('contact') },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy-policy`,     label: t('privacy') },
    { href: `/${locale}/terms-of-use`,       label: t('terms') },
    { href: `/${locale}/attorney-disclaimer`,label: t('attorneyDisclaimer') },
    { href: `/${locale}/no-attorney-client`, label: t('noRelationship') },
  ];

  const offices = [
    { country: '🇻🇳 Vietnam', address: 'Số 41 Ngõ 113 Hoàng Cầu, Đống Đa, Hà Nội' },
    { country: '🇺🇸 Wyoming, USA', address: '30 N Gould St Ste R, Sheridan, WY 82801' },
    { country: '🇺🇸 Colorado, USA', address: '1942 Broadway St., STE 314C, Boulder CO 80302' },
  ];

  return (
    <footer className="relative overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(195,136,24,0.15)' }}>

      {/* Top gold glow */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(195,136,24,0.04) 0%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-5">
              <Image src="/logo-white.png" alt="SOLEON" width={44} height={44} className="object-contain" />
              <div>
                <span className="text-xl font-bold tracking-widest" style={{
                  background: 'linear-gradient(135deg, #C38818, #F0C84A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>SOLEON</span>
                <p className="text-[9px] text-gray-500 tracking-wider">{tNav('subtitle')}</p>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">{t('tagline')}</p>

            {/* Registration info */}
            <div className="space-y-1.5 text-[11px] text-gray-600 mb-5 p-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p><span className="text-gray-500">SOLEON LLC</span> · Wyoming, USA</p>
              <p><span className="text-gray-500">Reg. No.</span> 2024-000854417</p>
              <p><span className="text-gray-500">Email:</span>{' '}
                <a href="mailto:Hiep.Quach@soleonconllc.com"
                  className="hover:text-[#C38818] transition-colors">Hiep.Quach@soleonconllc.com</a>
              </p>
            </div>

            {/* Offices */}
            <div className="space-y-3">
              {offices.map((o) => (
                <div key={o.country} className="flex gap-2 text-xs">
                  <span className="text-gray-300 font-medium whitespace-nowrap">{o.country}</span>
                  <span className="text-gray-600">— {o.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C38818] font-semibold text-xs uppercase tracking-wider mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C38818] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#C38818] font-semibold text-xs uppercase tracking-wider mb-5">{t('services')}</h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C38818] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#C38818] font-semibold text-xs uppercase tracking-wider mb-5">{t('legal')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C38818] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t relative z-10" style={{ borderColor: 'rgba(195,136,24,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">{t('copyright')}</p>
            <p className="text-gray-700 text-[11px] text-center md:text-right max-w-lg leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
