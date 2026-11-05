import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen6Wishes({ onNext, onBack }) {
  const { wishes, recipient } = EXPERIENCE_CONFIG;
  const [activeWishIndex, setActiveWishIndex] = useState(0);

  const activeWish = wishes[activeWishIndex] || wishes[0];

  const handleNextWish = () => {
    soundEngine.playCardClick();
    setActiveWishIndex((prev) => (prev + 1) % wishes.length);
  };

  const handlePrevWish = () => {
    soundEngine.playCardClick();
    setActiveWishIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  const handleSelectWish = (idx) => {
    soundEngine.playCardClick();
    setActiveWishIndex(idx);
  };

  const handleProceedToFinale = () => {
    soundEngine.playBellChime();
    onNext();
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-2 sm:py-5 px-3 sm:px-6 select-none overflow-hidden z-30">
      {/* Background with Dark Forest Tint and Golden Stardust */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.65)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />
      <GoldenButterflies count={10} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          Chapter IV • Prayers & Blessings
        </span>
        <h2 className="font-serif text-lg sm:text-2xl text-champagne-100 font-bold tracking-tight mt-0.5 text-glow-gold">
          The Things I Wish For You
        </h2>
        <p className="font-serif italic text-[11px] sm:text-xs text-champagne-300/75 mt-0.5">
          Dedicated with love to {recipient.preferredName}
        </p>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE ILLUMINATED WISH CARD (100% SCROLL-FREE)
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 w-full max-w-md my-auto py-1 animate-page-turn flex flex-col items-center">
        <div className="relative w-full rounded-2xl glass-card-forest p-5 sm:p-7 border border-gold-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[220px] xs:min-h-[240px]">
          
          {/* Wish Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-cinzel text-[10px] font-semibold text-gold-300 px-3 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30">
              Wish {activeWish.roman} of V
            </span>
            <span className="text-gold-400 text-sm animate-pulse">✦</span>
          </div>

          {/* Wish Title */}
          <h3 className="font-serif font-bold text-lg sm:text-2xl text-gold-200 mb-2.5 tracking-tight text-center">
            {activeWish.title}
          </h3>

          {/* Wish Body */}
          <p className="font-serif text-xs sm:text-sm text-champagne-200/90 leading-relaxed font-light text-center px-2 mb-4">
            "{activeWish.body}"
          </p>

          {/* Stepper Dots & Arrows */}
          <div className="flex items-center justify-between pt-3 border-t border-gold-500/20">
            <button
              onClick={handlePrevWish}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px] font-serif transition-colors cursor-pointer"
            >
              ← Prev
            </button>

            {/* Glowing Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {wishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectWish(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeWishIndex
                      ? 'w-6 bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                      : 'w-2 bg-gold-500/30 hover:bg-gold-500/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextWish}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px] font-serif transition-colors cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM NAVIGATION: DIRECT TO CAKE CELEBRATION
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 flex items-center justify-between w-full max-w-md pt-1 pb-1 shrink-0 px-1">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs font-serif text-gold-400/60 hover:text-gold-300 transition-colors tracking-widest uppercase cursor-pointer"
        >
          ← Letter
        </button>

        <button
          onClick={handleProceedToFinale}
          className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-gold-600/30 hover:from-gold-500/50 hover:to-gold-500/70 border border-gold-400 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Cake Celebration → 🎂</span>
        </button>
      </footer>
    </div>
  );
}
