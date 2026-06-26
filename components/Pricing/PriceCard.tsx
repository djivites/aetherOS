"use client";
import React, { useSyncExternalStore, useRef, useEffect, useState } from 'react';
import { Tier, currencySymbols } from '../../data/pricingMatrix';
import { calculatePrice } from '../../utils/pricing';
import { PricingStore } from './Pricing';

interface PriceCardProps {
  tier: Tier;
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  store: PricingStore;
  buttonText?: string;
  visible?: boolean;
  priceAnimationStarted?: boolean;
}

// Inner subscriber component to isolate re-rendering of prices
const PriceText = React.memo(function PriceText({ 
  store, 
  tier, 
  isDarkCard,
  priceAnimationStarted = false
}: { 
  store: PricingStore; 
  tier: Tier; 
  isDarkCard: boolean;
  priceAnimationStarted?: boolean;
}) {
  // Subscribe to changes in the pricing store
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const { currency, billing } = store.getState();
  const isAnnual = billing === 'annual';
  const price = calculatePrice(tier, currency, isAnnual);
  const originalPrice = calculatePrice(tier, currency, false);
  const symbol = currencySymbols[currency];

  const [displayPrice, setDisplayPrice] = useState(0);
  const prevPriceRef = useRef(0);

  useEffect(() => {
    if (!priceAnimationStarted) {
      setDisplayPrice(0);
      return;
    }

    const start = prevPriceRef.current;
    const end = price;
    const duration = 400; // capped at 400ms per 500ms performance spec
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentVal = start + progress * (end - start);
      setDisplayPrice(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        prevPriceRef.current = end;
      }
    };

    window.requestAnimationFrame(animate);
  }, [priceAnimationStarted, price]);



  return (
    <div className="flex items-baseline gap-2.5">
      <span className={`text-3xl font-extrabold tracking-tight transition-all duration-300 ${
        isDarkCard ? 'text-[#F1F6F4]' : 'text-[#172B36]'
      }`}>
        {symbol}{Math.round(displayPrice)}
      </span>
      {isAnnual && (
        <span className={`text-sm line-through font-medium transition-all duration-300 ${
          isDarkCard ? 'text-[#D9E8E2]/50' : 'text-[#172B36]/40'
        }`}>
          {symbol}{originalPrice}
        </span>
      )}
    </div>
  );
});

export const PriceCard = React.memo(function PriceCard({
  tier,
  title,
  description,
  features,
  isPopular = false,
  store,
  buttonText = "Start free trial",
  visible = false,
  priceAnimationStarted = false
}: PriceCardProps) {


  const isDarkCard = tier !== 'starter';

  const getEntranceClass = () => {
    if (!visible) {
      if (tier === 'starter') return 'opacity-0 -translate-x-12 scale-95';
      if (tier === 'pro') return 'opacity-0 scale-95';
      return 'opacity-0 translate-x-12 scale-95';
    }
    if (tier === 'pro') return 'opacity-100 scale-[1.01]';
    return 'opacity-100 translate-x-0 scale-100';
  };

  const getDelay = () => {
    if (tier === 'starter') return '100ms';
    if (tier === 'pro') return '250ms';
    return '400ms';
  };

  return (
    <div
      className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-[350ms] ease-in-out select-none ${
        tier === 'starter'
          ? 'bg-white/95 border-[#114C5A]/15 text-[#172B36] shadow-lg shadow-[#114C5A]/5'
          : isPopular
            ? 'bg-[#172B36] border-[#FFC801]/60 text-[#F1F6F4] shadow-xl shadow-[#172B36]/15'
            : 'bg-[#172B36]/90 backdrop-blur-md border-[#114C5A]/25 text-[#F1F6F4] shadow-lg shadow-[#172B36]/8 hover:border-[#114C5A]/50'
      } ${getEntranceClass()} hover:scale-[1.02] group cursor-default`}
      style={{ transitionDelay: visible ? getDelay() : '0ms' }}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-8 bg-[#FFC801] text-[#172B36] text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      <div>
        {/* Tier Header */}
        <h3 className={`text-lg font-bold mb-1 transition-colors duration-180 text-left ${
          isDarkCard ? 'text-[#F1F6F4] group-hover:text-[#FFC801]' : 'text-[#172B36] group-hover:text-[#FF9932]'
        }`}>
          {title}
        </h3>
        <p className={`text-xs leading-relaxed mb-6 min-h-[36px] text-left ${
          isDarkCard ? 'text-[#D9E8E2]/70' : 'text-[#172B36]/70'
        }`}>
          {description}
        </p>

        {/* Pricing Area (isolated subscription) */}
        <div className={`flex items-baseline gap-1 mb-6 pb-6 border-b text-left ${
          isDarkCard ? 'border-white/10' : 'border-neutral-200'
        }`}>
          <PriceText store={store} tier={tier} isDarkCard={isDarkCard} priceAnimationStarted={priceAnimationStarted} />
          <span className={`text-xs font-medium ${
            isDarkCard ? 'text-[#D9E8E2]/50' : 'text-[#172B36]/50'
          }`}>/month</span>
        </div>

        {/* Features List */}
        <ul className="space-y-3.5 mb-8">
          {features.map((feature, i) => (
            <li key={i} className={`flex items-start gap-3 text-xs text-left ${
              isDarkCard ? 'text-[#D9E8E2]/85' : 'text-[#172B36]/85'
            }`}>
              <svg
                className="w-4 h-4 text-[#FFC801] mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        suppressHydrationWarning={true}
        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-180 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC801] ${
          isPopular
            ? 'bg-[#FFC801] text-[#172B36] hover:bg-[#FFC801]/90 shadow-md shadow-[#FFC801]/10'
            : tier === 'starter'
              ? 'bg-[#F1F6F4] text-[#172B36] hover:bg-[#D9E8E2] border border-[#114C5A]/15'
              : 'bg-transparent border border-white/20 text-[#F1F6F4] hover:bg-white/10'
        }`}
        aria-label={`${buttonText} with ${title}`}
      >
        {buttonText}
      </button>
    </div>
  );
});
