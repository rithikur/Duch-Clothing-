import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_IDS = [1, 2, 6, 4];
const CATEGORY_TILES = [
  { label: 'CASUAL',      cat: 'Casual',      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000' },
  { label: 'FORMAL',      cat: 'Formal',      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000' },
  { label: 'POLO',        cat: 'Polo',        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000' },
  { label: 'BOTTOM WEAR', cat: 'Bottom Wear', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000' },
  { label: 'JACKETS',     cat: 'Jackets',     image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000' },
  { label: 'T-SHIRTS',    cat: 'T-Shirts',    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000' },
];
const MARQUEE_ITEMS = ['DUCH NEVER GOES OUT OF STYLE', 'A CLASSIC NEVER GOES OUT OF STYLE', 'PREMIUM MENSWEAR', 'NEW ARRIVALS NOW LIVE'];

export default function Home({ products, addToCart }) {
  const featured = FEATURED_IDS.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <div>

      {/* ═══════════════════════════════════
          HERO — editorial full-bleed split
          Right panel image is absolutely
          positioned to fill its own height,
          left text drives the section height.
          No viewport calculations needed.
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-duch-bg h-[calc(100dvh-106px)] lg:h-auto lg:min-h-[calc(100dvh-150px)] flex flex-col lg:flex-row lg:items-center">
        {/* ── Mobile Background Image (Cinematic Full Bleed) ── */}
        <div className="absolute inset-0 lg:hidden w-full h-full overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000"
            alt="DUCH Hero"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* ── Desktop Right Image Panel ── */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] overflow-hidden z-0">
            <img
              src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000"
              alt="DUCH Hero"
              className="w-full h-full object-cover object-top"
              loading="eager"
              fetchpriority="high"
            />
          <div className="absolute inset-0 bg-gradient-to-r from-duch-bg via-duch-bg/30 to-transparent pointer-events-none" />
          <div className="badge-pulse absolute top-12 right-10 bg-duch-black text-white px-5 py-4 -rotate-6 shadow-2xl z-20">
            <p className="font-body text-[10px] tracking-[0.2em] mb-0.5">UP TO</p>
            <p className="font-display text-2xl font-bold leading-none">48% OFF</p>
          </div>
          <div className="absolute bottom-8 right-8 z-20 text-right">
            <p className="font-body text-[10px] tracking-[0.3em] text-white/50 mb-1">EST. 2020</p>
            <p className="font-display text-white text-sm tracking-widest">DUCH CLOTHING</p>
          </div>
        </div>

        {/* ── Ghost background "DUCH" (Desktop only) ── */}
        <span
          className="hidden lg:block absolute bottom-0 left-0 font-display font-bold text-black/[0.03] select-none pointer-events-none leading-[0.85] whitespace-nowrap z-0"
          style={{ fontSize: 'clamp(100px,18vw,260px)' }}
          aria-hidden="true"
        >DUCH</span>

        {/* ── Text Content ── */}
        <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 lg:py-0 flex flex-col justify-end lg:justify-center">
          <div className="lg:max-w-[48%]">

            {/* Eyebrow */}
            <div className="hero-reveal hero-reveal-1 flex items-center gap-3 mb-4 lg:mb-7">
              <span className="w-8 h-px bg-white/50 lg:bg-black/30 flex-shrink-0" />
              <span className="font-body text-[10px] tracking-[0.38em] text-white/70 lg:text-black/50 uppercase">New Collection · 2024</span>
            </div>

            {/* Headline */}
            <h1
              className="hero-reveal hero-reveal-2 font-display font-bold leading-[1.02] tracking-tight mb-4 lg:mb-8 text-white lg:text-duch-black"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              TOP NOTCH<br />
              COLLECTION<br />
              ONLY FOR<br />
              <span
                className="inline-block border-[2px] lg:border-[3px] border-white lg:border-duch-black rounded-full px-5 lg:px-8 leading-[1.35]"
                style={{ fontSize: '0.82em' }}
              >
                MENS
              </span>
            </h1>

            {/* Description */}
            <p className="hero-reveal hero-reveal-3 font-body text-white/80 lg:text-black/55 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-sm">
              Premium menswear crafted for the modern Indian man — bold, timeless, and never out of style.
            </p>

            {/* CTAs */}
            <div className="hero-reveal hero-reveal-4 flex flex-wrap gap-4 lg:mb-12">
              <Link
                to="/shop"
                className="magnetic btn-shimmer inline-flex items-center gap-3 bg-white lg:bg-duch-black text-duch-black lg:text-white px-8 py-3.5 lg:py-4 font-body text-xs tracking-[0.2em] transition-colors group"
              >
                SHOP NOW
                <svg className="group-hover:translate-x-1.5 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] text-white/60 lg:text-black/50 hover:text-white lg:hover:text-duch-black transition-colors border-b border-white/20 lg:border-black/20 pb-0.5"
              >
                EXPLORE COLLECTIONS
              </button>
            </div>

            {/* Stats (Desktop only to save mobile space) */}
            <div className="hero-reveal hero-reveal-5 hidden lg:flex gap-10 pt-8 border-t border-black/10">
              {[['16+', 'Products'], ['6', 'Categories'], ['48%', 'Max Off']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display font-bold text-3xl leading-none">{v}</p>
                  <p className="font-body text-[10px] tracking-[0.25em] text-black/40 mt-1.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE — fully straight ─── */}
      <div className="w-full bg-duch-black overflow-hidden" style={{ height: '52px' }}>
        <div className="flex whitespace-nowrap h-full items-center">
          {[0, 1].map(i => (
            <div key={i} className="ticker-content flex shrink-0 items-center" aria-hidden={i === 1}>
              {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((t, j) => (
                <span key={j} className="font-display text-white text-lg px-10 tracking-[0.15em] flex items-center gap-6">
                  {t}<span className="text-white/25 text-xs">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SHOP BY CATEGORY ─── */}
      <section id="categories" className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] text-black/35 mb-1.5">— BROWSE BY</p>
            <h2 className="text-3xl md:text-4xl">CATEGORIES</h2>
          </div>
          <Link to="/shop" className="font-body text-xs tracking-widest text-black/50 hover:text-duch-black transition-colors flex items-center gap-2">
            ALL PRODUCTS
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORY_TILES.map((c, i) => (
            <Link
              key={c.cat}
              to={`/shop?cat=${encodeURIComponent(c.cat)}`}
              className="group relative overflow-hidden aspect-[3/4] flex flex-col justify-end p-4 card-enter"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover object-top premium-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10" />
              <span className="relative z-20 font-display text-white text-xs tracking-widest">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] text-black/35 mb-1.5">— HANDPICKED</p>
            <h2 className="text-3xl md:text-4xl">
              <span className="bg-duch-black text-white px-3 py-1 inline-block">FEATURED</span>
            </h2>
          </div>
          <Link to="/shop" className="font-body text-xs tracking-widest text-black/50 hover:text-duch-black transition-colors flex items-center gap-2">
            VIEW ALL
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} index={i} />
          ))}
        </div>
      </section>

      {/* ─── SALE BANNER ─── */}
      <section className="relative overflow-hidden bg-duch-black mx-6 md:mx-12 mb-20 p-10 md:p-16">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-white/40 mb-2">— LIMITED TIME</p>
            <h2 className="text-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
              GET UP TO<br />
              <span className="text-[#b9a9cc]">48% OFF</span><br />
              THIS SEASON
            </h2>
          </div>
          <Link
            to="/shop"
            className="btn-shimmer shrink-0 border-2 border-white text-white font-body text-xs tracking-widest px-10 py-4 hover:bg-white hover:text-duch-black transition-all duration-300"
          >
            SHOP THE SALE
          </Link>
        </div>
        <span
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display font-bold text-white/[0.04] select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(80px,14vw,200px)' }}
        >SALE</span>
      </section>
    </div>
  );
}

function ProductCard({ product, addToCart, index }) {
  const outOfStock = product.inventory === 0;
  return (
    <div className="group card-enter" style={{ animationDelay: `${index * 0.08}s` }}>
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100 aspect-[3/4] mb-3">
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-duch-black text-white text-[10px] font-body tracking-widest px-2 py-1">{product.discount}% OFF</span>
        )}
        <img src={product.image} alt={product.title} className="w-full h-full object-cover object-top premium-image" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </Link>
      <button
        onClick={() => !outOfStock && addToCart(product, 'M', 1)}
        disabled={outOfStock}
        className={`w-full text-xs font-body tracking-widest py-2.5 mb-3 transition-all duration-300 ${outOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-duch-black text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100'}`}
      >
        {outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
      </button>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-body text-sm mb-1 hover:opacity-60 transition-opacity">{product.title}</h3>
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
