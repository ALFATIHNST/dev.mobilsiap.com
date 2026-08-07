export interface CarPhoto {
  src: string;
  label: string;
}

export interface Car {
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
