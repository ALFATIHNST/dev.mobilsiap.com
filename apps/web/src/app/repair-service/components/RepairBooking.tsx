'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RepairBooking() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const schedule = [
    { day: 'Senin – Jumat', hours: '08.00 – 17.00 WIB' },
    { day: 'Sabtu', hours: '08.00 – 15.00 WIB' },
    { day: 'Minggu', hours: 'Tutup' },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 diagonal-bg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7 reveal-up">
            <span className="text-primary text-xs font-700 uppercase tracking-[0.4em]" style={{ fontWeight: 700 }}>
              Booking Servis
            </span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              Jadwalkan Servis<br />
              <span className="text-primary italic">Hari Ini.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Booking mudah melalui WhatsApp. Tim kami akan konfirmasi jadwal dalam 30 menit. Tidak perlu antri lama.
            </p>
            <div className="space-y-3">
              <p className="text-white font-700 text-sm" style={{ fontWeight: 700 }}>Jam Operasional Bengkel:</p>
              {schedule?.map((item) => (
                <div key={item?.day} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                  <span className="text-white/70 text-sm">{item?.day}</span>
                  <span className={`text-sm font-700 ${item?.hours === 'Tutup' ? 'text-primary' : 'text-white'}`} style={{ fontWeight: 700 }}>
                    {item?.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up reveal-delay-2 space-y-5">
            <div className="rounded-4xl p-8 space-y-5"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="font-extrabold text-white text-xl" style={{ fontWeight: 800 }}>
                Cara Booking Servis
              </h3>
              {[
                { step: '01', text: 'Klik tombol WhatsApp di bawah' },
                { step: '02', text: 'Beritahu jenis servis yang dibutuhkan' },
                { step: '03', text: 'Pilih tanggal dan waktu yang tersedia' },
                { step: '04', text: 'Datang ke bengkel sesuai jadwal' },
              ]?.map((item) => (
                <div key={item?.step} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-extrabold" style={{ fontWeight: 800 }}>{item?.step}</span>
                  </div>
                  <p className="text-white/60 text-sm">{item?.text}</p>
                </div>
              ))}
              <a
                href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20booking%20servis%20mobil%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-white font-700 transition-all"
                style={{ fontWeight: 700, background: 'rgba(37,211,102,0.2)', border: '1px solid rgba(37,211,102,0.3)', color: '#4ade80' }}
              >
                <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={18} />
                Booking via WhatsApp Sekarang
              </a>
            </div>
            <div className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-700" style={{ fontWeight: 700 }}>Lokasi Bengkel</p>
                <p className="text-white/40 text-xs">Jl. Raya Otomotif No. 88, Bandung, Jawa Barat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}