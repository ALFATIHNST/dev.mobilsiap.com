'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const heroSlides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png",
  alt: 'Toyota Avanza silver parked on clean showroom floor under bright dealership lighting'
},
{
  src: "https://images.unsplash.com/photo-1681569026995-6a24cde14fd8",
  alt: 'Black Honda CR-V SUV on urban road at dusk with city lights in background'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_14e4b658b-1784295345667.png",
  alt: 'White Mitsubishi Xpander MPV in bright outdoor parking lot sunny day'
}];


const brands = ['Semua Merek', 'Toyota', 'Honda', 'Mitsubishi', 'Suzuki', 'Daihatsu', 'Nissan', 'Mazda', 'BMW', 'Mercedes'];
const priceRanges = ['Semua Harga', 'Di bawah Rp 100 Jt', 'Rp 100–200 Jt', 'Rp 200–300 Jt', 'Rp 300–500 Jt', 'Di atas Rp 500 Jt'];
const locations = ['Semua Lokasi', 'Bandung', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Semarang', 'Medan'];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    };
    hero.addEventListener('mousemove', handleMouse);
    return () => hero.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand && brand !== 'Semua Merek') params.set('brand', brand);
    if (price && price !== 'Semua Harga') params.set('price', price);
    if (location && location !== 'Semua Lokasi') params.set('location', location);
    window.location.href = `/cars-for-sale?${params.toString()}`;
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #080810 0%, #0d0d1a 50%, #080810 100%)' }}>
      
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700"
        style={{ background: 'radial-gradient(circle, rgba(200,24,30,0.08) 0%, transparent 70%)' }} />

      {/* Background decorative skew */}
      <div className="absolute top-0 right-0 w-1/2 h-full -skew-x-6 translate-x-16 z-0"
        style={{ background: 'rgba(255,255,255,0.02)' }} />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(200,24,30,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(100,50,200,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100vh-80px)]">

          {/* Left content — col 7 */}
          <div className="lg:col-span-7 space-y-8 py-12 lg:py-0">
            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
              style={{ background: 'rgba(200,24,30,0.1)', border: '1px solid rgba(200,24,30,0.2)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="section-label">Marketplace Mobil Bekas Terpercaya Indonesia</span>
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl font-extrabold text-white leading-tight" style={{ fontWeight: 800 }}>
              Temukan Mobil<br />
              <span className="text-primary italic">Impian Anda,</span><br />
              <span className="text-white/20">Hari Ini.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-white/50 leading-relaxed max-w-xl" style={{ fontWeight: 400 }}>
              Lebih dari <strong className="text-white">500+ unit mobil</strong> bekas berkualitas, sudah melalui inspeksi 150 titik. Beli dengan percaya diri atau titip jual mobil Anda dalam hitungan minggu.
            </p>

            {/* Search form */}
            <form
              onSubmit={handleSearch}
              className="rounded-2xl p-4 space-y-3 max-w-xl"
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              
              <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>
                Pencarian Cepat
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input-field text-sm"
                  aria-label="Pilih merek">
                  {brands.map((b) =>
                  <option key={b} value={b}>{b}</option>
                  )}
                </select>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field text-sm"
                  aria-label="Pilih rentang harga">
                  {priceRanges.map((p) =>
                  <option key={p} value={p}>{p}</option>
                  )}
                </select>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field text-sm"
                  aria-label="Pilih lokasi">
                  {locations.map((l) =>
                  <option key={l} value={l}>{l}</option>
                  )}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3 rounded-xl text-sm">
                <Icon name="MagnifyingGlassIcon" size={16} className="text-white" />
                Cari Mobil Sekarang
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/cars-for-sale" className="magnetic-btn btn-primary py-3.5 px-7 text-sm">
                <Icon name="TruckIcon" size={16} className="text-white" />
                Lihat Semua Mobil
              </Link>
              <Link href="/consignment" className="magnetic-btn btn-secondary py-3.5 px-7 text-sm">
                <Icon name="CurrencyDollarIcon" size={16} />
                Jual Mobil Anda
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
              { value: '500+', label: 'Unit Tersedia' },
              { value: '2.4k+', label: 'Mobil Terjual' },
              { value: '98%', label: 'Kepuasan Pelanggan' }].
              map((stat) =>
              <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-primary" style={{ fontWeight: 800 }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40" style={{ fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right image — col 5 */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative group">
              {/* Main image slider */}
              <div className="relative rounded-4xl overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
                {heroSlides.map((slide, i) =>
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: currentSlide === i ? 1 : 0 }}>
                  
                    <AppImage
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 0px, 40vw"
                    className="object-cover"
                    priority={i === 0} />
                  
                    {/* Scrim for bottom badge */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroSlides.map((_, i) =>
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30'}`
                    }
                    aria-label={`Slide ${i + 1}`} />
                  )}
                </div>
              </div>

              {/* Floating badge — inspeksi */}
              <div className="absolute -top-4 -right-4 text-white px-5 py-3 rounded-2xl shadow-xl rotate-3 z-10"
                style={{ background: 'linear-gradient(135deg, #C8181E 0%, #a8141a 100%)', boxShadow: '0 8px 24px rgba(200,24,30,0.4)' }}>
                <p className="text-xs font-extrabold uppercase tracking-wider" style={{ fontWeight: 800 }}>
                  ✓ Inspeksi 150 Titik
                </p>
              </div>

              {/* Floating card — harga */}
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl z-10 animate-float"
                style={{ background: 'rgba(18,18,28,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                <p className="text-xs text-white/40 font-600" style={{ fontWeight: 600 }}>
                  Mulai dari
                </p>
                <p className="text-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
                  Rp 75 Juta
                </p>
                <p className="text-xs text-primary font-600 mt-1" style={{ fontWeight: 600 }}>
                  500+ unit tersedia →
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>);

}