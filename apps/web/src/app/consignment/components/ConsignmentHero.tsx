'use client';

import React, { useEffect, useRef } from 'react';

import Icon from '@/components/ui/AppIcon';

export default function ConsignmentHero() {
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
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080810 0%, #0d0d1a 100%)' }}>
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,24,30,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div className="grain-overlay" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7 reveal-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
              style={{ background: 'rgba(200,24,30,0.1)', border: '1px solid rgba(200,24,30,0.2)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="section-label">Titip Jual Mobil</span>
            </div>
            <h1 className="text-hero-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
              Jual Mobil Anda<br />
              <span className="text-primary italic">Tanpa Repot,</span><br />
              <span className="text-white/20">Hasil Maksimal.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              Percayakan penjualan mobil Anda kepada tim profesional MobilSiap. Kami yang urus segalanya — dari foto, iklan, negosiasi, hingga administrasi. <strong className="text-white">Anda cukup tunggu kabar baik.</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: 'CheckCircleIcon', text: 'Tanpa Biaya Di Muka' },
                { icon: 'CheckCircleIcon', text: 'Proses Transparan' },
                { icon: 'CheckCircleIcon', text: 'Jangkauan 10.000+ Calon Pembeli' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-primary" />
                  <span className="text-xs font-700 text-white/70" style={{ fontWeight: 700 }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#consignment-form" className="btn-primary py-4 px-8 text-sm">
                <Icon name="ClipboardDocumentListIcon" size={16} className="text-white" />
                Daftarkan Mobil Saya
              </a>
              <a
                href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20titip%20jual%20mobil%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 px-8 rounded-full text-white text-sm font-700 transition-all"
                style={{ fontWeight: 700, background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80' }}
              >
                <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={16} />
                Tanya via WhatsApp
              </a>
            </div>
          </div>

          {/* Right — stats cards */}
          <div className="reveal-up reveal-delay-2 grid grid-cols-2 gap-4">
            {[
              { value: '2.400+', label: 'Mobil Berhasil Terjual', icon: 'TruckIcon', accent: 'rgba(200,24,30,0.15)' },
              { value: '3 Minggu', label: 'Rata-rata Waktu Terjual', icon: 'ClockIcon', accent: 'rgba(34,197,94,0.1)' },
              { value: '98%', label: 'Pemilik Puas dengan Harga', icon: 'FaceSmileIcon', accent: 'rgba(59,130,246,0.1)' },
              { value: '0 Biaya', label: 'Di Muka, Bayar Saat Terjual', icon: 'CurrencyDollarIcon', accent: 'rgba(245,158,11,0.1)' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl p-6 space-y-3 card-hover glass-card-hover"
                style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: stat.accent, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-primary" />
                </div>
                <p className="text-2xl font-extrabold text-white" style={{ fontWeight: 800 }}>{stat.value}</p>
                <p className="text-xs text-white/40 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}