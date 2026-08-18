'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const PARTICLE_SEEDS = [
  { w: 3.2, h: 3.2, top: 15, left: 8,  color: '#C38818', dur: 6,  delay: 0   },
  { w: 4.5, h: 4.5, top: 30, left: 67, color: '#8B0000', dur: 7,  delay: 0.5 },
  { w: 4.0, h: 4.0, top: 70, left: 42, color: '#C38818', dur: 8,  delay: 1   },
  { w: 3.5, h: 3.5, top: 50, left: 80, color: '#8B0000', dur: 9,  delay: 1.5 },
  { w: 4.2, h: 4.2, top: 85, left: 20, color: '#C38818', dur: 10, delay: 2   },
  { w: 3.8, h: 3.8, top: 25, left: 55, color: '#8B0000', dur: 11, delay: 2.5 },
  { w: 2.8, h: 2.8, top: 60, left: 10, color: '#C38818', dur: 12, delay: 3   },
  { w: 3.9, h: 3.9, top: 40, left: 90, color: '#8B0000', dur: 13, delay: 3.5 },
  /* Extra gold particles for enhanced depth */
  { w: 2.5, h: 2.5, top: 10, left: 45, color: '#F0C84A', dur: 9,  delay: 1.2 },
  { w: 3.1, h: 3.1, top: 75, left: 72, color: '#C38818', dur: 11, delay: 4   },
  { w: 2.2, h: 2.2, top: 92, left: 58, color: '#F0C84A', dur: 14, delay: 0.8 },
  { w: 3.6, h: 3.6, top: 18, left: 88, color: '#C38818', dur: 8,  delay: 2.2 },
];

/* Extra faint dots to imply more countries */
const EXTRA_DOTS = [
  { top: '18%', left: '35%' }, { top: '22%', left: '82%' },
  { top: '35%', left: '50%' }, { top: '38%', left: '88%' },
  { top: '48%', left: '38%' }, { top: '52%', left: '55%' },
  { top: '62%', left: '20%' }, { top: '65%', left: '78%' },
  { top: '80%', left: '48%' }, { top: '15%', left: '52%' },
];

