'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { value: '7+', label: 'Tahun Berpengalaman', icon: 'CalendarIcon' },
  { value: '2.400+', label: 'Mobil Berhasil Terjual', icon: 'TruckIcon' },
  { value: '4.800+', label: 'Pelanggan Puas', icon: 'UserGroupIcon' },
  { value: '98%', label: 'Tingkat Kepuasan', icon: 'StarIcon' },
  { value: '150', label: 'Poin Inspeksi', icon: 'ShieldCheckIcon' },
  { value: '1 Hari', label: 'Proses Administrasi', icon: 'BoltIcon' },
];

export default function AboutStats() {
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
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 diagonal-bg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal-up reveal-delay-${(i % 5) + 1} text-center space-y-2`}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
                style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-primary" />
              </div>
              <p className="text-2xl font-extrabold text-white" style={{ fontWeight: 800 }}>{stat.value}</p>
              <p className="text-white/40 text-xs leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}