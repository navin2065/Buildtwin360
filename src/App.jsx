import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Screen1Opening from './components/Screen1Opening';
import SurpriseLoader from './components/SurpriseLoader';
import MemoriesGallery from './components/MemoriesGallery';
import EnvelopeLetter from './components/EnvelopeLetter';
import BirthdaySurpriseCelebration from './components/BirthdaySurpriseCelebration';
import { soundEngine } from './utils/audio';

export default function App() {
  /**
   * The Strict 8-Stage Sequential Birthday Surprise Journey:
   * 1. 'OPENING'     – Contact Question Screen ("aruna akkow" secret word)
   * 2. 'LOADING'     – Existing Editorial Surprise Loader (0% - 100%)
   * 3. 'GALLERY'     – 90° 3D perspective rotating memories gallery (MEM1 - MEM20)
   * 4. 'LETTER'      – Existing unrolling parchment letter with character typewriter
   * 5-8. 'CELEBRATION' – Handled sequentially in BirthdaySurpriseCelebration:
   *      5. Birthday Surprise Screen ("BLOW THE CANDLE", video hidden)
   *      6. 3:4 Vertical Video Playback (candle.mp4 + 10 floating marginal photos)
   *      7. Grandfather Tribute (character typewriter + smooth auto-scroll)
   *      8. Final "Crafted by your brother, Naveen" typewriter footer
   */
  const [stage, setStage] = useState('OPENING');

  const handleOpeningSuccess = () => {
    setStage('LOADING');
  };

  const handleLoadingComplete = () => {
    setStage('GALLERY');
  };

  const handleGalleryNext = () => {
    setStage('LETTER');
  };

  const handleLetterNext = () => {
    setStage('CELEBRATION');
  };

  const handleRestart = () => {
    soundEngine.stopBirthdaySong();
    setStage('OPENING');
  };

  return (
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full bg-[#070e0a] text-champagne-100 font-sans select-none overflow-hidden">
      {/* 1. Global Magical Butterfly Stardust Pointer */}
      <CustomCursor />

      {/* ─────────────────────────────────────────────────────────────
          THE MANDATORY SEQUENTIAL BIRTHDAY EXPERIENCE
          ───────────────────────────────────────────────────────────── */}
      {stage === 'OPENING' && (
        <Screen1Opening onEnter={handleOpeningSuccess} />
      )}

      {stage === 'LOADING' && (
        <SurpriseLoader onLoaded={handleLoadingComplete} />
      )}

      {stage === 'GALLERY' && (
        <MemoriesGallery onNext={handleGalleryNext} />
      )}

      {stage === 'LETTER' && (
        <EnvelopeLetter onNext={handleLetterNext} />
      )}

      {stage === 'CELEBRATION' && (
        <BirthdaySurpriseCelebration onRestart={handleRestart} />
      )}
    </div>
  );
}
