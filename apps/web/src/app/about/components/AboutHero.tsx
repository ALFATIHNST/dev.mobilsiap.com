'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';


export default function AboutHero() {
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

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080810 0%, #0d0d1a 100%)' }}>
      <div className="grain-overlay" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,24,30,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7 reveal-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
              style={{ background: 'rgba(200,24,30,0.1)', border: '1px solid rgba(200,24,30,0.2)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="section-label">Tentang MobilSiap</span>
            </div>
            <h1 className="text-hero-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
              Marketplace Mobil<br />
              <span className="text-primary italic">yang Lahir dari</span><br />
              Kepercayaan.
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              MobilSiap didirikan pada 2019 dengan satu misi sederhana: membuat proses jual beli mobil bekas menjadi <strong className="text-white">transparan, aman, dan menyenangkan</strong> bagi semua pihak.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1f423b317-1763295741961.png"
                  alt="Founder MobilSiap pria Indonesia 40an senyum ramah headshot profesional"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>Hendra Kusuma</p>
                <p className="text-xs text-white/40">Founder & CEO, MobilSiap</p>
              </div>
            </div>
          </div>

          <div className="reveal-up reveal-delay-2 relative">
            <div className="rounded-4xl overflow-hidden aspect-[4/3] shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
              <AppImage
                src="https://images.unsplash.com/photo-1727893219229-2ab1b3e6b0df"
                alt="MobilSiap showroom interior bright clean modern car dealership Bandung Indonesia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority />
            </div>
            <div className="absolute -bottom-5 -left-5 text-white px-6 py-4 rounded-2xl shadow-xl"
              style={{ background: 'linear-gradient(135deg, #C8181E 0%, #a8141a 100%)', boxShadow: '0 8px 24px rgba(200,24,30,0.4)' }}>
              <p className="text-xs font-extrabold uppercase tracking-wider" style={{ fontWeight: 800 }}>Berdiri Sejak</p>
              <p className="text-2xl font-extrabold" style={{ fontWeight: 800 }}>2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}