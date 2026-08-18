'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const credentialIcons = ['⚖️', '🎓', '🌍', '📅'];

export default function AboutPreview() {
  const t = useTranslations('about');
  const locale = useLocale();
  const entities = t.raw('entities') as string[];
  const previewCredentials = t.raw('previewCredentials') as string[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative overflow-hidden section-transition">
      {/* Layer 1 — Architectural Legal Identity: blueprint lines + column shadows */}
      {/* Blueprint horizontal line grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprintGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="60" y2="0"  stroke="#C38818" strokeWidth="0.5"/>
              <line x1="0" y1="0" x2="0"  y2="60" stroke="#C38818" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)"/>
        </svg>
      </div>
      {/* Column shadow strips — pillar silhouettes */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="colShadow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#C38818" stopOpacity="0"/>
              <stop offset="50%"  stopColor="#C38818" stopOpacity="1"/>
              <stop offset="100%" stopColor="#C38818" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect x="14%" y="0" width="3" height="100%" fill="url(#colShadow)"/>
          <rect x="50%" y="0" width="4" height="100%" fill="url(#colShadow)"/>
          <rect x="85%" y="0" width="3" height="100%" fill="url(#colShadow)"/>
        </svg>
      </div>
      {/* Soft gold ambient glow from top */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none animate-glow-gold" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(195,136,24,0.08) 0%, transparent 70%)',
      }} />
      {/* BG — existing crimson glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 60%, rgba(139,0,0,0.07) 0%, transparent 55%)',
      }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] float bg-[#1C1C1C] border border-[rgba(195,136,24,0.15)]">
              {/* Glow inside */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.15) 0%, transparent 70%)',
              }} />
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo-main.jpg" alt="SOLEON"
                  width={220} height={220}
                  className="object-contain rounded-2xl opacity-95" />
              </div>
              {/* Decorative corner lines */}
              <div className="absolute top-4 left-4 w-8 h-8" style={{
                borderTop: '2px solid rgba(195,136,24,0.4)',
                borderLeft: '2px solid rgba(195,136,24,0.4)',
              }} />
              <div className="absolute bottom-4 right-4 w-8 h-8" style={{
                borderBottom: '2px solid rgba(195,136,24,0.4)',
                borderRight: '2px solid rgba(195,136,24,0.4)',
              }} />
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 px-4 py-3 rounded-2xl border shadow-xl bg-[#161616] border-[rgba(195,136,24,0.25)]">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#C38818' }}>2014</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('founded')}</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -left-5 px-4 py-3 rounded-2xl border shadow-xl bg-[#161616] border-[rgba(195,136,24,0.25)]">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#C38818' }}>5</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('legalEntitiesLabel')}</div>
              </div>
            </motion.div>

            {/* Credential chip */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-8 -translate-y-1/2 px-3 py-2 rounded-xl border hidden xl:block bg-[#161616] border-[rgba(195,136,24,0.2)]">
              <div className="text-[10px] text-gray-400 whitespace-nowrap">🏛️ {t('hbaCertified')}</div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
              <span className="w-1 h-1 rounded-full bg-[#C38818]" />
              {t('ourStoryBadge')}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #C38818, #F0C84A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{t('title')}</h2>

            <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">{t('story')}</p>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">{t('story2')}</p>

            {/* Entities */}
            <p className="text-gray-300 font-medium text-sm mb-3">{t('ecosystem')}</p>
            <ul className="space-y-2 mb-8">
              {entities.map((e, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(139,0,0,0.35)', border: '1px solid rgba(195,136,24,0.3)' }}>
                    <svg className="w-3 h-3" fill="none" stroke="#C38818" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {e}
                </motion.li>
              ))}
            </ul>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {previewCredentials.map((text, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-gray-400 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                  <span>{credentialIcons[i]}</span>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>

            <Link href={`/${locale}/about`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:opacity-90 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)', color: 'white',
                boxShadow: '0 8px 24px rgba(195,136,24,0.3)' }}>
              {t('readFullStory')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
