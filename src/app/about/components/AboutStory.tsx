'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const milestones = [
  { year: '2019', title: 'MobilSiap Didirikan', desc: 'Berawal dari garasi kecil di Bandung, dengan 12 unit mobil pertama dan tim 3 orang.' },
  { year: '2020', title: 'Ekspansi Digital', desc: 'Meluncurkan platform online pertama, memungkinkan pembeli melihat mobil dari rumah.' },
  { year: '2022', title: 'Layanan Titip Jual', desc: 'Meluncurkan layanan konsinyasi yang kini membantu ratusan pemilik mobil setiap bulan.' },
  { year: '2023', title: 'Bengkel & Spooring', desc: 'Membuka bengkel reparasi dan spooring dengan peralatan modern berteknologi terkini.' },
  { year: '2025', title: '2.000 Mobil Terjual', desc: 'Mencapai milestone 2.000 unit terjual dengan tingkat kepuasan pelanggan 98%.' },
  { year: '2026', title: 'Terus Berkembang', desc: 'Terus berinovasi untuk memberikan pengalaman jual beli mobil terbaik di Indonesia.' },
];

export default function AboutStory() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div className="space-y-6 reveal-up">
            <span className="section-label">Perjalanan Kami</span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              7 Tahun Membangun<br />
              <span className="text-primary">Kepercayaan</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              MobilSiap bukan sekadar marketplace. Kami adalah mitra perjalanan Anda dalam memiliki dan menjual mobil. Setiap keputusan yang kami buat selalu mengutamakan transparansi dan kepuasan pelanggan.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'ShieldCheckIcon', text: 'Inspeksi 150 titik di setiap unit yang dijual' },
                { icon: 'EyeIcon', text: 'Harga transparan tanpa biaya tersembunyi' },
                { icon: 'HandRaisedIcon', text: 'Garansi kepuasan atau uang kembali dalam 3 hari' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
                  </div>
                  <p className="text-white/70 text-sm font-600" style={{ fontWeight: 600 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 reveal-up reveal-delay-2">
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className={`reveal-up reveal-delay-${(i % 4) + 1} flex gap-5 items-start`}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-extrabold" style={{ fontWeight: 800 }}>
                      {milestone.year.slice(2)}
                    </span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 mt-2 min-h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                </div>
                <div className="pb-5 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-700 text-primary" style={{ fontWeight: 700 }}>{milestone.year}</span>
                    <h3 className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>{milestone.title}</h3>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}