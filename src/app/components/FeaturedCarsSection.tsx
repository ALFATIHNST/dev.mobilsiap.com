'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Car {
  id: number;
  name: string;
  year: number;
  brand: string;
  transmission: 'Manual' | 'Otomatis';
  km: string;
  tax: 'Hidup' | 'Mati';
  price: string;
  priceNum: number;
  type: 'MPV' | 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup';
  condition: 'Bekas';
  image: string;
  imageAlt: string;
  location: string;
  whatsapp: string;
}

const mockCars: Car[] = [
{
  id: 1, name: 'Toyota Avanza', year: 2022, brand: 'Toyota',
  transmission: 'Manual', km: '35.000 KM', tax: 'Hidup',
  price: 'Rp 215.000.000', priceNum: 215000000, type: 'MPV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png",
  imageAlt: 'Toyota Avanza silver MPV parked in clean showroom under white lighting',
  location: 'Bandung', whatsapp: 'Toyota Avanza 2022 Manual'
},
{
  id: 2, name: 'Honda CR-V', year: 2021, brand: 'Honda',
  transmission: 'Otomatis', km: '42.000 KM', tax: 'Hidup',
  price: 'Rp 385.000.000', priceNum: 385000000, type: 'SUV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png",
  imageAlt: 'Honda CR-V black SUV on open road with mountain backdrop blue sky',
  location: 'Bandung', whatsapp: 'Honda CR-V 2021 Otomatis'
},
{
  id: 3, name: 'Mitsubishi Xpander', year: 2023, brand: 'Mitsubishi',
  transmission: 'Otomatis', km: '18.000 KM', tax: 'Hidup',
  price: 'Rp 285.000.000', priceNum: 285000000, type: 'MPV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e4b658b-1784295345667.png",
  imageAlt: 'Mitsubishi Xpander white MPV parked in bright outdoor lot sunny day',
  location: 'Bandung', whatsapp: 'Mitsubishi Xpander 2023 Otomatis'
},
{
  id: 4, name: 'Suzuki Ertiga', year: 2021, brand: 'Suzuki',
  transmission: 'Otomatis', km: '51.000 KM', tax: 'Hidup',
  price: 'Rp 195.000.000', priceNum: 195000000, type: 'MPV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1acb0ec21-1768368473469.png",
  imageAlt: 'Suzuki Ertiga silver family MPV in urban setting daytime',
  location: 'Bandung', whatsapp: 'Suzuki Ertiga 2021 Otomatis'
},
{
  id: 5, name: 'Daihatsu Terios', year: 2022, brand: 'Daihatsu',
  transmission: 'Manual', km: '28.000 KM', tax: 'Hidup',
  price: 'Rp 175.000.000', priceNum: 175000000, type: 'SUV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_140fd4689-1766504030229.png",
  imageAlt: 'Daihatsu Terios white compact SUV parked on residential street',
  location: 'Bandung', whatsapp: 'Daihatsu Terios 2022 Manual'
},
{
  id: 6, name: 'Toyota Fortuner', year: 2020, brand: 'Toyota',
  transmission: 'Otomatis', km: '65.000 KM', tax: 'Hidup',
  price: 'Rp 490.000.000', priceNum: 490000000, type: 'SUV', condition: 'Bekas',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1547315c2-1772198942784.png",
  imageAlt: 'Toyota Fortuner black full-size SUV on open highway dramatic sky',
  location: 'Bandung', whatsapp: 'Toyota Fortuner 2020 Otomatis'
}];


const bodyTypes = ['Semua', 'MPV', 'SUV', 'Sedan', 'Hatchback'];
const transmissions = ['Semua', 'Manual', 'Otomatis'];

