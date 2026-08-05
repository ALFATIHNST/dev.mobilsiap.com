'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const team = [
{
  name: 'Hendra Kusuma',
  role: 'Founder & CEO',
  bio: '15 tahun di industri otomotif. Membangun MobilSiap dari nol dengan visi transparansi penuh.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_125d4f888-1763293257228.png",
  imageAlt: 'Hendra Kusuma pria Indonesia 40an senyum ramah professional headshot'
},
{
  name: 'Dewi Anggraeni',
  role: 'Head of Sales',
  bio: 'Spesialis negosiasi dengan rekam jejak menutup lebih dari 800 transaksi sukses.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1f133c9-1763301094726.png",
  imageAlt: 'Dewi Anggraeni wanita Indonesia 30an profesional senyum percaya diri headshot'
},
{
  name: 'Rizky Pratama',
  role: 'Chief Inspector',
  bio: 'Teknisi bersertifikat dengan keahlian inspeksi kendaraan selama 12 tahun.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15eb4cbf2-1763298660942.png",
  imageAlt: 'Rizky Pratama pria Indonesia muda profesional baju kerja headshot outdoor'
},
{
  name: 'Sari Wulandari',
  role: 'Customer Relations',
  bio: 'Memastikan setiap pelanggan mendapat pengalaman terbaik dari awal hingga akhir.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cdf5ed60-1763300721487.png",
  imageAlt: 'Sari Wulandari wanita Indonesia 30an ramah senyum customer service headshot'
}];


export default function AboutTeam() {
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.9)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14 reveal-up">
          <span className="section-label">Tim Kami</span>
          <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
            Orang-orang di Balik<br />
            <span className="text-primary">MobilSiap</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) =>
          <div
            key={member.name}
            className={`reveal-up reveal-delay-${i + 1} rounded-3xl overflow-hidden card-hover glass-card-hover`}
            style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            
              <div className="relative h-64 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <AppImage
                src={member.image}
                alt={member.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-extrabold text-white text-base" style={{ fontWeight: 800 }}>{member.name}</h3>
                <p className="text-primary text-xs font-700" style={{ fontWeight: 700 }}>{member.role}</p>
                <p className="text-white/40 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Values */}
        <div className="mt-16 rounded-4xl p-8 md:p-12 reveal-up"
          style={{ background: 'rgba(18,18,28,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="text-2xl font-extrabold text-white mb-8 text-center" style={{ fontWeight: 800 }}>
            Nilai-nilai yang Kami Pegang
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
            { icon: 'EyeIcon', title: 'Transparansi', desc: 'Setiap detail harga, kondisi, dan proses kami sampaikan dengan jujur.' },
            { icon: 'HandRaisedIcon', title: 'Integritas', desc: 'Kepercayaan pelanggan adalah aset paling berharga yang kami jaga.' },
            { icon: 'BoltIcon', title: 'Kecepatan', desc: 'Proses yang efisien tanpa mengorbankan kualitas dan ketelitian.' }].
            map((value) =>
            <div key={value.title} className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: 'rgba(200,24,30,0.15)', border: '1px solid rgba(200,24,30,0.2)' }}>
                  <Icon name={value.icon as Parameters<typeof Icon>[0]['name']} size={26} className="text-primary" />
                </div>
                <h4 className="font-extrabold text-white" style={{ fontWeight: 800 }}>{value.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}