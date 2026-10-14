import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Direction } from '../types';

interface FilterContextValue {
  filterDirection: 'all' | Direction;
  filterType: 'all' | 'rapid' | 'local';
  setFilterDirection: (direction: 'all' | Direction) => void;
  setFilterType: (type: 'all' | 'rapid' | 'local') => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterDirection, setFilterDirection] = useState<'all' | Direction>('all');
  const [filterType, setFilterType] = useState<'all' | 'rapid' | 'local'>('all');

  const resetFilters = useCallback(() => {
    setFilterDirection('all');
    setFilterType('all');
  }, []);

  const value = useMemo(
    () => ({
      filterDirection,
      filterType,
      setFilterDirection,
      setFilterType,
      resetFilters,
    }),
    [filterDirection, filterType, resetFilters]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export function useFilter(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
