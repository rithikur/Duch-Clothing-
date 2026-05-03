import BRAND from '../brand';

/**
 * Logo — Pure HTML/CSS logo. Avoids SVG <text> font-loading issues
 * that caused the brand wordmark to be invisible or clipped.
 */
export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Wordmark — plain HTML, so web font loads reliably */}
      <span
        className="font-bold tracking-[0.1em] leading-none italic"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'inherit' }}
      >
        {BRAND.name}
      </span>
    </div>
  );
}
