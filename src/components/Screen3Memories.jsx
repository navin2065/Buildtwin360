import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen3Memories({ onNext, onBack }) {
  const { memories } = EXPERIENCE_CONFIG;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeMemory = memories[activeIndex] || memories[0];

  const handleNext = () => {
    soundEngine.playCardClick();
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    soundEngine.playCardClick();
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleSelect = (idx) => {
    soundEngine.playCardClick();
    setActiveIndex(idx);
  };

  const openLightbox = () => {
    soundEngine.playCardClick();
    setLightboxOpen(true);
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-2 sm:py-5 px-3 sm:px-6 select-none overflow-hidden z-30">
      {/* Background with Dark Forest Tint and Golden Stardust */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_top,rgba(23,46,35,0.6)_0%,rgba(5,10,7,0.98)_90%)] pointer-events-none" />
      <GoldenButterflies count={10} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          Chapter I • The Visual Chronicle
        </span>
        <h2 className="font-serif text-xl sm:text-3xl text-champagne-100 font-bold tracking-tight mt-0.5 text-glow-gold">
          Our Memories
        </h2>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. CENTERPIECE: COMPACT ARCHIVAL MEMORY FRAME
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 w-full max-w-sm sm:max-w-md my-auto py-1 flex flex-col items-center justify-center">
        <div className="relative w-full rounded-2xl glass-card-forest p-3 sm:p-4 border border-gold-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-page-turn">
          
          {/* Photo Container */}
          <div
            onClick={openLightbox}
            className="relative w-full h-[32vh] xs:h-[35vh] sm:h-[40vh] max-h-[280px] sm:max-h-[340px] rounded-xl overflow-hidden bg-black/60 border border-gold-400/30 group cursor-pointer"
          >
            <img
              src={activeMemory.src}
              alt={activeMemory.title}
              onError={(e) => {
                e.target.src = activeMemory.fallback;
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Expand / Inspect Badge */}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-forest-950/80 border border-gold-400/40 text-[9px] font-serif text-gold-300 opacity-80 backdrop-blur-sm">
              🔍 Tap
            </div>

            {/* Tag & Title in Bottom Photo Corner */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none text-left">
              <span className="inline-block px-2 py-0.5 rounded-full bg-forest-950/80 border border-gold-500/40 text-[9px] font-cinzel text-gold-300 uppercase tracking-wider backdrop-blur-md mb-0.5">
                {activeMemory.tag}
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white drop-shadow-md leading-tight">
                {activeMemory.title}
              </h3>
            </div>
          </div>

          {/* Caption Box */}
          <div className="mt-2 px-1 text-center">
            <p className="font-serif italic text-[11px] sm:text-xs text-champagne-200/90 leading-snug line-clamp-2">
              "{activeMemory.caption}"
            </p>
          </div>

          {/* Controls: Prev / Dots / Next */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gold-500/20 px-1">
            <button
              onClick={handlePrev}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px] font-serif transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>Prev</span>
            </button>

            {/* Thumbnail Dots */}
            <div className="flex items-center gap-1.5">
              {memories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-5 bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                      : 'w-1.5 bg-gold-500/30 hover:bg-gold-500/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px] font-serif transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM NAVIGATION: CONTINUE TO NEXT CHAPTER
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 flex items-center justify-between w-full max-w-sm sm:max-w-md pt-1 pb-1 shrink-0 px-1">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs font-serif text-gold-400/60 hover:text-gold-300 transition-colors tracking-widest uppercase cursor-pointer"
        >
          ← Prologue
        </button>

        <button
          onClick={() => {
            soundEngine.playParchmentUnroll();
            onNext();
          }}
          className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-500/25 via-gold-500/45 to-gold-600/25 hover:from-gold-500/40 hover:to-gold-500/60 border border-gold-400/70 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>The Chapters of Us →</span>
        </button>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 select-none animate-fade-in"
        >
          <div className="relative max-w-lg w-full flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-9 right-0 text-gold-300 text-xs font-serif px-2.5 py-0.5 rounded-full border border-gold-500/30 bg-forest-950/80 cursor-pointer"
            >
              ✕ Close
            </button>
            <img
              src={activeMemory.src}
              alt={activeMemory.title}
              onError={(e) => {
                e.target.src = activeMemory.fallback;
              }}
              className="max-w-full max-h-[70vh] object-contain rounded-xl border border-gold-400/40 shadow-2xl"
            />
            <div className="mt-3 text-center">
              <h4 className="font-serif text-sm text-gold-300 font-bold">
                {activeMemory.title}
              </h4>
              <p className="font-serif italic text-[11px] text-champagne-300/80 max-w-xs mx-auto mt-0.5">
                {activeMemory.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
