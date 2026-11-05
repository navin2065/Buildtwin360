import React from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen2Prologue({ onNext, onBack }) {
  const { prologue, recipient } = EXPERIENCE_CONFIG;

  const handleContinue = () => {
    soundEngine.playParchmentUnroll();
    onNext();
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center py-3 sm:py-6 px-3 sm:px-6 select-none overflow-hidden z-30">
      {/* Background with Dark Forest Tint and Golden Stardust */}
      <div className="fixed inset-0 bg-[#070e0a] bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_100%)] pointer-events-none" />
      <GoldenButterflies count={8} interactive={false} />

      {/* Top Header / Chapter Breadcrumb */}
      <header className="relative z-20 text-center animate-fade-in pt-1">
        <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-gold-400 uppercase font-semibold">
          {prologue.chapterNumber}
        </span>
        <h2 className="font-serif text-lg sm:text-2xl text-champagne-100 font-bold tracking-wide mt-0.5">
          {prologue.chapterTitle}
        </h2>
      </header>

      {/* Center Storybook Illuminated Parchment Card */}
      <main className="relative z-20 max-w-lg w-full my-auto py-2 animate-page-turn">
        <div className="relative rounded-2xl glass-card-forest p-5 sm:p-8 border border-gold-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-1.5 left-2 text-gold-400/50 font-serif text-sm select-none">╔</div>
          <div className="absolute top-1.5 right-2 text-gold-400/50 font-serif text-sm select-none">╗</div>
          <div className="absolute bottom-1.5 left-2 text-gold-400/50 font-serif text-sm select-none">╚</div>
          <div className="absolute bottom-1.5 right-2 text-gold-400/50 font-serif text-sm select-none">╝</div>

          {/* Dedication Header */}
          <div className="text-center mb-3">
            <span className="font-script text-3xl sm:text-4xl text-gold-300 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
              {recipient.preferredName}
            </span>
            <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] text-champagne-300/70 uppercase mt-0.5">
              {prologue.dedication}
            </p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto mt-2" />
          </div>

          {/* Core Opening Quote */}
          <blockquote className="font-serif italic text-xs sm:text-sm md:text-base text-champagne-100 text-center leading-relaxed drop-shadow-sm mb-3 sm:mb-4 px-2">
            "{prologue.quote}"
          </blockquote>

          {/* Thoughtful Prose from Younger Brother */}
          <p className="font-serif text-[11px] sm:text-xs text-champagne-300/85 text-center leading-relaxed font-light mb-5 max-w-md mx-auto">
            {prologue.body}
          </p>

          {/* Interactive Button: Turn the Page */}
          <div className="flex items-center justify-center pt-1">
            <button
              onClick={handleContinue}
              className="px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-gold-500/25 via-gold-500/40 to-gold-600/25 hover:from-gold-500/40 hover:to-gold-500/60 border border-gold-400/70 text-champagne-100 font-serif tracking-[0.14em] uppercase text-[11px] sm:text-xs font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{prologue.buttonText}</span>
              <span className="text-gold-300 text-xs">📖</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Back Button */}
      <footer className="relative z-20 text-center pb-2">
        <button
          onClick={onBack}
          className="text-[10px] sm:text-xs font-serif text-gold-400/60 hover:text-gold-300 transition-colors tracking-widest uppercase cursor-pointer"
        >
          ← Return to Secret Word
        </button>
      </footer>
    </div>
  );
}
