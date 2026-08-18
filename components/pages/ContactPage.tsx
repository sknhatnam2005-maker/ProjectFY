'use client';

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Globe2,
  Headphones,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';

type Office = {
  country: string;
  city: string;
  address: string;
  type: string;
  mapX: number;
  mapY: number;
};

type ContactMethod = {
  label: string;
  value: string;
  href?: string;
  description?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  clientType: '',
  countries: [] as string[],
  services: [] as string[],
  budget: '',
  message: '',
  consultationDate: '',
  consultationTime: '',
  meetingPlatform: '',
};

const reasonIcons = [Clock, Globe2, Scale, LockKeyhole, Sparkles];

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [form, setForm] = useState(initialForm);

  const heroHighlights = t.raw('heroHighlights') as string[];
  const clientTypes = t.raw('clientTypes') as string[];
  const countryOptions = t.raw('countryOptions') as string[];
  const serviceOptions = t.raw('serviceOptions') as string[];
  const budgetOptions = t.raw('budgetOptions') as string[];
  const bookingPlatforms = t.raw('bookingPlatforms') as string[];
  const contactMethods = t.raw('contactMethods') as ContactMethod[];
  const offices = t.raw('offices') as Office[];
  const reasons = t.raw('reasons') as string[];
  const faqs = t.raw('faqs') as FaqItem[];

  const selectedOfficeData = offices[selectedOffice] ?? offices[0];
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const toggleOption = (field: 'countries' | 'services', value: string) => {
    setForm((current) => {
      const selected = current[field];
      return {
        ...current,
        [field]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.clientType || form.countries.length === 0 || form.services.length === 0) {
      setError(t('validationError'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('send_failed');
      setSubmitted(true);
    } catch {
      setError(t('sendError'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-lg border border-[rgba(195,136,24,0.22)] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#C38818]/70';
  const sectionClass = 'rounded-lg border border-[rgba(195,136,24,0.14)] bg-[#141414]';

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <section className="relative overflow-hidden border-b border-[rgba(195,136,24,0.1)] py-20 lg:py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(195,136,24,0.14) 0%, transparent 42%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.28)', color: '#C38818' }}
            >
              <Headphones className="h-3.5 w-3.5" />
              {t('contactBadge')}
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
            {heroHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-[rgba(195,136,24,0.12)] bg-black/25 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 flex-none text-[#C38818]" />
                <span className="text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className={`${sectionClass} p-5 sm:p-8`}
          >
            {submitted ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(195,136,24,0.12)] text-[#C38818]">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">{t('messageSent')}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">{t('successMessage')}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C38818] px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                  >
                    {t('backHome')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(195,136,24,0.24)] px-5 py-3 text-sm font-semibold text-[#C38818] transition-colors hover:bg-[rgba(195,136,24,0.08)]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t('sendNewRequest')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{t('formHeading')}</p>
                  <h2 className="mt-2 text-2xl font-bold">{t('formTitle')}</h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label={t('formName')} required>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('formEmail')} required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('formPhone')}>
                    <input
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555 000 0000"
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('clientType')} required>
                    <div className="grid grid-cols-2 gap-3">
                      {clientTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, clientType: type })}
                          className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                            form.clientType === type
                              ? 'border-[#C38818] bg-[rgba(195,136,24,0.12)] text-[#F0C84A]'
                              : 'border-[rgba(195,136,24,0.18)] text-gray-400 hover:border-[rgba(195,136,24,0.45)]'
                          }`}
                        >
                          {type === clientTypes[0] ? <UserRound className="h-4 w-4" /> : <BriefcaseBusiness className="h-4 w-4" />}
                          {type}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <Field label={t('countriesInterested')} required>
                  <CheckboxGrid options={countryOptions} selected={form.countries} onToggle={(value) => toggleOption('countries', value)} />
                </Field>

                <Field label={t('servicesInterested')} required>
                  <CheckboxGrid options={serviceOptions} selected={form.services} onToggle={(value) => toggleOption('services', value)} />
                </Field>

                <Field label={t('budget')}>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass}>
                    <option value="">{t('budgetPlaceholder')}</option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid gap-5 md:grid-cols-3">
                  <Field label={t('consultationDate')}>
                    <input
                      type="date"
                      min={today}
                      value={form.consultationDate}
                      onChange={(e) => setForm({ ...form, consultationDate: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('consultationTime')}>
                    <input
                      type="time"
                      value={form.consultationTime}
                      onChange={(e) => setForm({ ...form, consultationTime: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('meetingPlatform')}>
                    <select
                      value={form.meetingPlatform}
                      onChange={(e) => setForm({ ...form, meetingPlatform: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">{t('meetingPlaceholder')}</option>
                      {bookingPlatforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label={t('formMessage')} required>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <p className="text-xs leading-6 text-gray-500">{t('formDisclaimer')}</p>
                {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C38818] px-5 py-4 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-[#F0C84A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      {t('formSending')}
                    </>
                  ) : (
                    <>
                      {t('formSubmit')}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <aside className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className={`${sectionClass} p-5`}
            >
              <h2 className="text-xl font-bold">{t('contactInfoTitle')}</h2>
              <div className="mt-5 space-y-4">
                {contactMethods.map((method) => (
                  <ContactMethodCard key={method.label} method={method} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className={`${sectionClass} p-5`}
            >
              <h2 className="text-xl font-bold">{t('officeTitle')}</h2>
              <div className="mt-5 space-y-3">
                {offices.map((office, index) => (
                  <button
                    type="button"
                    key={`${office.country}-${office.city}`}
                    onClick={() => setSelectedOffice(index)}
                    className={`w-full rounded-lg border p-4 text-left transition-all hover:-translate-y-0.5 ${
                      selectedOffice === index
                        ? 'border-[#C38818] bg-[rgba(195,136,24,0.1)]'
                        : 'border-[rgba(195,136,24,0.12)] bg-black/20 hover:border-[rgba(195,136,24,0.35)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-none text-[#C38818]" />
                      <div>
                        <p className="text-sm font-semibold text-white">{office.country}</p>
                        <p className="mt-1 text-xs text-[#C38818]">{office.city} · {office.type}</p>
                        <p className="mt-2 text-xs leading-5 text-gray-500">{office.address}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[rgba(195,136,24,0.1)] bg-[#111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C38818]">{t('whyBadge')}</p>
            <h2 className="mt-2 text-3xl font-bold">{t('whyTitle')}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[index] ?? ShieldCheck;
              return (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="rounded-lg border border-[rgba(195,136,24,0.12)] bg-[#161616] p-5 transition-transform hover:-translate-y-1"
                >
                  <Icon className="h-6 w-6 text-[#C38818]" />
                  <p className="mt-4 text-sm font-semibold leading-6">{reason}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className={`${sectionClass} p-6 sm:p-8`}
          >
            <div className="flex items-center gap-3">
              <CalendarDays className="h-7 w-7 text-[#C38818]" />
              <h2 className="text-2xl font-bold">{t('bookingTitle')}</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-400">{t('bookingDescription')}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {bookingPlatforms.map((platform) => (
                <div key={platform} className="rounded-lg border border-[rgba(195,136,24,0.14)] bg-black/20 p-4 text-sm font-semibold text-gray-200">
                  {platform}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className={`${sectionClass} p-6 sm:p-8`}
          >
            <h2 className="text-2xl font-bold">{t('mapTitle')}</h2>
            <p className="mt-3 text-sm text-gray-400">{t('mapDescription')}</p>
            <div className="relative mt-6 h-72 overflow-hidden rounded-lg border border-[rgba(195,136,24,0.14)] bg-[#0A0A0A]">
              <WorldMap />
              {offices.map((office, index) => (
                <button
                  key={`${office.city}-marker`}
                  type="button"
                  onClick={() => setSelectedOffice(index)}
                  className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0A0A0A] bg-[#C38818] shadow-[0_0_0_6px_rgba(195,136,24,0.18)] transition-transform hover:scale-125"
                  style={{ left: `${office.mapX}%`, top: `${office.mapY}%` }}
                  aria-label={office.city}
                />
              ))}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-[rgba(195,136,24,0.18)] bg-black/75 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{selectedOfficeData.country}</p>
                <p className="mt-1 text-xs text-[#C38818]">{selectedOfficeData.city} · {selectedOfficeData.type}</p>
                <p className="mt-2 text-xs leading-5 text-gray-400">{selectedOfficeData.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[rgba(195,136,24,0.1)] bg-[#111] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">{t('faqTitle')}</h2>
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
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-[#C38818]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function CheckboxGrid({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`flex min-h-12 items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
              active
                ? 'border-[#C38818] bg-[rgba(195,136,24,0.12)] text-[#F0C84A]'
                : 'border-[rgba(195,136,24,0.18)] text-gray-400 hover:border-[rgba(195,136,24,0.45)]'
            }`}
          >
            <span className={`flex h-4 w-4 flex-none items-center justify-center rounded border ${active ? 'border-[#C38818] bg-[#C38818]' : 'border-gray-600'}`}>
              {active && <Check className="h-3 w-3 text-black" />}
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
}

function ContactMethodCard({ method }: { method: ContactMethod }) {
  const iconClass = 'h-5 w-5 text-[#C38818]';
  const Icon = method.label.toLowerCase().includes('email')
    ? Mail
    : method.label.toLowerCase().includes('whatsapp')
      ? MessageCircle
      : method.label.toLowerCase().includes('phone') ||
          method.label.toLowerCase().includes('hotline') ||
          method.label.toLowerCase().includes('điện') ||
          method.label.toLowerCase().includes('電話')
        ? Phone
        : Clock;

  const content = (
    <div className="flex items-start gap-3 rounded-lg border border-[rgba(195,136,24,0.12)] bg-black/20 p-4 transition-colors hover:border-[rgba(195,136,24,0.35)]">
      <Icon className={iconClass} />
      <div>
        <p className="text-sm font-semibold text-white">{method.label}</p>
        <p className="mt-1 text-sm text-gray-300">{method.value}</p>
        {method.description && <p className="mt-1 text-xs text-gray-500">{method.description}</p>}
      </div>
    </div>
  );

  return method.href ? (
    <a href={method.href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function WorldMap() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 900 420" role="img" aria-label="World office map">
      <defs>
        <linearGradient id="mapFill" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#2A2114" />
          <stop offset="1" stopColor="#171717" />
        </linearGradient>
      </defs>
      <rect width="900" height="420" fill="#0A0A0A" />
      <path d="M122 142 176 105l78 17 50 42-31 42-78 5-54-24-47 24-32-32zM316 112l66-28 93 18 47 46-12 57-66 14-72-28-61 12-36-44zM566 132l74-39 98 15 55 50-33 42-82-7-42 30-58-22zM446 250l64-24 73 24 18 52-47 44-77-8-42-42zM634 276l90-18 70 42 12 50-62 32-88-18-45-42z" fill="url(#mapFill)" stroke="rgba(195,136,24,0.28)" strokeWidth="1.2" />
      <path d="M65 76h770M65 144h770M65 212h770M65 280h770M65 348h770M140 40v340M300 40v340M460 40v340M620 40v340M780 40v340" stroke="rgba(255,255,255,0.04)" />
    </svg>
  );
}
