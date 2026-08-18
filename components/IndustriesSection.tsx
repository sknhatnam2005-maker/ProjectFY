'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const industryImages: Record<string, string> = {
  AI:          'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75&fit=crop&auto=format',
  IT:          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=75&fit=crop&auto=format',
  MMO:         'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75&fit=crop&auto=format',
  Fintech:     'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=75&fit=crop&auto=format',
  'E-commerce':'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75&fit=crop&auto=format',
  Crypto:      'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=600&q=75&fit=crop&auto=format',
  Manufacturing:'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75&fit=crop&auto=format',
};

export default function IndustriesSection() {
  const t = useTranslations('industries');
  const locale = useLocale();
  const items = t.raw('items') as Array<{ name: string; short: string; description: string }>;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative overflow-hidden section-transition">
      {/* Layer 3 — Global World Map: dot matrix + gold highlight regions */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ opacity: 0.06 }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Simplified dot matrix — continent clusters */}
          {/* North America */}
          {[[180,140],[195,148],[210,155],[200,165],[215,172],[185,160],[225,145],[240,150],[230,160],[220,168]].map(([x,y],i)=>(
            <circle key={`na${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.6"/>
          ))}
          {/* South America */}
          {[[230,240],[240,255],[225,268],[235,280],[245,292],[220,250],[250,265]].map(([x,y],i)=>(
            <circle key={`sa${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.5"/>
          ))}
          {/* Europe */}
          {[[480,155],[495,148],[510,155],[525,148],[500,165],[515,172],[490,170],[530,162],[545,155],[488,160]].map(([x,y],i)=>(
            <circle key={`eu${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.7"/>
          ))}
          {/* Africa */}
          {[[500,210],[515,225],[505,240],[520,255],[510,270],[495,230],[525,240]].map(([x,y],i)=>(
            <circle key={`af${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.5"/>
          ))}
          {/* Asia */}
          {[[640,145],[660,148],[680,155],[700,148],[720,155],[640,165],[660,170],[680,162],[700,168],[720,160],[740,155]].map(([x,y],i)=>(
            <circle key={`as${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.6"/>
          ))}
          {/* Australia */}
          {[[760,300],[775,308],[790,295],[780,315],[765,318]].map(([x,y],i)=>(
            <circle key={`au${i}`} cx={x} cy={y} r="1.5" fill="#C38818" opacity="0.5"/>
          ))}
          {/* Highlighted regions — larger pulsing dots */}
          {/* Singapore */}
          <circle cx="742" cy="295" r="4" fill="#F0C84A" opacity="0.9"/>
          <circle cx="742" cy="295" r="8" fill="none" stroke="#F0C84A" strokeWidth="0.8" opacity="0.5"/>
          {/* Vietnam */}
          <circle cx="730" cy="265" r="3.5" fill="#F0C84A" opacity="0.9"/>
          <circle cx="730" cy="265" r="7" fill="none" stroke="#F0C84A" strokeWidth="0.8" opacity="0.5"/>
          {/* Hong Kong */}
          <circle cx="752" cy="255" r="3" fill="#F0C84A" opacity="0.9"/>
          {/* USA */}
          <circle cx="210" cy="175" r="4" fill="#C38818" opacity="0.9"/>
          <circle cx="210" cy="175" r="9" fill="none" stroke="#C38818" strokeWidth="0.8" opacity="0.5"/>
          {/* Europe hub */}
          <circle cx="510" cy="158" r="4" fill="#C38818" opacity="0.9"/>
          <circle cx="510" cy="158" r="9" fill="none" stroke="#C38818" strokeWidth="0.8" opacity="0.5"/>
          {/* Gold connection routes */}
          <line x1="510" y1="158" x2="742" y2="295" stroke="#C38818" strokeWidth="0.6" strokeDasharray="6,10" opacity="0.5"/>
          <line x1="210" y1="175" x2="510" y2="158" stroke="#C38818" strokeWidth="0.6" strokeDasharray="6,10" opacity="0.5"/>
          <line x1="730" y1="265" x2="742" y2="295" stroke="#F0C84A" strokeWidth="0.8" strokeDasharray="4,6" opacity="0.7"/>
          <line x1="752" y1="255" x2="742" y2="295" stroke="#F0C84A" strokeWidth="0.8" strokeDasharray="4,6" opacity="0.7"/>
          <line x1="510" y1="158" x2="730" y2="265" stroke="#C38818" strokeWidth="0.5" strokeDasharray="6,10" opacity="0.4"/>
          <line x1="210" y1="175" x2="742" y2="295" stroke="#C38818" strokeWidth="0.4" strokeDasharray="8,14" opacity="0.3"/>
        </svg>
      </div>
      {/* Existing gold glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(195,136,24,0.04) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('industriesBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #C38818, #F0C84A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const imgUrl = industryImages[item.short] || industryImages['IT'];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/${locale}/industries`}
                  className="group block rounded-2xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-2 border-[rgba(195,136,24,0.12)]"
                  style={{ height: '160px' }}>

                  {/* Background image */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${imgUrl}')` }} />

                  {/* Dark overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%)',
                  }} />

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: '1px solid rgba(195,136,24,0.45)' }} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <div className="text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-300 group-hover:text-[#F0C84A]"
                      style={{ color: '#C38818' }}>
                      {item.short}
                    </div>
                    <div className="text-white text-sm font-semibold leading-tight">{item.name}</div>
                    <div className="mt-2 text-gray-300 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">
                      {item.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: items.length * 0.07 }}
            className="col-span-2 md:col-span-1">
            <Link href={`/${locale}/contact`}
              className="group block rounded-2xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full min-h-[160px] flex flex-col items-center justify-center border-[rgba(195,136,24,0.3)]"
              style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.25), rgba(195,136,24,0.1))' }}>
              <div className="absolute inset-0 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(195,136,24,0.5)' }} />
              <div className="relative z-10 text-center p-4">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#C38818' }}>{t('globalLabel')}</div>
                <div className="text-white text-sm font-semibold mb-2">{t('allIndustriesLabel')}</div>
                <div className="text-[10px] text-gray-400 group-hover:text-[#C38818] transition-colors duration-300">{t('contactUsLink')}</div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
