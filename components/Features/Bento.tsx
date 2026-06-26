"use client";
import React from 'react';
import { featureData, FeatureItem } from '../../data/featureData';
import {
  DatabaseIcon,
  CogIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  LinkIcon
} from '../Icons';

interface BentoProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  visible?: boolean;
}

export default function Bento({ activeIndex, setActiveIndex, visible = false }: BentoProps) {
  const renderIcon = (name: FeatureItem['iconName'], colorClass: string) => {
    const props = { className: `w-6 h-6 ${colorClass}`, size: 24 };
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {featureData.map((item, index) => {
        const isActive = activeIndex === index;
        
        const visibleDelay = 
          index === 0 ? '0ms' :
          index === 1 ? '100ms' :
          index === 2 ? '200ms' :
          index === 3 ? '150ms' :
          index === 4 ? '250ms' :
          '350ms';

        const initialTransform =
          (index === 0 || index === 3) ? '-translate-x-10' :
          (index === 1 || index === 4) ? 'translate-y-10' :
          'translate-x-10';

        return (
          <div
            key={item.id}
            onMouseEnter={() => setActiveIndex(index)}
            className={`relative flex flex-col justify-between p-8 rounded-3xl border text-left cursor-pointer select-none transition-all duration-[350ms] ease-in-out ${
              visible
                ? isActive
                  ? 'opacity-100 translate-x-0 translate-y-0 scale-[1.01] bg-[#172B36] border-[#FFC801]/80 shadow-xl shadow-[#FFC801]/5'
                  : 'opacity-100 translate-x-0 translate-y-0 scale-100 bg-[#172B36]/90 backdrop-blur-md border-[#114C5A]/15 hover:border-[#114C5A]/45 shadow-md shadow-[#172B36]/5'
                : `opacity-0 ${initialTransform} scale-[0.96] bg-[#172B36]/90 border-[#114C5A]/15`
            }`}
            style={{ transitionDelay: visible ? visibleDelay : '0ms' }}
          >
            {/* Visual glow indicator */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-current to-transparent rounded-tr-3xl opacity-[0.04] transition-opacity duration-350 pointer-events-none ${
                isActive ? item.accentColor : 'text-transparent'
              }`}
            />

            <div>
              {/* Icon container */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-180 border ${
                  isActive
                    ? `bg-[#172B36] border-[#FFC801]/30`
                    : 'bg-[#172B36]/50 border-[#114C5A]/15'
                }`}
              >
                {renderIcon(item.iconName, isActive ? item.accentColor : 'text-[#D9E8E2]/60')}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-[#F1F6F4] mb-2 transition-colors duration-180">
                {item.title}
              </h3>
              <p className={`text-xs font-mono font-semibold tracking-wide mb-4 transition-colors duration-180 uppercase ${
                isActive ? item.accentColor : 'text-[#D9E8E2]/50'
              }`}>
                {item.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-[#D9E8E2]/80 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <span className={`text-xs font-semibold flex items-center gap-1 transition-colors duration-180 ${
                isActive ? item.accentColor : 'text-[#D9E8E2]/60'
              }`}>
                Learn more <span className="text-sm">→</span>
              </span>
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-opacity duration-350 ${
                isActive ? 'opacity-100 text-[#F1F6F4]' : 'opacity-0'
              }`}>
                Active // 0{index + 1}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
