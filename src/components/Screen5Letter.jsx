import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen5Letter({ onNext, onBack }) {
  const { letter, recipient } = EXPERIENCE_CONFIG;
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [letterPage, setLetterPage] = useState(1);

  const handleUnseal = () => {
    soundEngine.playLetterOpen();
    setIsUnsealed(true);
  };

  const handleNextPage = () => {
    soundEngine.playParchmentUnroll();
    setLetterPage(2);
  };

  const handlePrevPage = () => {
    soundEngine.playParchmentUnroll();
    setLetterPage(1);
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-2 sm:py-5 px-3 sm:px-6 select-none overflow-hidden z-30">
      {/* Background with Dark Forest Tint and Golden Stardust */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />
      <GoldenButterflies count={8} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 text-center animate-fade-in pt-1 shrink-0">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          Chapter III • Words from the Heart
        </span>
        <h2 className="font-serif text-lg sm:text-2xl text-champagne-100 font-bold tracking-tight mt-0.5 text-glow-gold">
          A Letter From My Heart
        </h2>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. THE PARCHMENT LETTER (100% SCROLL-FREE PAGINATED STORYBOOK)
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 w-full max-w-lg my-auto py-1 animate-page-turn flex flex-col items-center justify-center">
        
        {/* Phase A: Wax Sealed Envelope */}
        {!isUnsealed ? (
          <div className="relative rounded-2xl glass-card-forest p-6 sm:p-9 border border-gold-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-center flex flex-col items-center w-full">
            
            {/* Sealed Wax Emblem */}
            <div className="relative mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8a1c2a] via-[#5c0e18] to-[#3d0810] border-2 border-gold-400 shadow-[0_8px_25px_rgba(138,28,42,0.6)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
                <span className="font-cinzel text-xl sm:text-2xl text-gold-300 font-black drop-shadow-md">
                  A
                </span>
              </div>
              <div className="absolute -inset-1.5 rounded-full border border-gold-400/30 animate-pulse pointer-events-none" />
            </div>

            <h3 className="font-serif text-lg sm:text-xl text-gold-200 font-semibold mb-1">
              A Personal Letter for Arunadevi
            </h3>

            <p className="font-serif italic text-xs text-champagne-300/80 max-w-sm mx-auto mb-5">
              "Written with the quiet gratitude that brothers keep deep inside. Tap the wax seal below to open."
            </p>

            <button
              onClick={handleUnseal}
              className="px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-gold-600/30 hover:from-gold-500/50 hover:to-gold-500/70 border border-gold-400 text-champagne-100 font-serif tracking-[0.14em] uppercase text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Break the Seal & Read →</span>
            </button>
          </div>
        ) : (
          /* Phase B: Unsealed 2-Page Fine Parchment Letter */
          <div className="relative w-full rounded-2xl bg-[#faf6ee] text-[#1b120c] p-4 xs:p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-3 border-[#d4af37]/60 animate-fade-in flex flex-col justify-between">
            
            {/* Fine Paper Top Header */}
            <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-2 mb-2.5">
              <div>
                <span className="font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8f6e1b] font-bold">
                  {recipient.preferredName}’s Birthday • {letter.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[9px] text-[#8f6e1b] font-semibold bg-[#8f6e1b]/10 px-2 py-0.5 rounded-full">
                  Page {letterPage} of 2
                </span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8a1c2a] to-[#3d0810] border border-[#d4af37] flex items-center justify-center shadow-xs">
                  <span className="font-cinzel text-[9px] text-gold-200 font-black">A</span>
                </div>
              </div>
            </div>

            {/* PAGE 1 CONTENT */}
            {letterPage === 1 && (
              <div className="flex flex-col justify-between animate-fade-in">
                {/* Salutation */}
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#2a1708] mb-2 tracking-tight">
                  {letter.salutation}
                </h3>

                {/* Paragraphs 1 & 2 */}
                <div className="space-y-2 font-serif text-[11px] sm:text-xs text-[#261b14] leading-[1.65]">
                  <p className="first-letter:text-xl first-letter:font-bold first-letter:text-[#8f6e1b] first-letter:mr-0.5">
                    {letter.paragraphs[0]}
                  </p>
                  <p>
                    {letter.paragraphs[1]}
                  </p>
                  <p>
                    {letter.paragraphs[2]}
                  </p>
                </div>

                {/* Page 1 Turn Button */}
                <div className="mt-3 pt-2 border-t border-[#d4af37]/30 flex justify-end">
                  <button
                    onClick={handleNextPage}
                    className="px-4 py-1.5 rounded-full bg-[#8a1c2a] hover:bg-[#6e1420] text-gold-200 font-serif text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Turn to Page 2</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 2 CONTENT */}
            {letterPage === 2 && (
              <div className="flex flex-col justify-between animate-fade-in">
                {/* Paragraphs 3 & 4 */}
                <div className="space-y-2 font-serif text-[11px] sm:text-xs text-[#261b14] leading-[1.65]">
                  <p>
                    {letter.paragraphs[3]}
                  </p>
                  <p>
                    {letter.paragraphs[4]}
                  </p>
                </div>

                {/* Sibling Closing & Sign-off */}
                <div className="mt-2.5 pt-2 border-t border-[#d4af37]/30 text-right">
                  <p className="font-serif italic text-[10px] text-[#5a4228]">
                    {letter.closing}
                  </p>
                  <p className="font-handwritten text-lg sm:text-xl text-[#8a1c2a] font-bold">
                    {letter.signature}
                  </p>
                </div>

                {/* Postscript & Page 1 Return */}
                <div className="mt-2 pt-1.5 border-t border-dashed border-[#d4af37]/25 flex items-center justify-between">
                  <button
                    onClick={handlePrevPage}
                    className="text-[10px] font-serif text-[#8f6e1b] hover:text-[#5a4228] underline underline-offset-2 cursor-pointer"
                  >
                    ← Page 1
                  </button>
                  <span className="font-serif italic text-[9px] text-[#705333] truncate max-w-[200px]">
                    {letter.postScript}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM NAVIGATION
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 flex items-center justify-between w-full max-w-lg pt-1 pb-1 shrink-0 px-1">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs font-serif text-gold-400/60 hover:text-gold-300 transition-colors tracking-widest uppercase cursor-pointer"
        >
          ← Chapters
        </button>

        <button
          onClick={() => {
            soundEngine.playBellChime();
            onNext();
          }}
          className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-500/25 via-gold-500/45 to-gold-600/25 hover:from-gold-500/40 hover:to-gold-500/60 border border-gold-400/70 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Birthday Wishes →</span>
        </button>
      </footer>
    </div>
  );
}
