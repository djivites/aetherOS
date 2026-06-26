"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import {
  ChartPieIcon,
  LinkIcon,
  ArrowTrendingUpIcon,
  SearchIcon,
  ArrowPathIcon,
  CubeIcon
} from '../Icons';

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const logosRef = useRef<HTMLDivElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [logosIntersected, setLogosIntersected] = useState(false);
  const [hoveredStation, setHoveredStation] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLogosIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (logosRef.current) {
      observer.observe(logosRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getSegmentClass = (idx: number) => {
    if (hoveredStation === null) return styles.connectionLine;
    const isConnected = 
      (hoveredStation === 1 && idx === 0) ||
      (hoveredStation === 2 && (idx === 0 || idx === 1)) ||
      (hoveredStation === 3 && (idx === 1 || idx === 2)) ||
      (hoveredStation === 4 && (idx === 2 || idx === 3)) ||
      (hoveredStation === 5 && (idx === 3 || idx === 4)) ||
      (hoveredStation === 6 && idx === 4);
    return `${styles.connectionLine} ${isConnected ? styles.highlighted : styles.dimmed}`;
  };

  const getSegmentGlowColor = () => {
    if (hoveredStation === null) return undefined;
    return hoveredStation % 2 === 1 ? '#FFC801' : '#FF9932';
  };

  const glowColor = getSegmentGlowColor();
  const segmentStyle = glowColor ? { '--glow-color': glowColor } as React.CSSProperties : undefined;

  const stationOffsets = [0, 21.2, 39.4, 60.6, 78.8, 100];
  const combinedPath = "M 190 90 C 350 90, 350 90, 510 90 C 600 90, 600 250, 510 250 C 350 250, 350 250, 190 250 C 100 250, 100 410, 190 410 C 350 410, 350 410, 510 410";

  return (
    <header ref={containerRef} className={`relative w-full overflow-hidden pt-6 pb-28 select-none ${styles.darkTealHeroBase} ${styles.heroContainer}`}>
      
      
      {/* Volumetric light ray sweeps */}
      <div className={styles.lightRay} />

      {/* Layered backdrop gradients */}
      <div className={styles.auroraBlob1} />
      <div className={styles.auroraBlob2} />

      {/* Faint blueprint grid overlay specifically inside Hero */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-1" style={{ backgroundImage: 'linear-gradient(to right, #114C5A 1px, transparent 1px), linear-gradient(to bottom, #114C5A 1px, transparent 1px)', backgroundSize: '45px 45px' }} />

      {/* Tiny floating particles in Hero background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        {hasIntersected && [...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D9E8E2] opacity-35 floating-particle"
            style={{
              top: `${15 + i * 9}%`,
              left: `${8 + (i * 19) % 80}%`,
              '--float-duration': `${6 + i * 2}s`,
              '--float-delay': `${-i * 1.3}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ========================================================
          NAVIGATION & LOGO HEADER (WHITE & MINT THEME)
          ======================================================== */}
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between relative z-30 transition-all duration-[700ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <a href="#" className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC801] focus-visible:outline-offset-4 rounded-lg">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9932] via-[#114C5A] to-[#FFC801] flex items-center justify-center font-mono font-black text-[#172B36] shadow-md shadow-[#114C5A]/25">
            A
          </div>
          <div className="text-left leading-none">
            <span className="font-sans text-sm font-extrabold tracking-tight text-[#F1F6F4] block">
              AetherOS
            </span>
            <span className="text-[9px] font-mono text-[#D9E8E2]/60 tracking-wider font-semibold uppercase">
              Autonomous Intelligence
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-[#D9E8E2]/70 font-sans">
          <a href="#" className="hover:text-white transition-colors duration-180 focus-visible:text-[#FFC801] focus-visible:outline-none">Product</a>
          <a href="#features" className="hover:text-white transition-colors duration-180 focus-visible:text-[#FFC801] focus-visible:outline-none">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-180 focus-visible:text-[#FFC801] focus-visible:outline-none">Pricing</a>
          <a href="#" className="hover:text-white transition-colors duration-180 focus-visible:text-[#FFC801] focus-visible:outline-none">Resources</a>
          <a href="#" className="hover:text-white transition-colors duration-180 focus-visible:text-[#FFC801] focus-visible:outline-none">Company</a>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-4">
          <button className="text-xs font-semibold text-[#D9E8E2]/75 hover:text-white transition-colors duration-180" aria-label="Sign in">
            Sign in
          </button>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FFC801] hover:bg-[#FFC801]/90 text-[#172B36] shadow-lg shadow-[#FFC801]/10 transition-all duration-180 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC801] focus-visible:outline-offset-2"
            aria-label="Start free trial"
          >
            Start free trial
          </a>
        </div>
      </div>

      {/* ========================================================
          HERO MAIN CONTENT & PROCESS ILLUSTRATION
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-25">
        
        {/* Left Column Copy Block */}
        <div className="lg:col-span-5 text-left flex flex-col items-start relative z-30">
          
          {/* Pill tag */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#114C5A]/40 border border-[#114C5A]/60 mb-6 transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#D9E8E2] font-bold">
              Autonomous Intelligence Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F1F6F4] mb-6 leading-[1.1] font-sans transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            Every piece of <br />
            data has a <br />
            <span className="text-[#FFC801]">
              journey.
            </span>
          </h1>

          {/* Subtitle description */}
          <p className={`text-sm sm:text-base text-[#D9E8E2] leading-relaxed mb-8 max-w-md font-sans transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            AetherOS unifies your data, automates workflows, and turns intelligence into real-world impact.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
            <a
              href="#pricing"
              className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[#FFC801] text-[#172B36] hover:bg-[#FFC801]/95 shadow-lg shadow-[#FFC801]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC801] focus-visible:outline-offset-2 ${styles.ctaButton} transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '300ms' }}
              aria-label="Start your free trial"
            >
              Start free trial →
            </a>
            <a
              href="#"
              className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-transparent border border-[#F1F6F4]/30 text-[#F1F6F4] hover:text-white hover:bg-[#F1F6F4]/10 transition-all duration-180 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC801] focus-visible:outline-offset-2 ${styles.ctaButton} transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
              aria-label="Request a demo"
            >
              Book a demo
            </a>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-[#114C5A]/45 w-full text-[#D9E8E2]/60 font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#FFC801]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#FFC801]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>Setup in under 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#FFC801]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column Illustration Card Node Canvas */}
        <div className={`lg:col-span-7 w-full h-[360px] sm:h-[450px] lg:h-[480px] relative rounded-3xl bg-[#172B36]/30 border border-[#114C5A]/15 p-2 overflow-hidden shadow-lg shadow-[#172B36]/5 transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} ${styles.illustrationContainer}`} style={{ transitionDelay: '100ms' }}>
          
          {/* Soft light glow behind the illustration */}
          <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#114C5A]/30 to-transparent rounded-full filter blur-[80px] pointer-events-none z-0" />

          <div className={styles.mapPerspectiveContainer}>
            <div className={styles.mapSkewWrapper}>
              <div className={styles.networkContainer}>
                
                {/* SVG Metro Network canvas */}
                <svg className={styles.networkSvg} viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Glowing pipelines gradients */}
                  <defs>
                    <filter id="particleGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. S-shaped journey connection lines */}
                  {/* Segment 0: Discover -> Connect */}
                  <path
                    d="M 190 90 C 350 90, 350 90, 510 90"
                    className={getSegmentClass(0)}
                    style={segmentStyle}
                  />
                  {/* Segment 1: Connect -> Transform */}
                  <path
                    d="M 510 90 C 600 90, 600 250, 510 250"
                    className={getSegmentClass(1)}
                    style={segmentStyle}
                  />
                  {/* Segment 2: Transform -> Analyze */}
                  <path
                    d="M 510 250 C 350 250, 350 250, 190 250"
                    className={getSegmentClass(2)}
                    style={segmentStyle}
                  />
                  {/* Segment 3: Analyze -> Optimize */}
                  <path
                    d="M 190 250 C 100 250, 100 410, 190 410"
                    className={getSegmentClass(3)}
                    style={segmentStyle}
                  />
                  {/* Segment 4: Optimize -> Deploy */}
                  <path
                    d="M 190 410 C 350 410, 350 410, 510 410"
                    className={getSegmentClass(4)}
                    style={segmentStyle}
                  />

                  {/* 2. Traveling data packet along the path */}
                  <g
                    className={`${styles.glowingPacketGroup} ${hoveredStation !== null ? styles.paused : ''}`}
                    style={{
                      offsetPath: `path("${combinedPath}")`,
                      offsetDistance: hoveredStation !== null ? `${stationOffsets[hoveredStation - 1]}%` : undefined,
                    } as React.CSSProperties}
                  >
                    <circle
                      r="9"
                      fill={hoveredStation ? (hoveredStation % 2 === 1 ? '#FFC801' : '#FF9932') : '#FFC801'}
                      opacity="0.4"
                      className={styles.packetHalo}
                    />
                    <circle
                      r="4.5"
                      fill="#FFFFFF"
                    />
                    <circle
                      r="4.5"
                      fill={hoveredStation ? (hoveredStation % 2 === 1 ? '#FFC801' : '#FF9932') : '#FFC801'}
                      filter="url(#particleGlow)"
                    />
                  </g>

                </svg>

                {/* 
                    STATIONS - 6 Dark Glassmorphism cards with numbered labels
                */}

                {/* Discover Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '80px', top: '60px', animationDelay: '0s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FFC801', '--station-color-rgb': '255, 200, 1' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(1)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <SearchIcon className="w-4.5 h-4.5" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>01 Discover</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">Ingestion node.</span>
                    </div>
                  </div>
                </div>

                {/* Connect Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '400px', top: '60px', animationDelay: '-1s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FF9932', '--station-color-rgb': '255, 153, 50' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(2)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <LinkIcon className="w-4 h-4" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>02 Connect</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">Database linkage.</span>
                    </div>
                  </div>
                </div>

                {/* Transform Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '400px', top: '220px', animationDelay: '-2s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FFC801', '--station-color-rgb': '255, 200, 1' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(3)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <ArrowPathIcon className="w-4 h-4" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>03 Transform</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">Route pipelines.</span>
                    </div>
                  </div>
                </div>

                {/* Analyze Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '80px', top: '220px', animationDelay: '-3.5s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FF9932', '--station-color-rgb': '255, 153, 50' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(4)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <ChartPieIcon className="w-4.5 h-4.5" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>04 Analyze</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">ML predictions.</span>
                    </div>
                  </div>
                </div>

                {/* Optimize Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '80px', top: '380px', animationDelay: '-4.5s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FFC801', '--station-color-rgb': '255, 200, 1' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(5)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>05 Optimize</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">Increase performance.</span>
                    </div>
                  </div>
                </div>

                {/* Deploy Station */}
                <div
                  className={styles.floatWrapper}
                  style={{ left: '400px', top: '380px', animationDelay: '-5.5s' }}
                >
                  <div
                    className={styles.stationCard}
                    style={{ '--station-color': '#FF9932', '--station-color-rgb': '255, 153, 50' } as React.CSSProperties}
                    onMouseEnter={() => setHoveredStation(6)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className={styles.iconWrapper}>
                      <CubeIcon className="w-4 h-4" />
                      <div className={styles.pulseRing} />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold block uppercase tracking-wider" style={{ color: 'var(--station-color)' }}>06 Deploy</span>
                      <span className="text-[9px] text-[#D9E8E2]/65 leading-none block mt-0.5">Serverless automation.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trusted Partner Logos (Light mint colors) */}
      <div ref={logosRef} className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 relative z-30 text-center">
        <span className={`text-[10px] font-mono font-bold tracking-widest text-[#D9E8E2]/40 uppercase block mb-6 transition-all duration-[700ms] ease-out ${logosIntersected ? 'opacity-100' : 'opacity-0'}`}>
          Trusted by Innovative Teams
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[#D9E8E2]/70 text-sm font-semibold tracking-tight uppercase select-none">
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0ms' }}>
            <div className="w-2.5 h-2.5 bg-[#D9E8E2]/40 rounded-sm" />
            <span>Vertex Labs</span>
          </div>
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <div className="w-2.5 h-2.5 rounded-full border border-[#D9E8E2]/40" />
            <span>Cloudix</span>
          </div>
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            <svg className="w-3.5 h-3.5 text-[#D9E8E2]/40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z"/></svg>
            <span>Synthica</span>
          </div>
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
            <div className="w-2.5 h-2.5 border-2 border-[#D9E8E2]/40 rotate-45" />
            <span>DataForge</span>
          </div>
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '400ms' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#D9E8E2]/40" />
            <span>Nexora</span>
          </div>
          <div className={`flex items-center gap-2 hover:text-white transition-colors duration-180 cursor-default transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${logosIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '500ms' }}>
            <div className="w-2.5 h-2.5 border border-[#D9E8E2]/40" />
            <span>FluxCore</span>
          </div>
        </div>
      </div>

      {/* Transitional blending organic wave at the bottom (Dark -> Light) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]" fill="#F1F6F4">
          <path d="M0,42 C300,98 600,0 900,68 L1200,16 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

    </header>
  );
}
