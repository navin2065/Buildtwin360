import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Screen1Opening({ onEnter }) {
  const { secretEntry } = EXPERIENCE_CONFIG;

  const [inputWord, setInputWord] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showHint, setShowHint] = useState(false); // Hint remains hidden initially
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showButterflyAnimation, setShowButterflyAnimation] = useState(false);
  const [bookBlooming, setBookBlooming] = useState(false);

  // Start pleasant birthday music on first user interaction (respecting browser autoplay policies)
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundEngine.init();
      soundEngine.playBirthdaySong('./birthday-piano.mp3');
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Validate answer: ONLY "aruna akkow" (case-insensitive & whitespace trimmed)
  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    if (isUnlocking) return;

    soundEngine.init();
    soundEngine.playBirthdaySong('./birthday-piano.mp3');

    const cleanedInput = inputWord.trim().toLowerCase();
    const primaryWord = (secretEntry.secretWord || 'aruna akkow').trim().toLowerCase();
    const acceptedList = (secretEntry.acceptedWords || ['aruna akkow']).map((w) =>
      w.trim().toLowerCase()
    );

    const isMatch = cleanedInput === primaryWord || acceptedList.includes(cleanedInput);

    if (isMatch && cleanedInput.length > 0) {
      // 1. Correct: Start magical unlocking sequence
      setHasError(false);
      setIsUnlocking(true);
      setShowButterflyAnimation(true);

      // Play bell chime & continue opening soundtrack
      soundEngine.playBellChime();

      // 2. Butterfly flies gracefully into the glowing open book (1s)
      setTimeout(() => {
        setBookBlooming(true);
      }, 1000);

      // 3. Cinematic page-opening transition into next chapter (2s)
      setTimeout(() => {
        onEnter();
      }, 2000);
    } else {
      // 4. Incorrect: show error message with unlimited retries
      setHasError(true);
      soundEngine.playCardClick();
    }
  };

  const handleInputChange = (e) => {
    setInputWord(e.target.value);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] overflow-hidden select-none flex flex-col items-center justify-center z-30 px-3">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC MAGICAL FOREST BACKGROUND
          Uses /chapter-forest.png with slow Ken Burns breathing zoom
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={secretEntry.backgroundImage || './chapter-forest.png'}
          alt="The Magical Storybook Forest"
          className="w-full h-full object-cover object-center scale-100 animate-zoom-slow brightness-90 contrast-105"
        />

        {/* Cinematic Vignette & Ambient Darkness */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0.15)_0%,rgba(5,10,7,0.72)_70%,rgba(3,6,4,0.95)_100%] pointer-events-none" />

        {/* Golden Central Aura behind the Glowing Open Book */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[360px] bg-gold-500/15 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING GOLDEN BUTTERFLIES & STARDUST CANVAS
          ───────────────────────────────────────────────────────────── */}
      <GoldenButterflies count={14} interactive={!isUnlocking} />

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN "WELCOME TO YOUR BIRTHDAY SURPRISE" CARD COMPOSITION
          Clean, minimal, luxurious, and distraction-free
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-lg w-full mx-auto my-auto py-2">
        
        {/* Glowing Open-Book Composition */}
        <div className="relative mb-3 sm:mb-4 flex flex-col items-center justify-center">
          {/* Radiant Glow Ring behind the Book */}
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gold-400/20 blur-2xl absolute -z-10 transition-all duration-700 ${
              bookBlooming ? 'scale-175 bg-gold-400/50' : 'scale-100'
            }`}
          />

          {/* Open Storybook Vector Illustration with Gold Illumination */}
          <div
            className={`transition-transform duration-700 ${
              bookBlooming ? 'animate-book-bloom' : 'animate-float-slow'
            }`}
          >
            <svg
              viewBox="0 0 100 80"
              className="w-20 h-16 sm:w-24 sm:h-20 filter drop-shadow-[0_0_18px_rgba(245,215,120,0.75)]"
            >
              {/* Golden Outer Book Cover */}
              <path
                d="M 50 68 Q 28 62 8 72 L 8 20 Q 28 12 50 18 Q 72 12 92 20 L 92 72 Q 72 62 50 68 Z"
                fill="#172e23"
                stroke="#d4af37"
                strokeWidth="1.5"
              />
              {/* Left Pages (Illuminated Parchment) */}
              <path
                d="M 50 64 Q 30 58 12 67 L 12 18 Q 30 10 50 16 Z"
                fill="#fbf7ee"
                opacity="0.95"
              />
              {/* Right Pages (Illuminated Parchment) */}
              <path
                d="M 50 64 Q 70 58 88 67 L 88 18 Q 70 10 50 16 Z"
                fill="#fbf7ee"
                opacity="0.95"
              />
              {/* Spine Shimmer */}
              <line
                x1="50"
                y1="16"
                x2="50"
                y2="66"
                stroke="#d4af37"
                strokeWidth="2"
              />
              {/* Delicate Gold Page Lines */}
              <line x1="20" y1="28" x2="42" y2="28" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
              <line x1="20" y1="36" x2="42" y2="36" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
              <line x1="20" y1="44" x2="38" y2="44" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
              <line x1="58" y1="28" x2="80" y2="28" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
              <line x1="58" y1="36" x2="80" y2="36" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
              <line x1="58" y1="44" x2="76" y2="44" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SPECIAL UNLOCKING GOLDEN BUTTERFLY (Flies into the Book)
              ───────────────────────────────────────────────────────── */}
          {showButterflyAnimation && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 animate-butterfly-flight">
              <div className="relative flex items-center justify-center">
                {/* Golden Luminescent Glow */}
                <div className="absolute w-12 h-12 rounded-full bg-gold-400/40 blur-md pointer-events-none" />

                {/* Golden Butterfly 3D Flutter */}
                <div className="butterfly-perspective flex items-center">
                  <div className="wing-left">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gold-400 stroke-amber-200">
                      <path d="M12 12 C6 6, 2 8, 4 16 C6 18, 9 16, 12 12 Z" />
                    </svg>
                  </div>
                  <div className="wing-right">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gold-400 stroke-amber-200">
                      <path d="M12 12 C18 6, 22 8, 20 16 C18 18, 15 16, 12 12 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Minimal Interactive Card */}
        <div
          className={`relative w-full rounded-2xl glass-card-forest p-6 sm:p-8 border border-gold-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 ${
            hasError ? 'animate-shake border-red-500/50' : ''
          }`}
        >
          {/* Main Heading: "Welcome to Your Birthday Surprise" */}
          {/* Main Heading: Turn the Page */}
<h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-champagne-100 tracking-tight text-glow-gold mb-6">
  Turn the Page...
</h1>

          {/* ─────────────────────────────────────────────────────────
              PASSWORD INPUT & CONTINUE BUTTON
              ───────────────────────────────────────────────────────── */}
          <form onSubmit={handleUnlock} className="flex flex-col items-center gap-3.5 max-w-sm mx-auto w-full">
            <div className="relative w-full">
              <input
                type="text"
                value={inputWord}
                onChange={handleInputChange}
                disabled={isUnlocking}
                placeholder="Enter the Special Word"
                aria-label="Enter the Special Word"
                autoFocus
                autoComplete="off"
                className={`w-full px-5 py-3 sm:py-3.5 rounded-full bg-forest-950/80 text-champagne-100 placeholder-champagne-300/40 text-center font-serif text-sm sm:text-base border transition-all duration-300 outline-none backdrop-blur-md shadow-inner ${
                  hasError
                    ? 'border-red-400/70 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'border-gold-500/40 focus:border-gold-400 focus:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                }`}
              />
            </div>

            {/* Hint Trigger Button (Hidden initially, appears only when clicked) */}
            <div className="w-full text-center">
              {!showHint ? (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playCardClick();
                    setShowHint(true);
                  }}
                  className="text-xs font-serif text-gold-400/80 hover:text-gold-300 transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Need a Hint?
                </button>
              ) : (
                <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-400/30 animate-fade-in max-w-xs mx-auto">
                  <p className="font-serif text-xs text-gold-200 leading-snug">
                    Type how I have saved your contact in my mobile.
                  </p>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="relative group w-full mt-1">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-600 opacity-60 group-hover:opacity-100 blur-md transition duration-500 group-hover:scale-105 pointer-events-none" />

              <button
                type="submit"
                disabled={isUnlocking}
                className="relative w-full px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2c0e18]/90 via-[#1b120c]/95 to-[#0e1d15]/90 hover:from-[#3a1320] hover:to-[#172e22] text-champagne-100 font-serif tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold border-2 border-gold-400/80 shadow-[inset_0_1px_8px_rgba(243,225,166,0.3),0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="text-gold-300 group-hover:text-gold-200 transition-colors">
                  {isUnlocking ? 'Opening Story...' : 'Continue'}
                </span>
                <span className="text-gold-400 text-sm animate-pulse">✦</span>
              </button>
            </div>
          </form>

          {/* ─────────────────────────────────────────────────────────
              ERROR STATE
              ───────────────────────────────────────────────────────── */}
          {hasError && (
            <div className="mt-3 p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 animate-fade-in text-center">
              <p className="font-serif text-xs text-rose-200/90 leading-snug">
                Not quite... Check the hint below!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          4. CINEMATIC PAGE-OPENING TRANSITION OVERLAY
          ───────────────────────────────────────────────────────────── */}
      {isUnlocking && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-forest-950/95 via-gold-600/35 to-forest-950/98 backdrop-blur-md transition-opacity duration-1000 opacity-100 flex flex-col items-center justify-center animate-portal-expand">
          <div className="text-center animate-pulse">
            <span className="text-gold-200 font-cinzel text-base sm:text-lg tracking-[0.3em] uppercase drop-shadow-md">
              Opening Arunadevi's Story...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