export default function FeaturedCarsSection() {
  const [activeType, setActiveType] = useState('Semua');
  const [activeTrans, setActiveTrans] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(600000000);
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = mockCars.filter((car) => {
    const typeOk = activeType === 'Semua' || car.type === activeType;
    const transOk = activeTrans === 'Semua' || car.transmission === activeTrans;
    const priceOk = car.priceNum <= maxPrice;
    return typeOk && transOk && priceOk;
  });

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(10,10,16,0.8)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 reveal-up">
          <div className="space-y-3">
            <span className="section-label">Katalog Terbaru</span>
            <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
              Mobil Pilihan<br />
              <span className="text-primary">Sudah Diinspeksi</span>
            </h2>
          </div>
          <Link href="/cars-for-sale" className="btn-secondary text-sm py-2.5 px-6 flex-shrink-0">
            Lihat Semua Mobil
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="reveal-up reveal-delay-1 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap"
          style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Tipe:
            </span>
            {bodyTypes.map((type) =>
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-700 transition-all ${
              activeType === type ?
              'bg-primary text-white' : 'text-white/50 hover:text-white'}`
              }
              style={{ fontWeight: 700, background: activeType === type ? undefined : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {type}
              </button>
            )}
          </div>
          <div className="w-px h-6 hidden sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Transmisi:
            </span>
            {transmissions.map((trans) =>
            <button
              key={trans}
              onClick={() => setActiveTrans(trans)}
              className={`px-4 py-1.5 rounded-full text-xs font-700 transition-all ${
              activeTrans === trans ?
              'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`
              }
              style={{ fontWeight: 700, background: activeTrans === trans ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {trans}
              </button>
            )}
          </div>
          <div className="w-px h-6 hidden sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-3 flex-1 min-w-48">
            <span className="text-xs font-700 text-white/40 uppercase tracking-wider whitespace-nowrap" style={{ fontWeight: 700 }}>
              Maks. Harga:
            </span>
            <input
              type="range"
              min={75000000}
              max={600000000}
              step={25000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-primary"
              aria-label="Harga maksimum" />
            <span className="text-xs font-700 text-primary whitespace-nowrap" style={{ fontWeight: 700 }}>
              Rp {(maxPrice / 1000000).toFixed(0)} Jt
            </span>
          </div>
        </div>

        {/* Car Grid */}
        {filtered.length === 0 ?
        <div className="text-center py-20 text-white/30">
            <Icon name="MagnifyingGlassIcon" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-600" style={{ fontWeight: 600 }}>Tidak ada mobil yang sesuai filter.</p>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) =>
          <div
            key={car.id}
            className={`reveal-up reveal-delay-${i % 3 + 1} rounded-3xl overflow-hidden card-hover glass-card-hover`}
            style={{ background: 'rgba(18,18,28,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <AppImage
                src={car.image}
                alt={car.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge-inspeksi">✓ Inspeksi</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="badge-available">Tersedia</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white" style={{ fontWeight: 800 }}>
                      {car.name} {car.year}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="MapPinIcon" size={12} className="text-white/40" />
                      <span className="text-xs text-white/40">{car.location}</span>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="flex flex-wrap gap-2">
                    {[
                { icon: 'Cog6ToothIcon', label: car.transmission },
                { icon: 'ChartBarIcon', label: car.km },
                { icon: 'DocumentCheckIcon', label: `Pajak ${car.tax}` }].
                map((spec) =>
                <div key={spec.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <Icon name={spec.icon as Parameters<typeof Icon>[0]['name']} size={12} className="text-white/40" />
                        <span className="text-xs text-white/50 font-600" style={{ fontWeight: 600 }}>
                          {spec.label}
                        </span>
                      </div>
                )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="price-tag text-primary">{car.price}</p>
                    <span className="text-xs text-white/30">{car.type}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <Link
                  href={`/cars-for-sale?id=${car.id}`}
                  className="flex-1 btn-secondary text-xs py-2.5 justify-center">
                  
                      Lihat Detail
                    </Link>
                    <a
                  href={`https://wa.me/6285883027422?text=${encodeURIComponent(`Halo MobilSiap, saya tertarik dengan ${car.whatsapp} harga ${car.price}. Masih tersedia?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-white text-xs font-700 transition-all"
                  style={{ fontWeight: 700, background: 'rgba(37,211,102,0.2)', border: '1px solid rgba(37,211,102,0.3)', color: '#4ade80' }}>
                  
                      <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={13} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </section>);

}