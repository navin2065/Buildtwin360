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
  const { celebration, grandfatherLetter, grandfatherTribute, footer } = EXPERIENCE_CONFIG;
  const tributeConfig = grandfatherLetter || grandfatherTribute;

  /**
   * EXACT THREE-STAGE AUDIO & VIDEO FLOW:
   * 1. 'READY'           : Silent waiting screen. Snug 478:850 frame with "SURPRISE".
   *                        NO butterflies, NO autoplay BGM (Screen remains silent).
   *                        Prominent "BLOW THE CANDLE" button below frame.
   * 2. 'FADING_SURPRISE' : Candle blow sound triggers, "SURPRISE" fades,
   *                        golden butterflies fly in, Stage 2 (public/sound.mp3) plays in sync with video.
   * 3. 'PLAYING'         : Full original video plays with zero black side gaps;
   *                        6 larger solo photos orbit continuously in circular wheel-like motion.
   * 4. 'TRIBUTE'         : Video ends -> sound.mp3 STOPS, Stage 3 (public/sound2.mp3) STARTS.
   *                        Displays 16:9 photo (thatha.jpg) at top, followed by automatic
   *                        word-by-word typewriter letter with pen indicator & sparkles.
   *                        Followed by character-by-character "Crafted by your Thambi, NAVIN".
   */
  const [phase, setPhase] = useState('READY');
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Word-by-word state for Grandfather Letter & character state for Footer
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

  // Grandfather Letter word-by-word preparation
  const tributeParagraphs = tributeConfig.paragraphs || [];

  // Parse paragraphs, lines, and words to preserve newlines and count tokens
  const tributeParsed = React.useMemo(() => {
    let wordCounter = 0;
    return tributeParagraphs.map((p, pIdx) => {
      const rawLines = p.split('\n');
      const lines = rawLines.map((line) => {
        return line.trim().length > 0 ? line.trim().split(/\s+/) : [];
      });
      const paragraphWordCount = lines.reduce((acc, words) => acc + words.length, 0);
      const startWordIndex = wordCounter + 1;
      wordCounter += paragraphWordCount;
      const endWordIndex = wordCounter;

      return {
        pIdx,
        lines,
        paragraphWordCount,
        startWordIndex,
        endWordIndex,
      };
    });
  }, [tributeParagraphs]);

  const totalTributeWords = React.useMemo(() => {
    return tributeParsed.reduce((acc, p) => acc + p.paragraphWordCount, 0);
  }, [tributeParsed]);

  const footerText = footer?.craftedBy || 'Crafted by your Thambi, NAVIN';
  const totalFooterChars = footerText.length;

  const isTributeDone = typedWords >= totalTributeWords;
  const isFooterDone = isTributeDone && footerChars >= totalFooterChars;

  // Selected orbiting photos: ONLY Arunadevi's solo photographs
  const orbitPhotos = celebration.orbitPhotos || [];

  // User clicks "BLOW THE CANDLE" -> Start STAGE 2 Audio (public/sound.mp3)
  const handleBlowCandle = () => {
    if (phase !== 'READY') return;

    // 1. Play candle blow sound
    soundEngine.playCandleBlow();

    // 2. STAGE 2: Start public/sound.mp3 in sync with video
    soundEngine.stopBirthdaySong();
    soundEngine.playBirthdaySong('./sound.mp3');

    // 3. Fade "SURPRISE" and trigger golden butterflies flying in
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

  // Video complete handler: onEnded -> STAGE 3 Audio (public/sound2.mp3) + Grandfather Tribute
  const handleVideoEnded = () => {
    // 1. Stop Stage 2 sound.mp3
    soundEngine.stopBirthdaySong();
    soundEngine.playBellChime();

    // 2. STAGE 3: Start public/sound2.mp3 for Grandfather Tribute
    soundEngine.playBirthdaySong('./sound2.mp3');

    // 3. Transition to Grandfather's Letter and start typing immediately
    setPhase('TRIBUTE');
    setTypedWords(1);
    setFooterChars(0);
  };

  // Ensure typing starts automatically when entering TRIBUTE phase
  useEffect(() => {
    if (phase === 'TRIBUTE' && typedWords === 0) {
      setTypedWords(1);
    }
  }, [phase, typedWords]);

  // Letter word-by-word typewriter effect (comfortable, natural pace: 110ms per word)
  useEffect(() => {
    if (phase !== 'TRIBUTE' || isTributeDone) return;

    const timer = setTimeout(() => {
      setTypedWords((prev) => prev + 1);
    }, 110);

    return () => clearTimeout(timer);
  }, [phase, isTributeDone, typedWords]);

  // Smoothly auto-scroll internal text container as new words appear
  // Once typing completes (isTributeDone), auto-scroll is disabled completely
  useEffect(() => {
    if (phase === 'TRIBUTE' && !isTributeDone && tributeContainerRef.current) {
      const container = tributeContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [typedWords, phase, isTributeDone]);

  // Footer character-by-character typewriter effect after letter completes
  useEffect(() => {
    if (!isTributeDone || isFooterDone) return;

    const timer = setTimeout(() => {
      setFooterChars((prev) => prev + 1);
    }, 45);

    return () => clearTimeout(timer);
  }, [isTributeDone, isFooterDone, footerChars]);

  // Tap to reveal full letter text immediately (if typing in progress)
  const handleSkipTributeTyping = () => {
    if (!isTributeDone) {
      setTypedWords(totalTributeWords);
      setFooterChars(totalFooterChars);
    }
  };

  // Render letter text progressively word-by-word with exact styling
  const renderTypedTribute = () => {
    return (
      <div className="space-y-3 my-1">
        {tributeParsed.map((p) => {
          if (p.paragraphWordCount === 0) return null;
          // Not reached yet
          if (typedWords < p.startWordIndex) return null;

          // Paragraph styling tailored to letter hierarchy
          let pClass = "font-serif text-xs sm:text-sm text-[#261b14] leading-[1.65] sm:leading-relaxed text-justify font-normal";
          
          if (p.pIdx === 0) {
            // "My Dear Granddaughter ❤️"
            pClass = "font-serif font-black text-base sm:text-lg text-[#2a1708] tracking-tight pb-0.5";
          } else if (p.pIdx === 1) {
            // "The Happiest Birthday to You, My Dear Granddaughter!"
            pClass = "font-serif font-bold text-xs sm:text-sm text-[#8f6e1b] tracking-wide";
          } else if (p.pIdx === 2) {
            // "My dear little one,"
            pClass = "font-serif italic text-xs sm:text-sm text-[#4a3525] font-medium";
          } else if (p.pIdx === 5) {
            // "And listen to me carefully, my dear…"
            pClass = "font-serif italic text-xs sm:text-sm text-[#6e4e2e] font-semibold";
          } else if (p.pIdx === 12) {
            // "Happy Birthday once again, my precious granddaughter!"
            pClass = "font-serif font-bold text-xs sm:text-sm text-[#8f6e1b] tracking-wide pt-1";
          } else if (p.pIdx === 13) {
            // "Keep smiling, stay brave, and always be happy."
            pClass = "font-serif italic text-xs sm:text-sm text-[#4a3525] font-semibold";
          } else if (p.pIdx === 14) {
            // "With endless love and blessings,\nYour Thatha ❤️"
            pClass = "text-right font-serif text-xs sm:text-sm text-[#5a4228] font-bold tracking-wide pt-2";
          }

          let runningIndex = p.startWordIndex;

          return (
            <div key={p.pIdx} className={pClass}>
              {p.lines.map((words, lineIdx) => {
                const lineStart = runningIndex;
                const lineEnd = runningIndex + words.length - 1;
                runningIndex += words.length;

                if (typedWords < lineStart) return null;

                const wordsToShowCount = Math.min(words.length, Math.max(0, typedWords - lineStart + 1));
                if (wordsToShowCount <= 0) return null;

                const lineText = words.slice(0, wordsToShowCount).join(' ');
                const isWritingOnThisLine = typedWords >= lineStart && typedWords <= lineEnd && !isTributeDone;

                return (
                  <div key={lineIdx} className={lineIdx > 0 ? "mt-1" : ""}>
                    <span>{lineText}</span>
                    {isWritingOnThisLine && <PenWritingIndicator />}
                  </div>
                );
              })}
            </div>
          );
        })}
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
          After clicking: flies in naturally from different areas across the screen.
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
          Precise 478:850 frame to completely eliminate black side gaps.
          Zero cropping, faces, hands, and cake completely visible.
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
              CENTER CONTAINER: VIDEO FRAME + CIRCULAR ORBITING PHOTOS
              ───────────────────────────────────────────────────────── */}
          <div className="relative my-auto flex items-center justify-center w-full">
            
            {/* ─────────────────────────────────────────────────────
                PREVIOUS CONTINUOUS CIRCULAR WHEEL-LIKE ORBIT
                Smooth continuous rotation, slightly bigger photos, zero overlap.
                Strictly Arunadevi's solo photographs.
                ───────────────────────────────────────────────────── */}
            {phase === 'PLAYING' && (
              <div
                className="absolute rounded-full pointer-events-none z-10 flex items-center justify-center animate-orbit"
                style={{
                  width: isMobile ? '380px' : '520px',
                  height: isMobile ? '380px' : '520px',
                }}
              >
                {orbitPhotos.map((photo, i) => {
                  const angle = (i * 360) / orbitPhotos.length;
                  const radius = isMobile ? 175 : 240;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(radius * Math.cos(rad));
                  const y = Math.round(radius * Math.sin(rad));

                  return (
                    <div
                      key={photo.id}
                      style={{
                        transform: `translate3d(${x}px, ${y}px, 0)`,
                      }}
                      className="absolute w-12 h-16 xs:w-14 xs:h-18 sm:w-16 sm:h-21 rounded-xl overflow-hidden border-2 border-gold-400/80 shadow-[0_6px_22px_rgba(0,0,0,0.9)] bg-stone-900 pointer-events-none"
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
                THE SNUG 478:850 VIDEO CONTAINER (NO BLACK SIDE GAPS)
                Matches exact 478:850 video aspect ratio so the video
                fills 100% of the frame without any left/right pillarbox bars.
                ───────────────────────────────────────────────────── */}
            <div className="relative z-20 aspect-[478/850] w-auto h-[52dvh] xs:h-[56dvh] sm:h-[60dvh] max-h-[540px] max-w-[90vw] rounded-2xl overflow-hidden bg-black border-2 border-gold-400/80 shadow-[0_0_45px_rgba(212,175,55,0.45),0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center">
              
              {/* REAL VIDEO PLAYER (Fills frame edge-to-edge, zero black bars) */}
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
                  className={`w-full h-full object-cover transition-opacity duration-700 block ${
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
                    Continue to Letter →
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
          STAGES 6 & 7: GRANDFATHER'S LETTER SECTION
          Plays public/sound2.mp3 during this stage.
          16:9 Photograph of Grandfather (thatha.jpg) at the top.
          Followed by automatic progressive word-by-word typing letter.
          Followed by separate signature: "Crafted by your Thambi, NAVIN".
          ───────────────────────────────────────────────────────────── */}
      {phase === 'TRIBUTE' && (
        <div
          onClick={handleSkipTributeTyping}
          title={!isTributeDone ? "Tap anywhere to reveal full letter" : undefined}
          className="relative z-20 w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center py-2 sm:py-3 px-3 sm:px-6 max-w-lg mx-auto animate-fade-in overflow-hidden"
        >
          {/* Header */}
          <header className="text-center pt-0.5 shrink-0 w-full">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-gold-400 uppercase font-semibold">
              {tributeConfig.sectionTag || "In Everlasting Love & Reverence"}
            </span>
            <h2 className="font-serif font-bold text-base sm:text-xl text-champagne-100 tracking-tight text-glow-gold mt-0.5">
              {tributeConfig.title || "A Tribute to Our Beloved Grandfather"}
            </h2>
          </header>

          {/* Traditional Ivory Parchment Paper (Matching Cover Letter Style) */}
          <main className="relative w-full rounded-2xl bg-[#faf6ee] text-[#1b120c] p-3.5 xs:p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-3 border-[#d4af37]/60 my-auto flex flex-col flex-1 min-h-0 max-h-[70dvh] sm:max-h-[72dvh] overflow-hidden">
            
            {/* ─────────────────────────────────────────────────────────
                1. GRANDFATHER PHOTO – PRESERVE EXACTLY (STATIONARY AT TOP)
                16:9 aspect ratio, fixed in position while letter scrolls
                ───────────────────────────────────────────────────────── */}
            <div className="w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] aspect-[16/9] mx-auto rounded-xl overflow-hidden border-2 border-[#d4af37]/70 shadow-md bg-stone-900/10 shrink-0 mb-3 flex items-center justify-center">
              <img
                src="./images/thatha.jpg"
                alt="Grandfather"
                className="w-full h-full object-contain sm:object-cover"
                onError={(e) => {
                  // Fallback until user uploads thatha.jpg to public/images/
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'flex flex-col items-center justify-center text-center p-3 text-[#8f6e1b]';
                  fallback.innerHTML = '<span class="text-2xl mb-1">🕊️</span><span class="font-cinzel text-[11px] font-bold uppercase tracking-wider">Our Beloved Grandfather</span>';
                  e.target.parentElement.appendChild(fallback);
                }}
              />
            </div>

            {/* ─────────────────────────────────────────────────────────
                2. LETTER – SCROLLABLE TEXT AREA ONLY
                Vertical scrolling only, smooth wheel & touch gestures
                ───────────────────────────────────────────────────────── */}
            <div
              ref={tributeContainerRef}
              className="flex-1 min-h-0 overflow-y-auto parchment-scrollbar scroll-smooth pr-1.5 select-text my-1"
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
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
            <div className="py-1 text-center shrink-0 animate-fade-in">
              <p className="font-handwritten text-xl sm:text-2xl text-gold-300 font-bold tracking-wide drop-shadow-md text-glow-gold">
                {footerText.slice(0, footerChars)}
                {!isFooterDone && <PenWritingIndicator />}
              </p>
            </div>
          )}

          {/* Bottom Actions when complete */}
          <footer className="shrink-0 pt-0.5 pb-1 text-center w-full">
            {isFooterDone ? (
              <div className="flex items-center justify-center gap-4 text-xs font-serif">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.stopBirthdaySong();
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
                    soundEngine.stopBirthdaySong();
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
                Tap anywhere to reveal full letter
              </p>
            )}
          </footer>
        </div>
      )}
    </div>
  );
}
