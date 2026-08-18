'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, PhoneCall, X } from 'lucide-react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { SiWechat, SiZalo } from 'react-icons/si';

const PHONE_NUMBER = '13072400206';
const ZALO_PHONE = '0389396996';
const WHATSAPP_PHONE = '84389396996';
const TELEGRAM_USERNAME = 'IP2protector';
const WECHAT_ID = 'wxid_s63uhd6gjcka12';

export default function FloatingContact() {
  const t = useTranslations('floatingContact');
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactItems = [
    {
      name: 'Zalo',
      label: t('zalo'),
      href: `https://zalo.me/${ZALO_PHONE}`,
      glyph: <SiZalo />,
      tone: '#0068FF',
    },
    {
      name: 'WhatsApp',
      label: t('whatsapp'),
      href: `https://wa.me/${WHATSAPP_PHONE}`,
      glyph: <FaWhatsapp />,
      tone: '#25D366',
    },
    {
      name: 'Telegram',
      label: t('telegram'),
      href: `https://t.me/${TELEGRAM_USERNAME}`,
      glyph: <FaTelegramPlane />,
      tone: '#229ED9',
    },
  ];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div ref={rootRef} className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <div
        className={`floating-contact-menu flex flex-col items-end gap-2 ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        {contactItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            aria-label={t('channelAria', { channel: item.name })}
            className="floating-contact-item"
            style={{ '--contact-tone': item.tone } as CSSProperties}
          >
            <span className="floating-contact-label">{item.label}</span>
            <span className="floating-contact-button">{item.glyph}</span>
          </a>
        ))}

        <button
          type="button"
          onClick={copyWechat}
          tabIndex={open ? 0 : -1}
          aria-label={t('wechatAria')}
          className="floating-contact-item"
          style={{ '--contact-tone': '#07C160' } as CSSProperties}
        >
          <span className="floating-contact-label">{copied ? t('copied') : t('wechat')}</span>
          <span className="floating-contact-button"><SiWechat /></span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t('hideAria') : t('showAria')}
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-[rgba(195,136,24,0.36)] bg-[#120f0c]/95 px-3.5 py-2.5 text-xs font-semibold text-[#F0C84A] shadow-[0_16px_45px_rgba(0,0,0,0.42)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(240,200,74,0.72)] hover:bg-[#17110c]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8A5D0A,#F0C84A)] text-black shadow-[0_8px_24px_rgba(195,136,24,0.28)]">
          {open ? <X className="h-4 w-4" strokeWidth={1.8} /> : <PhoneCall className="h-4 w-4" strokeWidth={1.8} />}
        </span>
        <span className="hidden sm:inline">{t('quickContact')}</span>
        <MessageCircle className={`h-4 w-4 text-[#C38818] transition-transform duration-300 ${open ? 'rotate-12' : 'group-hover:translate-x-0.5'}`} strokeWidth={1.8} />
      </button>

      <a
        href={`tel:+${PHONE_NUMBER}`}
        className={`floating-phone-link ${open ? 'is-open' : ''}`}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label={t('callAria')}
      >
        {t('callHotline')}
      </a>
    </div>
  );
}
