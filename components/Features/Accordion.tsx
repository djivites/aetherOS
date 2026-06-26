"use client";
import React from 'react';
import { featureData, FeatureItem } from '../../data/featureData';
import {
  DatabaseIcon,
  CogIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '../Icons';

interface AccordionProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  visible?: boolean;
}

export default function Accordion({ activeIndex, setActiveIndex, visible = false }: AccordionProps) {
  const renderIcon = (name: FeatureItem['iconName'], colorClass: string) => {
    const props = { className: `w-5 h-5 ${colorClass}`, size: 20 };
    switch (name) {
      case 'database':
        return <DatabaseIcon {...props} />;
      case 'cog-8-tooth':
        return <CogIcon {...props} />;
      case 'chart-pie':
        return <ChartPieIcon {...props} />;
      case 'arrow-trending-up':
        return <ArrowTrendingUpIcon {...props} />;
      case 'shield-check':
        return <ShieldCheckIcon {...props} />;
      case 'link':
        return <LinkIcon {...props} />;
      default:
        return null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full space-y-4 max-w-md mx-auto">
      {featureData.map((item, index) => {
        const isOpen = activeIndex === index;
        const panelId = `feature-panel-${item.id}`;
        const headerId = `feature-header-${item.id}`;
        const visibleDelay = `${index * 100}ms`;

        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden shadow-md transition-all duration-[350ms] ease-in-out ${
              visible
                ? isOpen
                  ? 'opacity-100 translate-y-0 bg-[#172B36] border-[#FFC801]/60 shadow-[#FFC801]/5'
                  : 'opacity-100 translate-y-0 bg-[#172B36]/90 backdrop-blur-md border-[#114C5A]/15'
                : 'opacity-0 translate-y-8 bg-[#172B36]/90 border-[#114C5A]/15'
            }`}
            style={{ transitionDelay: visible ? visibleDelay : '0ms' }}
          >
            {/* Header Trigger */}
            <button
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              aria-label={`Toggle description for ${item.title}`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-180 ${
                    isOpen
                      ? `bg-[#172B36] border-[#FFC801]/30`
                      : 'bg-[#172B36]/50 border-[#114C5A]/15'
                  }`}
                >
                  {renderIcon(item.iconName, isOpen ? item.accentColor : 'text-[#D9E8E2]/60')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F1F6F4] leading-tight">
                    {item.title}
                  </h3>
                  <span className={`text-[10px] font-mono font-semibold tracking-wide transition-colors duration-180 uppercase ${
                    isOpen ? item.accentColor : 'text-[#D9E8E2]/50'
                  }`}>
                    {item.tagline}
                  </span>
                </div>
              </div>
              <div className="text-neutral-400">
                {isOpen ? (
                  <ChevronUpIcon className="w-4 h-4 text-[#FFC801]" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 hover:text-white transition-colors duration-180" />
                )}
              </div>
            </button>

            {/* Panel Content (Smooth GPU-accelerated transition) */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`transition-all duration-350 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="px-5 pb-5 pt-1 text-left border-t border-[#114C5A]/10">
                <p className="text-xs text-[#D9E8E2]/80 leading-relaxed translate-z-0">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold flex items-center gap-1 transition-colors duration-180 ${
                    isOpen ? item.accentColor : 'text-[#D9E8E2]/50'
                  }`}>
                    Learn more <span>→</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">
                    Feature 0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
