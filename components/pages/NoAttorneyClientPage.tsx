'use client';

import { useTranslations } from 'next-intl';

type Section = { heading: string; body: string; list?: string[] };

export default function NoAttorneyClientPage() {
  const t = useTranslations('compliance');
  const sections = t.raw('noRelationship.sections') as Section[];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-bold mb-2" style={{
          background: 'linear-gradient(135deg, #C38818, #F0C84A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>{t('noRelationship.title')}</h1>
        <p className="text-gray-500 text-sm mb-10">{t('noRelationship.lastUpdated')}</p>

        <div className="p-6 rounded-2xl border mb-8 bg-[rgba(195,136,24,0.05)] bg-[rgba(139,0,0,0.1)] border-[rgba(195,136,24,0.3)]">
          <p className="text-[#C38818] font-semibold text-sm">{t('noRelationship.noticeBadge')}</p>
          <p className="text-gray-300 text-sm mt-2">{t('noRelationship.noticeText')}</p>
        </div>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-white font-semibold text-lg mb-3">{section.heading}</h2>
              <p>{section.body}</p>
              {section.list && (
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
