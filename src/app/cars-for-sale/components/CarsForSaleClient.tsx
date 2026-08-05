'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

interface CarPhoto {
  src: string;
  label: string;
}

interface Car {
  id: string;
  name: string;
  year: number;
  brand: string;
  transmission: 'Manual' | 'Otomatis';
  km: string;
  kmNum: number;
  tax: 'Hidup' | 'Mati';
  price: string;
  priceNum: number;
  type: 'MPV' | 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup';
  condition: 'Bekas';
  photos: CarPhoto[];
  location: string;
  color: string;
  engine: string;
  description?: string;
}

const brands = ['Semua', 'Toyota', 'Honda', 'Mitsubishi', 'Suzuki', 'Daihatsu', 'Nissan', 'Mazda'];
const bodyTypes = ['Semua', 'MPV', 'SUV', 'Sedan', 'Hatchback'];
const transmissions = ['Semua', 'Manual', 'Otomatis'];
const sortOptions = ['Harga Terendah', 'Harga Tertinggi', 'Tahun Terbaru', 'KM Terendah'];

function formatPrice(num: number): string {
  return `Rp ${num.toLocaleString('id-ID')}`;
}

function formatKm(num: number): string {
  return `${num.toLocaleString('id-ID')} KM`;
}

function mapDbCarToUi(row: any): Car {
  return {
    id: row.id,
    name: row.name,
    year: row.year,
    brand: row.brand,
    transmission: row.transmission as 'Manual' | 'Otomatis',
    km: formatKm(row.kilometer),
    kmNum: row.kilometer,
    tax: row.tax as 'Hidup' | 'Mati',
    price: formatPrice(row.price),
    priceNum: row.price,
    type: row.body_type as 'MPV' | 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup',
    condition: 'Bekas',
    photos: Array.isArray(row.photos) ? row.photos : [],
    location: row.location,
    color: row.color,
    engine: row.engine,
    description: row.description,
  };
}

