'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const memberPhotos = [
  '/images/quach-dai-nghia.jpg',
  '/images/quach-dai-hiep.jpg',
  '/images/bui-van-thu.jpg',
];

const memberSpecialties = [
  ['Corporate Structuring', 'Cross-Border M&A', 'International Tax'],
  ['Tax Compliance', 'Investment Advisory', 'Fund Structures'],
  ['Commercial Litigation', 'Contract Law', 'Corporate Governance'],
];

const memberCountries = ['Vietnam · Singapore · USA', 'Vietnam · Hong Kong · UAE', 'Vietnam · ASEAN'];

export default function TeamPreview() {
  const t = useTranslations('team');
  const locale = useLocale();
  const members = t.raw('members') as Array<{ name: string; role: string; credentials: string; bio: string }>;
  const preview = members.slice(0, 3);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.35), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.25)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('ourPeopleBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-12">
          {preview.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(195,136,24,0.12)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
              }}>

              {/* Photo — taller */}
              <div className="relative h-72 overflow-hidden"
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${memberPhotos[i]}')` }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.95) 100%)' }} />

                {/* Country badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                    {memberCountries[i]}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-0.5 group-hover:text-[#F0C84A] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold mb-3" style={{ color: '#C38818' }}>{member.role}</p>

                {/* Credential badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] mb-4"
                  style={{ background: 'rgba(195,136,24,0.08)', border: '1px solid rgba(195,136,24,0.2)', color: '#C38818' }}>
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {member.credentials.split('|')[0].trim()}
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mb-4">{member.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5">
                  {memberSpecialties[i].map((s, si) => (
                    <span key={si} className="px-2 py-0.5 rounded text-[10px] text-gray-500"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* LinkedIn placeholder */}
                <div className="mt-4 pt-4 border-t border-[rgba(195,136,24,0.1)] flex items-center gap-2">
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C38818] transition-colors duration-200">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center">
          <Link href={`/${locale}/team`}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'rgba(195,136,24,0.3)', color: '#C38818', background: 'rgba(195,136,24,0.04)' }}>
            {t('meetFullTeam')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
