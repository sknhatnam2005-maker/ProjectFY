'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as TestimonialItem[];
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5500);
  }

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [items.length]);

  function goTo(idx: number) {
    if (timer.current) clearInterval(timer.current);
    setActive(idx);
    startTimer();
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.35), transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(195,136,24,0.04) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.25)', color: '#C38818' }}>
            <span className="w-1 h-1 rounded-full bg-[#C38818]" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">{t('subtitle')}</p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-2xl p-8 md:p-10 text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(195,136,24,0.18)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.25)',
              }}>

              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none mb-4" style={{ color: 'rgba(195,136,24,0.3)' }}>&ldquo;</div>

              {/* Quote text */}
              <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {items[active].quote}
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: 'rgba(195,136,24,0.15)', border: '1px solid rgba(195,136,24,0.3)', color: '#F0C84A' }}>
                  {items[active].author[0]}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{items[active].author}</span>
                    <span className="text-lg">{items[active].country}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{items[active].role} · {items[active].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                background: active === i ? '#C38818' : 'rgba(195,136,24,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(195,136,24,0.2), transparent)' }} />
    </section>
  );
}
