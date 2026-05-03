import React, { useState } from 'react';
import { useBrand } from '../BrandContext';


const Admin = ({ products, banners = [], updateInventory, updatePrice, updateBanner, user, onLogin }) => {
  const { brand, updateBrandConfig, resetBrandConfig } = useBrand();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [brandSaved, setBrandSaved] = useState(false);

  // Local brand editing state
  const [localBrand, setLocalBrand] = useState(() => ({ ...brand }));

  if (!user || user.role !== 'admin') {
    const handleLogin = (e) => {
      e.preventDefault();
      if ((email === 'admin' || email === 'admin@duch.com' || email === 'admin@brandsterclothing.in') && password === 'admin123') {
        onLogin({ email, role: 'admin' });
      } else {
        setError('Invalid administrator credentials.');
      }
    };

    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 md:p-10 shadow-2xl border border-black/5">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black/5 rounded-full mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="text-3xl font-display uppercase tracking-tight mb-2">RESTRICTED ACCESS</h1>
            <p className="font-body text-xs text-black/50 tracking-widest uppercase">Admin Terminal V3.0</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 font-body text-xs tracking-wide p-3 mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Administrator ID</label>
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-zinc-50 border border-black/10 px-4 py-3 font-body text-sm outline-none focus:border-duch-black focus:bg-white transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-zinc-50 border border-black/10 px-4 py-3 font-body text-sm outline-none focus:border-duch-black focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-duch-black text-white py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors mt-4 btn-shimmer">
              AUTHORIZE ACCESS
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalValue = products.reduce((sum, p) => sum + p.price * p.inventory, 0);
  const totalStock = products.reduce((sum, p) => sum + p.inventory, 0);
  const lowStock = products.filter(p => p.inventory > 0 && p.inventory <= 5).length;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
      {/* ── Page Header ── */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-body text-[10px] tracking-[0.4em] text-black/30 mb-2 uppercase">— SECURE ACCESS</p>
          <h1 className="text-5xl md:text-6xl tracking-tighter">TERMINAL<span className="opacity-20 ml-4">V3.0</span></h1>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] text-black/40 mb-1 uppercase">Operator</p>
            <p className="font-display font-bold text-sm tracking-widest">ADMIN_001</p>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] text-black/40 mb-1 uppercase">Status</p>
            <p className="font-display font-bold text-sm tracking-widest text-green-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
              LIVE_SYNC
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats Dashboard ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-16 bg-black/5 p-1 border border-black/10">
        <StatCard label="TOTAL_STOCK_UNITS" value={totalStock} unit="SKU" />
        <StatCard label="INVENTORY_VALUE" value={`₹${(totalValue/100000).toFixed(2)}L`} subValue={`₹${totalValue.toLocaleString('en-IN')}`} />
        <StatCard label="CRITICAL_ALERTS" value={lowStock} unit="LOW" highlight={lowStock > 0} />
      </div>

      {/* ── Product Registry ── */}
      <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-4">
        <h2 className="font-display text-xl tracking-tight">PRODUCT_REGISTRY</h2>
        <span className="font-body text-[10px] tracking-widest opacity-40">{products.length} ENTRIES FOUND</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10 overflow-hidden rounded-sm">
        {products.map((product, i) => (
          <AdminRow
            key={product.id}
            product={product}
            updateInventory={updateInventory}
            updatePrice={updatePrice}
            index={i}
          />
        ))}
      </div>

      {/* ── Banner Registry ── */}
      <div className="mt-16 mb-8 flex items-center justify-between border-b border-black/10 pb-4">
        <h2 className="font-display text-xl tracking-tight">PROMOTIONAL_BANNERS</h2>
        <span className="font-body text-[10px] tracking-widest opacity-40">{banners.length} SLOTS</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10 overflow-hidden rounded-sm">
        {banners.map((banner, i) => (
          <BannerRow
            key={banner.id}
            banner={banner}
            updateBanner={updateBanner}
            index={i}
          />
        ))}
      </div>

      {/* ── Brand Settings ── */}
      <div className="mt-16 mb-8 flex items-center justify-between border-b border-black/10 pb-4">
        <h2 className="font-display text-xl tracking-tight">BRAND_CONFIG</h2>
        <span className="font-body text-[10px] tracking-widest opacity-40">LIVE IDENTITY</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10 overflow-hidden rounded-sm mb-4">
        {[
          { key: 'name',          label: 'Brand Short Name',  hint: 'Used in logo, loader, watermark' },
          { key: 'fullName',      label: 'Brand Full Name',   hint: 'Used in footer, copyright, titles' },
          { key: 'email',         label: 'Contact Email',     hint: 'Displayed in footer' },
          { key: 'phone',         label: 'Contact Phone',     hint: 'Displayed in footer' },
          { key: 'promoCode',     label: 'Promo Code',        hint: 'Shown on homepage offer card' },
          { key: 'instagram',     label: 'Instagram URL',     hint: 'Footer social link' },
          { key: 'domain',        label: 'Website Domain',    hint: 'Used in legal pages' },
        ].map(({ key, label, hint }) => (
          <div key={key} className="bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50 transition-colors">
            <div className="md:w-1/3">
              <p className="font-display font-bold text-sm tracking-tight">{label.toUpperCase()}</p>
              <p className="font-body text-[9px] tracking-[0.2em] text-black/30 uppercase mt-0.5">{hint}</p>
            </div>
            <input
              type="text"
              value={localBrand[key] || ''}
              onChange={e => setLocalBrand(prev => ({ ...prev, [key]: e.target.value }))}
              className="flex-1 max-w-xl px-4 py-2.5 bg-zinc-50 border-b-2 border-black/5 font-body text-sm focus:outline-none focus:border-duch-black focus:bg-white transition-all text-right"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            updateBrandConfig(localBrand);
            setBrandSaved(true);
            setTimeout(() => setBrandSaved(false), 2500);
          }}
          className="bg-duch-black text-white font-body text-xs tracking-[0.2em] px-8 py-3.5 hover:bg-gray-800 transition-colors btn-shimmer"
        >
          {brandSaved ? '✓ SAVED' : 'SAVE BRAND CONFIG'}
        </button>
        <button
          onClick={() => { resetBrandConfig(); setLocalBrand({ ...brand }); }}
          className="border border-black/20 text-black/50 font-body text-xs tracking-[0.2em] px-6 py-3.5 hover:border-black hover:text-black transition-colors"
        >
          RESET TO DEFAULTS
        </button>
      </div>

      <div className="mt-12 flex items-center gap-4 p-6 bg-zinc-50 border border-black/5">
        <div className="w-2 h-2 bg-duch-black rounded-full animate-pulse" />
        <p className="font-body text-[10px] text-black/40 tracking-[0.2em] uppercase">
          Continuous deployment active. All modifications are instantly written to core persistence.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, unit, highlight, subValue }) => (
  <div className={`p-8 bg-white transition-all duration-500 hover:bg-zinc-50`}>
    <p className="font-body text-[9px] tracking-[0.3em] uppercase text-black/40 mb-6">{label}</p>
    <div className="flex items-baseline gap-3">
      <p className={`font-display text-5xl font-bold tracking-tighter ${highlight ? 'text-red-500' : 'text-duch-black'}`}>
        {value}
      </p>
      {unit && <span className="font-body text-[10px] text-black/20 tracking-widest uppercase">{unit}</span>}
    </div>
    {subValue && <p className="font-body text-[10px] text-black/30 mt-2 tracking-widest">{subValue}</p>}
  </div>
);

