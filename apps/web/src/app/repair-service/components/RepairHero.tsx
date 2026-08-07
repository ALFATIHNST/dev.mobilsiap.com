'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RepairHero() {
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
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 diagonal-bg text-white overflow-hidden">
      <div className="grain-overlay" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #C8181E 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl space-y-7 reveal-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white text-xs font-700 uppercase tracking-[0.4em]" style={{ fontWeight: 700 }}>
              Reparasi & Spooring
            </span>
          </div>
          <h1 className="text-hero-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
            Servis Mobil Anda<br />
            <span className="text-primary italic">oleh Teknisi</span><br />
            Bersertifikat.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            Dari servis berkala hingga perbaikan mesin besar — bengkel MobilSiap menggunakan peralatan modern dengan standar kualitas tertinggi.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20booking%20servis%20mobil"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-4 px-8 text-sm"
            >
              <Icon name="PhoneIcon" size={16} className="text-white" />
              Booking via WhatsApp
            </a>
            <a href="#repair-services" className="flex items-center gap-2 py-4 px-8 rounded-full border border-white/20 text-white text-sm font-700 hover:bg-white/10 transition-all" style={{ fontWeight: 700 }}>
              Lihat Layanan
              <Icon name="ArrowDownIcon" size={14} className="text-white" />
            </a>
          </div>
          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
            {[
              { icon: 'ClockIcon', text: 'Buka 6 Hari Seminggu' },
              { icon: 'ShieldCheckIcon', text: 'Garansi Servis 30 Hari' },
              { icon: 'WrenchScrewdriverIcon', text: 'Teknisi Bersertifikat' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary" />
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}