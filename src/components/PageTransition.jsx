import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — Fixed version.
 *
 * Bug in previous version: wrapping <Routes> with a transition div caused
 * the new route to render immediately (because <Routes> reads location),
 * making the fade-out show the new page content.
 *
 * Fix: Only transition on actual pathname changes (not query params),
 * use a simple CSS opacity fade with no content-swap delay.
 * This is simpler, more reliable, and flicker-free.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;
      setFading(true);
      const t = setTimeout(() => setFading(false), 300);
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}
