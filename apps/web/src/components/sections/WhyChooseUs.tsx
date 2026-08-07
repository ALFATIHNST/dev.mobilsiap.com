'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const benefits = [
  { icon: 'ShieldCheckIcon', title: 'Mobil Berkualitas', desc: 'Setiap unit melewati inspeksi 150 titik oleh teknisi bersertifikat.' },
  { icon: 'MagnifyingGlassIcon', title: 'Inspeksi Menyeluruh', desc: 'Mesin, bodi, interior, dan dokumen diperiksa secara teliti sebelum dijual.' },
  { icon: 'CurrencyDollarIcon', title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi. Harga yang tertera adalah harga final.' },
  { icon: 'CreditCardIcon', title: 'Bisa Kredit', desc: 'Tersedia cicilan ringan dengan berbagai skema melalui bank mitra terpercaya.' },
  { icon: 'WrenchScrewdriverIcon', title: 'Garansi Mesin', desc: 'Garansi mesin 3 bulan tersedia untuk unit pilihan. Beli dengan tenang.' },
  { icon: 'BoltIcon', title: 'Proses Cepat', desc: 'Dari survey hingga BPKB di tangan, proses selesai dalam 1–3 hari kerja.' },
];

const stats = [
  { value: '2.400+', label: 'Mobil Terjual' },
  { value: '98%', label: 'Kepuasan Pelanggan' },
  { value: '7 Tahun', label: 'Pengalaman' },
  { value: '150 Titik', label: 'Poin Inspeksi' },
];

export default function WhyChooseUs() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 diagonal-bg text-white overflow-hidden relative">
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #C8181E 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(100,50,200,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — sticky info */}
          <div className="lg:col-span-5 space-y-8 reveal-up">
            <div className="space-y-4">
              <span className="text-primary text-xs font-700 uppercase tracking-[0.4em]" style={{ fontWeight: 700 }}>
                Kenapa Kami?
              </span>
              <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
                Beli Mobil<br />
                <span className="text-primary italic">Tanpa Khawatir.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Kami telah membantu lebih dari 2.400 pelanggan menemukan mobil impian mereka sejak 2019. Kepercayaan Anda adalah prioritas utama kami.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl p-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                  <p className="text-3xl font-extrabold text-primary" style={{ fontWeight: 800 }}>
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs font-600 mt-1" style={{ fontWeight: 600 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/mobil" className="btn-primary py-3.5 px-7 text-sm">
                <Icon name="TruckIcon" size={16} className="text-white" />
                Lihat Mobil
              </Link>
              <Link href="/titip-jual" className="flex items-center gap-2 py-3.5 px-7 rounded-full text-white text-sm font-700 hover:bg-white/10 transition-all" style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)' }}>
                Titip Jual
                <Icon name="ArrowRightIcon" size={14} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Right — benefits grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`reveal-up reveal-delay-${(i % 5) + 1} rounded-2xl p-6 flex items-start gap-4 transition-all glass-card-hover`}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                  <Icon name={benefit.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm mb-1" style={{ fontWeight: 800 }}>
                    {benefit.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}