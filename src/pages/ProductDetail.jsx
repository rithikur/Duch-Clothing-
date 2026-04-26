import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail({ products, addToCart }) {
  const { id }      = useParams();
  const product     = products.find(p => p.id === Number(id));
  const [size, setSize]     = useState('M');
  const [qty,  setQty]      = useState(1);
  const [added, setAdded]   = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  /* Reset state when product changes */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSize('M');
    setQty(1);
    setAdded(false);
    setActiveImg(0);
  }, [id]);

  if (!product) return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 text-center">
      <p className="font-body tracking-widest text-black/40 text-sm mb-6">PRODUCT NOT FOUND</p>
      <Link to="/shop" className="font-body text-xs tracking-widest underline opacity-60 hover:opacity-100">← BACK TO SHOP</Link>
    </div>
  );

  // Safe to compute now that product is guaranteed
  const related    = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const outOfStock = product.inventory === 0;

  /* Simulate 4 slightly different crops of same image */
  const THUMB_STYLES = [
    {},
    { filter: 'brightness(1.08) contrast(0.97)' },
    { filter: 'saturate(1.15) brightness(0.97)' },
    { filter: 'contrast(1.05) saturate(0.9)' },
  ];
  const THUMB_POSITIONS = ['top', '30%', '20%', 'center'];

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <article className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-20">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 font-body text-[10px] tracking-[0.25em] text-black/35 mb-10 flex-wrap">
        <Link to="/" className="hover:text-duch-black transition-colors">HOME</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-duch-black transition-colors">SHOP</Link>
        <span>/</span>
        <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} className="hover:text-duch-black transition-colors">
          {product.category.toUpperCase()}
        </Link>
        <span>/</span>
        <span className="text-duch-black truncate max-w-[200px]">{product.title.toUpperCase()}</span>
      </nav>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 mb-20">

        {/* ── LEFT: Gallery ── */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-duch-black text-white text-[10px] font-body tracking-widest px-3 py-1.5">
                {product.discount}% OFF
              </span>
            )}
            {outOfStock && (
              <span className="absolute top-4 right-4 z-10 bg-red-600 text-white text-[10px] font-body tracking-widest px-3 py-1.5">
                SOLD OUT
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: THUMB_POSITIONS[activeImg], ...THUMB_STYLES[activeImg], transition: 'object-position 0.3s ease' }}
            />
          </div>
          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-2">
            {THUMB_STYLES.map((style, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square overflow-hidden bg-gray-100 border-2 transition-all duration-200 ${activeImg === i ? 'border-duch-black' : 'border-transparent hover:border-black/25'}`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ objectPosition: THUMB_POSITIONS[i], ...style }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="flex flex-col">

          {/* Category link */}
          <Link
            to={`/shop?cat=${encodeURIComponent(product.category)}`}
            className="font-body text-[10px] tracking-[0.3em] text-black/40 hover:text-duch-black transition-colors mb-3 uppercase inline-block"
          >
            {product.category}
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl leading-tight mb-6">{product.title}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-display text-3xl font-bold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-body text-lg text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="font-body text-[10px] tracking-widest bg-green-100 text-green-700 px-2 py-1">
                  SAVE {product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="mb-6 font-body text-xs tracking-widest">
            {outOfStock
              ? <span className="text-red-500">✗ OUT OF STOCK</span>
              : product.inventory <= 5
                ? <span className="text-orange-500">⚡ ONLY {product.inventory} LEFT — ORDER SOON</span>
                : <span className="text-green-600">✓ IN STOCK · SHIPS IN 2-4 DAYS</span>
            }
          </div>

          <div className="w-full h-px bg-black/8 mb-7" />

          {/* Size selector */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-xs tracking-[0.25em]">SELECT SIZE</span>
              <button className="font-body text-[10px] tracking-widest text-black/35 underline hover:text-duch-black transition-colors">SIZE GUIDE</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[52px] h-12 px-3 font-body text-sm tracking-widest border-2 transition-all duration-150 ${
                    size === s
                      ? 'bg-duch-black text-white border-duch-black'
                      : 'border-black/15 hover:border-duch-black hover:bg-black/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Sticky Action Bar Wrapper */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-duch-bg border-t border-black/10 z-40 md:static md:p-0 md:bg-transparent md:border-none md:z-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none transition-transform">
            {/* Qty + Add to cart row */}
            <div className="flex gap-3 mb-3">
              {/* Qty */}
              <div className="hidden md:flex items-center border border-black/15 shrink-0">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center hover:bg-duch-black hover:text-white transition-colors text-xl"
                >−</button>
                <span className="w-10 text-center font-body text-sm select-none">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.inventory || 99, q + 1))}
                  className="w-11 h-12 flex items-center justify-center hover:bg-duch-black hover:text-white transition-colors text-xl"
                >+</button>
              </div>
              {/* Add to cart */}
              <button
                onClick={handleAdd}
                disabled={outOfStock}
                className={`btn-shimmer flex-1 h-12 font-body text-xs tracking-[0.2em] transition-all duration-300 ${
                  added
                    ? 'bg-green-700 text-white'
                    : outOfStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-duch-black text-white hover:bg-gray-800'
                }`}
              >
                {added ? '✓ ADDED TO CART' : outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="w-full h-12 font-body text-xs tracking-[0.2em] border-2 border-duch-black hover:bg-duch-black hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed md:mb-8"
            >
              BUY NOW
            </button>
          </div>
          {/* Add a spacer on mobile to prevent footer from being hidden behind sticky bar */}
          <div className="h-32 md:hidden"></div>

          {/* Description */}
          <div className="border-t border-black/8 pt-7 mb-7">
            <h3 className="font-body text-xs tracking-[0.25em] mb-3 text-black/40">DESCRIPTION</h3>
            <p className="font-body text-sm leading-relaxed text-black/65">{product.description}</p>
          </div>

          {/* Shipping features */}
          <div className="border-t border-black/8 pt-7">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                ['🚚', 'Free Delivery', '₹999+'],
                ['↩', 'Easy Returns', '7 days'],
                ['🔒', 'Secure Pay', 'Encrypted'],
              ].map(([icon, title, sub]) => (
                <div key={title} className="flex flex-col items-center gap-1.5">
                  <span className="text-2xl">{icon}</span>
                  <p className="font-body text-xs font-medium">{title}</p>
                  <p className="font-body text-[10px] text-black/35 tracking-wide">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="border-t border-black/10 pt-14">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl">YOU MAY ALSO LIKE</h2>
            <Link
              to={`/shop?cat=${encodeURIComponent(product.category)}`}
              className="font-body text-xs tracking-widest text-black/50 hover:text-duch-black transition-colors flex items-center gap-2"
            >
              SEE ALL
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-3">
                  {p.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-duch-black text-white text-[10px] font-body tracking-widest px-2 py-1 z-10">{p.discount}% OFF</span>
                  )}
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top premium-image" />
                </div>
                <h3 className="font-body text-sm mb-1 group-hover:opacity-60 transition-opacity">{p.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                  {p.originalPrice && <span className="font-body text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
