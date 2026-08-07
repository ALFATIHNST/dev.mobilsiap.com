'use client';

import DesktopFilter from './DesktopFilter';
import MobileFilter from './MobileFilter';

interface CarFiltersProps {
  mobile: boolean;

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

export default function CarFilters(props: CarFiltersProps) {
  if (props.mobile) {
    return (
      <MobileFilter
        {...props}
      />
    );
  }

  return (
    <DesktopFilter
      {...props}
    />
  );
}
