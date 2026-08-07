'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  id: 1,
  name: 'Budi Santoso',
  role: 'Wiraswasta, Bandung',
  rating: 5,
  text: 'Pelayanan ramah dan profesional. Mobil sesuai foto dan deskripsi. Proses pembelian cepat, BPKB langsung di tangan dalam 2 hari.',
  car: 'Toyota Avanza 2021',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f423b317-1763295741961.png",
  avatarAlt: 'Indonesian man in 40s with friendly smile professional headshot',
  large: true
},
{
  id: 2,
  name: 'Siti Rahayu',
  role: 'Guru, Bandung',
  rating: 5,
  text: 'Titip jual hanya beberapa minggu langsung laku. Harga sesuai ekspektasi dan prosesnya transparan dari awal.',
  car: 'Titip Jual Honda Jazz',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7c66127-1763293866036.png",
  avatarAlt: 'Indonesian woman in 30s smiling professional portrait warm background',
  large: false
},
{
  id: 3,
  name: 'Agus Firmansyah',
  role: 'Karyawan Swasta, Cimahi',
  rating: 5,
  text: 'Senang banget bisa beli mobil impian dengan harga yang jelas. Tidak ada biaya tersembunyi dan bisa kredit murah.',
  car: 'Honda CR-V 2020',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0d40564-1763293591452.png",
  avatarAlt: 'Young Indonesian man casual shirt confident smile outdoor portrait',
  large: false
},
{
  id: 4,
  name: 'Dewi Kurniasari',
  role: 'Pengusaha, Bandung',
  rating: 5,
  text: 'Servis mobilnya juga bagus. Spooring dan balancing hasilnya presisi, mobil jadi nyaman lagi. Recommended!',
  car: 'Servis Mitsubishi Pajero',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19ee22433-1763301349777.png",
  avatarAlt: 'Indonesian woman entrepreneur 30s professional confident smile',
  large: false
}];


export default function TestimonialsSection() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.9)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 reveal-up">
          <div className="space-y-3">
            <span className="section-label">Testimoni Pelanggan</span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              Kata Mereka<br />
              <span className="text-primary">Tentang MobilSiap</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4"
            style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex">
              {[1, 2, 3, 4, 5]?.map((s) =>
              <Icon key={s} name="StarIcon" size={18} variant="solid" className="star-filled" />
              )}
            </div>
            <div>
              <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>4.9 / 5.0</p>
              <p className="text-xs text-white/40">dari 340+ ulasan</p>
            </div>
          </div>
        </div>

        {/* Asymmetric testimonial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large card */}
          <div className="lg:col-span-5 reveal-up">
            <div className="rounded-4xl p-8 h-full flex flex-col justify-between min-h-64 relative overflow-hidden"
              style={{ background: 'rgba(18,18,28,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #C8181E 0%, transparent 70%)', filter: 'blur(30px)' }} />
              
              <div className="flex mb-4">
                {Array.from({ length: testimonials?.[0]?.rating })?.map((_, i) =>
                <Icon key={i} name="StarIcon" size={16} variant="solid" className="star-filled" />
                )}
              </div>
              <blockquote className="text-xl font-600 text-white/80 leading-relaxed italic flex-1" style={{ fontWeight: 600 }}>
                &ldquo;{testimonials?.[0]?.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonials?.[0]?.avatar}
                    alt={testimonials?.[0]?.avatarAlt}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>
                    {testimonials?.[0]?.name}
                  </p>
                  <p className="text-white/40 text-xs">{testimonials?.[0]?.role}</p>
                  <p className="text-primary text-xs font-600 mt-0.5" style={{ fontWeight: 600 }}>
                    {testimonials?.[0]?.car}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — 3 small cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {testimonials?.slice(1)?.map((t, i) =>
            <div
              key={t?.id}
              className={`reveal-up reveal-delay-${i + 1} rounded-3xl p-6 flex flex-col justify-between card-hover glass-card-hover`}
              style={{ background: 'rgba(18,18,28,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              
                <div className="flex mb-3">
                  {Array.from({ length: t?.rating })?.map((_, j) =>
                <Icon key={j} name="StarIcon" size={14} variant="solid" className="star-filled" />
                )}
                </div>
                <blockquote className="text-sm text-white/50 leading-relaxed flex-1">
                  &ldquo;{t?.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                    src={t?.avatar}
                    alt={t?.avatarAlt}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>
                      {t?.name}
                    </p>
                    <p className="text-white/40 text-xs">{t?.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}