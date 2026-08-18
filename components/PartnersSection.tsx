'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const techPartners = [
  { name: 'Stripe',    logo: '/logo/stripe.png' },
  { name: 'Wise',      logo: '/logo/wise.png' },
  { name: 'Mercury',   logo: '/logo/mercury.png' },
  { name: 'Relay',     logo: '/logo/relay.png' },
  { name: 'DocuSign',  logo: '/logo/docusign.png' },
  { name: 'Xero',      logo: '/logo/xero.png' },
  { name: 'Brex',      logo: '/logo/brex.png' },
  { name: 'Airwallex', logo: '/logo/airwallex.png' },
];

type NetworkItem = { name: string; flag: string };

export default function PartnersSection() {
  const t = useTranslations('partners');
  const networkItems = t.raw('networkItems') as NetworkItem[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

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
            {t('techBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">{t('subtitle')}</p>
        </motion.div>

        <div ref={ref} className="space-y-12">
          {/* Group 1 — Technology Partners */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: 'rgba(195,136,24,0.15)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(195,136,24,0.08)', border: '1px solid rgba(195,136,24,0.2)', color: '#C38818' }}>
                {t('techTitle')}
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(195,136,24,0.15)' }} />
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {techPartners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(195,136,24,0.1)',
                  }}>
                  <div className="relative w-full h-7 flex items-center justify-center mb-2">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain partner-logo"
                      sizes="80px"
                    />
                  </div>
                  <span className="text-[9px] text-gray-600 group-hover:text-gray-400 transition-colors">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Group 2 — Professional Network */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: 'rgba(195,136,24,0.15)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(195,136,24,0.08)', border: '1px solid rgba(195,136,24,0.2)', color: '#C38818' }}>
                {t('networkTitle')}
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(195,136,24,0.15)' }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {networkItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(195,136,24,0.1)',
                  }}>
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{item.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] text-gray-500">{t('activeNetwork')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.2), transparent)' }} />
    </section>
  );
}
