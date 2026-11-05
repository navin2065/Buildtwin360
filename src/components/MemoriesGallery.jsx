import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import { soundEngine } from '../utils/audio';

export default function MemoriesGallery({ onNext }) {
  const allMemories = EXPERIENCE_CONFIG.galleryMemories || [];
  const categories = EXPERIENCE_CONFIG.galleryCategories || [];

  // State: Brief introduction screen before gallery
  const [showIntro, setShowIntro] = useState(true);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-dismiss short introduction after 2.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter memories based on active category
  const filteredMemories = selectedCategory === 'All'
    ? allMemories
    : allMemories.filter((mem) => mem.category === selectedCategory);

  // Continuous right-to-left rotation every ~1.8 seconds (pausable on hover/touch)
  useEffect(() => {
    if (isPaused || showIntro || filteredMemories.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredMemories.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPaused, showIntro, filteredMemories.length]);

  const handleNext = () => {
    soundEngine.playCardClick();
    setCurrentIndex((prev) => (prev + 1) % filteredMemories.length);
  };

  const handlePrev = () => {
    soundEngine.playCardClick();
    setCurrentIndex((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length);
  };

  const handleCategorySelect = (catKey) => {
    soundEngine.playCardClick();
    setSelectedCategory(catKey);
    setCurrentIndex(0);
  };

  // Touch Swipe for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeMemory = filteredMemories[currentIndex] || filteredMemories[0] || allMemories[0];

  return (
    <div
      className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full bg-[#070e0a] text-champagne-100 flex flex-col justify-between items-center py-2 sm:py-4 px-2 sm:px-6 select-none overflow-hidden z-30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with Dark Forest Tint and Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: SHORT GALLERY INTRODUCTION (NO "MEMORIES" / "CHAPTER" HEADINGS)
          ───────────────────────────────────────────────────────────── */}
      {showIntro ? (
        <div
          onClick={() => setShowIntro(false)}
          className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 my-auto cursor-pointer animate-fade-in"
        >
          <div className="w-14 h-14 rounded-full border border-gold-400/40 bg-forest-950/80 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="font-cinzel text-xl text-gold-300 font-bold">A</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-champagne-100 font-bold tracking-tight text-glow-gold mb-2">
            Moments of Arunadevi
          </h2>

          <p className="font-serif italic text-xs sm:text-sm text-champagne-300/80 max-w-sm mx-auto leading-relaxed">
            "Every photograph holds a quiet story we will cherish forever."
          </p>

          <span className="text-[10px] font-cinzel text-gold-400/70 uppercase tracking-widest mt-6 animate-pulse">
            Entering Collection...
          </span>
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────
              1. GALLERY HEADER & MINIMAL CATEGORY FILTERS
              ───────────────────────────────────────────────────────── */}
          <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0 w-full max-w-xl mx-auto">
            <h2 className="font-serif text-base sm:text-xl text-champagne-100 font-bold tracking-tight text-glow-gold mb-2">
              Moments of Arunadevi
            </h2>

            {/* Category Filter Pills (Horizontally Scrollable on Mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-serif whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-gold-500/40 via-gold-400/50 to-gold-600/40 border border-gold-400 text-gold-200 shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105 font-semibold'
                        : 'bg-forest-950/70 border border-gold-500/20 text-champagne-300/70 hover:border-gold-500/40 hover:text-champagne-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </header>

          {/* ─────────────────────────────────────────────────────────
              2. 90-DEGREE PERSPECTIVE ROTATING GALLERY (REFERENCE MATCH)
              ───────────────────────────────────────────────────────── */}
          <main className="relative z-20 w-full my-auto flex flex-col items-center justify-center">
            {/* 3D Perspective Stage */}
            <div
              style={{
                perspective: isMobile ? '800px' : '1200px',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-[310px] xs:h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center overflow-visible"
            >
              {filteredMemories.map((mem, index) => {
                const n = filteredMemories.length;
                let offset = (index - currentIndex + n) % n;
                if (offset > n / 2) offset -= n;

                const isVisible = Math.abs(offset) <= 3;
                if (!isVisible) return null;

                const xOffset = isMobile ? offset * 115 : offset * 210;
                const zOffset = -Math.abs(offset) * (isMobile ? 85 : 140);
                const yRotate = -offset * (isMobile ? 38 : 45);
                const scale = Math.max(0.6, 1 - Math.abs(offset) * (isMobile ? 0.15 : 0.12));
                const opacity = offset === 0 ? 1 : Math.max(0.2, 0.85 - Math.abs(offset) * 0.28);
                const zIndex = 30 - Math.abs(offset) * 5;

                const isCenter = offset === 0;

                return (
                  <div
                    key={mem.id}
                    onClick={() => {
                      if (!isCenter) {
                        soundEngine.playCardClick();
                        setCurrentIndex(index);
                      }
                    }}
                    style={{
                      transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${yRotate}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      transition: 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.75s ease',
                      willChange: 'transform, opacity',
                    }}
                    className={`absolute w-[210px] xs:w-[230px] sm:w-[280px] md:w-[320px] h-[280px] xs:h-[310px] sm:h-[370px] md:h-[410px] rounded-2xl overflow-hidden cursor-pointer ${
                      isCenter
                        ? 'ring-2 ring-gold-400 shadow-[0_0_35px_rgba(212,175,55,0.65),0_20px_50px_rgba(0,0,0,0.9)]'
                        : 'shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-white/10 brightness-75'
                    }`}
                  >
                    {/* Image with Direct Filename Path */}
                    <img
                      src={mem.src}
                      alt={mem.tag || mem.category}
                      className="w-full h-full object-cover object-center bg-stone-900 pointer-events-none"
                      onError={(e) => {
                        // Fallback alias if needed
                        e.target.src = `./images/${encodeURIComponent(mem.filename)}`;
                      }}
                    />

                    {/* Gradient overlay inside card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    {/* Badge inside card */}
                    <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/40 text-[9px] font-sans font-semibold text-cyan-200 backdrop-blur-md mb-1 shadow-xs">
                        <span className="text-cyan-400">✦</span>
                        <span>{mem.tag || mem.category}</span>
                      </div>
                      <p className="font-serif text-[11px] sm:text-xs text-champagne-200/90 leading-tight line-clamp-2 drop-shadow-md">
                        {mem.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Caption & Index Underneath */}
            <div className="relative z-20 text-center mt-1 sm:mt-2 px-4 max-w-md mx-auto">
              <h3 className="font-serif font-bold text-sm sm:text-base text-gold-300 drop-shadow-sm">
                {activeMemory?.tag || activeMemory?.category}
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-champagne-200/90 leading-snug line-clamp-2 mt-0.5">
                "{activeMemory?.caption}"
              </p>

              {/* Sleek Counter & Progress Track */}
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span className="font-mono text-[10px] text-gold-400/80 tracking-widest uppercase">
                  {currentIndex + 1} / {filteredMemories.length}
                </span>
                <div className="w-24 sm:w-32 h-1 bg-gold-500/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / filteredMemories.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </main>

          {/* ─────────────────────────────────────────────────────────
              3. BOTTOM NAVIGATION: DIRECT TO LETTER UI
              ───────────────────────────────────────────────────────── */}
          <footer className="relative z-20 flex items-center justify-between w-full max-w-sm sm:max-w-md pt-1 pb-1 shrink-0 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-forest-950/80 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-forest-950/80 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next image"
              >
                →
              </button>
            </div>

            <button
              onClick={() => {
                soundEngine.playParchmentUnroll();
                onNext?.();
              }}
              className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-gold-600/30 hover:from-gold-500/50 hover:to-gold-500/70 border border-gold-400 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Read My Letter →</span>
              <span>✉️</span>
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
