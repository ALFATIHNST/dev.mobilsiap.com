'use client';

interface CarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CarSearch({
  value,
  onChange,
}: CarSearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari mobil..."
        className="input-field w-full"
      />
    </div>
  );
}
