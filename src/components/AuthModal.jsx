import React, { useState } from 'react';
import { useBrand } from '../BrandContext';

export default function AuthModal({ open, onClose, onLogin }) {
  const { brand } = useBrand();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const resetForm = () => {
    setStep('details');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setOtp('');
    setError('');
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!email.trim() || !password) {
        setError('Please enter your email and password.');
        return;
      }
    } else {
      if (!name.trim() || !email.trim() || !password) {
        setError('Please fill in all details.');
        return;
      }
      if (!phone) {
        setError('Please enter a valid mobile number.');
        return;
      }
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setError('Please enter a 10-digit mobile number.');
        return;
      }
    }

    setError('');
    setStep('otp');
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Invalid OTP. Enter any 4+ digit number.');
      return;
    }
    setError('');
    
    // Finalize Login/Register
    if (isLogin) {
      // For login demo, use the name from email prefix
      const namePart = email.split('@')[0];
      const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      onLogin({ role: 'customer', phone: 'Linked Number', name: displayName, email: email.trim(), isPremium: false });
    } else {
      onLogin({ role: 'customer', phone, name: name.trim(), email: email.trim(), isPremium: false });
    }
    
    onClose();
    setTimeout(resetForm, 500);
  };

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/50 p-4" onClick={() => { onClose(); resetForm(); }}>
      <div className="bg-duch-bg w-full max-w-md p-8 md:p-10 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => { onClose(); resetForm(); }} className="absolute top-6 right-6 hover:opacity-50 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display uppercase tracking-tight mb-2">
            {step === 'otp' ? 'Verify OTP' : isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="font-body text-[10px] text-black/50 tracking-[0.1em] uppercase">
            {step === 'otp' 
              ? (isLogin ? 'Sent to your linked phone number' : `Sent to +91 ${phone}`) 
              : isLogin ? 'Sign in to access your account' : `Join ${brand.name} for exclusive perks`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 font-body text-xs tracking-wide p-3 mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-5">
            
            {!isLogin && (
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-sm outline-none focus:border-duch-black transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>
            )}

            <div>
              <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-sm outline-none focus:border-duch-black transition-colors"
                placeholder="you@example.com"
                autoFocus={isLogin}
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

            {!isLogin && (
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">Mobile Number (For Verification)</label>
                <div className="flex border border-black/20 focus-within:border-duch-black transition-colors bg-transparent">
                  <span className="flex items-center justify-center px-4 font-body text-sm text-black/50 border-r border-black/10">
                    +91
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    className="w-full bg-transparent px-4 py-3 font-body text-sm outline-none"
                    placeholder="99999 99999"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-duch-black text-white py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors mt-2">
              {isLogin ? 'SIGN IN WITH OTP' : 'SEND OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="font-body text-[10px] tracking-[0.2em] text-black/50 uppercase block mb-2">One Time Password</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(''); }}
                className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-center text-xl tracking-[0.5em] outline-none focus:border-duch-black transition-colors"
                placeholder="••••"
                maxLength={6}
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-duch-black text-white py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors mt-2">
              VERIFY & {isLogin ? 'LOGIN' : 'REGISTER'}
            </button>
            <div className="text-center mt-4">
              <button type="button" onClick={() => setStep('details')} className="font-body text-[10px] tracking-widest text-black/50 hover:text-black underline">
                GO BACK
              </button>
            </div>
          </form>
        )}

        {step === 'details' && (
          <div className="mt-8 text-center border-t border-black/10 pt-6">
            <button 
              onClick={handleToggleMode}
              className="font-body text-xs tracking-widest text-black/60 hover:text-duch-black transition-colors underline"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
