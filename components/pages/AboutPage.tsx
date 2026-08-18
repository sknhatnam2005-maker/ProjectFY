'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import CompletedWork from '@/components/CompletedWork';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const entities = t.raw('entities') as string[];
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;
  const credentials = t.raw('credentials') as string[];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(139,0,0,0.12) 0%, transparent 60%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
              {t('aboutBadge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #C38818, #F0C84A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {t('subtitle')}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">{t('story')}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-[#0A0A0A] border-[rgba(195,136,24,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #C38818, #F0C84A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{
                background: 'linear-gradient(135deg, #C38818, #F0C84A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{t('ourJourney')}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{t('story')}</p>
              <p className="text-gray-400 leading-relaxed mb-6">{t('story2')}</p>
              <p className="text-gray-300 font-medium mb-3">{t('ecosystem')}</p>
              <ul className="space-y-3 mb-8">
                {entities.map((entity, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[rgba(195,136,24,0.1)] bg-[rgba(139,0,0,0.4)] border border-[rgba(195,136,24,0.3)]">
                      <svg className="w-3 h-3 text-[#C38818]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {entity}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 leading-relaxed italic border-l-2 border-[#C38818] pl-4">
                "{t('mission')}"
              </p>
            </div>

            <div className="space-y-6">
              {/* Credentials */}
              <div className="p-6 rounded-2xl border bg-[#161616] border-[rgba(195,136,24,0.15)]">
                <h3 className="text-[#C38818] font-semibold mb-4">{t('credentialsTitle')}</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  {(['⚖️', '🎓', '🌍', '📅'] as const).map((icon, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C38818] mt-0.5">{icon}</span>
                      {credentials[i]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Jurisdictions */}
              <div className="p-6 rounded-2xl border bg-[#161616] border-[rgba(195,136,24,0.15)]">
                <h3 className="text-[#C38818] font-semibold mb-4">{t('jurisdictionsTitle')}</h3>
                <div className="flex flex-wrap gap-2">
                  {['Singapore', 'Hong Kong', 'USA', 'EU', 'ASEAN', 'Dubai', 'BVI', 'Cayman Islands', 'Seychelles', 'Cook Islands', 'Vietnam', 'Japan'].map((j) => (
                    <span key={j} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 border-white/10 bg-white bg-white/5 text-gray-300">{j}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CompletedWork />

      {/* CTA */}
      <section className="py-16 border-t border-gray-200 border-[rgba(195,136,24,0.1)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">{t('ctaTitle')}</h2>
          <p className="text-gray-400 mb-8">{t('ctaText')}</p>
          <Link href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl"
            style={{ background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)', color: 'white' }}>
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
