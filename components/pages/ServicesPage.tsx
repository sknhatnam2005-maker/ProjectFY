'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const icons: Record<string, React.ReactNode> = {
  building: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  shield: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  globe: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  file: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  lightbulb: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  certificate: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const items = t.raw('items') as Array<{ title: string; description: string; icon: string; details: string[] }>;

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(139,0,0,0.12) 0%, transparent 60%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
            {t('practiceAreasBadge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, #C38818, #F0C84A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={index} className="p-8 rounded-2xl border bg-[#161616] border-[rgba(195,136,24,0.15)]">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-[rgba(195,136,24,0.1)] bg-[rgba(139,0,0,0.3)]"
                      style={{ color: '#C38818' }}>
                      {icons[item.icon]}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">{item.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="text-[#C38818] text-sm font-semibold uppercase tracking-wider mb-4">{t('whatWeOffer')}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {item.details?.map((detail) => (
                        <div key={detail} className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C38818] shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 hover:border-[#C38818]/60 hover:bg-[#C38818]/5"
                        style={{ borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
                        {t('enquireAboutService')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
