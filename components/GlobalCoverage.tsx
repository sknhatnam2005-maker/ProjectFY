'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Jurisdiction = { name: string; flag: string; highlight: string; services: string[] };

export default function GlobalCoverage() {
  const t = useTranslations('globalCoverage');
  const jurisdictions = t.raw('jurisdictions') as Jurisdiction[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.35), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.25)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">{t('subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {jurisdictions.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="relative rounded-2xl p-5 cursor-default overflow-hidden transition-all duration-300"
              style={{
                background: active === i ? 'rgba(195,136,24,0.07)' : 'rgba(255,255,255,0.02)',
                border: active === i ? '1px solid rgba(195,136,24,0.45)' : '1px solid rgba(195,136,24,0.12)',
                boxShadow: active === i ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(195,136,24,0.2) inset' : 'none',
                transform: active === i ? 'translateY(-4px)' : 'none',
              }}>

              {/* Flag + name */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{j.flag}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm leading-tight">{j.name}</h3>
                  <p className="text-[10px] font-medium mt-0.5" style={{ color: '#C38818' }}>{j.highlight}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-3" style={{ background: 'rgba(195,136,24,0.15)' }} />

              {/* Services */}
              <ul className="space-y-1.5">
                {j.services.map((s, si) => (
                  <li key={si} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#C38818' }} />
                    {s}
                  </li>
                ))}
              </ul>

              {/* Glow corner */}
              {active === i && (
                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgba(195,136,24,0.12) 0%, transparent 70%)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.2), transparent)' }} />
    </section>
  );
}
