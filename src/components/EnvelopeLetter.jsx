import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

// Realistic Traditional Golden Quill / Pen with Sparkling Writing Point
const PenWritingIndicator = () => (
  <span className="inline-flex items-center align-baseline ml-1 pointer-events-none select-none">
    <span className="relative inline-block animate-bounce">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 fill-amber-300 stroke-[#8f6e1b] inline-block -rotate-45 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]"
      >
        <path
          d="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-1.5 M3 21l3-1 11-11-2-2L4 18l-1 3z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute -top-1.5 -right-1.5 text-[9px] text-amber-200 animate-ping">✨</span>
      <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-gold-400 blur-xs animate-pulse" />
    </span>
  </span>
);

export default function EnvelopeLetter({ onNext }) {
  const { recipient, letterSections } = EXPERIENCE_CONFIG;

  /**
   * Automatic Traditional Pen-Writing Letter:
   * - Starts immediately upon opening (no extra clicks)
   * - Character-by-character typewriter with active pen-writing & sparkles
   * - Fixed ivory parchment (#faf6ee) & forest/golden background
   * - Internal vertical scroll only
   */
  const [visibleChars, setVisibleChars] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const scrollRef = useRef(null);

  // Total characters across all letter sections
  const totalCharacters = letterSections.reduce((sum, sec) => sum + sec.text.length, 0);
  const isTypingDone = visibleChars >= totalCharacters;

  // Start sound on load
  useEffect(() => {
    soundEngine.playBellChime();
  }, []);

  // Character-by-character typewriter animation (~22ms per character for human warmth)
  useEffect(() => {
    if (isTypingDone) return;

    const timer = setTimeout(() => {
      setVisibleChars((prev) => prev + 1);

      // Smoothly auto-scroll internal text container
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 22);

    return () => clearTimeout(timer);
  }, [visibleChars, isTypingDone]);

  // Tap on parchment to reveal full letter immediately
  const handleSkipTyping = () => {
    setVisibleChars(totalCharacters);
  };

  // Transition to Birthday Surprise (Ensuring silence for waiting screen)
  const handleContinue = () => {
    soundEngine.stopBirthdaySong();
    soundEngine.playCardClick();
    setIsExiting(true);
    setTimeout(() => {
      onNext?.();
    }, 500);
  };

  // Render paragraphs character-by-character
  const renderLetterContent = () => {
    let charsLeft = visibleChars;

    return letterSections.map((section) => {
      const textLen = section.text.length;
      const showCount = Math.min(charsLeft, textLen);
      charsLeft = Math.max(0, charsLeft - textLen);

      if (showCount === 0) return null;

      const displayedText = section.text.slice(0, showCount);
      const isCurrentlyTyping = showCount < textLen && showCount > 0;

      // Greeting: "My dear Akka,"
      if (section.type === 'greeting') {
        return (
          <div key={section.id} className="pt-1 pb-1">
            <h3 className="font-serif font-black text-lg sm:text-xl md:text-2xl text-[#2a1708] tracking-tight">
              {displayedText}
              {isCurrentlyTyping && <PenWritingIndicator />}
            </h3>
          </div>
        );
      }

      // Sibling Banter Note
      if (section.type === 'banter') {
        return (
          <p
            key={section.id}
            className="font-serif italic text-[11px] sm:text-xs text-[#6e4e2e] leading-relaxed pt-2 border-t border-[#d4af37]/25"
          >
            {displayedText}
            {isCurrentlyTyping && <PenWritingIndicator />}
          </p>
        );
      }

      // Closing Highlight: “Happy Birthday, Akka ❤️”
      if (section.type === 'closing') {
        return (
          <div key={section.id} className="pt-2 text-right">
            <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-[#8f6e1b] font-bold tracking-wide">
              {displayedText}
              {isCurrentlyTyping && <PenWritingIndicator />}
            </p>
          </div>
        );
      }

      // Signoff: "Your Thambi, NAVIN"
      if (section.type === 'signoff') {
        return (
          <div key={section.id} className="text-right font-serif text-[11px] sm:text-xs text-[#5a4228] font-semibold tracking-wide">
            {displayedText}
            {isCurrentlyTyping && <PenWritingIndicator />}
          </div>
        );
      }

      // Classic Body Paragraphs
      return (
        <p
          key={section.id}
          className="font-serif text-[11px] sm:text-xs md:text-sm text-[#261b14] leading-[1.65] font-normal text-justify"
        >
          {displayedText}
          {isCurrentlyTyping && <PenWritingIndicator />}
        </p>
      );
    });
  };

  return (
    <div
      className={`fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-2 sm:py-4 px-3 sm:px-6 select-none overflow-hidden z-30 transition-all duration-700 ease-in-out ${
        isExiting ? 'scale-90 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Background with Dark Forest Tint and Golden Stardust (NO RED UI) */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />
      <GoldenButterflies count={10} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0 w-full">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          Words from the Heart
        </span>
        <h2 className="font-serif text-lg sm:text-2xl text-champagne-100 font-bold tracking-tight mt-0.5 text-glow-gold">
          A Letter For Arunadevi
        </h2>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. FIXED SINGLE-PAGE FINE PARCHMENT LETTER WITH PEN-WRITING
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 w-full max-w-lg my-auto py-1 flex flex-col items-center justify-center">
        <div
          onClick={handleSkipTyping}
          title="Tap to reveal full letter"
          className="relative w-full rounded-2xl bg-[#faf6ee] text-[#1b120c] p-4 xs:p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-3 border-[#d4af37]/60 animate-fade-in flex flex-col justify-between cursor-pointer min-h-[360px] xs:min-h-[400px] sm:min-h-[460px] max-h-[70dvh]"
        >
          {/* Fine Paper Top Header (Stationary) */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-2 mb-2 shrink-0">
            <div>
              <span className="font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8f6e1b] font-bold">
                {recipient.preferredName}’s Birthday • {recipient.dob}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-cinzel text-[9px] text-[#8f6e1b] font-semibold bg-[#8f6e1b]/10 px-2 py-0.5 rounded-full">
                Letter from NAVIN
              </span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8a1c2a] to-[#3d0810] border border-[#d4af37] flex items-center justify-center shadow-xs">
                <span className="font-cinzel text-[9px] text-gold-200 font-black">A</span>
              </div>
            </div>
          </div>

          {/* Scrollable Letter Body (Internal Scroll Only - Background & Paper Remain Stationary) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pr-1 select-text space-y-2.5 my-1"
          >
            {renderLetterContent()}
          </div>

          {/* Subtle Gradient Shadow Indicator at Paper Bottom */}
          <div className="h-4 bg-gradient-to-t from-[#faf6ee] to-transparent pointer-events-none -mt-4 shrink-0" />
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM NAVIGATION: TO BIRTHDAY SURPRISE
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 flex items-center justify-center w-full max-w-lg pt-1 pb-1 shrink-0 px-1">
        <button
          onClick={handleContinue}
          className={`px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-gold-600/30 hover:from-gold-500/50 hover:to-gold-500/70 border border-gold-400 text-champagne-100 font-serif tracking-[0.14em] uppercase text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isTypingDone ? 'animate-pulse ring-2 ring-gold-400/50' : ''
          }`}
        >
          <span>Continue to Birthday Surprise →</span>
          <span>✨</span>
        </button>
      </footer>
    </div>
  );
}
