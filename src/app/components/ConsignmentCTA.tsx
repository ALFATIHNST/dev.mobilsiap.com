'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const steps = [
  { icon: 'ClipboardDocumentListIcon', title: 'Isi Formulir', desc: 'Lengkapi data mobil dan info kontak Anda secara online.' },
  { icon: 'ShieldCheckIcon', title: 'Verifikasi Admin', desc: 'Tim kami menghubungi dan memverifikasi data dalam 1×24 jam.' },
  { icon: 'MegaphoneIcon', title: 'Mobil Tayang', desc: 'Setelah disetujui, mobil langsung dipasarkan ke ribuan calon pembeli.' },
];

export default function ConsignmentCTA() {
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
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(10,10,16,0.95)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-5xl p-8 md:p-16 relative overflow-hidden"
          style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
          {/* Decorative */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(200,24,30,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(100,50,200,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="space-y-7 reveal-up">
              <div className="space-y-3">
                <span className="section-label">Titip Jual Mobil</span>
                <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
                  Jual Mobil Anda<br />
                  <span className="text-primary">Cepat & Aman.</span>
                </h2>
              </div>
              <p className="text-white/50 leading-relaxed text-lg">
                Tidak perlu repot pasang iklan sendiri. Kami yang urus pemasaran, negosiasi, dan administrasi. <strong className="text-white">Anda cukup terima uangnya.</strong>
              </p>
              <div className="flex flex-wrap gap-3">
                {['Tanpa Biaya Di Muka', 'Proses Transparan', 'Jangkauan Luas'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(200,24,30,0.1)', border: '1px solid rgba(200,24,30,0.2)' }}>
                    <Icon name="CheckCircleIcon" size={14} className="text-primary" />
                    <span className="text-xs font-700 text-primary" style={{ fontWeight: 700 }}>{tag}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/consignment" className="btn-primary py-4 px-8 text-sm">
                  <Icon name="ClipboardDocumentListIcon" size={16} className="text-white" />
                  Mulai Titip Jual
                </Link>
                <a
                  href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20bertanya%20tentang%20titip%20jual%20mobil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 px-8 rounded-full text-white text-sm font-700 hover:bg-white/10 transition-all"
                  style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>

            {/* Right — 3-step process */}
            <div className="space-y-4 reveal-up reveal-delay-2">
              <p className="text-xs font-700 text-white/40 uppercase tracking-wider mb-6" style={{ fontWeight: 700 }}>
                Alur Titip Jual
              </p>
              {steps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-5 p-5 rounded-2xl transition-all group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors"
                    style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                    <Icon
                      name={step.icon as Parameters<typeof Icon>[0]['name']}
                      size={20}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-white/30" style={{ fontWeight: 800 }}>
                        0{i + 1}
                      </span>
                      <h3 className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}