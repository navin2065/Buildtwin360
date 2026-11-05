import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen4Chapters({ onNext, onBack }) {
  const { chaptersOfUs } = EXPERIENCE_CONFIG;
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [photoExpanded, setPhotoExpanded] = useState(false);

  const activeChapter = chaptersOfUs[activeChapterIndex] || chaptersOfUs[0];

  const handleSelectChapter = (idx) => {
    soundEngine.playCardClick();
    setActiveChapterIndex(idx);
  };

  const handleNextChapter = () => {
    if (activeChapterIndex < chaptersOfUs.length - 1) {
      soundEngine.playParchmentUnroll();
      setActiveChapterIndex((prev) => prev + 1);
    } else {
      soundEngine.playParchmentUnroll();
      onNext();
    }
  };

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      soundEngine.playCardClick();
      setActiveChapterIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-2 sm:py-5 px-3 sm:px-6 select-none overflow-hidden z-30">
      {/* Background with Dark Forest Tint and Golden Stardust */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.65)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />
      <GoldenButterflies count={10} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION & CHAPTER PILLS
          ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0 w-full max-w-lg">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          Chapter II • Sibling Chronicles
        </span>
        <h2 className="font-serif text-lg sm:text-2xl text-champagne-100 font-bold tracking-tight mt-0.5 text-glow-gold">
          The Chapters of Us
        </h2>

        {/* 5 Chapter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 w-full">
          {chaptersOfUs.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.slug}
                onClick={() => handleSelectChapter(idx)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-gold-500/30 border border-gold-400 text-gold-200 font-semibold shadow-md scale-105'
                    : 'bg-white/5 border border-gold-500/20 text-champagne-300/70 hover:text-white'
                }`}
              >
                <span className="font-cinzel text-[9px] text-gold-400">{ch.numeral}</span>
                <span className="hidden sm:inline">{ch.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CHAPTER SHOWCASE CARD (COMPACT FOR ALL SCREENS)
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 w-full max-w-lg my-auto py-1 animate-page-turn">
        <div className="relative rounded-2xl glass-card-forest p-4 sm:p-6 border border-gold-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
          
          {/* Top Tagline */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-cinzel text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300">
              Chapter {activeChapter.numeral}
            </span>
            <span className="text-[10px] font-serif text-champagne-300/60 uppercase tracking-wider">
              {activeChapter.tagline}
            </span>
          </div>

          {/* Chapter Title */}
          <h3 className="font-serif font-bold text-lg sm:text-2xl text-gold-200 mb-2 tracking-tight">
            {activeChapter.title}
          </h3>

          {/* Middle Layout: Reflection text + Archival Thumbnail */}
          <div className="flex items-center gap-3 sm:gap-4 my-1">
            <div className="flex-1 text-left">
              <p className="font-serif text-[11px] sm:text-xs text-champagne-200/90 leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                {activeChapter.reflection}
              </p>
              
              <div className="border-l-2 border-gold-400/50 pl-2 mt-2 italic text-[10px] sm:text-[11px] text-gold-300/80 font-serif line-clamp-1">
                "{activeChapter.photoCaption}"
              </div>
            </div>

            {/* Photo Thumbnail */}
            <div
              onClick={() => {
                soundEngine.playCardClick();
                setPhotoExpanded(true);
              }}
              className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-black/70 border border-gold-400/40 shadow-md shrink-0 cursor-pointer group"
            >
              <img
                src={activeChapter.photo}
                alt={activeChapter.title}
                onError={(e) => {
                  e.target.src = activeChapter.fallback;
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 right-1 px-1 py-0.2 bg-forest-950/80 rounded text-[8px] text-gold-300">
                🔍
              </div>
            </div>
          </div>

          {/* Stepper Buttons inside card */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gold-500/20">
            <button
              onClick={handlePrevChapter}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px] font-serif transition-colors cursor-pointer"
            >
              ← Prev
            </button>

            <span className="font-cinzel text-[10px] text-gold-400/70">
              {activeChapterIndex + 1} / {chaptersOfUs.length}
            </span>

            <button
              onClick={handleNextChapter}
              className="px-3 py-1 rounded-full bg-gold-500/20 hover:bg-gold-500/35 border border-gold-400/60 text-gold-200 text-[11px] font-serif font-semibold transition-colors cursor-pointer"
            >
              {activeChapterIndex < chaptersOfUs.length - 1 ? 'Next →' : 'Letter →'}
            </button>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM NAVIGATION
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 flex items-center justify-between w-full max-w-lg pt-1 pb-1 shrink-0 px-1">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs font-serif text-gold-400/60 hover:text-gold-300 transition-colors tracking-widest uppercase cursor-pointer"
        >
          ← Memories
        </button>

        <button
          onClick={() => {
            soundEngine.playParchmentUnroll();
            onNext();
          }}
          className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-500/25 via-gold-500/45 to-gold-600/25 hover:from-gold-500/40 hover:to-gold-500/60 border border-gold-400/70 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Letter From My Heart →</span>
        </button>
      </footer>

      {/* Lightbox inspection for Chapter Photo */}
      {photoExpanded && (
        <div
          onClick={() => setPhotoExpanded(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 select-none animate-fade-in"
        >
          <div className="relative max-w-md w-full flex flex-col items-center">
            <button
              onClick={() => setPhotoExpanded(false)}
              className="absolute -top-9 right-0 text-gold-300 text-xs font-serif px-2.5 py-0.5 rounded-full border border-gold-500/30 bg-forest-950/80 cursor-pointer"
            >
              ✕ Close
            </button>
            <img
              src={activeChapter.photo}
              alt={activeChapter.title}
              onError={(e) => {
                e.target.src = activeChapter.fallback;
              }}
              className="max-w-full max-h-[70vh] object-contain rounded-xl border border-gold-400/40 shadow-2xl"
            />
            <p className="mt-2 text-center text-xs font-serif text-gold-300">
              {activeChapter.photoCaption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
