import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface FilterState {
  zoneId: string;
  date: string;
}

interface FilterContextType {
  filters: FilterState;
  setZoneId: (zoneId: string) => void;
  setDate: (date: string) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    zoneId: '',
    date: ''
  });

  const setZoneId = (zoneId: string) => {
    setFilters(prev => ({ ...prev, zoneId }));
  };

  const setDate = (date: string) => {
    setFilters(prev => ({ ...prev, date }));
  };

  const clearFilters = () => {
    setFilters({ zoneId: '', date: '' });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      setZoneId,
      setDate,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
