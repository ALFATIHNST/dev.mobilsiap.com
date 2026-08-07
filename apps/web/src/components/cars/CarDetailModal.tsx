'use client';

import React, { useCallback, useEffect, useState } from 'react';

import type { Car } from '@/types/car';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface CarDetailModalProps {
  car: Car;
  onClose: () => void;
}

export default function CarDetailModal({
  car,
  onClose,
}: CarDetailModalProps) {
  const [current, setCurrent] = useState(0);

  const photoCount = car.photos?.length ?? 0;

  const prev = useCallback(() => {
    if (photoCount === 0) return;

    setCurrent((value) => (value - 1 + photoCount) % photoCount);
  }, [photoCount]);

  const next = useCallback(() => {
    if (photoCount === 0) return;

    setCurrent((value) => (value + 1) % photoCount);
  }, [photoCount]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        prev();
      }

      if (event.key === 'ArrowRight') {
        next();
      }
    };

    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const currentPhoto =
    photoCount > 0 ? car.photos[current] : null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(14,14,22,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          aria-label="Tutup detail"
        >
          <Icon name="XMarkIcon" size={18} className="text-white" />
        </button>

        {currentPhoto && (
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
            <AppImage
              src={currentPhoto.src}
              alt={`${car.name} ${car.year} - ${currentPhoto.label}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span
                className="text-sm font-700 text-white px-3 py-1 rounded-full"
                style={{
                  fontWeight: 700,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {currentPhoto.label}
              </span>
            </div>

            {photoCount > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  aria-label="Foto sebelumnya"
                >
                  <Icon
                    name="ChevronLeftIcon"
                    size={18}
                    className="text-white"
                  />
                </button>

                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  aria-label="Foto berikutnya"
                >
                  <Icon
                    name="ChevronRightIcon"
                    size={18}
                    className="text-white"
                  />
                </button>
              </>
            )}
          </div>
        )}

        {photoCount > 0 && (
          <div
            className="flex gap-2 px-5 py-3 overflow-x-auto"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {car.photos.map((photo, index) => (
              <button
                key={`${photo.src}-${index}`}
                onClick={() => setCurrent(index)}
                className="flex-shrink-0 flex flex-col items-center gap-1"
                aria-label={`Lihat ${photo.label}`}
              >
                <div
                  className="relative w-16 h-12 rounded-xl overflow-hidden"
                  style={{
                    border:
                      index === current
                        ? '2px solid #ef4444'
                        : '2px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <AppImage
                    src={photo.src}
                    alt={photo.label}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <span
                  className="text-xs text-white/50"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {photo.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="p-6 space-y-5">
          <div>
            <h2
              className="text-2xl font-extrabold text-white"
              style={{ fontWeight: 800 }}
            >
              {car.name} {car.year}
            </h2>

            <div className="flex items-center gap-1 mt-1">
              <Icon
                name="MapPinIcon"
                size={13}
                className="text-white/40"
              />
              <span className="text-sm text-white/40">
                {car.location}
              </span>
            </div>
          </div>

          <p
            className="text-3xl font-extrabold text-primary"
            style={{ fontWeight: 800 }}
          >
            {car.price}
          </p>

          {car.description && (
            <p className="text-sm text-white/60 leading-relaxed">
              {car.description}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                icon: 'Cog6ToothIcon',
                label: 'Transmisi',
                value: car.transmission,
              },
              {
                icon: 'ChartBarIcon',
                label: 'Kilometer',
                value: car.km,
              },
              {
                icon: 'DocumentCheckIcon',
                label: 'Pajak',
                value: `Pajak ${car.tax}`,
              },
              {
                icon: 'SwatchIcon',
                label: 'Warna',
                value: car.color,
              },
              {
                icon: 'WrenchScrewdriverIcon',
                label: 'Mesin',
                value: car.engine,
              },
              {
                icon: 'TagIcon',
                label: 'Tipe',
                value: car.type,
              },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl p-3 space-y-1"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p className="text-xs text-white/40">
                  {spec.label}
                </p>

                <p
                  className="text-sm font-700 text-white"
                  style={{ fontWeight: 700 }}
                >
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/6285883027422?text=${encodeURIComponent(
              `Halo MobilSiap, saya tertarik dengan ${car.name} ${car.year} ${car.transmission} harga ${car.price}. Masih tersedia?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-700 transition-all"
            style={{
              fontWeight: 700,
              background: 'rgba(37,211,102,0.15)',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#4ade80',
            }}
          >
            <Icon
              name="ChatBubbleOvalLeftEllipsisIcon"
              size={18}
            />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
