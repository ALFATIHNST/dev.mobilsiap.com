'use client';

interface CarPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CarPagination({
  page,
  totalPages,
  onPageChange,
}: CarPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="btn-secondary px-4 py-2"
      >
        Sebelumnya
      </button>

      <span className="px-4 py-2 text-white">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="btn-secondary px-4 py-2"
      >
        Berikutnya
      </button>
    </div>
  );
}
