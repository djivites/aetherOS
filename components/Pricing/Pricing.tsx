"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Currency, Billing } from '../../data/pricingMatrix';
import { CurrencySwitcher } from './CurrencySwitcher';
import { BillingToggle } from './BillingToggle';
import { PriceCard } from './PriceCard';

export class PricingStore {
  private listeners = new Set<() => void>();
  private currency: Currency = 'USD';
  private billing: Billing = 'monthly';

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => {
    return `${this.currency}-${this.billing}`;
  };

  getServerSnapshot = () => {
    return 'USD-monthly';
  };

  getState() {
    return {
      currency: this.currency,
      billing: this.billing
    };
  }

  setCurrency(currency: Currency) {
    if (this.currency !== currency) {
      this.currency = currency;
      this.emit();
    }
  }

  setBilling(billing: Billing) {
    if (this.billing !== billing) {
      this.billing = billing;
      this.emit();
    }
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }
}

export default function Pricing() {
  const storeRef = useRef(new PricingStore());
  const store = storeRef.current;
  const containerRef = useRef<HTMLElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [priceAnimationStarted, setPriceAnimationStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => {
        setPriceAnimationStarted(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hasIntersected]);



  return (
    <section ref={containerRef} id="pricing" className="py-20 md:py-24 bg-transparent relative overflow-hidden">
      
      {/* Soft radial Saffron accent glow overlay */}
      <div className="absolute top-[20%] left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-[#FF9932]/5 to-transparent rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <div className={`mb-12 max-w-2xl mx-auto transition-all duration-[350ms] ease-in-out ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#114C5A]/8 border border-[#114C5A]/18 text-[10px] font-mono font-bold tracking-widest text-[#114C5A] uppercase mb-4">
            SIMPLE & TRANSPARENT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B36] tracking-tight leading-tight">
            Choose the plan that grows with you.
          </h2>
        </div>

        {/* Controls container (isolated re-renders) */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-6 mb-16 max-w-2xl mx-auto border-b border-[#114C5A]/10 pb-8 relative z-25 transition-all duration-[350ms] ease-in-out delay-100 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <BillingToggle store={store} />
          <div className="flex items-center gap-3">
            <CurrencySwitcher store={store} />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto items-stretch relative z-20">
          <PriceCard
            tier="starter"
            title="Starter"
            description="Perfect for individuals and small projects."
            features={[
              "Up to 5 Data Sources",
              "10K Records / month",
              "Basic Automations",
              "Email Support"
            ]}
            store={store}
            buttonText="Get started"
            visible={hasIntersected}
            priceAnimationStarted={priceAnimationStarted}
          />
          <PriceCard
            tier="pro"
            title="Pro"
            description="For growing teams that need more power."
            features={[
              "Up to 25 Data Sources",
              "100K Records / month",
              "Advanced Automations",
              "Priority Support",
              "Custom Alerts"
            ]}
            isPopular
            store={store}
            buttonText="Start free trial"
            visible={hasIntersected}
            priceAnimationStarted={priceAnimationStarted}
          />
          <PriceCard
            tier="enterprise"
            title="Enterprise"
            description="For large organizations with complex needs."
            features={[
              "Unlimited Data Sources",
              "Unlimited Records",
              "Custom Automations",
              "Dedicated Support",
              "SLA & Custom Contracts"
            ]}
            store={store}
            buttonText="Contact sales"
            visible={hasIntersected}
            priceAnimationStarted={priceAnimationStarted}
          />
        </div>

        {/* Bottom helper text */}
        <p className="text-[#172B36]/50 text-xs mt-12 font-bold tracking-tight">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
