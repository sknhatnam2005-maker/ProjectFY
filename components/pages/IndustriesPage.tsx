'use client';

import { useState, type ComponentType } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bitcoin,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Factory,
  FileCheck2,
  Globe2,
  Landmark,
  LockKeyhole,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
} from 'lucide-react';

type Industry = {
  name: string;
  short: string;
  description: string;
  overview: string;
  quickServices: string[];
  services: string[];
  countries: string[];
  legalIssues: string[];
};

type Stat = {
  value: string;
  label: string;
};

type CaseStudy = {
  title: string;
  industry: string;
  country: string;
  summary: string;
  result: string;
};

type Jurisdiction = {
  name: string;
  flag: string;
  services: string;
  timeline: string;
  scope: string;
};

type Faq = {
  question: string;
  answer: string;
};

const industryIcons: Record<string, ComponentType<{ className?: string }>> = {
  AI: Bot,
  IT: Code2,
  Fintech: Landmark,
  Crypto: Bitcoin,
  'E-commerce': ShoppingCart,
  MMO: Store,
  Manufacturing: Factory,
};

const statIcons = [FileCheck2, Globe2, BadgeCheck, Building2];

export default function IndustriesPage() {
  const t = useTranslations('industries');
  const locale = useLocale();
  const industries = t.raw('items') as Industry[];
  const stats = t.raw('expertiseStats') as Stat[];
  const caseStudies = t.raw('caseStudies') as CaseStudy[];
  const jurisdictions = t.raw('jurisdictions') as Jurisdiction[];
  const faqs = t.raw('faqs') as Faq[];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndustry = industries[activeIndex] ?? industries[0];
  const ActiveIcon = industryIcons[activeIndustry?.short] ?? Scale;
  const topServices = activeIndustry?.services.slice(0, 5) ?? [];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <section className="relative overflow-hidden border-b border-[rgba(195,136,24,0.1)] py-20 lg:py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 18% 20%, rgba(195,136,24,0.14) 0%, transparent 40%), radial-gradient(ellipse at 90% 10%, rgba(139,0,0,0.14) 0%, transparent 34%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.28)', color: '#C38818' }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t('industriesBadge')}
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{t('title')}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">{t('subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {(t.raw('heroHighlights') as string[]).map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-[rgba(195,136,24,0.12)] bg-black/25 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 flex-none text-[#C38818]" />
                <span className="text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
          <div>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{t('industriesListBadge')}</p>
                <h2 className="mt-2 text-3xl font-bold">{t('industriesListTitle')}</h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-gray-400">{t('industriesListDescription')}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => {
                const Icon = industryIcons[industry.short] ?? Scale;
                const active = index === activeIndex;
                return (
                  <motion.button
                    key={industry.short}
                    type="button"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    onClick={() => setActiveIndex(index)}
                    className={`group rounded-lg border p-5 text-left transition-all hover:-translate-y-1 ${
                      active
                        ? 'border-[#C38818] bg-[rgba(195,136,24,0.1)] shadow-[0_0_0_1px_rgba(195,136,24,0.08)]'
                        : 'border-[rgba(195,136,24,0.12)] bg-[#151515] hover:border-[rgba(195,136,24,0.42)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.18), rgba(195,136,24,0.18))' }}
                      >
                        <Icon className="h-6 w-6 text-[#C38818]" />
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform ${active ? 'translate-x-1 text-[#C38818]' : 'text-gray-600 group-hover:translate-x-1 group-hover:text-[#C38818]'}`} />
                    </div>
                    <h3 className="mt-5 text-base font-bold">{industry.name}</h3>
                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">{industry.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {industry.quickServices.map((service) => (
                        <span key={service} className="rounded-full border border-[rgba(195,136,24,0.18)] px-2.5 py-1 text-[11px] font-medium text-[#C38818]">
                          {service}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <motion.div
              key={activeIndustry.short}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-lg border border-[rgba(195,136,24,0.16)] bg-[#141414] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(195,136,24,0.12)]">
                  <ActiveIcon className="h-6 w-6 text-[#C38818]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C38818]">{t('detailBadge')}</p>
                  <h2 className="text-xl font-bold">{activeIndustry.name}</h2>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <DetailBlock title={t('overviewTitle')} items={[activeIndustry.overview]} prose />
                <DetailBlock title={t('servicesTitle')} items={topServices} />
                <DetailBlock title={t('countriesTitle')} items={activeIndustry.countries} inline />
                <DetailBlock title={t('legalIssuesTitle')} items={activeIndustry.legalIssues} />
              </div>

              <Link
                href={`/${locale}/contact`}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C38818] px-5 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-[#F0C84A]"
              >
                {t('primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[rgba(195,136,24,0.1)] bg-[#111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t('expertiseBadge')} title={t('expertiseTitle')} description={t('expertiseDescription')} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = statIcons[index] ?? BarChart3;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-lg border border-[rgba(195,136,24,0.12)] bg-[#161616] p-6"
                >
                  <Icon className="h-6 w-6 text-[#C38818]" />
                  <p className="mt-5 text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t('caseStudiesBadge')} title={t('caseStudiesTitle')} description={t('caseStudiesDescription')} />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-lg border border-[rgba(195,136,24,0.14)] bg-[#141414] p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[rgba(195,136,24,0.1)] px-3 py-1 text-xs font-semibold text-[#C38818]">{study.industry}</span>
                  <span className="text-xs text-gray-500">{study.country}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{study.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{study.summary}</p>
                <div className="mt-5 rounded-lg border border-[rgba(195,136,24,0.12)] bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C38818]">{t('resultLabel')}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-200">{study.result}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(195,136,24,0.1)] bg-[#111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t('jurisdictionsBadge')} title={t('jurisdictionsTitle')} description={t('jurisdictionsDescription')} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {jurisdictions.map((jurisdiction, index) => (
              <motion.div
                key={jurisdiction.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="rounded-lg border border-[rgba(195,136,24,0.12)] bg-[#161616] p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{jurisdiction.flag}</span>
                  <h3 className="font-bold">{jurisdiction.name}</h3>
                </div>
                <InfoRow label={t('jurisdictionServices')} value={jurisdiction.services} />
                <InfoRow label={t('jurisdictionTimeline')} value={jurisdiction.timeline} />
                <InfoRow label={t('jurisdictionScope')} value={jurisdiction.scope} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{t('faqBadge')}</p>
            <h2 className="mt-2 text-3xl font-bold">{t('faqTitle')}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-[rgba(195,136,24,0.14)] bg-[#161616] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                  {faq.question}
                  <span className="text-[#C38818] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(195,136,24,0.1)] bg-[#111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[rgba(195,136,24,0.18)] bg-[#151515] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{t('ctaBadge')}</p>
              <h2 className="mt-2 text-3xl font-bold">{t('ctaTitle')}</h2>
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#C38818]" />{t('ctaResponse')}</span>
                <span className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#C38818]" />{t('ctaFreeConsultation')}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C38818] px-5 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-[#F0C84A]">
                {t('primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(195,136,24,0.28)] px-5 py-3 text-sm font-semibold text-[#C38818] transition-colors hover:bg-[rgba(195,136,24,0.08)]">
                {t('secondaryCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailBlock({ title, items, inline, prose }: { title: string; items: string[]; inline?: boolean; prose?: boolean }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {prose ? (
        <p className="mt-2 text-sm leading-6 text-gray-400">{items[0]}</p>
      ) : inline ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-[rgba(195,136,24,0.18)] px-3 py-1 text-xs text-[#C38818]">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-5 text-gray-400">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#C38818]" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C38818]">{label}</p>
      <p className="mt-1 text-sm leading-5 text-gray-300">{value}</p>
    </div>
  );
}
