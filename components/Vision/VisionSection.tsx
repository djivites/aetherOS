"use client";

import React, { useEffect, useRef, useState } from "react";
import { CubeIcon, ShieldCheckIcon, ArrowPathIcon, DatabaseIcon } from "../Icons";
import styles from "./VisionSection.module.css";

export default function VisionSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animation plays only once
        }
      },
      {
        threshold: 0.08, // Trigger when 8% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const pillars = [
    {
      title: "Autonomous Intelligence",
      description: "AI agents that reason, adapt and execute without constant human intervention.",
      icon: <CubeIcon className={styles.pillarIcon} size={24} />,
    },
    {
      title: "Enterprise Trust",
      description: "Security-first architecture built for reliability, privacy and compliance.",
      icon: <ShieldCheckIcon className={styles.pillarIcon} size={24} />,
    },
    {
      title: "Continuous Learning",
      description: "Every workflow improves future recommendations through adaptive intelligence.",
      icon: <ArrowPathIcon className={styles.pillarIcon} size={24} />,
    },
    {
      title: "Infinite Scale",
      description: "Deploy AI across teams, departments and global infrastructure without friction.",
      icon: <DatabaseIcon className={styles.pillarIcon} size={24} />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className={`${styles.sectionWrapper} ${isVisible ? styles.visible : ""}`}
      id="vision"
    >
      {/* Background Decorative Grid and Lighting */}
      <div className={styles.blueprintGrid} />
      <div className={styles.radialGlow} />

      {/* Faint Floating Particles */}
      <div className={styles.particleContainer} suppressHydrationWarning>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            suppressHydrationWarning
            className={`absolute w-1.5 h-1.5 rounded-full bg-[#114C5A] opacity-25 ${styles.floatingParticle}`}
            style={
              {
                top: `${15 + i * 15}%`,
                left: `${10 + (i * 17) % 80}%`,
                "--float-duration": `${8 + i * 2.5}s`,
                "--float-delay": `${-i * 1.5}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Tiny Neural Connections SVG Background with Glow Filters */}
      <div className={styles.neuralContainer}>
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Static and pulsing neural network lines */}
          <circle cx="150" cy="180" r="3" fill="#114C5A" opacity="0.35" />
          <circle cx="280" cy="120" r="2.5" fill="#FFC801" className={styles.pulsingNode} filter="url(#neonGlow)" />
          <circle cx="1200" cy="150" r="2.5" fill="#FF9932" className={styles.pulsingNode} filter="url(#neonGlow)" />
          <circle cx="1050" cy="220" r="3.5" fill="#114C5A" opacity="0.4" />
          
          <path d="M150,180 L280,120" stroke="#114C5A" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.2" />
          <path d="M1200,150 L1050,220" stroke="#114C5A" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.2" />
          <path d="M280,120 L500,280" stroke="#114C5A" strokeWidth="0.5" opacity="0.15" />
          <path d="M1050,220 L850,380" stroke="#114C5A" strokeWidth="0.5" opacity="0.15" />

          {/* Connectors mapping near cards */}
          <circle cx="320" cy="460" r="3" fill="#FFC801" opacity="0.2" />
          <circle cx="720" cy="540" r="2.5" fill="#114C5A" opacity="0.3" />
          <circle cx="1120" cy="460" r="3" fill="#FF9932" opacity="0.2" />
          <path d="M320,460 L720,540 L1120,460" stroke="#114C5A" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.12" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* PART 1: Vision Statement */}
        <div className={styles.visionHeader}>
          <span className={styles.categoryBadge}>
            Philosophy
          </span>
          <h2 className={styles.headline}>
            The Future Isn't Automated.
            <span className={styles.highlightText}>It's Autonomous.</span>
          </h2>
          
          <div className={styles.supportingText}>
            <p className={styles.introSubline}>
              Modern businesses don't need more dashboards.
            </p>
            <p>
              They need intelligent systems that understand context, learn continuously, make confident decisions, and automate work without complexity.
            </p>
            <p>
              Our platform transforms raw enterprise data into <span className={styles.accentHighlight}>intelligent action</span>, helping teams move faster, work smarter, and scale with confidence.
            </p>
          </div>
        </div>

        {/* PART 2: Four Core Pillars */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => (
            <div key={index} className={styles.pillarCard}>
              <div className={styles.iconGlowWrapper}>
                <div className={styles.iconGlowBg} />
                <div className={styles.iconContainer}>{pillar.icon}</div>
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* PART 3: Final CTA */}
        <div className={styles.ctaWrapper}>
          <h3 className={styles.ctaTitle}>
            Ready to Build Your Intelligent Enterprise?
          </h3>
          <p className={styles.ctaSubtitle}>
            Join organizations transforming their operations with autonomous AI workflows.
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="#pricing"
              className={styles.primaryButton}
              suppressHydrationWarning
            >
              Start Free Trial
            </a>
            <a
              href="#"
              className={styles.secondaryButton}
              suppressHydrationWarning
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
