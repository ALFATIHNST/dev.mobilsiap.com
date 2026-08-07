'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function RepairSpooring() {
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(10,10,16,0.95)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-4xl overflow-hidden"
          style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d0aa9951-1764646705116.png"
                alt="Modern wheel alignment spooring balancing machine automotive workshop bright professional"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-white text-xs font-extrabold uppercase px-4 py-2 rounded-full" style={{ fontWeight: 800, background: 'linear-gradient(135deg, #C8181E 0%, #a8141a 100%)' }}>
                  Peralatan Modern 2024
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-7 reveal-up">
              <div className="space-y-3">
                <span className="section-label">Spooring & Balancing</span>
                <h2 className="text-3xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                  Presisi Tinggi untuk<br />
                  <span className="text-primary">Kenyamanan Maksimal</span>
                </h2>
              </div>
              <p className="text-white/50 leading-relaxed">
                Menggunakan mesin spooring digital 3D terbaru yang mampu mendeteksi ketidaksejajaran roda hingga 0.01 derajat. Hasilnya jauh lebih akurat dan tahan lama.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                { icon: 'Cog6ToothIcon', title: 'Spooring 4 Roda', price: 'Rp 150.000' },
                { icon: 'ArrowPathIcon', title: 'Balancing 4 Roda', price: 'Rp 100.000' },
                { icon: 'WrenchScrewdriverIcon', title: 'Rotasi Ban', price: 'Rp 75.000' },
                { icon: 'ShieldCheckIcon', title: 'Paket Komplit', price: 'Rp 280.000' }].
                map((item) =>
                <div key={item.title} className="rounded-2xl p-4 space-y-2"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                    <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>{item.title}</p>
                    <p className="text-primary text-xs font-700" style={{ fontWeight: 700 }}>{item.price}</p>
                  </div>
                )}
              </div>
              <a
                href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20booking%20spooring%20dan%20balancing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex py-3.5 px-7 text-sm">
                <Icon name="PhoneIcon" size={16} className="text-white" />
                Booking Spooring Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}