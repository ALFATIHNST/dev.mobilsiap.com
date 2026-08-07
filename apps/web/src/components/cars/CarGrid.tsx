'use client';

import CarCard from './CarCard';
import type { Car } from '@/types/car';

interface CarGridProps {
  cars: Car[];
  onDetail: (car: Car) => void;
}

export default function CarGrid({
  cars,
  onDetail,
}: CarGridProps) {
  if (!cars.length) {
    return (
      <div className="text-center py-24 text-white/50">
        <p className="text-lg font-semibold">
          Tidak ada mobil ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}
