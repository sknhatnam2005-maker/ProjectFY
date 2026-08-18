'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

type Member = { name: string; role: string; credentials: string; bio: string };

// Real photos — same order as messages team.members
const memberPhotos = [
  '/images/quach-dai-nghia.jpg',
  '/images/quach-dai-hiep.jpg',
  '/images/bui-van-thu.jpg',
  '/images/nguyen-thi-huyen.jpg',
  '/images/luu-quang-anh.jpg',
  '/images/nguyen-phuong-thao.jpg',
  '/images/tran-thu-hoai.jpg',
];

function FounderCard({ member, photo }: { member: Member; photo: string }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-[#161616] border border-[rgba(195,136,24,0.15)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ isolation: 'isolate' }}>
      {/* Photo — taller for founders */}
      <div className="relative h-90 overflow-hidden"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${photo}')`,
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(22,22,22,0.97) 100%)',
        }} />
        {/* Founder label */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(195,136,24,0.9)', color: '#1a0000' }}>
            Founder
          </span>
        </div>
      </div>

      <div className="px-7 pb-7 -mt-3 relative z-10">
        <h2 className="text-white font-bold text-xl mb-0.5 group-hover:text-[#C38818] transition-colors">
          {member.name}
        </h2>
        <p className="text-sm font-medium mb-3" style={{ color: '#C38818' }}>{member.role}</p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mb-4"
          style={{ background: 'rgba(195,136,24,0.08)', border: '1px solid rgba(195,136,24,0.2)', color: '#C38818' }}>
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {member.credentials}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

function AssociateCard({ member, photo }: { member: Member; photo: string }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-[#161616] border border-[rgba(195,136,24,0.15)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ isolation: 'isolate' }}>
      {/* Photo — shorter for associates */}
      <div className="relative h-48 overflow-hidden"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${photo}')` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(22,22,22,0.97) 100%)',
        }} />
      </div>

      <div className="px-5 pb-6 -mt-2 relative z-10">
        <h3 className="text-white font-bold text-lg mb-0.5 group-hover:text-[#C38818] transition-colors">
          {member.name}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: '#C38818' }}>{member.role}</p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mb-3"
          style={{ background: 'rgba(195,136,24,0.08)', border: '1px solid rgba(195,136,24,0.2)', color: '#C38818' }}>
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {member.credentials.split('|')[0].trim()}
        </div>

        <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const t = useTranslations('team');
  const locale = useLocale();
  const members = t.raw('members') as Member[];

  const founders = members.slice(0, 2);
  const associates = members.slice(2);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <section className="py-20 relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(139,0,0,0.1) 0%, transparent 60%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ background: 'rgba(195,136,24,0.08)', borderColor: 'rgba(195,136,24,0.3)', color: '#C38818' }}>
              {t('teamBadge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #C38818, #F0C84A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {t('title')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>

          {/* Founders — 2 large featured cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {founders.map((member, i) => (
              <FounderCard key={i} member={member} photo={memberPhotos[i]} />
            ))}
          </div>

          {/* Associates — 3 smaller cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {associates.map((member, i) => (
              <AssociateCard key={i} member={member} photo={memberPhotos[i + 2]} />
            ))}
          </div>

          {/* Expertise bar */}
          <div className="mt-16 p-8 rounded-2xl border bg-[#161616] border-[rgba(195,136,24,0.15)]">
            <h2 className="text-xl font-bold text-white mb-6 text-center">{t('expertiseTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#C38818' }}>12+</div>
                <div className="text-gray-400 text-sm">{t('expertiseYears')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#C38818' }}>3</div>
                <div className="text-gray-400 text-sm">{t('expertiseBar')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#C38818' }}>180+</div>
                <div className="text-gray-400 text-sm">{t('expertiseCountries')}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl"
              style={{ background: 'linear-gradient(135deg, #8A5D0A, #F0C84A)', color: 'white' }}>
              {t('scheduleConsultation')}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
