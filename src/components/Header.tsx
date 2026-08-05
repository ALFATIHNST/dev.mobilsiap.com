'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Mobil Dijual', href: '/cars-for-sale' },
  { label: 'Titip Jual', href: '/consignment' },
  { label: 'Reparasi', href: '/repair-service' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Kontak', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-3' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={36} />
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              Mobil<span className="text-primary">Siap</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary text-white font-700' :'text-white/60 hover:text-white hover:bg-white/8 font-500'
                }`}
                style={{ fontWeight: isActive(link.href) ? 700 : 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/6285883027422?text=Halo%20MobilSiap%2C%20saya%20ingin%20bertanya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-700 hover:bg-green-500/30 transition-all backdrop-blur-sm"
              style={{ fontWeight: 700 }}
            >
              <Icon name="PhoneIcon" size={16} variant="solid" className="text-green-400" />
              WhatsApp
            </a>
            <Link href="/cars-for-sale" className="btn-primary text-sm py-2 px-5">
              Lihat Mobil
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
            aria-label="Buka menu navigasi"
          >
            <Icon name="Bars3Icon" size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 max-w-full flex flex-col"
            style={{ background: 'rgba(12, 12, 20, 0.95)', backdropFilter: 'blur(24px)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div className="flex items-center gap-2">
                <AppLogo size={32} />
                <span className="font-extrabold text-lg text-white">
                  Mobil<span className="text-primary">Siap</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60"
                aria-label="Tutup menu"
              >
                <Icon name="XMarkIcon" size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive(link.href)
                      ? 'bg-primary text-white font-700' :'text-white/60 hover:bg-white/8 hover:text-white font-500'
                  }`}
                  style={{ fontWeight: isActive(link.href) ? 700 : 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-white/8 space-y-3">
              <a
                href="https://wa.me/6285883027422?text=Halo%20MobilSiap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-700"
                style={{ fontWeight: 700 }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="PhoneIcon" size={16} variant="solid" className="text-green-400" />
                Hubungi via WhatsApp
              </a>
              <Link
                href="/cars-for-sale"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-white text-sm font-700"
                style={{ fontWeight: 700 }}
              >
                Lihat Mobil
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}