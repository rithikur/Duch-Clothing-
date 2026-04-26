import React, { useEffect, useRef, useState } from 'react';

export default function Loader({ onDone, ready = true }) {
  /* Stable ref — avoids the effect re-running when parent re-renders */
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  const [phase, setPhase] = useState('enter'); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 80);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === 'hold' && ready) {
      // Run two full cycles of the progress line (1.2s * 2 = 2400ms)
      const t2 = setTimeout(() => setPhase('exit'), 2400);
      const t3 = setTimeout(() => onDoneRef.current(), 3100);
      return () => [t2, t3].forEach(clearTimeout);
    }
  }, [phase, ready]);

  const isExit = phase === 'exit';

  return (
    /* Outer panel — slides UP on exit */
    <div
      className="fixed inset-0 z-[20010] bg-duch-black flex flex-col items-center justify-center overflow-hidden"
      style={{
        transform: isExit ? 'translateY(-100%)' : 'translateY(0)',
        transition: isExit ? 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      {/* ── DUCH Letters – staggered slide up ── */}
      <div className="flex items-end gap-1 overflow-hidden">
        {['D', 'U', 'C', 'H'].map((letter, i) => (
          <span
            key={letter}
            className="font-display font-bold text-white leading-none"
            style={{
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              display: 'inline-block',
              transform: phase === 'enter' ? 'translateY(120%)' : 'translateY(0)',
              opacity:   phase === 'enter' ? 0 : 1,
              transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06 + 0.08}s, opacity 0.5s ease ${i * 0.06 + 0.08}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* ── CLOTHING subtitle ── */}
      <div
        className="font-body tracking-[0.6em] text-white/40 mt-3 text-xs uppercase"
        style={{
          transform: phase === 'enter' ? 'translateY(20px)' : 'translateY(0)',
          opacity:   phase === 'enter' ? 0 : 1,
          transition: 'transform 0.7s ease 0.38s, opacity 0.7s ease 0.38s',
        }}
      >
        Clothing
      </div>

      {/* ── Animated line ── */}
      <div className="mt-8 w-64 h-px bg-white/20 overflow-hidden">
        <div
          className={`h-full bg-white ${phase === 'enter' ? '-translate-x-full' : phase === 'hold' ? 'animate-loader-line' : 'translate-x-full'}`}
        />
      </div>

      {/* ── Tiny collection text ── */}
      <p
        className="font-body text-[10px] tracking-[0.4em] text-white/25 mt-5 uppercase"
        style={{
          opacity:   phase === 'enter' ? 0 : 1,
          transition: 'opacity 0.8s ease 0.5s',
        }}
      >
        New Collection · 2024
      </p>
    </div>
  );
}
