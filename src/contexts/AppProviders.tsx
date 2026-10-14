import React from 'react';
import { SelectionProvider } from './SelectionContext';
import { SimulationProvider } from './SimulationContext';
import { FilterProvider } from './FilterContext';
import { UIProvider } from './UIContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SelectionProvider>
      <SimulationProvider>
        <FilterProvider>
          <UIProvider>{children}</UIProvider>
        </FilterProvider>
      </SimulationProvider>
    </SelectionProvider>
  );
};

export { useSelection } from './SelectionContext';
export { useSimulation } from './SimulationContext';
export { useFilter } from './FilterContext';
export { useUI } from './UIContext';
