'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

type CaseStudy = {
  tag: string;
  title: string;
  context: string;
  solution: string;
  result: string;
  tags: string[];
};

export default function CompletedWork() {
  const t = useTranslations('caseStudies');
  const items = t.raw('items') as CaseStudy[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.35), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 10%, rgba(195,136,24,0.11) 0%, rgba(139,0,0,0.08) 28%, transparent 62%)',
        }} />
      <div className="absolute left-1/2 top-24 h-px w-[min(720px,82vw)] -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(240,200,74,0.7), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-6 border uppercase tracking-[0.18em]"
            style={{ background: 'rgba(195,136,24,0.11)', borderColor: 'rgba(195,136,24,0.38)', color: '#F0C84A', boxShadow: '0 10px 34px rgba(0,0,0,0.26)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0C84A] shadow-[0_0_14px_rgba(240,200,74,0.7)]" />
            {t('badge')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #F0C84A 0%, #C38818 45%, #F7D978 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 18px 48px rgba(195,136,24,0.14)',
            }}>
            {t('title')}
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Case study cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.024))',
                border: '1px solid rgba(195,136,24,0.2)',
                boxShadow: '0 18px 56px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.045)',
              }}>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: '1px solid rgba(195,136,24,0.45)', boxShadow: '0 0 30px rgba(195,136,24,0.06) inset' }} />

              {/* Top accent bar */}
              <div className="h-1.5 w-full"
                style={{ background: 'linear-gradient(90deg, #C38818, #F0C84A, #C38818)' }} />

              <div className="p-6 lg:p-7">
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 uppercase tracking-wider"
                  style={{ background: 'rgba(195,136,24,0.1)', border: '1px solid rgba(195,136,24,0.25)', color: '#C38818' }}>
                  {item.tag}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-5 leading-snug group-hover:text-[#F0C84A] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* 3-part breakdown */}
                <div className="space-y-4">
                  {/* Context */}
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ background: 'rgba(107,114,128,0.2)', color: '#6b7280' }}>C</div>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Context</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.context}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ background: 'rgba(195,136,24,0.15)', color: '#C38818' }}>S</div>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#C38818' }}>Solution</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.solution}</p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>R</div>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-1">Result</p>
                      <p className="text-gray-300 text-xs leading-relaxed font-medium">{item.result}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[rgba(195,136,24,0.1)]">
                  {item.tags.map((tag, ti) => (
                    <span key={ti} className="px-2 py-0.5 rounded text-[10px] text-gray-500"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
