'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const contactChannels = [
  {
    icon: 'ChatBubbleOvalLeftEllipsisIcon',
    title: 'WhatsApp',
    value: '+62 858-8302-7422',
    sub: 'Respons dalam 15 menit',
    href: 'https://wa.me/6285883027422',
    color: 'bg-green-50 text-green-600',
    hoverBorder: 'hover:border-green-200',
  },
  {
    icon: 'CameraIcon',
    title: 'Instagram',
    value: '@mobilsiap',
    sub: 'Lihat foto koleksi terbaru',
    href: 'https://instagram.com/mobilsiap',
    color: 'bg-pink-50 text-pink-600',
    hoverBorder: 'hover:border-pink-200',
  },
  {
    icon: 'MapPinIcon',
    title: 'Showroom',
    value: 'Jl. Raya Otomotif No. 88',
    sub: 'Bandung, Jawa Barat 40123',
    href: 'https://maps.google.com',
    color: 'bg-red-50 text-primary',
    hoverBorder: 'hover:border-red-200',
  },
  {
    icon: 'ClockIcon',
    title: 'Jam Buka',
    value: 'Senin – Sabtu',
    sub: '08.00 – 18.00 WIB',
    href: null,
    color: 'bg-blue-50 text-blue-600',
    hoverBorder: 'hover:border-blue-200',
  },
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el) => el.classList.add('active'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.9)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactChannels.map((channel, i) => {
            const content = (
              <div
                className={`reveal-up reveal-delay-${i + 1} rounded-3xl p-6 flex items-start gap-4 card-hover glass-card-hover transition-all`}
                style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(200,24,30,0.12)', border: '1px solid rgba(200,24,30,0.15)' }}>
                  <Icon name={channel.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-700 text-white/40 uppercase tracking-wider mb-1" style={{ fontWeight: 700 }}>
                    {channel.title}
                  </p>
                  <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>{channel.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{channel.sub}</p>
                </div>
              </div>
            );
            return channel.href ? (
              <a key={channel.title} href={channel.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={channel.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}