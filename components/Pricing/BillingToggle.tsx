"use client";

import React, { useSyncExternalStore } from 'react';
import { PricingStore } from './Pricing';

interface BillingToggleProps {
  store: PricingStore;
}

export const BillingToggle = React.memo(function BillingToggle({ store }: BillingToggleProps) {
  // Subscribe to the store
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const { billing } = store.getState();
  const isAnnual = billing === 'annual';

  return (
    <div className="flex items-center gap-1 bg-[#114C5A]/5 p-1 rounded-full border border-[#114C5A]/12 select-none">
      {/* Monthly Option Button */}
      <button
        onClick={() => store.setBilling('monthly')}
        suppressHydrationWarning={true}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-180 focus:outline-none ${
          !isAnnual
            ? 'bg-[#114C5A] text-white shadow-md scale-105'
            : 'text-[#172B36]/60 hover:text-[#172B36]'
        }`}
        aria-label="Set monthly billing"
      >
        Monthly
      </button>

      {/* Annual Option Button with Discount Pill */}
      <button
        onClick={() => store.setBilling('annual')}
        suppressHydrationWarning={true}
        className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-180 focus:outline-none ${
          isAnnual
            ? 'bg-[#114C5A] text-white shadow-md scale-105'
            : 'text-[#172B36]/60 hover:text-[#172B36]'
        }`}
        aria-label="Set annual billing with 20% discount"
      >
        <span>Annual</span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide transition-colors ${
          isAnnual
            ? 'bg-[#FFC801] text-[#172B36]'
            : 'bg-[#FF9932]/10 text-[#FF9932] border border-[#FF9932]/30'
        }`}>
          20% off
        </span>
      </button>
    </div>
  );
});
