import React, { useState, useEffect } from 'react';

export default function SurpriseLoader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoaded?.();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070e0a] flex items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Dark Forest & Golden Ambient Lighting (NO RED UI) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />

      {/* Golden Aura behind central monogram */}
      <div className="absolute w-64 h-64 rounded-full bg-gold-500/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Luxury Minimalist Editorial Loader */}
      <div className="relative z-10 max-w-sm w-full text-center flex flex-col items-center animate-scale-up">
        {/* Monogram Seal 'A' for Arunadevi in Antique Gold */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold-400/50 bg-forest-950/80 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <span className="font-cinzel text-2xl sm:text-3xl font-black tracking-widest text-gold-300 drop-shadow-md">
            A
          </span>
        </div>

        {/* Minimalist Subtitle */}
        <div className="text-[10px] sm:text-[11px] font-cinzel uppercase tracking-[0.3em] text-gold-400/80 mb-2 font-semibold">
          A Celebration of Arunadevi
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-champagne-100 font-bold tracking-tight mb-6 text-glow-gold">
          Preparing Your Birthday Surprise
        </h3>

        {/* Glowing Antique Gold Progress Track */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden mb-4 rounded-full border border-gold-500/20">
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 shadow-[0_0_12px_#d4af37] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Monospace Percentage */}
        <div className="text-xs font-mono tracking-widest text-gold-300/80 font-medium">
          {String(progress).padStart(2, '0')}%
        </div>
      </div>
    </div>
  );
}
