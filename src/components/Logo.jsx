import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo — Pure HTML/CSS logo. Avoids SVG <text> font-loading issues
 * that caused the 'DUCH' wordmark to be invisible or clipped.
 */
export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Wordmark — plain HTML, so web font loads reliably */}
      <span
        className="font-display font-bold tracking-[0.18em] leading-none"
        style={{ fontSize: 'inherit' }}
      >
        DUCH
      </span>
    </div>
  );
}