const AdminRow = ({ product, updateInventory, updatePrice, index }) => {
  const [localPrice, setLocalPrice] = useState(product.price);
  const [localStock, setLocalStock] = useState(product.inventory);

  const isLow = localStock <= 5 && localStock > 0;
  const isOut = localStock === 0;

  return (
    <div className="bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-zinc-50 transition-colors duration-300">
      <div className="flex items-center gap-6 md:w-1/3">
        <span className="font-display text-[10px] opacity-20 w-6">{(index + 1).toString().padStart(2, '0')}</span>
        <div className="w-14 h-20 overflow-hidden bg-zinc-100 shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-display font-bold text-sm tracking-tight mb-1">{product.title.toUpperCase()}</h3>
          <p className="font-body text-[9px] tracking-[0.25em] text-black/30 uppercase">{product.category}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-10 md:w-2/3 justify-end">
        <div className="flex flex-col items-end">
          <label className="font-body text-[8px] tracking-[0.3em] text-black/30 mb-2 uppercase">Unit Price</label>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-xs text-black/40 group-focus-within:text-duch-black transition-colors">₹</span>
            <input
              type="number"
              value={localPrice}
              onChange={e => { setLocalPrice(+e.target.value); updatePrice(product.id, +e.target.value); }}
              className="w-32 pl-7 pr-4 py-2.5 bg-zinc-50 border-b-2 border-black/5 font-display font-bold text-sm focus:outline-none focus:border-duch-black focus:bg-white transition-all text-right"
            />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <label className="font-body text-[8px] tracking-[0.3em] text-black/30 mb-2 uppercase">Stock Level</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={localStock}
              onChange={e => { setLocalStock(+e.target.value); updateInventory(product.id, +e.target.value); }}
              className={`w-20 px-3 py-2.5 bg-zinc-50 border-b-2 font-display font-bold text-sm focus:outline-none focus:bg-white transition-all text-center ${isOut ? 'border-red-500 text-red-500' : isLow ? 'border-orange-400' : 'border-black/5'}`}
            />
            <div className={`w-2 h-2 rounded-full ${isOut ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : isLow ? 'bg-orange-400' : 'bg-green-500 opacity-20'}`} />
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end min-w-[100px]">
          <label className="font-body text-[8px] tracking-[0.3em] text-black/30 mb-2 uppercase">Status</label>
          <span className={`font-body text-[9px] tracking-[0.2em] px-3 py-1 rounded-full uppercase border ${isOut ? 'text-red-500 border-red-500/20 bg-red-50' : isLow ? 'text-orange-500 border-orange-500/20 bg-orange-50' : 'text-green-600 border-green-500/20 bg-green-50'}`}>
            {isOut ? 'DEPLETED' : isLow ? 'CRITICAL' : 'OPTIMAL'}
          </span>
        </div>
      </div>
    </div>
  );
};

const BannerRow = ({ banner, updateBanner, index }) => {
  const [localImage, setLocalImage] = useState(banner.image);

  return (
    <div className="bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-zinc-50 transition-colors duration-300">
      <div className="flex items-center gap-6 md:w-1/3">
        <span className="font-display text-[10px] opacity-20 w-6">{(index + 1).toString().padStart(2, '0')}</span>
        <div className="w-24 h-14 overflow-hidden bg-zinc-100 shrink-0 transition-all duration-700">
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-display font-bold text-sm tracking-tight mb-1">{banner.title}</h3>
          <p className="font-body text-[9px] tracking-[0.25em] text-black/30 uppercase">SLOT {banner.id}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-10 md:w-2/3 justify-end">
        <div className="flex flex-col items-end flex-1">
          <label className="font-body text-[8px] tracking-[0.3em] text-black/30 mb-2 uppercase">Image URL</label>
          <input
            type="text"
            value={localImage}
            onChange={e => { setLocalImage(e.target.value); updateBanner(banner.id, e.target.value); }}
            className="w-full max-w-lg px-4 py-2.5 bg-zinc-50 border-b-2 border-black/5 font-body text-xs focus:outline-none focus:border-duch-black focus:bg-white transition-all text-right"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
