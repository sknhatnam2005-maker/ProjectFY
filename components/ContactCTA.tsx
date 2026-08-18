'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function ContactCTA() {
  const locale = useLocale();
  const t = useTranslations('contactCta');
  const trustItems = t.raw('trustItems') as string[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  /* Deterministic constellation nodes (avoid SSR hydration issues) */
  const CONSTELLATION_NODES = [
    { cx: 8,  cy: 15 }, { cx: 22, cy: 35 }, { cx: 40, cy: 10 }, { cx: 55, cy: 28 },
    { cx: 70, cy: 18 }, { cx: 85, cy: 40 }, { cx: 15, cy: 55 }, { cx: 32, cy: 68 },
    { cx: 48, cy: 50 }, { cx: 62, cy: 72 }, { cx: 78, cy: 58 }, { cx: 92, cy: 25 },
    { cx: 5,  cy: 80 }, { cx: 95, cy: 75 }, { cx: 50, cy: 88 },
  ];
  const CONSTELLATION_LINES = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,11],[0,6],[6,7],[7,8],[8,9],[9,10],[10,5],
  ];
  const DRIFT_PARTICLES = [
    { cx: 18, cy: 42, dur: 22, delay: 0   },
    { cx: 60, cy: 20, dur: 26, delay: 3   },
    { cx: 80, cy: 65, dur: 30, delay: 6   },
    { cx: 35, cy: 78, dur: 24, delay: 9   },
    { cx: 90, cy: 48, dur: 28, delay: 1.5 },
    { cx: 12, cy: 90, dur: 32, delay: 4.5 },
  ];

  return (
    <section ref={ref} className="py-28 relative overflow-hidden section-transition">
      {/* Layer 4 — Premium Constellation Network */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Crimson radial — cinematic depth */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.14) 0%, transparent 65%)',
        }} />
        {/* Gold ambient glow — pulsing */}
        <div className="absolute inset-0 animate-glow-gold" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(195,136,24,0.07) 0%, transparent 55%)',
        }} />
        {/* Constellation SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
          {/* Connection lines */}
          {CONSTELLATION_LINES.map(([a, b], i) => (
            <line key={i}
              x1={CONSTELLATION_NODES[a].cx} y1={CONSTELLATION_NODES[a].cy}
              x2={CONSTELLATION_NODES[b].cx} y2={CONSTELLATION_NODES[b].cy}
              stroke="#C38818" strokeWidth="0.2" strokeDasharray="1,2"/>
          ))}
          {/* Star nodes */}
          {CONSTELLATION_NODES.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r="0.6" fill="#F0C84A"/>
          ))}
        </svg>
        {/* Drifting gold particles */}
        {DRIFT_PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full animate-drift"
            style={{
              width: '3px', height: '3px',
              left: p.cx + '%', top: p.cy + '%',
              background: '#F0C84A',
              opacity: 0.5,
              animationDuration: p.dur + 's',
              animationDelay: p.delay + 's',
            }} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          {/* Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-8 text-2xl bg-[rgba(139,0,0,0.25)] border border-[rgba(195,136,24,0.3)]">
            ⚖️
          </motion.div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
            {t('badge')}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{
            background: 'linear-gradient(135deg, #C38818, #F0C84A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('title')}
          </h2>

          <p className="text-gray-400 text-base lg:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold rounded-xl transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)', color: 'white',
                  boxShadow: '0 8px 32px rgba(195,136,24,0.35)' }}>
                {t('bookButton')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a href="mailto:Hiep.Quach@soleonconllc.com"
                className="inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold rounded-xl border transition-all duration-200"
                style={{ borderColor: 'rgba(195,136,24,0.35)', color: '#C38818', background: 'rgba(195,136,24,0.04)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('emailButton')}
              </a>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-600">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ background: '#C38818' }} />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
