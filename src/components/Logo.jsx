import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo — Pure HTML/CSS logo. Avoids SVG <text> font-loading issues
 * that caused the 'DUCH' wordmark to be invisible or clipped.
 */
export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric 'D' mark — pure SVG paths, no text */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
        aria-hidden="true"
      >
        <path
          d="M8 4V36H22C30.837 36 38 29.732 38 22C38 14.268 30.837 8 22 8L8 4Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="square"
        />
        <line x1="8" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="2" />
      </svg>

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
