import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CartDrawer({ open, onClose, cart, removeFromCart, updateQty }) {
  const total    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-duch-bg z-[999] flex flex-col shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div>
            <h2 className="text-xl tracking-widest">YOUR CART</h2>
            <p className="font-body text-xs text-black/40 tracking-widest mt-0.5">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="hover:opacity-50 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 200 180" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinejoin="round" opacity="0.2">
                <path d="M55,5 L80,28 Q100,42 120,28 L145,5 L200,48 L165,72 L165,175 L35,175 L35,72 L0,48 Z"/>
              </svg>
              <p className="font-body text-sm tracking-widest text-black/40">YOUR CART IS EMPTY</p>
              <Link to="/shop" onClick={onClose} className="font-body text-xs tracking-widest underline hover:opacity-60">START SHOPPING</Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-black/8 pb-5">
                  <Link to={`/product/${item.id}`} onClick={onClose} className="shrink-0 w-20 h-24 overflow-hidden bg-gray-100 block">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top hover:scale-105 transition-transform" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} onClick={onClose} className="font-body text-sm leading-snug line-clamp-2 hover:opacity-60 transition-opacity block">{item.title}</Link>
                    <p className="font-body text-xs text-black/40 tracking-widest mt-1">SIZE: {item.size}</p>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center border border-black/15">
                        <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-colors text-sm">−</button>
                        <span className="w-8 text-center font-body text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-colors text-sm">+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-sm font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="hover:opacity-50 transition-opacity">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-black/10 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm tracking-widest text-black/60">SUBTOTAL</span>
              <span className="font-display text-xl font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="font-body text-xs text-black/40 tracking-wide">Taxes and shipping calculated at checkout.</p>
            <button className="w-full bg-duch-black text-white font-body text-sm tracking-widest py-4 hover:bg-gray-800 transition-colors btn-shimmer">
              PROCEED TO CHECKOUT
            </button>
            <button onClick={onClose} className="w-full border border-black/20 text-duch-black font-body text-sm tracking-widest py-3 hover:border-duch-black transition-colors">
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
