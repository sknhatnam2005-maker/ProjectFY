'use client';

import { useTranslations } from 'next-intl';

type Section = { heading: string; body: string };

export default function TermsOfUsePage() {
  const t = useTranslations('compliance');
  const sections = t.raw('terms.sections') as Section[];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-bold mb-2" style={{
          background: 'linear-gradient(135deg, #C38818, #F0C84A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>{t('terms.title')}</h1>
        <p className="text-gray-500 text-sm mb-10">{t('terms.lastUpdated')}</p>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-white font-semibold text-lg mb-3">{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