// ─── Photo Slider Component ───────────────────────────────────────────────────
function CarPhotoSlider({ photos, carName }: { photos: CarPhoto[]; carName: string }) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % photos.length);
  };

  if (!photos?.length) {
    return (
      <div className="relative h-48 overflow-hidden flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <Icon name="PhotoIcon" size={40} className="text-white/20" />
      </div>
    );
  }

  return (
    <div className="relative h-48 overflow-hidden group">
      <AppImage
        src={photos[current].src}
        alt={`${carName} - ${photos[current].label}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-opacity duration-300"
      />
      {/* Label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <span className="text-xs font-700 text-white px-2 py-0.5 rounded-full"
          style={{ fontWeight: 700, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          {photos[current].label}
        </span>
      </div>
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Foto sebelumnya"
      >
        <Icon name="ChevronLeftIcon" size={14} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Foto berikutnya"
      >
        <Icon name="ChevronRightIcon" size={14} className="text-white" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              background: i === current ? '#ef4444' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10">
        <span className="badge-inspeksi">✓ Inspeksi</span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="badge-available">Tersedia</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

// ─── Car Detail Modal ─────────────────────────────────────────────────────────
function CarDetailModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + car.photos.length) % car.photos.length), [car.photos.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % car.photos.length), [car.photos.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: 'rgba(14,14,22,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          aria-label="Tutup detail"
        >
          <Icon name="XMarkIcon" size={18} className="text-white" />
        </button>

        {/* Main Photo */}
        {car.photos?.length > 0 && (
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
            <AppImage
              src={car.photos[current].src}
              alt={`${car.name} ${car.year} - ${car.photos[current].label}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="text-sm font-700 text-white px-3 py-1 rounded-full"
                style={{ fontWeight: 700, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                {car.photos[current].label}
              </span>
            </div>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Foto sebelumnya">
              <Icon name="ChevronLeftIcon" size={18} className="text-white" />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Foto berikutnya">
              <Icon name="ChevronRightIcon" size={18} className="text-white" />
            </button>
          </div>
        )}

        {/* Thumbnail Strip */}
        {car.photos?.length > 0 && (
          <div className="flex gap-2 px-5 py-3 overflow-x-auto"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {car.photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="flex-shrink-0 flex flex-col items-center gap-1"
                aria-label={`Lihat ${photo.label}`}
              >
                <div className="relative w-16 h-12 rounded-xl overflow-hidden"
                  style={{ border: i === current ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.1)' }}>
                  <AppImage src={photo.src} alt={photo.label} fill sizes="64px" className="object-cover" />
                </div>
                <span className="text-xs text-white/50" style={{ fontSize: 10, fontWeight: 600 }}>{photo.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-2xl font-extrabold text-white" style={{ fontWeight: 800 }}>
              {car.name} {car.year}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="MapPinIcon" size={13} className="text-white/40" />
              <span className="text-sm text-white/40">{car.location}</span>
            </div>
          </div>

          <p className="text-3xl font-extrabold text-primary" style={{ fontWeight: 800 }}>{car.price}</p>

          {car.description && (
            <p className="text-sm text-white/60 leading-relaxed">{car.description}</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: 'Cog6ToothIcon', label: 'Transmisi', value: car.transmission },
              { icon: 'ChartBarIcon', label: 'Kilometer', value: car.km },
              { icon: 'DocumentCheckIcon', label: 'Pajak', value: `Pajak ${car.tax}` },
              { icon: 'SwatchIcon', label: 'Warna', value: car.color },
              { icon: 'WrenchScrewdriverIcon', label: 'Mesin', value: car.engine },
              { icon: 'TagIcon', label: 'Tipe', value: car.type },
            ].map((spec) => (
              <div key={spec.label} className="rounded-2xl p-3 space-y-1"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs text-white/40">{spec.label}</p>
                <p className="text-sm font-700 text-white" style={{ fontWeight: 700 }}>{spec.value}</p>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/6285883027422?text=${encodeURIComponent(`Halo MobilSiap, saya tertarik dengan ${car.name} ${car.year} ${car.transmission} harga ${car.price}. Masih tersedia?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-700 transition-all"
            style={{ fontWeight: 700, background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', color: '#4ade80' }}
          >
            <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={18} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CarsForSaleClient() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState('Semua');
  const [activeType, setActiveType] = useState('Semua');
  const [activeTrans, setActiveTrans] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(600000000);
  const [sortBy, setSortBy] = useState('Harga Terendah');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching cars:', error.message);
          return;
        }

        setCars((data || []).map(mapDbCarToUi));
      } catch (err) {
        console.error('Fetch cars error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filtered = cars
    .filter((car) => {
      const brandOk = activeBrand === 'Semua' || car.brand === activeBrand;
      const typeOk = activeType === 'Semua' || car.type === activeType;
      const transOk = activeTrans === 'Semua' || car.transmission === activeTrans;
      const priceOk = car.priceNum <= maxPrice;
      return brandOk && typeOk && transOk && priceOk;
    })
    .sort((a, b) => {
      if (sortBy === 'Harga Terendah') return a.priceNum - b.priceNum;
      if (sortBy === 'Harga Tertinggi') return b.priceNum - a.priceNum;
      if (sortBy === 'Tahun Terbaru') return b.year - a.year;
      if (sortBy === 'KM Terendah') return a.kmNum - b.kmNum;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <span className="section-label">Katalog Lengkap</span>
        <h1 className="text-section-heading font-extrabold text-white mt-2" style={{ fontWeight: 800 }}>
          Mobil Dijual
        </h1>
        <p className="text-white/50 mt-3 text-lg">
          {loading ? 'Memuat data...' : `${filtered.length} unit tersedia · Semua sudah diinspeksi 150 titik`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <Icon name="ArrowPathIcon" size={40} className="text-primary animate-spin" />
            <p className="text-white/50">Memuat inventaris mobil...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Sidebar Filter — Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            <div className="rounded-3xl p-6 space-y-6 sticky top-28"
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="font-extrabold text-white text-base" style={{ fontWeight: 800 }}>Filter Pencarian</h2>

              {/* Brand */}
              <div className="space-y-3">
                <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Merek</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button key={brand} onClick={() => setActiveBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeBrand === brand ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}
                      style={{ fontWeight: 700, background: activeBrand === brand ? undefined : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

              {/* Body Type */}
              <div className="space-y-3">
                <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Tipe Bodi</p>
                <div className="flex flex-wrap gap-2">
                  {bodyTypes.map((type) => (
                    <button key={type} onClick={() => setActiveType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeType === type ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}
                      style={{ fontWeight: 700, background: activeType === type ? undefined : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

              {/* Transmission */}
              <div className="space-y-3">
                <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Transmisi</p>
                <div className="flex flex-wrap gap-2">
                  {transmissions.map((trans) => (
                    <button key={trans} onClick={() => setActiveTrans(trans)}
                      className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeTrans === trans ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`}
                      style={{ fontWeight: 700, background: activeTrans === trans ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {trans}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Harga Maksimum</p>
                  <span className="text-xs font-700 text-primary" style={{ fontWeight: 700 }}>Rp {(maxPrice / 1000000).toFixed(0)} Jt</span>
                </div>
                <input type="range" min={75000000} max={600000000} step={25000000} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" aria-label="Harga maksimum" />
                <div className="flex justify-between text-xs text-white/30">
                  <span>Rp 75 Jt</span><span>Rp 600 Jt</span>
                </div>
              </div>

              <button
                onClick={() => { setActiveBrand('Semua'); setActiveType('Semua'); setActiveTrans('Semua'); setMaxPrice(600000000); }}
                className="w-full py-2.5 rounded-full text-white/40 text-xs font-700 hover:text-white transition-all"
                style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-sm text-white/40">
                Menampilkan <strong className="text-white">{filtered.length}</strong> unit
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-700 text-white/60 hover:text-white transition-all"
                  style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                  <Icon name="AdjustmentsHorizontalIcon" size={16} />
                  Filter
                </button>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field text-sm w-auto" aria-label="Urutkan mobil">
                  {sortOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-white/50">
                <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-600" style={{ fontWeight: 600 }}>Tidak ada mobil yang sesuai filter.</p>
                <button
                  onClick={() => { setActiveBrand('Semua'); setActiveType('Semua'); setActiveTrans('Semua'); setMaxPrice(600000000); }}
                  className="mt-4 btn-primary text-sm py-2.5 px-6">
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <div key={car.id} className="rounded-3xl overflow-hidden card-hover glass-card-hover"
                    style={{ background: 'rgba(18,18,28,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                    {/* Photo Slider */}
                    <CarPhotoSlider photos={car.photos} carName={`${car.name} ${car.year}`} />

                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white" style={{ fontWeight: 800 }}>
                          {car.name} {car.year}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Icon name="MapPinIcon" size={11} className="text-white/40" />
                          <span className="text-xs text-white/40">{car.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { icon: 'Cog6ToothIcon', label: car.transmission },
                          { icon: 'ChartBarIcon', label: car.km },
                          { icon: 'DocumentCheckIcon', label: `Pajak ${car.tax}` },
                          { icon: 'SwatchIcon', label: car.color },
                        ].map((spec) => (
                          <div key={spec.label} className="flex items-center gap-1 px-2 py-1 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <Icon name={spec.icon as Parameters<typeof Icon>[0]['name']} size={11} className="text-white/40" />
                            <span className="text-xs text-white/50" style={{ fontWeight: 500 }}>{spec.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        <p className="price-tag text-primary">{car.price}</p>
                        <span className="text-xs text-white/30 px-2 py-0.5 rounded-md"
                          style={{ background: 'rgba(255,255,255,0.06)' }}>{car.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCar(car)}
                          className="flex-1 btn-secondary text-xs py-2.5 justify-center"
                        >
                          Lihat Detail
                        </button>
                        <a
                          href={`https://wa.me/6285883027422?text=${encodeURIComponent(`Halo MobilSiap, saya tertarik dengan ${car.name} ${car.year} ${car.transmission} harga ${car.price}. Masih tersedia?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-700 transition-all"
                          style={{ fontWeight: 700, background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80' }}>
                          <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={13} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[300] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-80 max-w-full overflow-y-auto p-6 space-y-5"
            style={{ background: 'rgba(12,12,20,0.95)', backdropFilter: 'blur(24px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-white text-lg" style={{ fontWeight: 800 }}>Filter</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-white/10 text-white/60">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Merek</p>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button key={brand} onClick={() => setActiveBrand(brand)}
                    className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeBrand === brand ? 'bg-primary text-white' : 'text-white/50'}`}
                    style={{ fontWeight: 700, background: activeBrand === brand ? undefined : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Tipe Bodi</p>
              <div className="flex flex-wrap gap-2">
                {bodyTypes.map((type) => (
                  <button key={type} onClick={() => setActiveType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeType === type ? 'bg-primary text-white' : 'text-white/50'}`}
                    style={{ fontWeight: 700, background: activeType === type ? undefined : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Transmisi</p>
              <div className="flex flex-wrap gap-2">
                {transmissions.map((trans) => (
                  <button key={trans} onClick={() => setActiveTrans(trans)}
                    className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${activeTrans === trans ? 'bg-white/15 text-white' : 'text-white/50'}`}
                    style={{ fontWeight: 700, background: activeTrans === trans ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {trans}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs font-700 text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>Harga Maks.</p>
                <span className="text-xs font-700 text-primary" style={{ fontWeight: 700 }}>Rp {(maxPrice / 1000000).toFixed(0)} Jt</span>
              </div>
              <input type="range" min={75000000} max={600000000} step={25000000} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" aria-label="Harga maksimum" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setActiveBrand('Semua'); setActiveType('Semua'); setActiveTrans('Semua'); setMaxPrice(600000000); }}
                className="flex-1 py-2.5 rounded-full text-xs font-700 text-white/50 hover:text-white transition-all"
                style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                Reset
              </button>
              <button onClick={() => setSidebarOpen(false)} className="flex-1 btn-primary py-2.5 text-xs justify-center">
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Car Detail Modal */}
      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}