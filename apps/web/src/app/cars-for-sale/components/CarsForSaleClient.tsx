'use client';

import React, { useState, useEffect } from 'react';

import type { Car } from '@/types/car';

import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

import {
  CarGrid,
  CarDetailModal,
  DesktopFilter,
  MobileFilter,
} from '@/components/cars';


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
	  <DesktopFilter
  	   activeBrand={activeBrand}
  	   activeType={activeType}
  	   activeTrans={activeTrans}
  	   maxPrice={maxPrice}
  	   setActiveBrand={setActiveBrand}
  	   setActiveType={setActiveType}
  	   setActiveTrans={setActiveTrans}
  	   setMaxPrice={setMaxPrice}
	   />
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
        <Icon
            name="MagnifyingGlassIcon"
            size={48}
            className="mx-auto mb-4 opacity-30"
        />

        <p className="text-lg font-semibold">
            Tidak ada mobil yang sesuai filter.
        </p>

        <button
            onClick={() => {
                setActiveBrand('Semua');
                setActiveType('Semua');
                setActiveTrans('Semua');
                setMaxPrice(600000000);
            }}
            className="mt-4 btn-primary text-sm py-2.5 px-6"
        >
            Reset Filter
        </button>
    </div>
) : (
    <CarGrid
        cars={filtered}
        onDetail={setSelectedCar}
    />
)}

          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
	{sidebarOpen && (
  	<MobileFilter
    	  activeBrand={activeBrand}
    	  activeType={activeType}
    	  activeTrans={activeTrans}
    	  maxPrice={maxPrice}
    	  setActiveBrand={setActiveBrand}
    	  setActiveType={setActiveType}
    	  setActiveTrans={setActiveTrans}
    	  setMaxPrice={setMaxPrice}
    	  onClose={() => setSidebarOpen(false)}
  	/>
	)}
	{selectedCar && (
  	<CarDetailModal
    	 car={selectedCar}
    	 onClose={() => setSelectedCar(null)}
  	/>
	)}
    </div>
  );
}
