'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactMap() {
  const socialLinks = [
    { icon: 'ChatBubbleOvalLeftEllipsisIcon', label: 'WhatsApp', href: 'https://wa.me/6285883027422', color: 'bg-green-500 hover:bg-green-600' },
    { icon: 'CameraIcon', label: 'Instagram', href: 'https://instagram.com/mobilsiap', color: 'bg-pink-500 hover:bg-pink-600' },
    { icon: 'MusicalNoteIcon', label: 'TikTok', href: 'https://tiktok.com/@mobilsiap', color: 'bg-secondary hover:bg-secondary/80' },
    { icon: 'UserGroupIcon', label: 'Facebook', href: 'https://facebook.com/mobilsiap', color: 'bg-blue-600 hover:bg-blue-700' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-white" style={{ fontWeight: 800 }}>
        Lokasi Showroom
      </h2>

      {/* Map placeholder */}
      <div className="relative rounded-3xl overflow-hidden h-64 flex items-center justify-center"
        style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-center space-y-3">
          <Icon name="MapPinIcon" size={40} className="mx-auto text-primary" />
          <p className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>MobilSiap Showroom</p>
          <p className="text-white/40 text-xs">Jl. Raya Otomotif No. 88, Bandung</p>
          <a
            href="https://maps.google.com/?q=Bandung+Jawa+Barat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary text-xs py-2 px-5"
          >
            <Icon name="MapPinIcon" size={13} className="text-white" />
            Buka di Google Maps
          </a>
        </div>
      </div>

      {/* Address detail */}
      <div className="rounded-3xl p-6 space-y-4"
        style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="font-extrabold text-white text-base" style={{ fontWeight: 800 }}>Detail Lokasi</h3>
        <div className="space-y-3">
          {[
            { icon: 'MapPinIcon', label: 'Alamat', value: 'Jl. Raya Otomotif No. 88, Bandung, Jawa Barat 40123' },
            { icon: 'PhoneIcon', label: 'Telepon', value: '+62 812-3456-7890' },
            { icon: 'EnvelopeIcon', label: 'Email', value: 'info@mobilsiap.co.id' },
            { icon: 'ClockIcon', label: 'Jam Buka', value: 'Senin–Sabtu 08.00–18.00 · Minggu 09.00–15.00' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/40">{item.label}</p>
                <p className="text-sm font-600 text-white/80" style={{ fontWeight: 600 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-3">
        <p className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>Ikuti Kami di Media Sosial</p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full ${social.color} text-white text-xs font-700 transition-all`}
              style={{ fontWeight: 700 }}
            >
              <Icon name={social.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-white" />
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}