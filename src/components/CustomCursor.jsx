import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide the default cursor completely on the whole page when custom is active */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Main outer ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-duch-black/50 mix-blend-difference transition-all duration-150 ease-out flex items-center justify-center"
        style={{
          width: isHovering ? '64px' : '24px',
          height: isHovering ? '64px' : '24px',
          transform: `translate3d(${position.x - (isHovering ? 32 : 12)}px, ${position.y - (isHovering ? 32 : 12)}px, 0)`,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 26, 26, 0.5)',
        }}
      >
        {/* Inner dot */}
        <div
          className="rounded-full bg-duch-black mix-blend-difference transition-all duration-300"
          style={{
            width: isHovering ? '4px' : '4px',
            height: isHovering ? '4px' : '4px',
            backgroundColor: isHovering ? 'white' : '#1a1a1a',
            opacity: isHovering ? 0 : 1
          }}
        />
      </div>
    </>
  );
}
