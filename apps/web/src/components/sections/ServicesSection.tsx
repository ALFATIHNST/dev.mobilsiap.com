'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT:
// Array has 4 cards: [JualMobil, TitipJual, Reparasi, Spooring]
// 4-col grid, 2 rows (300px each):
// Row 1: [col-1-2: JualMobil cs-2 rs-2] [col-3: TitipJual cs-1 rs-2] [col-4: Reparasi cs-1 rs-1]
// Row 2: [col-1-2: (occupied)]          [col-3: (occupied)]           [col-4: Spooring cs-1 rs-1]
// Placed 4/4 cards ✓

const services = [
  {
    id: 'jual',
    number: '01',
    icon: 'TruckIcon',
    title: 'Jual Mobil Bekas',
    desc: 'Ratusan pilihan mobil berkualitas yang telah melalui inspeksi 150 titik oleh teknisi bersertifikat. Beli dengan percaya diri.',
    tags: ['Inspeksi 150 Titik', 'Garansi Mesin', 'BPKB Asli'],
    href: '/mobil',
    cta: 'Lihat Katalog',
    large: true,
    bg: 'from-primary/10 to-background',
    accent: true,
  },
  {
    id: 'titip',
    number: '02',
    icon: 'CurrencyDollarIcon',
    title: 'Titip Jual Mobil',
    desc: 'Kami bantu pasarkan mobil Anda hingga terjual. Proses transparan, tanpa biaya di muka.',
    tags: ['Tanpa Biaya Di Muka'],
    href: '/titip-jual',
    cta: 'Mulai Titip Jual',
    large: false,
    bg: 'from-secondary/5 to-background',
    accent: false,
  },
  {
    id: 'reparasi',
    number: '03',
    icon: 'WrenchScrewdriverIcon',
    title: 'Reparasi Mobil',
    desc: 'Servis berkala, perbaikan mesin, body repair, AC, kaki-kaki, dan kelistrikan oleh teknisi berpengalaman.',
    tags: ['Teknisi Bersertifikat'],
    href: '/reparasi',
    cta: 'Jadwalkan Servis',
    large: false,
    bg: 'from-muted to-background',
    accent: false,
  },
  {
    id: 'spooring',
    number: '04',
    icon: 'Cog6ToothIcon',
    title: 'Spooring & Balancing',
    desc: 'Peralatan modern dengan hasil lebih presisi. Kenyamanan berkendara dijamin.',
    tags: ['Alat Modern'],
    href: '/reparasi',
    cta: 'Booking Sekarang',
    large: false,
    bg: 'from-primary/5 to-background',
    accent: false,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el) => {
              el.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.9)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 reveal-up">
          <div className="space-y-3 max-w-2xl">
            <span className="section-label">Layanan Kami</span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              Solusi Otomotif<br />
              <span className="text-primary">Lengkap di Satu Tempat</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Dari beli mobil, jual mobil, hingga perawatan — semua tersedia di MobilSiap.
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div
          className="hidden lg:grid gap-5 reveal-up reveal-delay-2"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 280px)',
          }}
        >
          {/* Card 01 - JualMobil: col-span-2 row-span-2 */}
          <div
            className="relative overflow-hidden rounded-4xl p-10 flex flex-col justify-between group card-hover glass-card-hover"
            style={{ gridColumn: 'span 2', gridRow: 'span 2', background: 'rgba(200,24,30,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,24,30,0.15)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}
          >
            <div className="absolute inset-0 rounded-4xl" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,24,30,0.1) 0%, transparent 60%)' }} />
            <div className="relative flex justify-between items-start">
              <div
                className="text-primary/15 font-extrabold italic"
                style={{ fontSize: '5rem', lineHeight: 1, fontWeight: 800 }}
              >
                {services[0].number}
              </div>
              <span className="badge-inspeksi">Terlaris</span>
            </div>
            <div className="relative space-y-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                <Icon name={services[0].icon as Parameters<typeof Icon>[0]['name']} size={28} className="text-primary" />
              </div>
              <h3 className="text-3xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                {services[0].title}
              </h3>
              <p className="text-white/50 text-base leading-relaxed max-w-xs">
                {services[0].desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {services[0].tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ fontWeight: 700, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={services[0].href} className="btn-primary inline-flex text-sm py-2.5 px-6">
                {services[0].cta}
                <Icon name="ArrowRightIcon" size={14} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Card 02 - TitipJual: col-span-1 row-span-2 */}
          <div
            className="relative overflow-hidden rounded-4xl p-8 flex flex-col justify-between group card-hover glass-card-hover"
            style={{ gridColumn: 'span 1', gridRow: 'span 2', background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}
          >
            <div className="text-white/10 font-extrabold italic" style={{ fontSize: '4rem', lineHeight: 1, fontWeight: 800 }}>
              {services[1].number}
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                <Icon name={services[1].icon as Parameters<typeof Icon>[0]['name']} size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                {services[1].title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {services[1].desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {services[1].tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-700 text-white" style={{ fontWeight: 700, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={services[1].href} className="btn-secondary inline-flex text-xs py-2 px-5">
                {services[1].cta}
              </Link>
            </div>
          </div>

          {/* Card 03 - Reparasi: col-span-1 row-span-1 */}
          <div
            className="relative overflow-hidden rounded-4xl p-8 flex flex-col justify-between group card-hover glass-card-hover"
            style={{ gridColumn: 'span 1', gridRow: 'span 1', background: 'rgba(18,18,28,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
          >
            <div className="flex justify-between items-start text-primary">
              <Icon name={services[2].icon as Parameters<typeof Icon>[0]['name']} size={28} className="text-primary" />
              <span className="text-white/20 text-xs font-extrabold uppercase tracking-widest" style={{ fontWeight: 800 }}>
                Servis
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                {services[2].title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                {services[2].desc}
              </p>
              <Link href={services[2].href} className="text-primary text-xs font-700 hover:underline flex items-center gap-1" style={{ fontWeight: 700 }}>
                {services[2].cta} <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </Link>
            </div>
          </div>

          {/* Card 04 - Spooring: col-span-1 row-span-1 */}
          <div
            className="relative overflow-hidden rounded-4xl p-8 flex flex-col justify-between group card-hover glass-card-hover"
            style={{ gridColumn: 'span 1', gridRow: 'span 1', background: 'rgba(18,18,28,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
          >
            <div className="flex justify-between items-start">
              <Icon name={services[3].icon as Parameters<typeof Icon>[0]['name']} size={28} className="text-primary" />
              <span className="text-white/20 text-xs font-extrabold uppercase tracking-widest" style={{ fontWeight: 800 }}>
                Presisi
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                {services[3].title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                {services[3].desc}
              </p>
              <Link href={services[3].href} className="text-primary text-xs font-700 hover:underline flex items-center gap-1" style={{ fontWeight: 700 }}>
                {services[3].cta} <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: Stack */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`reveal-up reveal-delay-${i + 1} relative overflow-hidden rounded-3xl p-7 flex flex-col justify-between card-hover glass-card-hover`}
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                  <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={24} className="text-primary" />
                </div>
                <span className="text-white/15 font-extrabold italic text-3xl" style={{ fontWeight: 800 }}>
                  {service.number}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontWeight: 800 }}>
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <Link href={service.href} className="btn-primary inline-flex text-xs py-2 px-5 self-start">
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}