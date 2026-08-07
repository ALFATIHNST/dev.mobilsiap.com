'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Servis Berkala',
    desc: 'Ganti oli, filter, busi, dan pengecekan 30 poin standar pabrikan. Tepat waktu, harga transparan.',
    items: ['Ganti Oli & Filter', 'Cek Aki & Kelistrikan', 'Pengecekan 30 Poin'],
    price: 'Mulai Rp 150.000',
  },
  {
    icon: 'CogIcon',
    title: 'Perbaikan Mesin',
    desc: 'Diagnosa akurat dengan alat scan modern. Turun mesin, overhaul, penggantian komponen original.',
    items: ['Diagnosa Komputer', 'Turun Mesin', 'Komponen Original'],
    price: 'Mulai Rp 500.000',
  },
  {
    icon: 'PaintBrushIcon',
    title: 'Body Repair',
    desc: 'Perbaikan penyok, goresan, dan pengecatan ulang dengan teknik paintless dent removal.',
    items: ['Paintless Dent Repair', 'Pengecatan Ulang', 'Polish & Coating'],
    price: 'Mulai Rp 300.000',
  },
  {
    icon: 'SunIcon',
    title: 'Servis AC',
    desc: 'Isi freon, cuci evaporator, ganti kompressor. AC dingin kembali dalam 1–2 jam.',
    items: ['Isi Freon', 'Cuci Evaporator', 'Ganti Kompressor'],
    price: 'Mulai Rp 200.000',
  },
  {
    icon: 'TruckIcon',
    title: 'Kaki-kaki & Suspensi',
    desc: 'Ganti shock absorber, ball joint, tie rod, dan bushing. Berkendara lebih nyaman dan aman.',
    items: ['Ganti Shock Absorber', 'Ball Joint & Tie Rod', 'Wheel Bearing'],
    price: 'Mulai Rp 400.000',
  },
  {
    icon: 'BoltIcon',
    title: 'Kelistrikan',
    desc: 'Perbaikan sistem kelistrikan, audio, sensor, dan ECU. Diagnosa dengan alat modern.',
    items: ['Perbaikan ECU/Sensor', 'Sistem Audio', 'Instalasi Aksesoris'],
    price: 'Mulai Rp 250.000',
  },
];

export default function RepairServices() {
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
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="repair-services" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.9)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14 reveal-up">
          <span className="section-label">Layanan Bengkel</span>
          <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
            Semua Kebutuhan<br />
            <span className="text-primary">Servis Mobil Anda</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Bengkel modern dengan teknisi berpengalaman dan peralatan diagnostik terkini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal-up reveal-delay-${(i % 3) + 1} rounded-3xl p-7 flex flex-col gap-5 card-hover glass-card-hover group`}
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors"
                  style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                  <Icon
                    name={service.icon as Parameters<typeof Icon>[0]['name']}
                    size={24}
                    className="text-primary group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-xs font-700 text-primary px-3 py-1 rounded-full" style={{ fontWeight: 700, background: 'rgba(200,24,30,0.1)', border: '1px solid rgba(200,24,30,0.15)' }}>
                  {service.price}
                </span>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-extrabold text-white text-lg" style={{ fontWeight: 800 }}>{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </div>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/40">
                    <Icon name="CheckCircleIcon" size={13} className="text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/6285883027422?text=${encodeURIComponent(`Halo MobilSiap, saya ingin booking ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-700 transition-all"
                style={{ fontWeight: 700, background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80' }}
              >
                <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={13} />
                Booking Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}