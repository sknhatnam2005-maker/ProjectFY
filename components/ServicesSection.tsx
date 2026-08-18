'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

const serviceImages: Record<string, string> = {
  building:     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75&fit=crop&auto=format',
  shield:       'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=75&fit=crop&auto=format',
  globe:        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=75&fit=crop&auto=format',
  file:         'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=75&fit=crop&auto=format',
  lightbulb:    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=75&fit=crop&auto=format',
  certificate:  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=75&fit=crop&auto=format',
};

/* SVG watermarks for each service card (Layer 2 — service watermark system) */
const serviceWatermarks: Record<string, React.ReactNode> = {
  building: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="28" width="44" height="36" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <rect x="22" y="20" width="28" height="8" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <rect x="30" y="12" width="12" height="8" stroke="#C38818" strokeWidth="1.2" fill="none"/>
      <rect x="20" y="36" width="6" height="6" stroke="#C38818" strokeWidth="1" fill="none"/>
      <rect x="33" y="36" width="6" height="6" stroke="#C38818" strokeWidth="1" fill="none"/>
      <rect x="46" y="36" width="6" height="6" stroke="#C38818" strokeWidth="1" fill="none"/>
      <rect x="20" y="48" width="6" height="6" stroke="#C38818" strokeWidth="1" fill="none"/>
      <rect x="33" y="48" width="6" height="16" stroke="#C38818" strokeWidth="1" fill="none"/>
      <rect x="46" y="48" width="6" height="6" stroke="#C38818" strokeWidth="1" fill="none"/>
    </svg>
  ),
  shield: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 8 L58 18 L58 38 C58 52 36 64 36 64 C36 64 14 52 14 38 L14 18 Z" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <line x1="25" y1="36" x2="47" y2="36" stroke="#C38818" strokeWidth="1"/>
      <line x1="36" y1="25" x2="36" y2="47" stroke="#C38818" strokeWidth="1"/>
      <circle cx="36" cy="36" r="6" stroke="#C38818" strokeWidth="1" fill="none"/>
    </svg>
  ),
  globe: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="24" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <ellipse cx="36" cy="36" rx="12" ry="24" stroke="#C38818" strokeWidth="1" fill="none"/>
      <line x1="12" y1="36" x2="60" y2="36" stroke="#C38818" strokeWidth="1"/>
      <line x1="14" y1="24" x2="58" y2="24" stroke="#C38818" strokeWidth="0.7"/>
      <line x1="14" y1="48" x2="58" y2="48" stroke="#C38818" strokeWidth="0.7"/>
    </svg>
  ),
  file: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10 L52 10 L52 62 L20 62 Z" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <path d="M20 10 L20 62" stroke="#C38818" strokeWidth="0.5"/>
      <line x1="28" y1="24" x2="44" y2="24" stroke="#C38818" strokeWidth="1"/>
      <line x1="28" y1="32" x2="44" y2="32" stroke="#C38818" strokeWidth="1"/>
      <line x1="28" y1="40" x2="38" y2="40" stroke="#C38818" strokeWidth="1"/>
      <path d="M44 50 L50 44 L56 50 M50 44 L50 62" stroke="#C38818" strokeWidth="1" fill="none"/>
    </svg>
  ),
  lightbulb: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 10 C24 10 16 20 16 30 C16 40 24 46 28 50 L28 58 L44 58 L44 50 C48 46 56 40 56 30 C56 20 48 10 36 10 Z" stroke="#C38818" strokeWidth="1.5" fill="none"/>
      <line x1="30" y1="58" x2="42" y2="58" stroke="#C38818" strokeWidth="1"/>
      <line x1="31" y1="62" x2="41" y2="62" stroke="#C38818" strokeWidth="1"/>
      <line x1="36" y1="20" x2="36" y2="28" stroke="#C38818" strokeWidth="1"/>
      <line x1="24" y1="30" x2="20" y2="30" stroke="#C38818" strokeWidth="1"/>
      <line x1="48" y1="30" x2="52" y2="30" stroke="#C38818" strokeWidth="1"/>
    </svg>
  ),
  certificate: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Scales of justice */}
      <line x1="36" y1="10" x2="36" y2="62" stroke="#C38818" strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="52" y2="20" stroke="#C38818" strokeWidth="1.5"/>
      <line x1="36" y1="62" x2="28" y2="62" stroke="#C38818" strokeWidth="1.5"/>
      <line x1="36" y1="62" x2="44" y2="62" stroke="#C38818" strokeWidth="1.5"/>
      <path d="M20 20 L14 38 L26 38 Z" stroke="#C38818" strokeWidth="1" fill="none"/>
      <path d="M52 20 L46 38 L58 38 Z" stroke="#C38818" strokeWidth="1" fill="none"/>
      <line x1="14" y1="38" x2="26" y2="38" stroke="#C38818" strokeWidth="1"/>
      <line x1="46" y1="38" x2="58" y2="38" stroke="#C38818" strokeWidth="1"/>
    </svg>
  ),
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const items = t.raw('items') as Array<{ title: string; description: string; icon: string }>;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative overflow-hidden section-transition">
      {/* Layer 2 — Legal Network Pattern: gold grid + geometric arcs + nodes */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.07 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="legalGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="80" y2="0"  stroke="#C38818" strokeWidth="0.5"/>
              <line x1="0" y1="0" x2="0"  y2="80" stroke="#C38818" strokeWidth="0.5"/>
              {/* Geometric arc at top-left corner */}
              <path d="M0,0 Q20,0 20,20" stroke="#C38818" strokeWidth="0.4" fill="none"/>
              {/* Node dot at corner */}
              <circle cx="0"  cy="0"  r="1.5" fill="#C38818"/>
              <circle cx="40" cy="40" r="1"   fill="#C38818" opacity="0.5"/>
            </pattern>
            <pattern id="legalCircles" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Larger circle connecting nodes */}
              <circle cx="80" cy="80" r="30" stroke="#C38818" strokeWidth="0.4" fill="none" strokeDasharray="4,8"/>
              <circle cx="0"  cy="0"  r="15" stroke="#C38818" strokeWidth="0.3" fill="none" strokeDasharray="3,6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#legalGrid)"/>
          <rect width="100%" height="100%" fill="url(#legalCircles)"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top right, rgba(139,0,0,0.07) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at bottom left, rgba(195,136,24,0.04) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('practiceAreasBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #C38818, #F0C84A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">{t('subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const imgUrl = serviceImages[item.icon] || serviceImages['building'];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/${locale}/services`}
                  className="group block rounded-2xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-2 border-[rgba(195,136,24,0.15)]"
                  style={{ height: '300px' }}>

                  {/* Background image */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${imgUrl}')` }} />

                  {/* Gradient overlay — dark at bottom for readability */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(13,13,13,0.72) 50%, rgba(13,13,13,0.97) 100%)',
                  }} />

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: '1px solid rgba(195,136,24,0.5)', boxShadow: '0 0 30px rgba(195,136,24,0.05) inset' }} />

                  {/* Service card watermark — Layer 2 watermark system, 3-5% opacity */}
                  <div className="absolute top-3 right-3 pointer-events-none select-none"
                    style={{ opacity: 0.04 }}>
                    {serviceWatermarks[item.icon] ?? serviceWatermarks['building']}
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-4 right-5 text-4xl font-bold select-none"
                    style={{ color: '#C38818', opacity: 0.2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-white font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-[#C38818]">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      style={{ color: '#C38818' }}>
                      {t('enquire')}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12">
          <Link href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'rgba(195,136,24,0.3)', color: '#C38818', background: 'rgba(195,136,24,0.04)' }}>
            {t('viewAll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
