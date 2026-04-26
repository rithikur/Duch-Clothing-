import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';

const Admin = ({ products, updateInventory, updatePrice, user, onLogin }) => {
  const [authOpen, setAuthOpen] = useState(false);
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full scale-150 animate-pulse" />
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="relative text-red-500">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl mb-4 text-duch-black font-display tracking-tight">ACCESS DENIED</h1>
        <p className="font-body text-sm text-black/50 tracking-[0.2em] max-w-sm mx-auto mb-10 leading-relaxed">
          THIS IS A PROTECTED ARCHIVE. <br />
          PLEASE AUTHENTICATE AS ADMINISTRATOR TO CONTINUE.
        </p>
        <button 
          onClick={() => setAuthOpen(true)}
          className="magnetic px-10 py-4 bg-duch-black text-white font-body text-[10px] tracking-[0.3em] hover:bg-zinc-800 transition-colors"
        >
          AUTHENTICATE
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={onLogin} />
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

export default Admin;

