'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'ClipboardDocumentListIcon',
    title: 'Isi Formulir Online',
    desc: 'Lengkapi data mobil Anda — merek, tipe, tahun, kilometer, dan harga yang diinginkan. Upload foto mobil dari berbagai sudut.',
    detail: 'Formulir aman, data Anda terlindungi enkripsi SSL.',
  },
  {
    number: '02',
    icon: 'PhoneIcon',
    title: 'Verifikasi oleh Admin',
    desc: 'Tim kami menghubungi Anda dalam 1×24 jam untuk verifikasi data dan survei kondisi mobil secara langsung atau via foto.',
    detail: 'Tidak ada biaya survei. Gratis sepenuhnya.',
  },
  {
    number: '03',
    icon: 'MegaphoneIcon',
    title: 'Mobil Dipasarkan',
    desc: 'Setelah disetujui, foto profesional diambil dan mobil ditayangkan ke ribuan calon pembeli di platform MobilSiap dan media sosial.',
    detail: 'Rata-rata terjual dalam 3 minggu.',
  },
  {
    number: '04',
    icon: 'BanknotesIcon',
    title: 'Terima Pembayaran',
    desc: 'Begitu pembeli ditemukan dan deal disepakati, dana langsung ditransfer ke rekening Anda. Aman, cepat, dan transparan.',
    detail: 'Pembayaran penuh tanpa potongan tersembunyi.',
  },
];

export default function ConsignmentProcess() {
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(10,10,16,0.95)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-14 reveal-up">
          <span className="section-label">Alur Titip Jual</span>
          <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
            4 Langkah Mudah<br />
            <span className="text-primary">Mobil Anda Terjual</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Proses yang kami rancang untuk memastikan setiap tahap berjalan transparan dan nyaman bagi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal-up reveal-delay-${i + 1} relative rounded-3xl p-7 flex flex-col gap-5 card-hover glass-card-hover`}
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px z-10"
                  style={{ background: 'rgba(255,255,255,0.1)' }} />
              )}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                  <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={24} className="text-primary" />
                </div>
                <span className="text-3xl font-extrabold" style={{ fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>
                  {step.number}
                </span>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-extrabold text-white text-base" style={{ fontWeight: 800 }}>{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
              <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon name="CheckCircleIcon" size={14} className="text-green-400 flex-shrink-0" />
                <p className="text-xs text-green-400/70 font-600" style={{ fontWeight: 600 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}