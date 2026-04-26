import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'NEW ARRIVALS', href: '/shop' },
  { label: 'CASUAL',       href: '/shop?cat=Casual' },
  { label: 'FORMAL',       href: '/shop?cat=Formal' },
  { label: 'POLO',         href: '/shop?cat=Polo' },
  { label: 'T-SHIRTS',     href: '/shop?cat=T-Shirts' },
  { label: 'BOTTOM WEAR',  href: '/shop?cat=Bottom+Wear' },
  { label: 'JACKETS',      href: '/shop?cat=Jackets' },
];

export default function Header({ cartCount = 0, onCartOpen, user, onLogin, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-duch-bg border-b border-black/10 sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-duch-black text-white overflow-hidden" style={{ height: '34px' }}>
        <div className="flex whitespace-nowrap h-full items-center">
          {[0,1].map(i => (
            <div key={i} className="ticker-content flex shrink-0" aria-hidden={i===1}>
              {['ORDERS ABOVE ₹1999 — USE CODE: DUCH10', 'GET 10% OFF ON FIRST PURCHASE — USE CODE: HIKEDUCH', 'FREE SHIPPING ABOVE ₹999', 'EASY 7-DAY RETURNS'].map((t,j) => (
                <span key={j} className="font-body text-[11px] tracking-[0.2em] px-12">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main row */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between" style={{ height: '72px' }}>
        {/* Left Actions (Mobile Menu + Search) */}
        <div className="flex items-center gap-4 w-1/3">
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden flex items-center hover:opacity-60 transition-opacity" aria-label="Toggle menu">
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              const q = e.target.search.value.trim(); 
              if(q) navigate(`/shop?q=${encodeURIComponent(q)}`); 
            }} 
            className="magnetic hidden md:flex items-center gap-2 border-b border-transparent hover:border-black/20 focus-within:border-black/50 transition-colors pb-0.5"
          >
            <button type="submit" className="hover:opacity-60 transition-opacity">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <input 
              type="text" 
              name="search" 
              placeholder="SEARCH" 
              className="bg-transparent border-none outline-none font-body text-xs tracking-[0.2em] w-20 md:w-32 opacity-60 focus:opacity-100 transition-opacity placeholder:text-black/50" 
            />
          </form>
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center w-1/3">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <Logo className="h-8 text-[1.4rem] md:text-[1.6rem] text-duch-black" />
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 justify-end w-1/3">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {user.role === 'admin' && (
                <Link to="/admin" className="font-body text-[10px] tracking-[0.2em] bg-duch-black text-white px-2 py-1 rounded-sm hover:opacity-80 transition-opacity">
                  ADMIN
                </Link>
              )}
              <button onClick={onLogout} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span className="font-body text-xs tracking-[0.2em]">LOGOUT</span>
              </button>
            </div>
          ) : (
            <button onClick={() => setAuthOpen(true)} className="magnetic hidden md:flex items-center gap-1.5 hover:opacity-60 transition-opacity">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="font-body text-xs tracking-[0.2em]">LOGIN</span>
            </button>
          )}
          <button onClick={onCartOpen} className="magnetic flex items-center gap-1.5 hover:opacity-60 transition-opacity relative">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="font-body text-xs tracking-[0.2em]">CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-duch-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category nav row */}
      <div className="border-t border-black/8 hidden md:block" style={{ height: '44px' }}>
        <nav className="max-w-[1440px] mx-auto px-12 flex items-center justify-center gap-10 h-full">
          {NAV_LINKS.map(link => {
            const active = location.pathname === '/shop' && location.search.includes(link.href.split('?')[1] || '!');
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`font-body text-[11px] tracking-[0.18em] pb-0.5 border-b-2 transition-all hover:border-duch-black hover:opacity-100 ${active ? 'border-duch-black opacity-100' : 'border-transparent opacity-55'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-duch-bg border-b border-black/10 shadow-2xl transition-all duration-300 origin-top overflow-hidden z-40 ${
          mobileOpen ? 'max-h-[80vh] opacity-100 border-opacity-100' : 'max-h-0 opacity-0 border-opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-6 overflow-y-auto max-h-[80vh]">
          {/* Mobile Search */}
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              const q = e.target.search.value.trim(); 
              if(q) {
                navigate(`/shop?q=${encodeURIComponent(q)}`);
                setMobileOpen(false);
              }
            }} 
            className="flex items-center gap-3 bg-black/5 px-4 py-3 rounded-md border border-black/10 focus-within:border-black/30 focus-within:bg-black/10 transition-colors"
          >
            <button type="submit" className="opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <input 
              type="text" 
              name="search" 
              placeholder="SEARCH PRODUCTS" 
              className="bg-transparent border-none outline-none font-body text-sm tracking-[0.15em] w-full opacity-100 placeholder:text-black/50" 
            />
          </form>

          <div className="flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="font-body text-[13px] tracking-widest opacity-80 hover:opacity-100 transition-opacity">
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="border-t border-black/10 pt-5 mt-1">
            {user ? (
              <div className="flex flex-col gap-5">
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="font-body text-[13px] tracking-widest text-duch-black font-bold">
                    ADMIN DASHBOARD
                  </Link>
                )}
                <button onClick={() => { onLogout(); setMobileOpen(false); }} className="font-body text-[13px] tracking-widest text-left opacity-80 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  LOGOUT
                </button>
              </div>
            ) : (
              <button onClick={() => { setAuthOpen(true); setMobileOpen(false); }} className="font-body text-[13px] tracking-widest text-left opacity-80 flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                LOGIN / REGISTER
              </button>
            )}
          </div>
        </nav>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={onLogin} />
    </header>
  );
}
