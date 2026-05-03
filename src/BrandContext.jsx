import React, { createContext, useContext, useState } from 'react';
import BRAND_DEFAULTS from './brand';

const BrandContext = createContext(null);

const STORAGE_KEY = 'brandster-brand-config-v1';

function loadBrand() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...BRAND_DEFAULTS, ...JSON.parse(saved) };
  } catch {}
  return BRAND_DEFAULTS;
}

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState(loadBrand);

  const updateBrandConfig = (updates) => {
    setBrand(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetBrandConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBrand(BRAND_DEFAULTS);
  };

  return (
    <BrandContext.Provider value={{ brand, updateBrandConfig, resetBrandConfig }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used inside BrandProvider');
  return ctx;
}
