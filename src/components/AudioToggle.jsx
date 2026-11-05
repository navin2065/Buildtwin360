import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audio';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isAudioActive());

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(soundEngine.isAudioActive());
    };
    const interval = setInterval(checkState, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    const active = soundEngine.toggleMusic();
    setIsPlaying(active);
  }; 

  return (
    <button
      onClick={handleToggle}
      aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
      className="fixed top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-[#070e0a]/80 hover:bg-[#0f1f17]/90 border border-gold-500/30 hover:border-gold-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 text-xs text-gold-300 group cursor-pointer"
    >
      {/* Equalizer Sound Waves Indicator */}
      <div className="flex items-center gap-0.5 h-3">
        <span
          className={`w-0.5 bg-gold-400 rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
          }`}
        />
        <span
          className={`w-0.5 bg-gold-400 rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2 animate-bounce' : 'h-1 opacity-40'
          }`}
          style={{ animationDelay: '0.15s' }}
        />
        <span
          className={`w-0.5 bg-gold-400 rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-pulse' : 'h-2 opacity-40'
          }`}
          style={{ animationDelay: '0.3s' }}
        />
        <span
          className={`w-0.5 bg-gold-400 rounded-full transition-all duration-300 ${
            isPlaying ? 'h-1.5 animate-bounce' : 'h-1 opacity-40'
          }`}
          style={{ animationDelay: '0.45s' }}
        />
      </div>

      <span className="font-serif tracking-wider text-[11px] uppercase group-hover:text-gold-200">
        {isPlaying ? 'Sound On' : 'Sound Off'}
      </span>
    </button>
  );
}

