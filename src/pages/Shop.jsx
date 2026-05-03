import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ALL_CATEGORIES = ['All', 'Casual', 'Formal', 'Polo', 'T-Shirts', 'Bottom Wear', 'Jackets'];
const SORT_OPTIONS   = [
  { label: 'FEATURED',           fn: () => 0 },
  { label: 'PRICE: LOW → HIGH',  fn: (a, b) => a.price - b.price },
  { label: 'PRICE: HIGH → LOW',  fn: (a, b) => b.price - a.price },
  { label: 'BIGGEST DISCOUNT',   fn: (a, b) => b.discount - a.discount },
];

export default function Shop({ products, addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortIdx, setSortIdx]           = useState(0);
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sortOpen, setSortOpen]         = useState(false);
  const [inStock, setInStock]           = useState(false);
  const sortRef                         = useRef(null);

  const activeCategory = searchParams.get('cat') || 'All';
  const searchQuery = searchParams.get('q') || '';

  const setCategory = (cat) => {
    if (cat === 'All') searchParams.delete('cat');
    else searchParams.set('cat', cat);
    searchParams.delete('q'); // Clear search when changing category
    setSearchParams(searchParams);
  };

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => !inStock || p.inventory > 0)
    .sort(SORT_OPTIONS[sortIdx].fn);

  /* scroll to top on category change */
  useEffect(() => { window.scrollTo({ top: 0 }); }, [activeCategory]);

  /* close sort dropdown on outside click */
  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">

      {/* ── Page Title ── */}
      <div className="mb-8 pb-6 border-b border-black/10">
        <p className="font-body text-xs tracking-[0.3em] text-duch-black/40 mb-1">
          <Link to="/" className="hover:text-duch-black transition-colors">HOME</Link> / SHOP{activeCategory !== 'All' ? ` / ${activeCategory.toUpperCase()}` : ''}
        </p>
        <h1 className="text-4xl md:text-5xl">
          {activeCategory === 'All' ? 'ALL PRODUCTS' : activeCategory.toUpperCase()}
        </h1>
      </div>

      {/* ── Category Tabs ── */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`font-body text-xs tracking-widest px-5 py-2.5 border shrink-0 transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-duch-black text-white border-duch-black'
                : 'bg-transparent text-duch-black border-black/20 hover:border-duch-black'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Filter / Sort Row ── */}
      <div className="flex items-center justify-between py-4 border-b border-t border-black/10 mb-8">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setFilterOpen(o => !o)}
            className="flex items-center gap-2 font-body text-sm tracking-widest hover:opacity-60 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            FILTER
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform ${filterOpen ? 'rotate-90' : ''}`}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm opacity-40 tracking-widest">{filtered.length} products</span>
            {searchQuery && (
              <span className="font-body text-[10px] tracking-widest bg-black/5 px-2 py-1 flex items-center gap-2">
                SEARCH: {searchQuery.toUpperCase()}
                <button onClick={() => { searchParams.delete('q'); setSearchParams(searchParams); }} className="hover:text-red-500">×</button>
              </span>
            )}
          </div>
        </div>

        {/* Sort — custom dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(o => !o)}
            className="flex items-center gap-2 font-body text-sm tracking-widest opacity-70 hover:opacity-100 transition-opacity"
          >
            {SORT_OPTIONS[sortIdx].label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] bg-duch-bg border border-black/10 shadow-xl z-50 min-w-[220px]">
              {SORT_OPTIONS.map((o, i) => (
                <button
                  key={o.label}
                  onClick={() => { setSortIdx(i); setSortOpen(false); }}
                  className={`block w-full text-left px-5 py-3.5 font-body text-xs tracking-widest transition-colors ${
                    sortIdx === i
                      ? 'bg-duch-black text-white'
                      : 'hover:bg-black/5 text-duch-black'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Filter Panel ── */}
      {filterOpen && (
        <div className="mb-8 pb-6 border-b border-black/10 flex items-center gap-4 flex-wrap">
          <span className="font-body text-xs tracking-widest text-gray-400">AVAILABILITY</span>
          <label className="flex items-center gap-2 cursor-pointer font-body text-sm tracking-wide">
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => setInStock(e.target.checked)}
              className="w-4 h-4 accent-black"
            />
            In Stock Only
          </label>
        </div>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-300">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400 mb-6">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h2 className="font-display text-2xl mb-2 text-duch-black">NOTHING MATCHES YOUR SEARCH</h2>
          <p className="font-body text-gray-500 tracking-widest text-xs mb-8">TRY ADJUSTING YOUR FILTERS OR SEARCH TERM</p>
          <button onClick={() => setCategory('All')} className="btn-shimmer font-body text-xs tracking-[0.2em] bg-duch-black text-white px-8 py-4 hover:bg-gray-800 transition-colors">
            CLEAR ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {filtered.map((product, i) => (
            <ShopCard key={product.id} product={product} addToCart={addToCart} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function ShopCard({ product, addToCart, index }) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [heartAnim, setHeartAnim] = React.useState(false);
  const outOfStock = product.inventory === 0;

  return (
    <div 
      className="group card-enter relative" 
      style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-duch-black text-white text-[10px] font-body tracking-widest px-2 py-1">{product.discount}% OFF</span>
        )}
        {outOfStock && (
          <span className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-body tracking-widest px-2 py-1">SOLD OUT</span>
        )}
        <img src={product.image} alt={product.title} className="w-full h-full object-cover object-top premium-image" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>
      {/* Add to cart / Wishlist */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <button
          disabled={outOfStock}
          onClick={() => !outOfStock && addToCart(product, 'M', 1)}
          className={`flex-1 text-xs font-body tracking-widest py-3 transition-all duration-300 ${outOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-duch-black text-white hover:bg-gray-900'}`}
        >
          {outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
        </button>
        <button 
          onClick={() => setIsWishlisted(prev => {
            if (!prev) {
              setHeartAnim(true);
              setTimeout(() => setHeartAnim(false), 400);
            }
            return !prev;
          })}
          className={`w-[40px] h-[40px] flex shrink-0 items-center justify-center border border-black/10 transition-colors ${isWishlisted ? 'text-red-500' : 'text-duch-black hover:bg-black/5'} ${heartAnim ? 'animate-heart-pop' : ''}`}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      {/* Info */}
      <Link to={`/product/${product.id}`} className="block hover:opacity-70 transition-opacity">
        <h3 className="font-body text-sm text-duch-black leading-snug mb-2">{product.title}</h3>
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && <span className="font-body text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
        </div>
        <div className="mt-1.5">
          {outOfStock ? <span className="font-body text-[10px] text-red-500 tracking-widest">OUT OF STOCK</span>
            : product.inventory <= 5 ? <span className="font-body text-[10px] text-orange-500 tracking-widest">ONLY {product.inventory} LEFT</span>
            : null}
        </div>
      </Link>
    </div>
  );
}
