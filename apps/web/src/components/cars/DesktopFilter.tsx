'use client';

import React from 'react';

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

interface DesktopFilterProps {
  activeBrand: string;
  activeType: string;
  activeTrans: string;
  maxPrice: number;

  setActiveBrand: (value: string) => void;
  setActiveType: (value: string) => void;
  setActiveTrans: (value: string) => void;
  setMaxPrice: (value: number) => void;
}

export default function DesktopFilter({
  activeBrand,
  activeType,
  activeTrans,
  maxPrice,
  setActiveBrand,
  setActiveType,
  setActiveTrans,
  setMaxPrice,
}: DesktopFilterProps) {
  const resetFilter = () => {
    setActiveBrand('Semua');
    setActiveType('Semua');
    setActiveTrans('Semua');
    setMaxPrice(600000000);
  };

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div
        className="rounded-3xl p-6 space-y-6 sticky top-28"
        style={{
          background: 'rgba(18,18,28,0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="font-extrabold text-white text-base"
            style={{ fontWeight: 800 }}
          >
            Filter Pencarian
          </h2>
        </div>

        {/* =========================
            MEREK
        ========================== */}
        <div className="space-y-3">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Merek
          </p>

          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => {
              const active = activeBrand === brand;

              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setActiveBrand(brand)}
                  className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                  style={{
                    fontWeight: 700,
                    background: active
                      ? undefined
                      : 'rgba(255,255,255,0.06)',
                    border:
                      '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            borderTop:
              '1px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* =========================
            TIPE BODI
        ========================== */}
        <div className="space-y-3">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Tipe Bodi
          </p>

          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((type) => {
              const active = activeType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                  style={{
                    fontWeight: 700,
                    background: active
                      ? undefined
                      : 'rgba(255,255,255,0.06)',
                    border:
                      '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            borderTop:
              '1px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* =========================
            TRANSMISI
        ========================== */}
        <div className="space-y-3">
          <p
            className="text-xs font-700 text-white/40 uppercase tracking-wider"
            style={{ fontWeight: 700 }}
          >
            Transmisi
          </p>

          <div className="flex flex-wrap gap-2">
            {transmissions.map((transmission) => {
              const active =
                activeTrans === transmission;

              return (
                <button
                  key={transmission}
                  type="button"
                  onClick={() =>
                    setActiveTrans(transmission)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                    active
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                  style={{
                    fontWeight: 700,
                    background: active
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(255,255,255,0.06)',
                    border:
                      '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {transmission}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            borderTop:
              '1px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* =========================
            HARGA MAKSIMUM
        ========================== */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p
              className="text-xs font-700 text-white/40 uppercase tracking-wider"
              style={{ fontWeight: 700 }}
            >
              Harga Maksimum
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
            onChange={(event) =>
              setMaxPrice(Number(event.target.value))
            }
            className="w-full accent-primary"
            aria-label="Harga maksimum"
          />

          <div className="flex justify-between text-xs text-white/30">
            <span>Rp 75 Jt</span>
            <span>Rp 600 Jt</span>
          </div>
        </div>

        {/* =========================
            RESET
        ========================== */}
        <button
          type="button"
          onClick={resetFilter}
          className="w-full py-2.5 rounded-full text-white/40 text-xs font-700 hover:text-white transition-all"
          style={{
            fontWeight: 700,
            border:
              '1px solid rgba(255,255,255,0.08)',
            background:
              'rgba(255,255,255,0.04)',
          }}
        >
          Reset Filter
        </button>
      </div>
    </aside>
  );
}
