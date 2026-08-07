'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const trustPoints = [
  {
    icon: 'LockClosedIcon',
    title: 'Data Anda Aman',
    desc: 'Semua informasi pribadi dan data mobil Anda dienkripsi dan tidak akan dibagikan kepada pihak ketiga tanpa izin.',
  },
  {
    icon: 'EyeIcon',
    title: 'Proses Transparan',
    desc: 'Anda mendapat laporan perkembangan pemasaran secara berkala. Tidak ada yang disembunyikan dari Anda.',
  },
  {
    icon: 'HandRaisedIcon',
    title: 'Tidak Ada Biaya Di Muka',
    desc: 'Komisi kami hanya diambil setelah mobil Anda terjual. Jika belum terjual, Anda tidak keluar biaya apapun.',
  },
  {
    icon: 'DocumentCheckIcon',
    title: 'Kontrak Resmi',
    desc: 'Proses titip jual dilengkapi dokumen perjanjian resmi yang melindungi hak kedua belah pihak secara hukum.',
  },
];

export default function ConsignmentTrust() {
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 diagonal-bg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6 reveal-up">
            <span className="text-primary text-xs font-700 uppercase tracking-[0.4em]" style={{ fontWeight: 700 }}>
              Titip Jual Aman
            </span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              Kenapa Titip Jual<br />
              <span className="text-primary italic">di MobilSiap?</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              Kami memahami bahwa mempercayakan mobil kesayangan Anda kepada pihak lain bukan keputusan mudah. Inilah komitmen kami kepada Anda.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
              <p className="text-white font-extrabold text-xl" style={{ fontWeight: 800 }}>
                &ldquo;Titip jual hanya 3 minggu, langsung ada pembeli serius. Harganya sesuai harapan.&rdquo;
              </p>
              <p className="text-white/50 text-sm">— Rini Puspitasari, Bandung · Toyota Innova 2019</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-up reveal-delay-2">
            {trustPoints.map((point, i) => (
              <div
                key={point.title}
                className={`reveal-up reveal-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name={point.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-primary" />
                </div>
                <h3 className="font-extrabold text-white text-sm mb-2" style={{ fontWeight: 800 }}>{point.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}