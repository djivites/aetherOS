"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Footer() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
    <footer ref={containerRef} className="w-full bg-[#172B36] border-t border-[#114C5A]/15 pt-16 pb-12 select-none relative z-25">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Brand identity column (spans 4 cols) */}
        <div className={`md:col-span-4 flex flex-col items-start text-left transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`} style={{ transitionDelay: '0ms' }}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF9932] via-[#114C5A] to-[#FFC801] flex items-center justify-center font-mono font-black text-xs text-[#172B36] shadow-sm">
              A
            </div>
            <span className="font-sans text-sm font-extrabold tracking-tight text-[#F1F6F4] block">
              AetherOS
            </span>
          </div>
          <p className="text-[#D9E8E2]/60 text-xs leading-relaxed max-w-xs mb-6 font-sans">
            The operating system for autonomous intelligence. Unify data, automate workflows, and execute at scale.
          </p>
          {/* Social Icons row */}
          <div className="flex items-center gap-4 text-[#D9E8E2]/40">
            {/* LinkedIn */}
            <a href="#" className="hover:text-[#FFC801] transition-colors duration-180" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="hover:text-[#FFC801] transition-colors duration-180" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            {/* GitHub */}
            <a href="#" className="hover:text-[#FFC801] transition-colors duration-180" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-[#FFC801] transition-colors duration-180" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.022-1.07-1.826-2.072-2.101-1.829-.495-9.167-.495-9.167-.495s-7.338 0-9.167.495c-1.003.275-1.8.105-2.072 1.101-.495 1.833-.495 5.66-.495 5.66s0 3.827.495 5.66c.272 1.023 1.07 1.826 2.072 2.102 1.829.495 9.167.495 9.167.495s7.338 0 9.167-.495c1.003-.276 1.802-.105 2.072-1.102.495-1.833.495-5.66.495-5.66s0-3.827-.495-5.66zM9.545 15.568V8.144l6.478 3.712-6.478 3.712z"/></svg>
            </a>
          </div>
        </div>

        {/* Links Columns (spans 5 cols) */}
        <div className="md:col-span-5 grid grid-cols-3 gap-4 text-left">
          {/* Column 2: Product */}
          <div className={`transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '150ms' }}>
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-xs text-[#D9E8E2]/65 font-semibold">
              <li><a href="#features" className="hover:text-white transition-colors duration-180">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors duration-180">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Changelog</a></li>
            </ul>
          </div>
          {/* Column 3: Resources */}
          <div className={`transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '300ms' }}>
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-xs text-[#D9E8E2]/65 font-semibold">
              <li><a href="#" className="hover:text-white transition-colors duration-180">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Help Center</a></li>
            </ul>
          </div>
          {/* Column 4: Company */}
          <div className={`transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '450ms' }}>
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-[#D9E8E2]/65 font-semibold">
              <li><a href="#" className="hover:text-white transition-colors duration-180">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-180">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup (spans 3 cols) */}
        <div className={`md:col-span-3 text-left flex flex-col items-start transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`} style={{ transitionDelay: '600ms' }}>
          <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#FFC801] uppercase mb-4">
            Stay updated
          </h4>
          <p className="text-[#D9E8E2]/60 text-xs leading-relaxed mb-4 font-sans">
            Get the latest updates and insights.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full max-w-sm rounded-xl overflow-hidden bg-[#172B36]/80 border border-[#114C5A]/35 p-1">
            <input
              type="email"
              placeholder="Enter your email"
              suppressHydrationWarning={true}
              className="bg-transparent border-none text-xs text-[#F1F6F4] placeholder-[#D9E8E2]/30 focus:outline-none focus:ring-0 px-3 py-2 flex-grow min-w-0"
              aria-label="Email address for newsletter"
              required
            />
            <button
              type="submit"
              suppressHydrationWarning={true}
              className="w-8 h-8 rounded-lg bg-[#FFC801] text-[#172B36] hover:bg-[#FF9932] hover:shadow-lg hover:shadow-[#FF9932]/35 transition-all duration-180 flex items-center justify-center flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#114C5A]/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-mono text-[#D9E8E2]/40">
          © {new Date().getFullYear()} AetherOS. All rights reserved.
        </span>
        <div className="flex gap-6 text-[10px] font-mono text-[#D9E8E2]/40">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
