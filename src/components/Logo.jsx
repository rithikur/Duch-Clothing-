import { useBrand } from '../BrandContext';

/**
 * Logo — Pure HTML/CSS logo. Avoids SVG <text> font-loading issues.
 */
export default function Logo({ className = "" }) {
  const { brand } = useBrand();
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="font-bold tracking-[0.1em] leading-none italic"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'inherit' }}
      >
        {brand.name}
      </span>
    </div>
  );
}
