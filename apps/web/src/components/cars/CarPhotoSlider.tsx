'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CarPhoto {
  src: string;
  label: string;
}


// ─── Photo Slider Component ───────────────────────────────────────────────────
function CarPhotoSlider({ photos, carName }: { photos: CarPhoto[]; carName: string }) {
  const [current, setCurrent] = useState(0);
  const photoCount = photos?.length ?? 0;

  // Keep the active index valid when the photo collection changes.
  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(photoCount - 1, 0)));
  }, [photoCount]);

  const safeCurrent = photoCount
    ? Math.min(current, photoCount - 1)
    : 0;
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
        key={photos[safeCurrent].src}
        src={photos[safeCurrent].src}
        alt={`${carName} - ${photos[safeCurrent].label}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-opacity duration-300"
      />
      {/* Label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <span className="text-xs font-700 text-white px-2 py-0.5 rounded-full"
          style={{ fontWeight: 700, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          {photos[safeCurrent].label}
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

export default CarPhotoSlider;
