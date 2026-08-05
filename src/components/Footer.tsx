import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Mobil Dijual', href: '/cars-for-sale' },
  { label: 'Titip Jual', href: '/consignment' },
  { label: 'Reparasi', href: '/repair-service' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Kontak', href: '/contact' },
];

const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6285883027422',
    icon: 'PhoneIcon',
    color: 'hover:text-green-500',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/mobilsiap',
    icon: 'CameraIcon',
    color: 'hover:text-pink-500',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/mobilsiap',
    icon: 'UserGroupIcon',
    color: 'hover:text-blue-500',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@mobilsiap',
    icon: 'MusicalNoteIcon',
    color: 'hover:text-foreground',
  },
  {
    label: 'Google Maps',
    href: 'https://maps.google.com',
    icon: 'MapPinIcon',
    color: 'hover:text-red-500',
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(8, 8, 14, 0.95)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <AppLogo size={40} />
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Mobil<span className="text-primary">Siap</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Marketplace mobil bekas terpercaya di Indonesia. Kami hadir untuk memudahkan proses jual beli mobil dengan transparan, cepat, dan aman.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white/40 ${social.color} transition-all`}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon name={social.icon as Parameters<typeof Icon>[0]['name']} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-white font-700 text-sm tracking-wide" style={{ fontWeight: 700 }}>
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-700 text-sm tracking-wide" style={{ fontWeight: 700 }}>
              Showroom
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="MapPinIcon" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-white/40 text-sm leading-relaxed">
                  Jl. Raya Otomotif No. 88,<br />Bandung, Jawa Barat 40123
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="ClockIcon" size={16} className="text-primary flex-shrink-0" />
                <div className="text-white/40 text-sm">
                  <p>Senin – Sabtu: 08.00 – 18.00</p>
                  <p>Minggu: 09.00 – 15.00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="PhoneIcon" size={16} className="text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/6285883027422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-green-400 text-sm transition-colors"
                >
                  +62 858-8302-7422
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2026 MobilSiap. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="text-white/25 hover:text-white/60 text-xs transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/about" className="text-white/25 hover:text-white/60 text-xs transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}