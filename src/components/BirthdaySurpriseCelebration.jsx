import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import GoldenButterflies from './GoldenButterflies';

// Traditional Quill / Pen Indicator with Sparkling Writing Point
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

export default function BirthdaySurpriseCelebration({ onRestart }) {
  const { celebration, grandfatherTribute, footer } = EXPERIENCE_CONFIG;

  /**
   * Sequential Flow:
   * 1. 'READY'           : Silent waiting screen. Clean 9:16 video frame with "SURPRISE".
   *                        NO butterflies, NO autoplay BGM.
   *                        Prominent "BLOW THE CANDLE" button below frame.
   * 2. 'FADING_SURPRISE' : Candle blow sound triggers, "SURPRISE" fades,
   *                        golden butterflies fly across screen, BGM starts.
   * 3. 'PLAYING'         : Full original video plays with object-fit: contain (no cropping);
   *                        6 solo photos orbit in wide oval around frame.
   * 4. 'TRIBUTE'         : Video ends -> Grandfather Tribute AUTOMATICALLY appears
   *                        and types progressively word-by-word with pen indicator & sparkles.
   *                        Followed by character-by-character "Crafted by your Thambi, NAVIN".
   */
  const [phase, setPhase] = useState('READY');
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Word-by-word state for Grandfather Tribute & character state for Footer
  const [typedWords, setTypedWords] = useState(0);
  const [footerChars, setFooterChars] = useState(0);

  const videoRef = useRef(null);
  const tributeContainerRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup BGM on unmount
  useEffect(() => {
    return () => {
      soundEngine.stopBirthdaySong();
    };
  }, []);

  // Grandfather Tribute word-by-word preparation
  const tributeParagraphs = grandfatherTribute.paragraphs || [];
  const tributeClosing = grandfatherTribute.closing || '';

  const paragraphWordArrays = tributeParagraphs.map((p) =>
    p.trim().length > 0 ? p.trim().split(/\s+/) : []
  );
  const closingWordArrays =
    tributeClosing.trim().length > 0 ? tributeClosing.trim().split(/\s+/) : [];

  const totalTributeWords =
    paragraphWordArrays.reduce((sum, words) => sum + words.length, 0) + closingWordArrays.length;

  const footerText = footer.craftedBy || 'Crafted by your Thambi, NAVIN';
  const totalFooterChars = footerText.length;

  const isTributeDone = typedWords >= totalTributeWords;
  const isFooterDone = isTributeDone && footerChars >= totalFooterChars;

  // Selected orbiting photos: ONLY Arunadevi's solo photographs
  const orbitPhotos = celebration.orbitPhotos || [];

  // User clicks "BLOW THE CANDLE"
  const handleBlowCandle = () => {
    if (phase !== 'READY') return;

    // 1. Play candle blow sound
    if (celebration.candleBlowSoundSource) {
      soundEngine.playBirthdaySong(celebration.candleBlowSoundSource);
    } else {
      soundEngine.playCandleBlow();
    }

    // 2. Start configurable video BGM / audio in sync
    const videoBgm = celebration.birthdayVideoBgmSource || celebration.birthdayBgmSource;
    if (videoBgm) {
      soundEngine.playBirthdaySong(videoBgm);
    }

    // 3. Fade "SURPRISE" and trigger golden butterflies
    setPhase('FADING_SURPRISE');

    // 4. Reveal and autoplay complete birthday video
    setTimeout(() => {
      setPhase('PLAYING');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 850);
  };

  // Video complete handler: onEnded -> transition automatically to Grandfather Tribute
  const handleVideoEnded = () => {
    soundEngine.stopBirthdaySong();
    soundEngine.playBellChime();
    setPhase('TRIBUTE');
    setTypedWords(1); // AUTOMATICALLY starts writing immediately
  };

  // Tribute word-by-word typewriter effect (smooth natural handwriting pace: 110ms per word)
  useEffect(() => {
    if (phase !== 'TRIBUTE' || isTributeDone) return;

    const timer = setTimeout(() => {
      setTypedWords((prev) => prev + 1);

      if (tributeContainerRef.current) {
        tributeContainerRef.current.scrollTop = tributeContainerRef.current.scrollHeight;
      }
    }, 110);

    return () => clearTimeout(timer);
  }, [phase, isTributeDone, typedWords]);

  // Footer character-by-character typewriter effect after tribute completes
  useEffect(() => {
    if (!isTributeDone || isFooterDone) return;

    const timer = setTimeout(() => {
      setFooterChars((prev) => prev + 1);
    }, 45);

    return () => clearTimeout(timer);
  }, [isTributeDone, isFooterDone, footerChars]);

  // Tap to reveal full tribute text immediately
  const handleSkipTributeTyping = () => {
    setTypedWords(totalTributeWords);
    setFooterChars(totalFooterChars);
  };

  // Render tribute text progressively word-by-word
  const renderTypedTribute = () => {
    let wordsLeft = typedWords;

    return (
      <div className="space-y-2.5 my-1">
        {paragraphWordArrays.map((words, pIdx) => {
          if (words.length === 0) return null;
          const wordsToShow = Math.min(wordsLeft, words.length);
          wordsLeft = Math.max(0, wordsLeft - words.length);

          if (wordsToShow === 0) return null;
          const text = words.slice(0, wordsToShow).join(' ');
          const isCurrentlyTyping = wordsToShow < words.length && wordsToShow > 0;

          return (
            <p
              key={pIdx}
              className="font-serif text-xs sm:text-sm text-[#261b14] leading-relaxed sm:leading-loose text-justify font-normal"
            >
              {text}
              {isCurrentlyTyping && <PenWritingIndicator />}
            </p>
          );
        })}

        {closingWordArrays.length > 0 && (() => {
          const wordsToShow = Math.min(wordsLeft, closingWordArrays.length);
          if (wordsToShow === 0) return null;
          const text = closingWordArrays.slice(0, wordsToShow).join(' ');
          const isCurrentlyTyping = wordsToShow < closingWordArrays.length;

          return (
            <div className="pt-3 text-center">
              <p className="font-serif italic text-xs sm:text-sm text-[#8f6e1b] font-semibold tracking-wide leading-relaxed">
                "{text}"
                {isCurrentlyTyping && <PenWritingIndicator />}
              </p>
            </div>
          );
        })()}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] bg-[#070e0a] text-champagne-100 flex flex-col justify-between items-center select-none overflow-hidden z-40">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,46,35,0.7)_0%,rgba(5,10,7,0.98)_95%)] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          BUTTERFLY ANIMATION — STRICTLY TRIGGER ONLY AFTER BLOW THE CANDLE
          In READY phase: completely absent.
          After clicking: flies naturally across screen behind video frame (z-10).
          ───────────────────────────────────────────────────────────── */}
      {phase !== 'READY' && (
        <GoldenButterflies
          count={isMobile ? 12 : 18}
          interactive={false}
          className="fixed inset-0 pointer-events-none z-10 w-full h-full"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGES 5 & 6: VIDEO FRAME (SURPRISE REVEAL & PLAYBACK)
          Preserves complete original video frame with object-fit: contain.
          No cropping of cake, faces, or hands.
          ───────────────────────────────────────────────────────────── */}
      {phase !== 'TRIBUTE' && (
        <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-2 sm:py-4 px-3 max-w-lg mx-auto animate-fade-in">
          
          {/* Subtle Header */}
          <div className="text-center pt-1 shrink-0">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-gold-400 uppercase font-semibold">
              Birthday Surprise
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              CENTER CONTAINER: COMPLETE VIDEO FRAME + ORBITING PHOTOS
              ───────────────────────────────────────────────────────── */}
          <div className="relative my-auto flex items-center justify-center w-full">
            
            {/* ─────────────────────────────────────────────────────
                CIRCULAR / ELLIPTICAL ORBITING PHOTOS
                Generous radius around video frame, never overlapping video.
                Strictly Arunadevi's solo photographs.
                ───────────────────────────────────────────────────── */}
            {phase === 'PLAYING' && (
              <div
                className="absolute rounded-full pointer-events-none z-10 flex items-center justify-center animate-orbit"
                style={{
                  width: isMobile ? '350px' : '480px',
                  height: isMobile ? '350px' : '480px',
                }}
              >
                {orbitPhotos.map((photo, i) => {
                  const angle = (i * 360) / orbitPhotos.length;
                  const radiusX = isMobile ? 138 : 205;
                  const radiusY = isMobile ? 218 : 285;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(radiusX * Math.cos(rad));
                  const y = Math.round(radiusY * Math.sin(rad));

                  return (
                    <div
                      key={photo.id}
                      style={{
                        transform: `translate3d(${x}px, ${y}px, 0)`,
                      }}
                      className="absolute w-10 h-13 xs:w-11 xs:h-14 sm:w-13 sm:h-16 rounded-xl overflow-hidden border border-gold-400/80 shadow-[0_4px_16px_rgba(0,0,0,0.85)] bg-stone-900 pointer-events-none"
                    >
                      <div className="w-full h-full animate-orbit-counter">
                        <img
                          src={photo.src}
                          alt="Memory"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────
                THE COMPLETE 9:16 (478x850) ORIGINAL VIDEO CONTAINER
                Using object-contain to display 100% of the video frame.
                Zero cropping of top, bottom, cake, or faces.
                ───────────────────────────────────────────────────── */}
            <div className="relative z-20 w-auto max-w-[80vw] xs:max-w-[74vw] sm:max-w-[320px] h-[52dvh] xs:h-[56dvh] sm:h-[62dvh] max-h-[520px] aspect-[478/850] rounded-2xl overflow-hidden bg-black/95 border-2 border-gold-400/80 shadow-[0_0_45px_rgba(212,175,55,0.45),0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center">
              
              {/* REAL VIDEO PLAYER (Full frame, object-contain, centered) */}
              {!videoError ? (
                <video
                  ref={videoRef}
                  playsInline
                  webkit-playsinline="true"
                  controls={false}
                  onEnded={handleVideoEnded}
                  onError={() => {
                    setVideoError(true);
                    setTimeout(handleVideoEnded, 5000);
                  }}
                  className={`w-full h-full object-contain transition-opacity duration-700 ${
                    phase === 'PLAYING' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <source src={celebration.videoSource || './candle.mp4'} type="video/mp4" />
                  <source src="./candle.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="p-4 text-center">
                  <p className="font-serif text-xs text-gold-300">
                    Birthday Video
                  </p>
                  <button
                    onClick={handleVideoEnded}
                    className="mt-3 px-4 py-1.5 rounded-full bg-gold-500/30 text-gold-200 text-[10px]"
                  >
                    Continue to Tribute →
                  </button>
                </div>
              )}

              {/* ─────────────────────────────────────────────────
                  BEFORE BLOWING: "SURPRISE" OVERLAY
                  Fades out when user clicks "BLOW THE CANDLE"
                  ───────────────────────────────────────────────── */}
              {(phase === 'READY' || phase === 'FADING_SURPRISE') && (
                <div
                  className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-[#11231a] via-[#070e0a] to-[#040806] transition-opacity duration-700 ${
                    phase === 'FADING_SURPRISE' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="w-24 h-24 rounded-full bg-gold-500/20 blur-2xl absolute pointer-events-none" />

                  <span className="font-cinzel text-[10px] sm:text-xs text-gold-400/80 uppercase tracking-[0.25em] mb-2 font-medium">
                    ✦ A Special Moment ✦
                  </span>

                  <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.18em] text-gold-300 text-glow-gold uppercase animate-pulse">
                    {celebration.surpriseWord || 'SURPRISE'}
                  </h1>

                  <span className="text-[10px] sm:text-[11px] font-serif italic text-champagne-300/70 mt-3 text-center px-4">
                    Tap the button below to blow the candle
                  </span>
                </div>
              )}

              {/* Delicate Gold Inner Border */}
              <div className="absolute inset-0 border border-gold-400/30 rounded-2xl pointer-events-none z-40" />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              BOTTOM INTERACTION: "BLOW THE CANDLE" BUTTON
              ───────────────────────────────────────────────────────── */}
          <div className="pb-2 sm:pb-4 text-center w-full max-w-xs shrink-0 z-30">
            {phase === 'READY' && (
              <button
                onClick={handleBlowCandle}
                className="w-full px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-600 hover:from-gold-400 hover:to-amber-200 text-forest-950 font-serif font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_28px_rgba(212,175,55,0.7),0_10px_25px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{celebration.blowButtonText}</span>
                <span>✨</span>
              </button>
            )}

            {phase === 'FADING_SURPRISE' && (
              <div className="text-gold-300 font-cinzel text-xs uppercase tracking-widest animate-pulse">
                <span>Blowing out the candle... ✨</span>
              </div>
            )}

            {phase === 'PLAYING' && (
              <p className="text-[10px] sm:text-xs font-serif text-champagne-300/70 tracking-wider">
                ✨ Playing your birthday surprise to the very end... ✨
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGES 6 & 7: GRANDFATHER TRIBUTE SECTION
          Starts automatically when video completes: Progressive word-by-word typing.
          Followed by separate signature: "Crafted by your Thambi, NAVIN".
          ───────────────────────────────────────────────────────────── */}
      {phase === 'TRIBUTE' && (
        <div
          onClick={handleSkipTributeTyping}
          title="Tap anywhere to reveal full tribute"
          className="relative z-20 w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center py-2 sm:py-4 px-3 sm:px-6 max-w-lg mx-auto cursor-pointer animate-fade-in"
        >
          {/* Tribute Header */}
          <header className="text-center pt-1 shrink-0 w-full">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-gold-400 uppercase font-semibold">
              {grandfatherTribute.sectionTag}
            </span>
            <h2 className="font-serif font-bold text-lg sm:text-2xl text-champagne-100 tracking-tight text-glow-gold mt-0.5">
              {grandfatherTribute.title}
            </h2>
          </header>

          {/* Traditional Ivory Parchment Paper (Matching Cover Letter Style) */}
          <main className="relative w-full rounded-2xl bg-[#faf6ee] text-[#1b120c] p-4 xs:p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-3 border-[#d4af37]/60 my-auto flex flex-col justify-between min-h-[340px] xs:min-h-[380px] sm:min-h-[440px] max-h-[64dvh]">
            
            {/* Scrollable Letter Body (Internal Scroll Only) */}
            <div
              ref={tributeContainerRef}
              className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pr-1 select-text my-1"
            >
              {renderTypedTribute()}
            </div>

            {/* Subtle Gradient Shadow Indicator at Paper Bottom */}
            <div className="h-4 bg-gradient-to-t from-[#faf6ee] to-transparent pointer-events-none -mt-4 shrink-0" />
          </main>

          {/* ─────────────────────────────────────────────────────────
              STAGE 7: SEPARATE FINAL SIGNATURE BELOW THE LETTER
              Visually separate from tribute, types character by character:
              "Crafted by your Thambi, NAVIN"
              ───────────────────────────────────────────────────────── */}
          {isTributeDone && (
            <div className="pt-2 sm:pt-3 text-center shrink-0 animate-fade-in">
              <p className="font-handwritten text-2xl sm:text-3xl text-gold-300 font-bold tracking-wide drop-shadow-md text-glow-gold">
                {footerText.slice(0, footerChars)}
                {!isFooterDone && <PenWritingIndicator />}
              </p>
            </div>
          )}

          {/* Bottom Actions when complete */}
          <footer className="shrink-0 pt-1 pb-2 text-center w-full">
            {isFooterDone ? (
              <div className="flex items-center justify-center gap-4 text-xs font-serif">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playCardClick();
                    setPhase('READY');
                    setTypedWords(0);
                    setFooterChars(0);
                  }}
                  className="text-gold-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Replay Birthday Video ↺
                </button>
                <span className="text-gold-500/40">•</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playCardClick();
                    onRestart?.();
                  }}
                  className="text-gold-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Return to Story Cover 📖
                </button>
              </div>
            ) : (
              <p className="text-[10px] text-champagne-300/60 font-serif">
                Tap anywhere to reveal full tribute
              </p>
            )}
          </footer>
        </div>
      )}
    </div>
  );
}
