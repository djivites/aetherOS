import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large';

export function useBreakpoint(): Breakpoint {
  // SSR default to mobile to ensure matching hydration defaults
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setBreakpoint('large');
      } else if (width >= 1024) {
        setBreakpoint('desktop');
      } else if (width >= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    // Trigger on client mount
    checkBreakpoint();

    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
}
