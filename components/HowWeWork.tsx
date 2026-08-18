'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

type Step = { number: string; title: string; description: string };

const STEP_ICONS = [
  /* 01 consultation */
  <svg key="01" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  /* 02 kyc */
  <svg key="02" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  /* 03 setup */
  <svg key="03" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  /* 04 compliance */
  <svg key="04" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  /* 05 support */
  <svg key="05" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export default function HowWeWork() {
  const t = useTranslations('howWeWork');
  const rawSteps = t.raw('steps');
  const steps = Array.isArray(rawSteps) ? rawSteps as Step[] : [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.35), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.25)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">{t('subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px z-0"
            style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(195,136,24,0.2) 20%, rgba(195,136,24,0.2) 80%, transparent 95%)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group">

                {/* Step indicator */}
                <div className="relative z-10 mb-5">
                  {/* Outer ring */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(195,136,24,0.1)',
                      border: '1px solid rgba(195,136,24,0.3)',
                      boxShadow: '0 0 20px rgba(195,136,24,0.08)',
                    }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(195,136,24,0.15)', color: '#F0C84A' }}>
                      {STEP_ICONS[i]}
                    </div>
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: '#C38818', color: '#000' }}>
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <div className="text-[10px] font-bold tracking-widest mb-1.5" style={{ color: 'rgba(195,136,24,0.6)' }}>
                    {step.number}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#F0C84A] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow between steps — desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2 z-20 text-[rgba(195,136,24,0.3)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
