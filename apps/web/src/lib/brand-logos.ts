export const BRAND_LOGOS: Record<string, string> = {
  toyota: '/assets/images/brands/transparent/toyota.webp',
  honda: '/assets/images/brands/transparent/honda.webp',
  mitsubishi: '/assets/images/brands/transparent/mitsubishi.webp',
  suzuki: '/assets/images/brands/transparent/suzuki.webp',
  daihatsu: '/assets/images/brands/transparent/daihatsu.webp',
  nissan: '/assets/images/brands/transparent/nissan.webp',
  mazda: '/assets/images/brands/transparent/mazda.webp',
  hyundai: '/assets/images/brands/transparent/hyundai.webp',
  kia: '/assets/images/brands/transparent/kia.webp',
  bmw: '/assets/images/brands/transparent/bmw.webp',
  'mercedes-benz': '/assets/images/brands/transparent/mercedes-benz.webp',
  mercedes: '/assets/images/brands/transparent/mercedes-benz.webp',
  audi: '/assets/images/brands/transparent/audi.webp',
  volkswagen: '/assets/images/brands/transparent/volkswagen.webp',
  ford: '/assets/images/brands/transparent/ford.webp',
  isuzu: '/assets/images/brands/transparent/isuzu.webp',
  wuling: '/assets/images/brands/transparent/wuling.webp',
  chery: '/assets/images/brands/transparent/chery.webp',
  mg: '/assets/images/brands/transparent/mg.webp',
  byd: '/assets/images/brands/transparent/byd.webp',
  subaru: '/assets/images/brands/transparent/subaru.webp',
  jeep: '/assets/images/brands/transparent/jeep.webp',
  lexus: '/assets/images/brands/transparent/lexus.webp',
  volvo: '/assets/images/brands/transparent/volvo.webp',
  peugeot: '/assets/images/brands/transparent/peugeot.webp',
  renault: '/assets/images/brands/transparent/renault.webp',
  chevrolet: '/assets/images/brands/transparent/chevrolet.webp',
};

export function normalizeBrand(brand?: string | null): string {
  return (brand || '')
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-');
}

export function getBrandLogo(
  brand?: string | null
): string | null {
  const key = normalizeBrand(brand);
  return BRAND_LOGOS[key] || null;
}
