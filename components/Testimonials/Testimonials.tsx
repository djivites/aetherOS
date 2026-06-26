"use client";
import React, { useState, useEffect, useRef } from 'react';
import { CubeIcon, ShieldCheckIcon, ChartPieIcon, CogIcon } from '../Icons';

// Enhanced count up component for animating stats from 0
const CountUp = React.memo(function CountUp({ 
  end, 
  duration = 450, 
  suffix = "", 
  prefix = "", 
  decimals = 0,
  useFormat = false
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
  decimals?: number; 
  useFormat?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const displayVal = count.toFixed(decimals);
  const formatted = useFormat 
    ? Number(displayVal).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : displayVal;

  return <span>{prefix}{formatted}{suffix}</span>;
});

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const [hasIntersected, setHasIntersected] = useState(false);
  const [trustIntersected, setTrustIntersected] = useState(false);
  const [ctaIntersected, setCtaIntersected] = useState(false);

  const [healthOffset, setHealthOffset] = useState(314.159);
  const [throughputOffset, setThroughputOffset] = useState(188.5);
  const [graphOffset, setGraphOffset] = useState(500);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  // Intersection Observer to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect(); // Trigger animation once
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trust section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrustIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (trustRef.current) {
      observer.observe(trustRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // CTA section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Synchronized packet tooltips loop (8s duration)
  useEffect(() => {
    if (!hasIntersected) return;

    let animationFrameId: number;
    const loopDuration = 8000; // 8s
    const startTime = performance.now();

    const updateTooltips = (now: number) => {
      const elapsed = (now - startTime) % loopDuration;

      // Map elapsed time slots (ms) to node indices 0 to 5
      if (elapsed >= 0 && elapsed < 400) {
        setActiveTooltipIndex(0);
      } else if (elapsed >= 1200 && elapsed < 1600) {
        setActiveTooltipIndex(1);
      } else if (elapsed >= 2500 && elapsed < 2900) {
        setActiveTooltipIndex(2);
      } else if (elapsed >= 3800 && elapsed < 4200) {
        setActiveTooltipIndex(3);
      } else if (elapsed >= 5100 && elapsed < 5500) {
        setActiveTooltipIndex(4);
      } else if (elapsed >= 6400 && elapsed < 6800) {
        setActiveTooltipIndex(5);
      } else {
        setActiveTooltipIndex(null);
      }

      animationFrameId = window.requestAnimationFrame(updateTooltips);
    };

    animationFrameId = window.requestAnimationFrame(updateTooltips);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasIntersected]);

  // Handle radial fill on intersection
  useEffect(() => {
    if (!hasIntersected) return;

    const timer = setTimeout(() => {
      // Circular gauge (99.4% filled): 2 * PI * 50 = 314.159
      setHealthOffset(314.159 * (1 - 0.994));
      // Semi-circular gauge (99.8% filled): PI * 60 = 188.5
      setThroughputOffset(188.5 * (1 - 0.998));
      // Graph stroke path
      setGraphOffset(0);
    }, 150);
    return () => clearTimeout(timer);
  }, [hasIntersected]);

  const graphPoints = [
    { x: 30, y: 150, val: "1.2k req", label: "09:00" },
    { x: 110, y: 110, val: "2.8k req", label: "10:00" },
    { x: 190, y: 130, val: "2.1k req", label: "11:00" },
    { x: 270, y: 70, val: "4.9k req", label: "12:00" },
    { x: 350, y: 90, val: "4.2k req", label: "13:00" },
    { x: 430, y: 40, val: "6.5k req", label: "14:00" }
  ];

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-24 md:py-28 bg-[#172B36] relative overflow-hidden select-none"
    >
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#114C5A]/15 to-transparent rounded-full filter blur-[160px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to right, #114C5A 1px, transparent 1px), linear-gradient(to bottom, #114C5A 1px, transparent 1px)', backgroundSize: '45px 45px' }} />

      {/* Tiny floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D9E8E2] opacity-25 floating-particle"
            style={{
              top: `${20 + i * 13}%`,
              left: `${15 + (i * 19) % 70}%`,
              '--float-duration': `${8 + i * 2}s`,
              '--float-delay': `${-i * 1.5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#114C5A]/35 border border-[#114C5A]/60 text-[10px] font-mono font-bold tracking-widest text-[#D9E8E2] uppercase mb-4">
            MISSION CONTROL
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F6F4] tracking-tight leading-tight">
            Live AI Performance Center
          </h2>
          <p className="text-[#D9E8E2]/65 text-xs md:text-sm mt-4 leading-relaxed font-medium">
            Inspect real-time health data, operations volume, and validated customer metrics.
          </p>
        </div>

        {/* Analytics Grid: 3 columns with thin vertical divider lines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-stretch border border-[#114C5A]/20 rounded-3xl bg-[#172B36]/50 backdrop-blur-md shadow-2xl p-8 lg:p-10 mb-16 relative overflow-hidden">
          
          {/* Vertical dividers (visible on desktop) */}
          <div className="hidden lg:block absolute left-1/3 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-[#114C5A]/20 to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute left-2/3 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-[#114C5A]/20 to-transparent pointer-events-none" />

          {/* Left Column: Enterprise Health */}
          <div className="group relative flex flex-col items-center justify-between text-center lg:px-8 py-4 rounded-2xl hover:bg-[#172B36]/30 transition-all duration-180 hover:shadow-xl hover:shadow-[#172B36]/20">
            
            {/* Diagonal Light Sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
            </div>

            <div className="w-full relative z-10">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-6 group-hover:text-white transition-colors duration-180">
                Enterprise Health
              </h3>
              
              {/* Circular Gauge */}
              <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center animate-gauge-pulse">
                
                {/* SVG Circle paths for animations */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <defs>
                    <path id="circlePath" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                  </defs>
                  
                  {/* Background Track */}
                  <circle cx="60" cy="60" r="50" stroke="#114C5A" strokeWidth="6" strokeOpacity="0.2" fill="none" />
                  
                  {/* Animated Value Arc */}
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    stroke="#FFC801" 
                    strokeWidth="6.5" 
                    strokeDasharray="314.159" 
                    strokeDashoffset={healthOffset} 
                    strokeLinecap="round" 
                    fill="none" 
                    className="transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) filter drop-shadow-[0_0_4px_#FFC801]" 
                  />

                  {/* Traveling glowing dot */}
                  {hasIntersected && (
                    <circle r="3.5" fill="#FFC801" className="filter drop-shadow-[0_0_6px_#FFC801]">
                      <animateMotion 
                        dur="6s" 
                        repeatCount="indefinite" 
                        path="M 60,10 A 50,50 0 1,1 59.9,10" 
                      />
                    </circle>
                  )}
                </svg>

                {/* Score badge */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-[#F1F6F4] tracking-tighter group-hover:text-white transition-colors">
                    <CountUp end={hasIntersected ? 99.4 : 0} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[8px] font-mono text-[#D9E8E2]/50 uppercase tracking-widest">
                    Score
                  </span>
                </div>
              </div>
            </div>

            {/* Health Metrics List */}
            <div className="w-full space-y-3.5 text-left border-t border-[#114C5A]/15 pt-6 relative z-10">
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  System Reliability
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 99.99 : 0} decimals={2} suffix="%" />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Automation Success
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 99.82 : 0} decimals={2} suffix="%" />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Model Accuracy
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 98.60 : 0} decimals={2} suffix="%" />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Connected Workflows
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 2410 : 0} useFormat />
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Live AI Activity */}
          <div className="group relative flex flex-col items-center justify-between text-center lg:px-8 py-4 rounded-2xl hover:bg-[#172B36]/30 transition-all duration-180 hover:shadow-xl hover:shadow-[#172B36]/20">
            
            {/* Diagonal Light Sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
            </div>

            <div className="w-full relative z-10">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#FF9932] uppercase mb-6 group-hover:text-white transition-colors duration-180">
                Live AI Activity
              </h3>
              
              {/* Performance Graph */}
              <div className="relative w-full h-36 flex items-center justify-center bg-[#172B36]/40 rounded-2xl border border-[#114C5A]/15 overflow-hidden p-2">
                
                {/* Horizontal scan line sweep */}
                {hasIntersected && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-r from-[#FF9932]/25 to-transparent pointer-events-none z-20 animate-scan" />
                )}

                <svg className="w-full h-full" viewBox="0 0 460 180" fill="none">
                  
                  {/* Grid Lines */}
                  <line x1="20" y1="40" x2="440" y2="40" stroke="#114C5A" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.2" />
                  <line x1="20" y1="90" x2="440" y2="90" stroke="#114C5A" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.2" />
                  <line x1="20" y1="140" x2="440" y2="140" stroke="#114C5A" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.2" />

                  {/* Draw main line */}
                  <path
                    d="M 30 150 C 70 130, 90 90, 110 110 S 170 140, 190 130 S 250 50, 270 70 S 330 100, 350 90 S 410 30, 430 40"
                    stroke="#FF9932"
                    strokeWidth="2.5"
                    strokeDasharray="500"
                    strokeDashoffset={graphOffset}
                    strokeLinecap="round"
                    className="transition-all duration-[2500ms] ease-out filter drop-shadow-[0_0_2px_#FF9932]"
                  />

                  {/* Shading area below path */}
                  <path
                    d="M 30 150 C 70 130, 90 90, 110 110 S 170 140, 190 130 S 250 50, 270 70 S 330 100, 350 90 S 410 30, 430 40 L 430 170 L 30 170 Z"
                    fill="url(#gradientThroughputLive)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="gradientThroughputLive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF9932" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  {/* Glowing data packet traveling along the graph */}
                  {hasIntersected && (
                    <circle r="5" fill="#FFC801" className="filter drop-shadow-[0_0_8px_#FFC801] cursor-pointer">
                      <animateMotion 
                        dur="8s" 
                        repeatCount="indefinite" 
                        path="M 30 150 C 70 130, 90 90, 110 110 S 170 140, 190 130 S 250 50, 270 70 S 330 100, 350 90 S 410 30, 430 40" 
                      />
                    </circle>
                  )}

                  {/* Pulsing graph nodes */}
                  {graphPoints.map((pt, i) => {
                    const isPacketNear = activeTooltipIndex === i;
                    return (
                      <g key={i}>
                        {/* Node circle */}
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r={isPacketNear ? "5.5" : "4"} 
                          fill={isPacketNear ? "#FFC801" : "#FF9932"} 
                          className="cursor-pointer transition-all duration-180"
                        />
                        {/* Soft pulsing outline ring */}
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r={isPacketNear ? "10" : "7.5"} 
                          stroke={isPacketNear ? "#FFC801" : "#FF9932"} 
                          strokeWidth="1" 
                          fill="none" 
                          opacity={isPacketNear ? "0.75" : "0.3"}
                          className="animate-ping" 
                          style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Graph Tooltips (Synchronized/Triggered by moving packet) */}
                {graphPoints.map((pt, i) => {
                  const isVisible = activeTooltipIndex === i;
                  return (
                    <div 
                      key={i}
                      className={`absolute bg-[#172B36] border border-[#FF9932]/45 text-[#F1F6F4] text-[8.5px] font-mono px-2 py-0.5 rounded-md shadow-lg pointer-events-none z-30 transition-all duration-180 ${
                        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
                      }`}
                      style={{ 
                        top: `${(pt.y / 180) * 100 - 32}%`, 
                        left: `${(pt.x / 460) * 100 - 10}%` 
                      }}
                    >
                      <div className="font-bold leading-none">{pt.val}</div>
                      <div className="opacity-50 text-[7px] leading-none mt-0.5">{pt.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance status tag */}
            <div className="w-full border-t border-[#114C5A]/15 pt-6 text-left flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80 relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932] animate-pulse" />
                Network Throughput
              </span>
              <span className="font-mono text-[#FF9932] group-hover:brightness-110 transition-all">48.2 MB/s</span>
            </div>
          </div>

          {/* Right Column: Automation Throughput */}
          <div className="group relative flex flex-col items-center justify-between text-center lg:px-8 py-4 rounded-2xl hover:bg-[#172B36]/30 transition-all duration-180 hover:shadow-xl hover:shadow-[#172B36]/20">
            
            {/* Diagonal Light Sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
            </div>

            <div className="w-full relative z-10">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-6 group-hover:text-white transition-colors duration-180">
                Automation Throughput
              </h3>
              
              {/* Semi-circular gauge */}
              <div className="relative w-48 h-28 mx-auto mb-6 flex items-end justify-center overflow-hidden">
                <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 160 90">
                  {/* Gauge Arc background */}
                  <path 
                    d="M 20 85 A 60 60 0 0 1 140 85" 
                    stroke="#114C5A" 
                    strokeWidth="8" 
                    strokeOpacity="0.2" 
                    fill="none" 
                    strokeLinecap="round"
                  />
                  {/* Gauge Arc value */}
                  <path 
                    d="M 20 85 A 60 60 0 0 1 140 85" 
                    stroke="#FFC801" 
                    strokeWidth="8.5" 
                    strokeDasharray="188.5" 
                    strokeDashoffset={throughputOffset} 
                    fill="none" 
                    strokeLinecap="round"
                    className="transition-all duration-[2000ms] ease-out filter drop-shadow-[0_0_4px_#FFC801]"
                  />

                  {/* Traveling Arc Glow Indicator */}
                  {hasIntersected && (
                    <circle r="4" fill="#FFC801" className="filter drop-shadow-[0_0_6px_#FFC801]">
                      <animateMotion 
                        dur="4s" 
                        repeatCount="indefinite" 
                        path="M 20 85 A 60 60 0 0 1 140 85" 
                      />
                    </circle>
                  )}

                  {/* Rotating Needle indicator with micro-wobble animations */}
                  <polygon 
                    points="77,85 80,26 83,85" 
                    fill="#FF9932" 
                    className="animate-needle filter drop-shadow-[0_1px_3px_rgba(23,43,54,0.4)]"
                    style={{ 
                      '--needle-angle': hasIntersected ? `${-90 + 180 * 0.998}deg` : '-90deg' 
                    } as React.CSSProperties}
                  />
                </svg>
                <div className="absolute bottom-2 flex flex-col items-center justify-center leading-none">
                  <span className="text-3xl font-black text-[#F1F6F4] tracking-tighter group-hover:text-white transition-colors">
                    <CountUp end={hasIntersected ? 341 : 0} suffix="" />
                  </span>
                  <span className="text-[9px] font-mono text-[#D9E8E2]/50 uppercase tracking-widest mt-1 font-bold">
                    Automations
                  </span>
                </div>
              </div>
            </div>

            {/* Throughput Stats list */}
            <div className="w-full space-y-3.5 text-left border-t border-[#114C5A]/15 pt-6 relative z-10">
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Connected APIs
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 128 : 0} />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Success Rate
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 99.8 : 0} decimals={1} suffix="%" />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Avg Latency
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">
                  <CountUp end={hasIntersected ? 18 : 0} suffix="ms" />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#D9E8E2]/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] transition-transform duration-180 group-hover:scale-125" />
                  Active Pipelines
                </span>
                <span className="font-mono text-[#FFC801] group-hover:brightness-110 transition-all">12</span>
              </div>
            </div>
          </div>

        </div>

        {/* Customer Trust Subsection */}
        <div ref={trustRef} className="mt-20">
          <div className={`text-center mb-12 transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${trustIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#D9E8E2]/40 uppercase mb-3">
              Validated Customer Case Metrics
            </h3>
            <div className="w-16 h-[2px] bg-[#114C5A] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            
            {/* Card 1: Vertex Labs */}
            <div className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-[#172B36]/60 backdrop-blur-md border border-[#114C5A]/30 shadow-2xl hover:border-[#FFC801]/40 hover:translate-y-[-6px] transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) select-none ${
              trustIntersected ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-[0.96]'
            }`} style={{ transitionDelay: '100ms' }}>
              
              {/* Diagonal Light Sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Logo Placeholder */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#114C5A] to-[#FFC801] flex items-center justify-center font-mono font-black text-xs text-[#172B36] transition-transform duration-180 group-hover:rotate-2 group-hover:scale-105">
                      V
                    </div>
                    <span className="text-[#F1F6F4] text-xs font-extrabold tracking-tight group-hover:text-white transition-colors">Vertex Labs</span>
                  </div>
                  {/* Verified Badge */}
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#FFC801] bg-[#FFC801]/10 border border-[#FFC801]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheckIcon className="w-3 h-3 text-[#FFC801] transition-transform duration-180 group-hover:rotate-2" />
                    Verified
                  </span>
                </div>

                <p className="text-[#D9E8E2]/85 text-xs md:text-sm leading-relaxed mb-6 font-sans italic text-left group-hover:text-white transition-colors">
                  “AetherOS transformed how we handle data. Our automation runs 10x faster and our insights are deeper than ever.”
                </p>
              </div>

              <div className="border-t border-[#114C5A]/20 pt-5 mt-auto flex items-center justify-between text-left relative z-10">
                <span className="text-[10px] text-[#D9E8E2]/50 font-bold uppercase tracking-wide">
                  Automation Increased
                </span>
                <span className="text-2xl font-black text-[#FFC801] tracking-tight group-hover:scale-105 transition-transform duration-180 group-hover:brightness-110">
                  <CountUp end={trustIntersected ? 72 : 0} prefix="+" suffix="%" />
                </span>
              </div>
            </div>

            {/* Card 2: Cloudix */}
            <div className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-[#172B36]/60 backdrop-blur-md border border-[#114C5A]/30 shadow-2xl hover:border-[#FF9932]/40 hover:translate-y-[-6px] transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) select-none ${
              trustIntersected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.96]'
            }`} style={{ transitionDelay: '250ms' }}>
              
              {/* Diagonal Light Sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Logo Placeholder */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#114C5A] to-[#FF9932] flex items-center justify-center font-mono font-black text-xs text-[#172B36] transition-transform duration-180 group-hover:rotate-2 group-hover:scale-105">
                      C
                    </div>
                    <span className="text-[#F1F6F4] text-xs font-extrabold tracking-tight group-hover:text-white transition-colors">Cloudix</span>
                  </div>
                  {/* Verified Badge */}
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#FF9932] bg-[#FF9932]/10 border border-[#FF9932]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheckIcon className="w-3 h-3 text-[#FF9932] transition-transform duration-180 group-hover:rotate-2" />
                    Verified
                  </span>
                </div>

                <p className="text-[#D9E8E2]/85 text-xs md:text-sm leading-relaxed mb-6 font-sans italic text-left group-hover:text-white transition-colors">
                  “The easiest automation platform we've used. The AI suggestions save us hours every single week.”
                </p>
              </div>

              <div className="border-t border-[#114C5A]/20 pt-5 mt-auto flex items-center justify-between text-left relative z-10">
                <span className="text-[10px] text-[#D9E8E2]/50 font-bold uppercase tracking-wide">
                  Manual Tasks Reduced
                </span>
                <span className="text-2xl font-black text-[#FF9932] tracking-tight group-hover:scale-105 transition-transform duration-180 group-hover:brightness-110">
                  <CountUp end={trustIntersected ? 84 : 0} suffix="%" />
                </span>
              </div>
            </div>

            {/* Card 3: Synthica */}
            <div className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-[#172B36]/60 backdrop-blur-md border border-[#114C5A]/30 shadow-2xl hover:border-[#FFC801]/40 hover:translate-y-[-6px] transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) select-none ${
              trustIntersected ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-[0.96]'
            }`} style={{ transitionDelay: '400ms' }}>
              
              {/* Diagonal Light Sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-0 -left-[100%] w-[30%] h-full bg-gradient-to-r from-transparent via-[#F1F6F4]/5 to-transparent skew-x-12 group-hover:animate-sweep" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Logo Placeholder */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#114C5A] to-[#FFC801] flex items-center justify-center font-mono font-black text-xs text-[#172B36] transition-transform duration-180 group-hover:rotate-2 group-hover:scale-105">
                      S
                    </div>
                    <span className="text-[#F1F6F4] text-xs font-extrabold tracking-tight group-hover:text-white transition-colors">Synthica</span>
                  </div>
                  {/* Verified Badge */}
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#FFC801] bg-[#FFC801]/10 border border-[#FFC801]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheckIcon className="w-3 h-3 text-[#FFC801] transition-transform duration-180 group-hover:rotate-2" />
                    Verified
                  </span>
                </div>

                <p className="text-[#D9E8E2]/85 text-xs md:text-sm leading-relaxed mb-6 font-sans italic text-left group-hover:text-white transition-colors">
                  “Incredible platform with enterprise-grade security. It just works, and the support is world-class.”
                </p>
              </div>

              <div className="border-t border-[#114C5A]/20 pt-5 mt-auto flex items-center justify-between text-left relative z-10">
                <span className="text-[10px] text-[#D9E8E2]/50 font-bold uppercase tracking-wide">
                  Workflow Reliability
                </span>
                <span className="text-2xl font-black text-[#FFC801] tracking-tight group-hover:scale-105 transition-transform duration-180 group-hover:brightness-110">
                  <CountUp end={trustIntersected ? 99.98 : 0} decimals={2} suffix="%" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
