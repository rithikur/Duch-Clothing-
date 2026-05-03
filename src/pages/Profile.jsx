import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Profile({ user, updateUser }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showPremium = searchParams.get('premium') === 'true';
  const showOrders = searchParams.get('orders') === 'true';

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="pt-12 md:pt-24 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-[70vh]">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 md:mb-12">MY ACCOUNT</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
        {/* Sidebar / Info */}
        <div className="w-full lg:w-1/4 shrink-0">
          <div className="bg-white p-6 md:p-8 shadow-sm border border-black/5">
            <div className="w-16 h-16 bg-duch-black text-white rounded-full flex items-center justify-center font-display text-2xl font-bold mb-5 shadow-lg">
              {user.role === 'admin' ? 'A' : 'U'}
            </div>
            <h2 className="font-display text-lg font-bold mb-1 uppercase">{user.name || (user.role === 'admin' ? 'Admin User' : 'Guest User')}</h2>
            <p className="font-body text-xs tracking-widest text-black/50 mb-8">MEMBER SINCE 2026</p>
            
            <div className="space-y-2 font-body text-[11px] tracking-widest">
              <button className={`block w-full text-left py-3 border-b ${!showPremium && !showOrders ? 'border-duch-black font-bold text-duch-black' : 'border-transparent text-black/50 hover:text-duch-black'}`} onClick={() => navigate('/profile')}>PROFILE DETAILS</button>
              <button className={`block w-full text-left py-3 border-b flex items-center gap-2 ${showPremium ? 'border-duch-black font-bold text-duch-black' : 'border-transparent text-black/50 hover:text-duch-black'}`} onClick={() => navigate('/profile?premium=true')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                PREMIUM CLUB
              </button>
              <button className={`block w-full text-left py-3 border-transparent ${showOrders ? 'border-duch-black font-bold text-duch-black border-b' : 'text-black/50 hover:text-duch-black'}`} onClick={() => navigate('/profile?orders=true')}>ORDER HISTORY</button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {showPremium ? (
            <div className="animate-heroReveal">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4">PREMIUM CLUB</h2>
              
              {!user.isPremium ? (
                // --- JOIN PREMIUM UI ---
                <div>
                  <p className="font-body text-sm text-black/60 mb-8 max-w-xl leading-relaxed">
                    Join the exclusive DUCH Premium Club. Upgrade your membership today to unlock special privileges, extra offers, and luxury perks designed just for you.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-6 border border-black/5 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-duch-black"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      <h3 className="font-display text-lg font-bold mb-2">Extra 15% Off</h3>
                      <p className="font-body text-xs text-black/60 leading-relaxed">Enjoy a flat 15% discount on all orders, stackable with ongoing sales and offers.</p>
                    </div>
                    <div className="bg-white p-6 border border-black/5 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-duch-black"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      <h3 className="font-display text-lg font-bold mb-2">Free Express Shipping</h3>
                      <p className="font-body text-xs text-black/60 leading-relaxed">No minimum spend. Get your orders delivered at lightning speed anywhere in the world.</p>
                    </div>
                    <div className="bg-white p-6 border border-black/5 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-duch-black"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <h3 className="font-display text-lg font-bold mb-2">Early Drop Access</h3>
                      <p className="font-body text-xs text-black/60 leading-relaxed">Shop new collections 48 hours before the general public. Never miss limited items.</p>
                    </div>
                    <div className="bg-white p-6 border border-black/5 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-duch-black"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <h3 className="font-display text-lg font-bold mb-2">Dedicated Concierge</h3>
                      <p className="font-body text-xs text-black/60 leading-relaxed">Priority customer support and complimentary personal styling sessions.</p>
                    </div>
                  </div>
                  
                  <div className="bg-duch-casual p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <div className="font-display text-2xl font-bold mb-1">₹999 <span className="text-base font-normal text-black/50">/ Year</span></div>
                      <div className="font-body text-xs tracking-widest text-black/60">Cancel anytime. Billed annually.</div>
                    </div>
                    <button 
                      onClick={() => updateUser({ isPremium: true })}
                      className="w-full sm:w-auto bg-duch-black text-white font-body text-[11px] tracking-widest px-10 py-4 hover:bg-black/80 transition-colors shadow-lg btn-shimmer"
                    >
                      PAY & JOIN PREMIUM
                    </button>
                  </div>
                </div>
              ) : (
                // --- PREMIUM CARD VIEW ---
                <>
                  <p className="font-body text-sm text-black/60 mb-10 max-w-xl leading-relaxed">
                    You are an exclusive DUCH Premium Club member. Enjoy your extra offers, early access to sales, and free express shipping worldwide. Present this digital member card at our flagship stores for exclusive VIP treatment.
                  </p>
                  
                  {/* Premium Card */}
                  <div className="relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transition-transform duration-500 hover:scale-[1.03]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 mix-blend-overlay pointer-events-none" />
                    
                    {/* Shiny overlay */}
                    <div className="absolute inset-0 translate-x-[-150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-[1500ms] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-[150%] pointer-events-none" />
                    
                    <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white z-10">
                      <div className="flex justify-between items-start">
                        <span className="font-display text-2xl font-bold tracking-tighter">DUCH</span>
                        <span className="font-body text-[9px] tracking-[0.3em] text-white/70 border border-white/20 px-2.5 py-1 rounded-full bg-white/5 backdrop-blur-sm">PREMIUM</span>
                      </div>
                      
                      <div>
                        <div className="font-body text-[9px] tracking-[0.2em] text-white/50 mb-1">MEMBER NAME</div>
                        <div className="font-body text-base md:text-lg tracking-widest font-medium uppercase">{user.name || (user.role === 'admin' ? 'ADMINISTRATOR' : 'VALUED GUEST')}</div>
                        <div className="flex justify-between items-end mt-4 md:mt-6">
                          <div className="font-display text-xs md:text-sm tracking-[0.2em] text-white/80">0001 8492 4819 0042</div>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : showOrders ? (
            <div className="animate-heroReveal">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-6">ORDER HISTORY</h2>
              <div className="bg-white p-12 border border-black/5 flex flex-col items-center justify-center text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-6 opacity-20 text-duch-black"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></svg>
                <h3 className="font-display text-lg font-bold mb-2">NO ORDERS YET</h3>
                <p className="font-body text-xs text-black/50 mb-6 max-w-sm leading-relaxed">You haven't placed any orders yet. When you do, their details and tracking information will appear here.</p>
                <button onClick={() => navigate('/shop')} className="bg-duch-black text-white font-body text-[11px] tracking-widest px-8 py-3.5 hover:bg-black/80 transition-colors shadow-lg btn-shimmer">
                  START SHOPPING
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-heroReveal">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-6">PROFILE DETAILS</h2>
              <div className="bg-white p-6 md:p-8 border border-black/5 flex flex-col gap-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-black/50 mb-2">FULL NAME</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-transparent border-b border-duch-black pb-2 font-body text-sm outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="font-body text-sm border-b border-black/10 pb-3 uppercase">{user.name || (user.role === 'admin' ? 'Administrator' : 'Guest User')}</div>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-black/50 mb-2">MEMBERSHIP STATUS</label>
                    <div className={`font-body text-sm font-bold border-b border-black/10 pb-3 tracking-widest ${user.isPremium ? 'text-duch-black' : 'text-black/50'}`}>
                      {user.isPremium ? 'PREMIUM CLUB' : 'FREE ACCOUNT'}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-widest text-black/50 mb-2">PHONE / EMAIL</label>
                  <div className="font-body text-sm border-b border-black/10 pb-3">{user.phone || user.email || (user.role === 'admin' ? 'admin@duch.com' : 'user@duch.com')}</div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-widest text-black/50 mb-2">PASSWORD</label>
                  <div className="font-body text-sm border-b border-black/10 pb-3 tracking-widest">••••••••</div>
                </div>
                
                {isEditing ? (
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => {
                      updateUser({ name: editName });
                      setIsEditing(false);
                    }} className="bg-duch-black text-white font-body text-[11px] tracking-widest px-8 py-3.5 hover:bg-black/80 transition-colors shadow-lg">
                      SAVE CHANGES
                    </button>
                    <button onClick={() => setIsEditing(false)} className="text-black/50 hover:text-black font-body text-[11px] tracking-widest px-4 py-3.5 transition-colors">
                      CANCEL
                    </button>
                  </div>
                ) : (
                  <button onClick={() => {
                    setEditName(user.name || '');
                    setIsEditing(true);
                  }} className="self-start mt-4 bg-duch-black text-white font-body text-[11px] tracking-widest px-8 py-3.5 hover:bg-black/80 transition-colors shadow-lg">
                    EDIT DETAILS
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