/* Globe component — localized jurisdiction pins */
function Globe({ pinLabels, moreLabel }: { pinLabels: string[]; moreLabel: string }) {
  const pins = [
    { top: '12%', left: '68%', label: pinLabels[0], delay: '0s'   },
    { top: '25%', left: '10%', label: pinLabels[1],  delay: '0.3s' },
    { top: '44%', left: '15%', label: pinLabels[2],  delay: '0.6s' },
    { top: '55%', left: '70%', label: pinLabels[3],  delay: '0.2s' },
    { top: '68%', left: '58%', label: pinLabels[4],  delay: '0.9s' },
    { top: '70%', left: '28%', label: pinLabels[5],  delay: '1.1s' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full spin-slow"
        style={{ border: '1px solid rgba(195,136,24,0.12)' }} />
      {/* Middle ring */}
      <div className="absolute w-56 h-56 lg:w-72 lg:h-72 rounded-full spin-slow-reverse"
        style={{ border: '1px solid rgba(195,136,24,0.18)' }}>
        {/* Dots on ring */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ background: '#C38818', boxShadow: '0 0 12px rgba(195,136,24,0.8)' }} />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: '#C38818', boxShadow: '0 0 8px rgba(195,136,24,0.6)' }} />
      </div>
      {/* Inner ring */}
      <div className="absolute w-40 h-40 lg:w-52 lg:h-52 rounded-full spin-slow"
        style={{ border: '1px dashed rgba(195,136,24,0.2)', animationDuration: '12s' }}>
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full"
          style={{ background: '#F0C84A', boxShadow: '0 0 8px rgba(240,200,74,0.8)' }} />
      </div>

      {/* Globe center */}
      <div className="relative z-10 w-32 h-32 lg:w-44 lg:h-44 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(139,0,0,0.6) 0%, rgba(30,0,0,0.95) 100%)',
          border: '1px solid rgba(195,136,24,0.3)',
          boxShadow: '0 0 40px rgba(139,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.5)',
        }}>
        <Image src="/logo-white.png" alt="SOLEON" width={80} height={80} className="object-contain opacity-90" />
      </div>

      {/* Location pins */}
      {pins.map((pin) => (
        <div key={pin.label}
          className="absolute flex flex-col items-center"
          style={{ top: pin.top, left: pin.left, animationDelay: pin.delay }}>
          <div
            className="rounded-full flex items-center justify-center font-bold pulse-glow w-auto px-2 h-5 text-[8px] whitespace-nowrap"
            style={{
              background: 'rgba(139,0,0,0.8)',
              border: '1px solid rgba(195,136,24,0.6)',
              color: '#F0C84A',
            }}>
            {pin.label}
          </div>
          <div className="w-px h-3" style={{ background: 'rgba(195,136,24,0.4)' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: '#C38818' }} />
        </div>
      ))}

      {/* Extra faint dots — imply more countries */}
      {EXTRA_DOTS.map((d, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full"
          style={{ top: d.top, left: d.left, background: '#C38818', opacity: 0.25 }} />
      ))}

      {/* "& 180+ more" badge at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-medium whitespace-nowrap"
        style={{
          background: 'rgba(195,136,24,0.08)',
          border: '1px solid rgba(195,136,24,0.3)',
          color: '#C38818',
        }}>
        {moreLabel}
      </div>

      {/* Connecting lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        <line x1="68%" y1="12%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="10%" y1="25%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="15%" y1="44%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="70%" y1="55%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="58%" y1="68%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="28%" y1="70%" x2="50%" y2="50%" stroke="#C38818" strokeWidth="0.5" strokeDasharray="3,3" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const jurisdictions = t.raw('jurisdictions') as string[];
  const pinLabels = t.raw('globePins') as string[];
  const moreLabel = t('globeMoreLabel');

  return (
    <section className="relative min-h-screen overflow-hidden -mt-20"
      style={{
        backgroundImage: "url('/backgroud.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Dark crimson overlay để text dễ đọc */}
      <div className="absolute inset-0" style={{ background: 'rgba(18,2,2,0.38)' }} />

      {/* Ambient overlays */}
      <div className="absolute inset-0">
        {/* Crimson glow right */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 75% 50%, rgba(139,0,0,0.10) 0%, transparent 55%)',
        }} />
        {/* Gold glow left-bottom */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 10% 85%, rgba(195,136,24,0.14) 0%, transparent 45%)',
        }} />
        {/* Gold glow top-center — cinematic architectural light */}
        <div className="absolute inset-0 animate-glow-gold" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(195,136,24,0.12) 0%, transparent 50%)',
        }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(195,136,24,1) 1px, transparent 1px), linear-gradient(90deg, rgba(195,136,24,1) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }} />
        {/* Layer 1 — Architectural column light shafts (vertical gradient strips) */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.045 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="colGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#C38818" stopOpacity="0.9"/>
                <stop offset="40%" stopColor="#C38818" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#C38818" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Column shafts — evenly spaced vertical gradient strips */}
            <rect x="12%" y="0" width="1.5" height="100%" fill="url(#colGrad)" />
            <rect x="26%" y="0" width="1"   height="100%" fill="url(#colGrad)" />
            <rect x="50%" y="0" width="2"   height="100%" fill="url(#colGrad)" />
            <rect x="74%" y="0" width="1"   height="100%" fill="url(#colGrad)" />
            <rect x="88%" y="0" width="1.5" height="100%" fill="url(#colGrad)" />
            {/* Entablature (horizontal band at top) */}
            <rect x="0" y="0" width="100%" height="1" fill="#C38818" fillOpacity="0.6" />
            <rect x="0" y="4" width="100%" height="0.5" fill="#C38818" fillOpacity="0.3" />
          </svg>
        </div>
        {/* Floating particles — deterministic seeds to avoid SSR hydration mismatch */}
        {PARTICLE_SEEDS.map((p, i) => (
          <div key={i}
            className="absolute rounded-full"
            style={{
              width: p.w + 'px',
              height: p.h + 'px',
              top: p.top + '%',
              left: p.left + '%',
              background: p.color,
              opacity: 0.3,
              animation: `particle ${p.dur}s ease-in-out infinite ${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left */}
          <div>
            {/* Badge */}
            <div className="hero-fade-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border"
                style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C38818] animate-pulse" />
                {t('badge')}
              </div>
            </div>

            {/* Headline */}
            <h1 className="hero-fade-1 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-tight mb-6">
              <span className="gold-text-animated">{t('tagline')}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-fade-2 text-base lg:text-lg leading-relaxed mb-8 max-w-xl text-gray-400">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="hero-fade-3 flex flex-wrap gap-4 mb-10">
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:opacity-90 hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)', color: 'white',
                  boxShadow: '0 8px 30px rgba(195,136,24,0.35)' }}>
                {t('cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href={`/${locale}/about`}
                aria-label="Learn more about SOLEON"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: 'rgba(195,136,24,0.35)', color: '#C38818',
                  background: 'rgba(195,136,24,0.04)' }}>
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Jurisdiction tags */}
            <div className="hero-fade-4">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">{t('keyJurisdictions')}</p>
              <div className="flex flex-wrap gap-2">
                {jurisdictions.map((j) => (
                  <span key={j}
                    className="px-3 py-1.5 text-xs rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-gray-500">
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Globe */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-72 lg:h-96 mb-8">
              <Globe pinLabels={pinLabels} moreLabel={moreLabel} />
            </motion.div>

            {/* Floating "available" badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl border hidden lg:flex items-center gap-3 float bg-[#161616] border-[rgba(195,136,24,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-[#C38818]">{t('availableNow')}</p>
                <p className="text-[10px] text-gray-400">{t('freeConsultation')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-linear-to-b from-transparent to-[#0D0D0D]" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-600 uppercase tracking-widest">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-linear-to-b from-[rgba(195,136,24,0.5)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
