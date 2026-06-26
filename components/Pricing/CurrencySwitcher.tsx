"use client";

import React, { useSyncExternalStore } from 'react';
import { Currency } from '../../data/pricingMatrix';
import { PricingStore } from './Pricing';

interface CurrencySwitcherProps {
  store: PricingStore;
}

export const CurrencySwitcher = React.memo(function CurrencySwitcher({ store }: CurrencySwitcherProps) {
  // Subscribe to the store
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const { currency } = store.getState();

  const currencies: Currency[] = ['USD', 'EUR', 'INR'];

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, curr: Currency) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      store.setCurrency(curr);
    }
  };

  return (
    <div 
      className="flex bg-[#114C5A]/5 p-1 rounded-full border border-[#114C5A]/12"
      role="radiogroup"
      aria-label="Select currency"
    >
      {currencies.map((curr) => {
        const isSelected = currency === curr;
        return (
          <button
            key={curr}
            role="radio"
            aria-checked={isSelected}
            onClick={() => store.setCurrency(curr)}
            onKeyDown={(e) => handleKeyDown(e, curr)}
            suppressHydrationWarning={true}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-180 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#114C5A] ${
              isSelected
                ? 'bg-[#114C5A] text-white shadow-md scale-105'
                : 'text-[#172B36]/60 hover:text-[#172B36]'
            }`}
            aria-label={`Switch price calculation to ${curr}`}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
});
