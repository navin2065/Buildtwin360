import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import FallingRibbons from './FallingRibbons';
import GoldenButterflies from './GoldenButterflies';

export default function Screen7Finale({ onRestart, onBack }) {
  const { finale, recipient } = EXPERIENCE_CONFIG;

  // Phases:
  // 1. 'IDLE': Video framed in gold, ready for interaction
  // 2. 'PLAYING': 5-second candle video plays, floating golden blessings appear
  // 3. 'CELEBRATING': Celebration confetti burst, ribbons descend, brother's letter signature types out
  const [phase, setPhase] = useState('IDLE');
  const [showSignature, setShowSignature] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);

  // User clicks "Make a Wish & Blow the Candle"
  const handleBlowCandle = () => {
    if (phase !== 'IDLE') return;
    setPhase('PLAYING');

    // 1. Cut ambient and play birthday soundtrack
    soundEngine.stopAmbientMusic();
    soundEngine.playBirthdaySong('/sound.mp3');

    // 2. Play MP4 video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback if browser requires silent playback
      });
    }

    // Exactly 5 seconds duration
    setTimeout(() => {
      setPhase('CELEBRATING');

      // Golden Celebration Confetti Blast
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#d4af37', '#f3e1a6', '#ffffff', '#224032', '#f5c563'],
      });
      soundEngine.playConfettiPop();

      // Show personal signature after ribbons settle
      setTimeout(() => {
        setShowSignature(true);
      }, 1600);
    }, 5000);
  };

  // Slowly and elegantly type the closing signature
  useEffect(() => {
    if (!showSignature) return;
    let i = 0;
    const signatureText = finale.closingSignature;
    const interval = setInterval(() => {
      i++;
      setTypedText(signatureText.slice(0, i));
      if (i >= signatureText.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [showSignature, finale.closingSignature]);

  const handleReset = () => {
    soundEngine.playCardClick();
    setPhase('IDLE');
    setShowSignature(false);
    setTypedText('');
    soundEngine.stopBirthdaySong();
    soundEngine.startAmbientMusic();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] bg-[#070e0a] text-champagne-100 flex flex-col justify-between items-center pt-2 sm:pt-3 pb-3 sm:pb-5 px-3 select-none overflow-hidden z-40">
      {/* Background Magical Forest Tint & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.65)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />
      <GoldenButterflies count={12} interactive={false} />

      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING CORNER BLESSINGS (ACTIVE ONLY DURING 5-SEC VIDEO)
          Strictly outside center video, never obscuring the cake!
          ───────────────────────────────────────────────────────────── */}
      {phase === 'PLAYING' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Top-Left */}
          <div className="absolute top-[14%] sm:top-[16%] left-[4%] sm:left-[8%] animate-float-tl">
            <span className="font-serif font-bold text-xs sm:text-sm text-gold-300 drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)] whitespace-nowrap">
              ✨ Happy Birthday, {recipient.preferredName} ✨
            </span>
          </div>

          {/* Top-Right */}
          <div className="absolute top-[14%] sm:top-[16%] right-[4%] sm:right-[8%] animate-float-tr">
            <span className="font-script text-base sm:text-2xl text-champagne-100 drop-shadow-[0_2px_12px_rgba(243,225,166,0.85)] whitespace-nowrap">
              🌸 Dearest Sister & Guide 🌸
            </span>
          </div>

          {/* Bottom-Left */}
          <div className="absolute bottom-[20%] sm:bottom-[21%] left-[4%] sm:left-[8%] animate-float-bl">
            <span className="font-script text-base sm:text-2xl text-gold-200 drop-shadow-[0_2px_12px_rgba(212,175,55,0.85)] whitespace-nowrap">
              💖 Forever Our Pride 💖
            </span>
          </div>

          {/* Bottom-Right */}
          <div className="absolute bottom-[20%] sm:bottom-[21%] right-[4%] sm:right-[8%] animate-float-br">
            <span className="font-serif font-bold text-xs sm:text-sm text-champagne-200 drop-shadow-[0_2px_10px_rgba(212,175,55,0.7)] whitespace-nowrap">
              🎂 Born 09 November 2002 🎂
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FALLING PHOTO RIBBONS (CELEBRATING PHASE)
          ───────────────────────────────────────────────────────────── */}
      {phase === 'CELEBRATING' && <FallingRibbons />}

      {/* ─────────────────────────────────────────────────────────────
          3. TOP HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-sm sm:max-w-md w-full mx-auto text-center pt-1 animate-scale-up">
        <div className="inline-flex items-center px-3.5 py-0.5 rounded-full bg-forest-950/80 border border-gold-500/40 text-gold-300 text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-widest mb-1 backdrop-blur-sm">
          <span>{finale.milestoneText}</span>
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md text-glow-gold">
          {phase === 'IDLE' && 'Make A Wish & Blow The Candle'}
          {phase === 'PLAYING' && 'Making Your Birthday Wish... ✨'}
          {phase === 'CELEBRATING' && finale.birthdayHeadline}
        </h2>

        <p className="text-[11px] sm:text-xs text-champagne-300/85 max-w-xs mx-auto mt-0.5 font-light font-serif">
          {phase === 'IDLE' && finale.videoPrompt}
          {phase === 'PLAYING' && 'Blowing out the flame... let the blessings begin!'}
          {phase === 'CELEBRATING' && finale.closingDedication}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CENTERPIECE: REAL MP4 VIDEO IN GOLD FRAME
          Reusing public/candle.mp4
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="relative w-[230px] xs:w-[260px] sm:w-[330px] md:w-[380px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/80 border-2 border-gold-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center">
          
          {!videoError ? (
            <video
              ref={videoRef}
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            >
              <source src={finale.videoSource} type="video/mp4" />
              <source src="/candle.mp4" type="video/mp4" />
              <source src="/cake.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-1">🕯️</span>
              <span className="text-xs font-serif font-bold text-gold-300">
                Candle Celebration Video
              </span>
              <span className="text-[9px] text-champagne-300/60 font-mono mt-1">
                candle.mp4 in public/
              </span>
            </div>
          )}

          {/* Soft inner gold frame border */}
          <div className="absolute inset-0 border border-gold-400/20 rounded-2xl pointer-events-none" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CONTROLS & BROTHER'S TYPED SIGNATURE
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-sm w-full mx-auto text-center flex flex-col items-center justify-end pb-6 sm:pb-4 mb-2 min-h-[85px]">
        {/* Phase 1: Blow Candle Button */}
        {phase === 'IDLE' && (
          <button
            onClick={handleBlowCandle}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 hover:from-gold-400 hover:to-amber-300 text-forest-950 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{finale.blowButtonText}</span>
          </button>
        )}

        {/* Phase 2: Playing Indicator */}
        {phase === 'PLAYING' && (
          <div className="flex items-center gap-2 text-gold-300 font-cinzel text-xs uppercase tracking-widest animate-pulse">
            <span>✨</span>
            <span>Making Birthday Wish...</span>
            <span>✨</span>
          </div>
        )}

        {/* Phase 3: Brother's Typed Signature */}
        {phase === 'CELEBRATING' && (
          <div className="flex flex-col items-center justify-center">
            {showSignature ? (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-handwritten text-xl sm:text-2xl text-gold-300 font-bold tracking-wide drop-shadow-sm leading-tight">
                  {typedText.split('\n')[0] || ''}
                </p>
                {typedText.includes('\n') && (
                  <p className="font-handwritten text-2xl sm:text-3xl text-champagne-100 font-extrabold tracking-wide drop-shadow-md mt-0.5 leading-tight animate-scale-up">
                    {typedText.split('\n')[1]}
                  </p>
                )}
              </div>
            ) : (
              <div className="h-10" />
            )}

            {/* Replay & Restart Navigation */}
            {typedText.length >= finale.closingSignature.length && (
              <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
                <button
                  onClick={handleReset}
                  className="text-xs text-gold-400/80 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Relight / Replay 🕯️
                </button>
                <span className="text-gold-500/30">•</span>
                <button
                  onClick={onBack}
                  className="text-xs text-gold-400/80 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Return to Wishes ✦
                </button>
                <span className="text-gold-500/30">•</span>
                <button
                  onClick={onRestart}
                  className="text-xs text-gold-400/80 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Return to Story Cover 📖
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
