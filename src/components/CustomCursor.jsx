import React, { useEffect, useState } from 'react';

/**
 * CustomCursor: Magical golden stardust and butterfly shimmer on pointer touch/click.
 * Works seamlessly across both desktop and mobile devices.
 */
export default function CustomCursor() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const clientX =
        e.clientX !== undefined
          ? e.clientX
          : e.touches && e.touches[0]
          ? e.touches[0].clientX
          : window.innerWidth / 2;
      const clientY =
        e.clientY !== undefined
          ? e.clientY
          : e.touches && e.touches[0]
          ? e.touches[0].clientY
          : window.innerHeight / 2;
      const id = Date.now() + Math.random();

      setSparkles((prev) => [...prev.slice(-8), { id, x: clientX, y: clientY }]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 820);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <>
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{ left: s.x, top: s.y }}
          className="fixed pointer-events-none z-[99999] select-none animate-gold-sparkle flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
          {/* Radial Gold Luminescence */}
          <div className="absolute w-14 h-14 rounded-full bg-amber-400/25 blur-lg pointer-events-none" />

          {/* Luminous Butterfly Sparkle Silhouette */}
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 filter drop-shadow-[0_0_12px_rgba(245,215,120,0.95)]"
          >
            {/* Left Wing */}
            <path
              d="M20 20 C10 12, 4 14, 8 26 C12 28, 16 26, 20 20 Z"
              fill="rgba(245, 215, 120, 0.85)"
              stroke="rgba(255, 245, 210, 0.9)"
              strokeWidth="0.8"
            />
            {/* Right Wing */}
            <path
              d="M20 20 C30 12, 36 14, 32 26 C28 28, 24 26, 20 20 Z"
              fill="rgba(245, 215, 120, 0.85)"
              stroke="rgba(255, 245, 210, 0.9)"
              strokeWidth="0.8"
            />
            {/* Center diamond spark */}
            <circle cx="20" cy="20" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      ))}
    </>
  );
}
