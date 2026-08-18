'use client';

import { useRef, useEffect, useState, ReactElement } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Metric = { value: string; label: string; icon: string };

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const ICONS: Record<string, ReactElement> = {
  building: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  file: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function StatsSection() {
  const t = useTranslations('statsSection');
  const rawMetrics = t.raw('metrics');
  const metrics = Array.isArray(rawMetrics) ? rawMetrics as Metric[] : [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.4), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.25)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">{t('subtitle')}</p>
        </motion.div>

        {/* Metrics grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((metric, i) => {
            const { num, suffix } = parseValue(metric.value);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(195,136,24,0.12)',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'rgba(195,136,24,0.04)', border: '1px solid rgba(195,136,24,0.35)' }} />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 mx-auto transition-colors duration-300"
                  style={{ background: 'rgba(195,136,24,0.1)', color: '#C38818' }}
                  >
                  {ICONS[metric.icon]}
                </div>

                {/* Value */}
                <div className="text-3xl lg:text-4xl font-bold mb-1.5" style={{
                  background: 'linear-gradient(135deg, #C38818, #F0C84A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  <Counter target={num} suffix={suffix} />
                </div>

                {/* Label */}
                <p className="text-gray-400 text-xs leading-snug">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.2), transparent)' }} />
    </section>
  );
}
