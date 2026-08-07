'use client';

import CarPhotoSlider from '@/components/cars/CarPhotoSlider';
import Icon from '@/components/ui/AppIcon';
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  onDetail: (car: Car) => void;
}

export default function CarCard({
  car,
  onDetail,
}: CarCardProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden card-hover glass-card-hover"
      style={{
        background: 'rgba(18,18,28,0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Photo Slider */}
      <CarPhotoSlider
        photos={car.photos}
        carName={`${car.name} ${car.year}`}
      />

      <div className="p-5 space-y-4">
        <div>
          <h3
            className="text-base font-extrabold text-white"
            style={{ fontWeight: 800 }}
          >
            {car.name} {car.year}
          </h3>

          <div className="flex items-center gap-1 mt-0.5">
            <Icon
              name="MapPinIcon"
              size={11}
              className="text-white/40"
            />
            <span className="text-xs text-white/40">
              {car.location}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            {
              icon: 'Cog6ToothIcon',
              label: car.transmission,
            },
            {
              icon: 'ChartBarIcon',
              label: car.km,
            },
            {
              icon: 'DocumentCheckIcon',
              label: `Pajak ${car.tax}`,
            },
            {
              icon: 'SwatchIcon',
              label: car.color,
            },
          ].map((spec) => (
            <div
              key={spec.label}
              className="flex items-center gap-1 px-2 py-1 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Icon
                name={
                  spec.icon as Parameters<typeof Icon>[0]['name']
                }
                size={11}
                className="text-white/40"
              />

              <span
                className="text-xs text-white/50"
                style={{ fontWeight: 500 }}
              >
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-1"
          style={{
            borderTop:
              '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p className="price-tag text-primary">
            {car.price}
          </p>

          <span
            className="text-xs text-white/30 px-2 py-0.5 rounded-md"
            style={{
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            {car.type}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDetail(car)}
            className="flex-1 btn-secondary text-xs py-2.5 justify-center"
          >
            Lihat Detail
          </button>

          <a
            href={`https://wa.me/6285883027422?text=${encodeURIComponent(
              `Halo MobilSiap, saya tertarik dengan ${car.name} ${car.year} ${car.transmission} harga ${car.price}. Masih tersedia?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-700 transition-all"
            style={{
              fontWeight: 700,
              background: 'rgba(37,211,102,0.15)',
              border:
                '1px solid rgba(37,211,102,0.25)',
              color: '#4ade80',
            }}
          >
            <Icon
              name="ChatBubbleOvalLeftEllipsisIcon"
              size={13}
            />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
