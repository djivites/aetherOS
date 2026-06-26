"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePersistentIndex } from '../../hooks/usePersistentIndex';
import Bento from './Bento';
import Accordion from './Accordion';

// Mobile breakpoint matches Tailwind's md: (768px)
const MOBILE_BREAKPOINT = 768;

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = usePersistentIndex(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  /**
   * Context Lock Constraint:
   * Track the live hovered bento index via a ref so we can read it
   * synchronously inside the resize handler without stale closure issues.
   * When the window crosses the mobile breakpoint (768px) while a bento
   * card is being hovered, the hover index is immediately transferred to
   * the Accordion's activeIndex state.
   */
  const hoveredIndexRef = useRef<number>(activeIndex);

  const handleSetActiveIndex = useCallback((index: number) => {
    hoveredIndexRef.current = index;
    setActiveIndex(index);
  }, [setActiveIndex]);

  // Resize observer: transfers live hover index on breakpoint crossing
  useEffect(() => {
    let wasMobile = window.innerWidth < MOBILE_BREAKPOINT;

    const onResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      // Detect a crossing from desktop → mobile
      if (!wasMobile && isMobile) {
        // Commit the last hovered bento index to the accordion
        setActiveIndex(hoveredIndexRef.current);
      }
      wasMobile = isMobile;
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [setActiveIndex]);

  // IntersectionObserver for scroll-triggered entrance animation
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

  return (
    <section ref={containerRef} id="features" className="py-20 md:py-24 bg-transparent relative overflow-hidden">
      
      {/* Soft light blueprint grid lines inside section */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #114C5A 1px, transparent 1px), linear-gradient(to bottom, #114C5A 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 max-w-2xl mx-auto transition-all duration-[350ms] ease-in-out ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#114C5A]/8 border border-[#114C5A]/18 text-[10px] font-mono font-bold tracking-widest text-[#114C5A] uppercase mb-4">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B36] tracking-tight leading-tight">
            Everything you need to automate and scale with intelligence.
          </h2>
          <p className="text-[#172B36]/75 text-xs md:text-sm mt-4 leading-relaxed font-medium">
            From data ingestion to intelligent actions, AetherOS handles the complexity so you can focus on what matters.
          </p>
        </div>

        {/* Desktop Layout: Bento Grid — passes the live-tracking setter */}
        <div className="hidden md:block">
          <Bento activeIndex={activeIndex} setActiveIndex={handleSetActiveIndex} visible={hasIntersected} />
        </div>

        {/* Mobile Layout: Accordion — receives the synced activeIndex */}
        <div className="block md:hidden">
          <Accordion activeIndex={activeIndex} setActiveIndex={handleSetActiveIndex} visible={hasIntersected} />
        </div>

        {/* Bottom CTA Button */}
        <div className={`mt-12 md:mt-16 flex justify-center transition-all duration-[350ms] ease-in-out ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-bold bg-[#172B36] text-[#F1F6F4] hover:bg-[#114C5A] shadow-md shadow-[#172B36]/10 transition-all duration-180 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC801] focus-visible:outline-offset-2"
          >
            Explore all features →
          </a>
        </div>

      </div>
    </section>
  );
}
