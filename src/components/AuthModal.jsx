import React, { useState } from 'react';

export default function AuthModal({ open, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Admin login: username = admin, password = admin123
    if ((email === 'admin' || email === 'admin@duch.com') && password === 'admin123') {
      onLogin('admin');
      onClose();
    } else if (password.length >= 6) {
      onLogin('customer');
      onClose();
    } else {
      setError('Invalid credentials or password too short (min 6 chars).');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-duch-bg w-full max-w-md p-8 md:p-10 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 hover:opacity-50 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display uppercase tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="font-body text-xs text-black/50 tracking-widest uppercase">
            {isLogin ? 'Sign in to your account' : 'Join Duch Clothing'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 font-body text-xs tracking-wide p-3 mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Username / Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-sm outline-none focus:border-duch-black transition-colors"
              placeholder="admin or you@example.com"
            />
          </div>
          <div>
            <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-sm outline-none focus:border-duch-black transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-duch-black text-white py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors mt-2 btn-shimmer">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-black/10 pt-6">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="font-body text-xs tracking-widest text-black/60 hover:text-duch-black transition-colors underline"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
