import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor — Physics-based cursor, rewritten to avoid RAF restarts.
 * CRITICAL: All reactive values (isVisible, hoverState, isClicking)
 * are stored in refs. The RAF loop + event listeners are created ONCE
 * (empty dep array) and never torn down until unmount.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  // All "state" as refs — readable inside the RAF loop without stale closures
  const mouse         = useRef({ x: -200, y: -200 });
  const pos           = useRef({ x: -200, y: -200 });
  const vel           = useRef({ x: 0, y: 0 });
  const scaleRef      = useRef(1);
  const targetScaleR  = useRef(1);
  const opacityRef    = useRef(0);
  const isVisibleRef  = useRef(false);
  const isClickingRef = useRef(false);
  const hoverRef      = useRef({ type: null, text: '' });
  const magneticRef   = useRef(null);

  const STIFFNESS = 0.11;
  const DAMPING   = 0.62;
  const STRETCH   = 0.007;
  const LERP      = 0.14;

  useEffect(() => {
    // Touch devices: skip entirely
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // ── Event Handlers ──────────────────────────────────────────
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
      }
    };

    const onDown = () => { isClickingRef.current = true; };
    const onUp   = () => { isClickingRef.current = false; };

    const onOver = (e) => {
      const t = e.target;
      if (!t) return;

      const isProduct  = t.closest('[href*="/product/"]');
      const isCategory = t.closest('[href*="?cat="]');
      const isClickable = t.closest('button, a, [role="button"], .cursor-pointer, .magnetic, input, select, textarea, label');

      if (isProduct)       hoverRef.current = { type: 'view',  text: 'VIEW' };
      else if (isCategory) hoverRef.current = { type: 'shop',  text: 'SHOP' };
      else if (isClickable) hoverRef.current = { type: 'click', text: '' };
      else                  hoverRef.current = { type: null,   text: '' };

      const magEl = t.closest('.magnetic');
      if (magEl) {
        const r = magEl.getBoundingClientRect();
        magneticRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      } else {
        magneticRef.current = null;
      }
    };

    const onOut = (e) => {
      if (e.target?.closest?.('.magnetic')) magneticRef.current = null;
    };

    const onLeave  = () => { isVisibleRef.current = false; };
    const onEnter  = () => { isVisibleRef.current = true; };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mousedown',  onDown,  { passive: true });
    window.addEventListener('mouseup',    onUp,    { passive: true });
    window.addEventListener('mouseover',  onOver,  { passive: true });
    window.addEventListener('mouseout',   onOut,   { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // ── Single RAF Loop — never recreated ───────────────────────
    let rafId;
    const render = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Magnetic pull
      let tx = mx, ty = my;
      if (magneticRef.current) {
        const { x: cx, y: cy } = magneticRef.current;
        tx = cx + (mx - cx) * 0.5;
        ty = cy + (my - cy) * 0.5;
      }

      // Spring physics
      const dx = tx - pos.current.x;
      const dy = ty - pos.current.y;
      vel.current.x = (vel.current.x + dx * STIFFNESS) * DAMPING;
      vel.current.y = (vel.current.y + dy * STIFFNESS) * DAMPING;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Stretch
      const speed   = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const stretch = 1 + Math.min(speed * STRETCH, 0.35);
      const angle   = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      // Target scale from current hover state
      const hover = hoverRef.current;
      const clicking = isClickingRef.current;
      if (clicking) targetScaleR.current = 0.75;
      else if (hover.type === 'view' || hover.type === 'shop') targetScaleR.current = 2.6;
      else if (hover.type === 'click') targetScaleR.current = 1.6;
      else targetScaleR.current = 1;

      scaleRef.current  += (targetScaleR.current - scaleRef.current) * LERP;
      opacityRef.current += ((isVisibleRef.current ? 1 : 0) - opacityRef.current) * 0.1;

      const s = scaleRef.current;
      const o = opacityRef.current;
      const px = pos.current.x;
      const py = pos.current.y;
      const isExpanded = hover.type !== null;

      // Apply to ring
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${px}px,${py}px,0) rotate(${angle}deg) scale(${s * stretch},${s / stretch}) rotate(${-angle}deg)`;
        ringRef.current.style.opacity = o;
        ringRef.current.style.backgroundColor = isExpanded ? '#fff' : 'transparent';
        ringRef.current.style.borderColor      = isExpanded ? 'transparent' : 'rgba(26,26,26,0.4)';
        ringRef.current.style.mixBlendMode     = isExpanded ? 'difference' : 'normal';
      }

      // Apply to dot
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mx}px,${my}px,0) scale(${!isExpanded && isVisibleRef.current ? (clicking ? 0.5 : 1) : 0})`;
        dotRef.current.style.opacity = o;
      }

      // Apply text
      if (textRef.current) {
        const hasText = !!hover.text;
        textRef.current.style.opacity = hasText ? '1' : '0';
        textRef.current.style.transform = `scale(${hasText ? 1 / s : 0})`;
        if (hasText && textRef.current.textContent !== hover.text) {
          textRef.current.textContent = hover.text;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []); // ← EMPTY DEPS: loop created ONCE, never restarts

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Physics Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          marginLeft: -18, marginTop: -18,
          borderRadius: '50%', border: '1px solid rgba(26,26,26,0.4)',
          pointerEvents: 'none',
          zIndex: 20000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          willChange: 'transform',
          transition: 'background-color 0.25s ease, border-color 0.25s ease',
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: 7,
            letterSpacing: '0.25em',
            color: '#fff',
            pointerEvents: 'none',
            userSelect: 'none',
            filter: 'invert(1) grayscale(1)',
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>

      {/* Instant Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 4, height: 4,
          marginLeft: -2, marginTop: -2,
          borderRadius: '50%',
          backgroundColor: '#1a1a1a',
          pointerEvents: 'none',
          zIndex: 20001,
          willChange: 'transform',
        }}
      />
    </>
  );
}
