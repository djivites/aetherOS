import React from 'react';
import Hero from '../components/Hero/Hero';
import FeatureSection from '../components/Features/FeatureSection';
import Pricing from '../components/Pricing/Pricing';
import Testimonials from '../components/Testimonials/Testimonials';
import VisionSection from '../components/Vision/VisionSection';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero (Dark Theme Header & Illustration) */}
      <Hero />

      {/* Main content body wraps all interactive sections */}
      <main className="flex-grow">
        {/* Section 2: Features + Pricing (Light Theme) */}
        <div className="relative bg-[#F1F6F4] text-[#172B36] z-10 overflow-hidden">
          
          {/* Subtle network lines background at 3% opacity */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to right, #114C5A 1px, transparent 1px), linear-gradient(to bottom, #114C5A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Large blurred teal/mint gradients */}
          <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] bg-[#114C5A] opacity-[0.07] rounded-full filter blur-[140px] pointer-events-none" />
          <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] bg-[#114C5A] opacity-[0.06] rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] bg-[#D9E8E2] opacity-[0.35] rounded-full filter blur-[150px] pointer-events-none" />
          
          {/* Subtle abstract waves represented as low-opacity SVG paths */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-100,200 C300,500 800,100 1500,400" stroke="#114C5A" strokeWidth="4" strokeLinecap="round" />
              <path d="M-50,350 C400,100 900,600 1600,250" stroke="#114C5A" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Features (Bento Grid / Mobile Accordion) */}
            <FeatureSection />

            {/* Pricing (Matrix-based and Render Isolated) */}
            <Pricing />
          </div>

          {/* Transition wave at the bottom to Section 3 (Testimonials) */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[1px]">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[75px]" fill="#172B36">
              <path d="M0,50 C300,90 600,10 900,80 L1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </div>

        {/* Section 3: Testimonials + Pre-Footer CTA + Footer (Dark Theme) */}
        <div className="relative bg-[#172B36] text-[#F1F6F4] z-10 overflow-hidden">
          
          {/* Soft radial teal lighting */}
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#114C5A]/15 to-transparent rounded-full filter blur-[150px] pointer-events-none z-0" />
          
          {/* Subtle neural/network line decorations */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
            <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="4" fill="#FFC801" />
              <circle cx="800" cy="400" r="3" fill="#FF9932" />
              <path d="M200,200 L400,300 L800,400" stroke="#114C5A" strokeWidth="1" />
            </svg>
          </div>

          {/* Tiny floating particles in Section 3 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" suppressHydrationWarning>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                suppressHydrationWarning
                className="absolute w-1.5 h-1.5 rounded-full bg-[#114C5A] opacity-25 floating-particle"
                style={{
                  top: `${15 + i * 15}%`,
                  left: `${20 + (i * 13) % 60}%`,
                  '--float-duration': `${7 + i * 2.5}s`,
                  '--float-delay': `${-i * 1.5}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="relative z-10">
            <Testimonials />
          </div>
        </div>

        {/* Section 4: Vision Section (Dark Theme) */}
        <VisionSection />
      </main>

      {/* Semantic footer for secondary resources */}
      <Footer />
    </>
  );
}
