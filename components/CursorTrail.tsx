'use client';

import { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect touch devices
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false);

    if (isTouch) return; // Don't show cursor trail on touch devices

    let trailId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      };
      
      setTrails((prev) => [...prev.slice(-10), newTrail]);
      
      // Remove trail after animation
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-screen hidden md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet opacity-35 blur-[1px]" />
      </div>
      
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-neon-blue/70 opacity-20 hidden md:block"
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)',
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
    </>
  );
}
