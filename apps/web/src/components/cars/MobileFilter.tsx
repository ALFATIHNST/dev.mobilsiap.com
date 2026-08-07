'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const brands = [
  'Semua',
  'Toyota',
  'Honda',
  'Mitsubishi',
  'Suzuki',
  'Daihatsu',
  'Nissan',
  'Mazda',
];

const bodyTypes = [
  'Semua',
  'MPV',
  'SUV',
  'Sedan',
  'Hatchback',
];

const transmissions = [
  'Semua',
  'Manual',
  'Otomatis',
];

interface MobileFilterProps {
  activeBrand: string;
  activeType: string;
  activeTrans: string;
  maxPrice: number;
  setActiveBrand: (value: string) => void;
  setActiveType: (value: string) => void;
  setActiveTrans: (value: string) => void;
  setMaxPrice: (value: number) => void;
  onClose?: () => void;
}

export default function MobileFilter({
  activeBrand,
  activeType,
  activeTrans,
  maxPrice,
  setActiveBrand,
  setActiveType,
  setActiveTrans,
  setMaxPrice,
  onClose,
}: MobileFilterProps) {
  const resetFilters = () => {
    setActiveBrand('Semua');
    setActiveType('Semua');
    setActiveTrans('Semua');
    setMaxPrice(600000000);
  };

  return (
    <div className="fixed inset-0 z-[300] lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="absolute top-0 left-0 h-full w-80 max-w-full overflow-y-auto p-6 space-y-5"
        style={{
          background: 'rgba(12,12,20,0.95)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Filter pencarian mobil"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="font-extrabold text-white text-lg"
            style={{ fontWeight: 800 }}
          >
            Filter
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60"
            aria-label="Tutup filter"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Merek
          </p>

          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setActiveBrand(brand)}
                className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                  activeBrand === brand
                    ? 'bg-primary text-white'
                    : 'text-white/50'
                }`}
                style={{
                  fontWeight: 700,
                  background:
                    activeBrand === brand
                      ? undefined
                      : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Tipe Bodi
          </p>

          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                  activeType === type
                    ? 'bg-primary text-white'
                    : 'text-white/50'
                }`}
                style={{
                  fontWeight: 700,
                  background:
                    activeType === type
                      ? undefined
                      : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Transmisi
          </p>

          <div className="flex flex-wrap gap-2">
            {transmissions.map((trans) => (
              <button
                key={trans}
                type="button"
                onClick={() => setActiveTrans(trans)}
                className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                  activeTrans === trans
                    ? 'bg-white/15 text-white'
                    : 'text-white/50'
                }`}
                style={{
                  fontWeight: 700,
                  background:
                    activeTrans === trans
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {trans}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p
              className="text-xs font-700 text-white/40 uppercase tracking-wider"
              style={{ fontWeight: 700 }}
            >
              Harga Maks.
            </p>

            <span
              className="text-xs font-700 text-primary"
              style={{ fontWeight: 700 }}
            >
              Rp {(maxPrice / 1000000).toFixed(0)} Jt
            </span>
          </div>

          <input
            type="range"
            min={75000000}
            max={600000000}
            step={25000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Harga maksimum"
          />

          <div className="flex justify-between text-xs text-white/30">
            <span>Rp 75 Jt</span>
            <span>Rp 600 Jt</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 py-2.5 rounded-full text-xs font-700 text-white/50 hover:text-white transition-all"
            style={{
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-primary py-2.5 text-xs justify-center"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
