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

const REVIEWS = [
  { name: 'Rizo', rating: 5, date: '6 months ago', text: "Absolutely loved the collection! I recently purchased a few shirts, a hoodie, and some pants — all of them are really good in quality and fit perfectly. The designs are stylish, comfortable, and worth the price. They have a lot of variety to choose from, and every piece feels premium. Definitely one of the best shopping experiences I've had. Highly recommend checking out their collection!" },
  { name: 'A.A. Mohamed Arsath', rating: 5, date: '1 year ago', text: "Trendy fashion offers a wide range of stylish and modern clothing for men keeping up with the latest trends. High quality materials — uses premium fabrics to ensure comfort, durability, and a luxurious feel in every piece. Diverse collection includes casual wear, formal wear, ethnic outfits, party attire, and accessories." },
  { name: 'Vishnu Vimalesh', rating: 5, date: '5 months ago', text: "Great shopping experience — trendy designs at reasonable prices. The fitting was perfect, and the fabric quality really stood out. Highly recommended!" },
  { name: 'Dinesh Kumar', rating: 5, date: '2 years ago', text: "I visited this shop for a T-shirt purchase after seeing their Instagram posts — they have a great trending collection. Their customer service is so good! If you want suggestions regarding any outfit, just ask them. Highly satisfied with their customer service!" },
  { name: 'Kumaraguru Arunagiri', rating: 5, date: '2 months ago', text: "The material and comfort of the shirts and T-shirts are good. The dry fit shirts are also awesome. Worth buying!" },
  { name: 'Sadhana', rating: 5, date: '2 months ago', text: "One of the coolest outfits for men in town with various colour options and sizes at affordable prices. Must try!" },
  { name: 'Rahul Bala', rating: 4, date: '7 months ago', text: "Bought some T-shirts and shirts which were of good quality. Not a vast collection, and found the prices a bit on the higher side, but overall a good experience." },
  { name: 'Naveen S', rating: 5, date: '1 year ago', text: "Nice collection — both formals and casuals are good. They carry brands like Zara, Red Rabbit, and more. It's a hidden gem! Didn't have enough time to see everything, will definitely visit again." },
];

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
      <section className="relative overflow-hidden bg-duch-bg h-[calc(100svh-106px)] lg:h-auto lg:min-h-[calc(100svh-150px)] flex flex-col lg:flex-row lg:items-center">
        {/* ── Mobile Background Image (Cinematic Full Bleed) ── */}
        <div className="absolute inset-0 lg:hidden w-full h-full overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000"
            alt="DUCH Hero"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/25" />
          {/* Removed old top badge to replace with bottom floating off card */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-duch-bg/80 via-duch-bg/10 to-transparent pointer-events-none" />
          {/* Removed old top badge to replace with bottom floating off card */}
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

      {/* ─── FLOATING OFFER & TRUST CARD ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex justify-center md:justify-end -mt-16 md:-mt-12 lg:-mt-16 mb-8 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center gap-6 sm:gap-8 border border-white max-w-[92%] md:max-w-2xl transform rotate-1 pointer-events-auto hover:rotate-0 transition-transform duration-500">
           {/* Offer side */}
           <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-b sm:border-b-0 sm:border-r border-black/10 pb-5 sm:pb-0 sm:pr-8 w-full sm:w-auto">
             <p className="font-body text-[10px] tracking-[0.3em] mb-1.5 text-black/50">LIMITED TIME</p>
             <p className="font-display text-3xl md:text-4xl font-bold leading-none text-duch-black whitespace-nowrap">48% OFF</p>
             <p className="font-body text-[10px] tracking-widest text-black/40 mt-2">USE CODE: DUCH48</p>
           </div>
           
           {/* Trust side */}
           <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
             <div className="flex -space-x-3">
               <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" alt="Customer" />
               <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" alt="Customer" />
               <img src="https://i.pravatar.cc/100?img=47" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" alt="Customer" />
               <div className="w-10 h-10 rounded-full border-[3px] border-white bg-duch-black text-white flex items-center justify-center text-[11px] font-bold shadow-sm z-10">+</div>
             </div>
             <div className="text-left">
               <p className="font-display font-bold text-sm leading-none text-duch-black mb-1 whitespace-nowrap">4K+ HAPPY</p>
               <p className="font-body text-[10px] tracking-widest text-black/60">CUSTOMERS</p>
               <div className="flex items-center gap-1 mt-1.5 whitespace-nowrap">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/40">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
                 <span className="font-body text-[9px] tracking-wider text-black/50">INDIA & GLOBAL</span>
               </div>
             </div>
           </div>
        </div>
      </div>

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

      {/* ─── WALL OF LOVE (REVIEWS) ─── */}
      <section className="overflow-hidden bg-white py-16 md:py-24 border-t border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10 flex flex-col items-center text-center">
          <p className="font-body text-[10px] tracking-[0.35em] text-black/35 mb-2">— WALL OF LOVE</p>
          <h2 className="text-3xl md:text-4xl text-duch-black">WHAT THEY SAY</h2>
        </div>
        
        {/* Row 1: Left moving */}
        <div className="flex whitespace-nowrap mb-6 group hover:[&>div]:[animation-play-state:paused] items-stretch">
          {[0, 1].map(i => (
            <div key={i} className="ticker-content flex shrink-0 gap-6 pr-6" style={{ animationDuration: '60s' }} aria-hidden={i === 1}>
              {REVIEWS.map((r, j) => (
                <ReviewCard key={`r1-${j}`} review={r} />
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Right moving */}
        <div className="flex whitespace-nowrap group hover:[&>div]:[animation-play-state:paused] items-stretch">
          {[0, 1].map(i => (
            <div key={i} className="ticker-content flex shrink-0 gap-6 pr-6" style={{ animationDuration: '70s', animationDirection: 'reverse' }} aria-hidden={i === 1}>
              {[...REVIEWS].reverse().map((r, j) => (
                <ReviewCard key={`r2-${j}`} review={r} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── JOIN THE CLUB (NEWSLETTER) ─── */}
      <section className="bg-duch-black mx-6 md:mx-12 mb-20 p-10 md:p-16 flex flex-col md:flex-row gap-12 justify-between items-center text-white relative overflow-hidden">
        <div className="md:w-1/2 relative z-10">
          <p className="font-body text-[10px] tracking-[0.3em] text-white/40 mb-3">— JOIN THE CLUB</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight tracking-tight">
            BE THE FIRST<br />TO KNOW.
          </h2>
          <p className="font-body text-xs text-white/60 tracking-[0.1em] max-w-sm leading-relaxed">
            Subscribe to receive updates on exclusive releases, early access to sales, and our latest editorials. No spam, just fashion.
          </p>
        </div>
        <div className="md:w-1/2 w-full max-w-md relative z-10">
          <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); e.target.reset(); alert('Subscribed successfully!'); }}>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 font-body text-sm tracking-widest text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-white text-duch-black font-body text-xs tracking-[0.2em] py-4 hover:opacity-80 transition-opacity btn-shimmer w-full"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
        <span
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display font-bold text-white/[0.02] select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(80px,14vw,200px)' }}
        >CLUB</span>
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

function ReviewCard({ review }) {
  return (
    <div className="w-[320px] md:w-[400px] whitespace-normal bg-duch-bg p-6 md:p-8 flex flex-col shrink-0 border border-black/5 rounded-sm h-full">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={i < review.rating ? "text-duch-black" : "text-black/20"}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        ))}
      </div>
      <p className="font-body text-sm leading-relaxed text-black/80 mb-6 flex-grow italic">
        "{review.text}"
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/10">
        <p className="font-display font-bold text-sm text-duch-black truncate max-w-[180px]">{review.name}</p>
        <p className="font-body text-[10px] tracking-widest text-black/40 uppercase">{review.date}</p>
      </div>
    </div>
  );
}
